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
  Button,
  Box,
  TablePagination,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Trainee } from '../ManageBatch/BatchDetails';
import AddTraineeModal from '../ManageBatch/AddTraineeModal';
import EditTraineeModal from '../ManageBatch/EditTraineeModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface TraineeTableProps {
  trainees: Trainee[];
  onAddTrainee: () => void;
}

const TraineeTable: React.FC<TraineeTableProps> = ({ trainees, onAddTrainee }) => {
  const { batchId } = useParams<{ batchId: string }>();
  const [traineeList, setTraineeList] = useState<Trainee[]>(trainees);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (trainee: Trainee) => {
    setSelectedTrainee(trainee);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTrainee(null);
  };

  const handleAddTrainee = (userName: string, email: string, percipioEmail: string, password: string) => {
    console.log('New Trainee:', { userName, email, percipioEmail, password });
    // You might need to refresh the trainees list here or update the state accordingly
  };

  const handleUpdateTrainee = (userName: string, email: string, percipioEmail: string, password: string) => {
    if (selectedTrainee) {
      console.log('Updated Trainee:', { userName, email, percipioEmail, password });
      // You might need to refresh the trainees list here or update the state accordingly
    }
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteTrainee = async (traineeId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/batches/trainees/${traineeId}`);
      // Remove the trainee from the UI after successful deletion
      setTraineeList(prevTrainees => prevTrainees.filter(trainee => trainee.traineeId !== traineeId));
    } catch (error) {
      console.error("There was an error deleting the trainee!", error);
      alert("There was an error deleting the trainee. Check the console for details.");
    }
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ maxHeight: '200px', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SL NO</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Percipio Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {traineeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trainee, index) => (
              <TableRow key={trainee.traineeId} sx={{ height: '48px' }}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{trainee.userName}</TableCell>
                <TableCell>{trainee.email}</TableCell>
                <TableCell>{trainee.percipioEmail}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenEditModal(trainee)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteTrainee(trainee.traineeId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <Button
          variant="contained"
          onClick={handleOpenAddModal}
          sx={{ color: "#8061C3", borderColor: "#8061C3", borderRadius: "4px" }}
        >
          <AddIcon />
          Add Trainee
        </Button>
        <TablePagination
          rowsPerPageOptions={[3, 10, 25]}
          component="div"
          count={traineeList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <AddTraineeModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSubmit={handleAddTrainee}
        batchId={Number(batchId)} // Replace with actual batchId if available
      />

      {selectedTrainee && (
        <EditTraineeModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSubmit={handleUpdateTrainee}
          trainee={selectedTrainee}
        />
      )}
    </Box>
  );
};

export default TraineeTable;
