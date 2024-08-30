import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ProgramStatusForm from '../../components/Admin/ManageBatch/ProgramStatusForm';
import TraineeTable from '../../components/Admin/ManageBatch/TraineeTable';
import AddTraineeModal from '../../components/Admin/ManageBatch/AddTraineeModal';
import { useParams } from 'react-router-dom';

interface BatchDetails {
  batchId: number;
  batchName: string;
  programName: string;
  startDate: string;
  endDate: string;
  numberOfTrainees: number;
  active: boolean;
}

interface Trainee {
  traineeId: number;
  userName: string;
  email: string;
  percipioEmail: string;
  password: string;
}

const ManageBatchPage: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const [batchDetails, setBatchDetails] = useState<BatchDetails | null>(null);
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/batches/${batchId}/details`);

        if (!response.ok) {
          throw new Error(`Error fetching batch details: ${response.statusText}`);
        }

        const data = await response.json();
        setBatchDetails({
          batchId: data.batchId,
          batchName: data.batchName,
          programName: data.programName,
          startDate: data.startDate,
          endDate: data.endDate,
          numberOfTrainees: data.numberOfTrainees,
          active: data.active,
        });
        setTrainees(data.trainees);
      } catch (error) {
        console.error('Error fetching batch details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (batchId) {
      fetchBatchDetails();
    }
  }, [batchId]);

  const handleAddTrainee = (userName: string, email: string, percipioEmail: string, password: string) => {
    console.log('New Trainee:', { userName, email, percipioEmail, password });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "#8061C3",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            animation: "flip 1s infinite",
            "@keyframes flip": {
              "0%": { transform: "rotateX(0)" },
              "50%": { transform: "rotateX(180deg)" },
              "100%": { transform: "rotateX(360deg)" },
            },
          }}
        >
          ILPex <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh', overflowY: 'hidden' }}>
      <Box sx={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#E8DEFF',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#8061C3',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#8061C3',
        }
      }}>
        <ProgramStatusForm batchDetails={batchDetails} />
        <Box sx={{ marginTop: '16px' }}>
          <TraineeTable trainees={trainees} onAddTrainee={handleOpenModal} />
        </Box>
      </Box>
      <AddTraineeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTrainee}
        batchId={Number(batchId)}
      />
    </Box>
  );
};

export default ManageBatchPage;
