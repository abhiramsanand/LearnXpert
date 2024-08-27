import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Pagination
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTraineeModal from '../ManageBatch/EditTraineeModal'; // Import the new modal component

interface Trainee {
  traineeId: number;
  userName: string;
  email: string;
  percipioEmail: string;
  password: string;
}

interface TraineeTableProps {
  trainees: Trainee[];
  batchId: number;
  onDeleteTrainee: (id: number) => void;
  onEditTrainee: (id: number) => void;
}

const TraineeTable: React.FC<TraineeTableProps> = ({ trainees, batchId, onDeleteTrainee, onEditTrainee }) => {
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTraineeId, setSelectedTraineeId] = useState<number | null>(null);
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rowsPerPage = 3;

  const displayedTrainees = trainees.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, traineeId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedTraineeId(traineeId);

    // Find the selected trainee data
    const trainee = trainees.find(t => t.traineeId === traineeId);
    setSelectedTrainee(trainee || null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTraineeId(null);
    setSelectedTrainee(null);
  };

  const handleEdit = () => {
    if (selectedTrainee) {
      setModalOpen(true);
      handleMenuClose();
    }
  };

  const handleDelete = () => {
    if (selectedTraineeId !== null) {
      const url = `http://localhost:8080/api/v1/batches/${batchId}/trainees/${selectedTraineeId}`;
      console.log("Deleting trainee at URL:", url);
      
      fetch(url, {
        method: 'DELETE',
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete trainee');
        }
        console.log('Trainee deleted successfully');
        onDeleteTrainee(selectedTraineeId);
        handleMenuClose();
      })
      .catch((error) => {
        console.error('There was a problem with the delete operation:', error);
      });
    }
  };

  const handleModalSubmit = (userName: string, email: string, percipioEmail: string, password: string) => {
    if (selectedTraineeId !== null) {
      const updatedTrainee = { userName, email, percipioEmail, password };
      const url = `http://localhost:8080/api/v1/batches/${batchId}/trainees/${selectedTraineeId}`;
      
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTrainee),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update trainee');
        }
        console.log('Trainee updated successfully');
        onEditTrainee(selectedTraineeId);
        setModalOpen(false);
      })
      .catch((error) => {
        console.error('There was a problem with the update operation:', error);
      });
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f3f0f9" }}>
              <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>S I.No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Name of Trainee</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Percipio Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Password</TableCell>
              <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedTrainees.map((trainee, index) => (
              <TableRow key={trainee.traineeId} sx={{ height: '40px' }}>
                <TableCell sx={{ padding: '8px' }}>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{trainee.userName}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{trainee.email}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{trainee.percipioEmail}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{trainee.password}</TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <IconButton
                    sx={{ color: "#8061C3" }}
                    size="small"
                    onClick={(event) => handleMenuClick(event, trainee.traineeId)}
                    aria-label="more"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEdit}>
                      <EditIcon fontSize="small" sx={{ marginRight: 1 }} />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(trainees.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
            '& .MuiPaginationItem-root': {
              bgcolor: '#8061C3',
              color: '#ffffff',
              '&.Mui-selected': {
                bgcolor: '#4A00C2',
                color: '#ffffff',
              },
            },
          }}
        />
      </TableContainer>
      {selectedTrainee && (
        <EditTraineeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          trainee={selectedTrainee}
        />
      )}
    </>
  );
};

export default TraineeTable;
