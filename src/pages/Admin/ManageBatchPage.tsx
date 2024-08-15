import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ProgramStatusForm from '../../components/Admin/ManageBatch/ProgramStatusForm';
import TraineeTable from '../../components/Admin/ManageBatch/TraineeTable';

interface BatchDetails {
  program: string;
  status: boolean;
  batchName: string;
  startDate: string;
  noOfTrainees: number;
  endDate: string;
}

interface Trainee {
  no: number;
  name: string;
}

const ManageBatchPage: React.FC = () => {
  const [batchDetails, setBatchDetails] = useState<BatchDetails | null>(null);
  const [trainees, setTrainees] = useState<Trainee[]>([]);

  useEffect(() => {
    fetch('/batchdetails.json')
      .then((response) => response.json())
      .then((data) => {
        setBatchDetails(data.batchDetails);
        setTrainees(data.trainees);
      })
      .catch((error) => console.error('Error fetching batch details:', error));
  }, []);

  const handleAddTrainee = () => {
    console.log('Add Trainee');
  };

  const handleCancel = () => {
    console.log('Cancel');
  };

  const handleUpdateTrainee = () => {
    console.log('Update Trainee');
  };

  return (
    <Box sx={{ padding: '3px', maxHeight: '100vh', overflow: 'hidden' }}> 
      <Typography variant="h6" gutterBottom sx={{ fontSize: '18px', marginBottom: '3px' }}> 
        Manage Batch
      </Typography>

      {batchDetails && (
        <>
          <ProgramStatusForm batchDetails={batchDetails} />

          <TraineeTable trainees={trainees} onAddTrainee={handleAddTrainee} />

          <Box sx={{ display: 'flex', justifyContent: 'fleax-start', gap: 1, mt: 0}}>
            <Button variant="outlined" color="secondary" size="small" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" size="small" onClick={handleUpdateTrainee}>
              Update Trainee
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ManageBatchPage;
