import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
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
      }
    };

    if (batchId) {
      fetchBatchDetails();
    }
  }, [batchId]);

  const handleAddTrainee = (userName: string, email: string, percipioEmail: string, password: string) => {
    // Update the list of trainees locally or fetch the updated list from the server
    // For this example, we'll just log the new trainee data
    console.log('New Trainee:', { userName, email, percipioEmail, password });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (!batchDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: '8px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <ProgramStatusForm batchDetails={batchDetails} />
        
        <Box sx={{ marginTop: '16px' }}>
          <TraineeTable trainees={trainees} onAddTrainee={handleOpenModal} />
          <Button variant="outlined" color="secondary" size="small" onClick={() => console.log('Cancel')}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={() => console.log('Update Trainee')}>
          Update Trainee
        </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, marginTop: '16px', padding: '8px' }}>
       
      </Box>

      <AddTraineeModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTrainee}
        batchId={Number(batchId)} // Pass the batchId as a number
      />
    </Box>
  );
};

export default ManageBatchPage;
