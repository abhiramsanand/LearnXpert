import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import BatchTabs from '../../components/Admin/AssessmentView/BatchTabs';
import AssessmentsTable from '../../components/Admin/AssessmentView/AssessmentTable';
import AddAssessmentButton from '../../components/Admin/AssessmentView/AddAssessmentButton';

interface Batch {
  id: number;
  batchName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const AssessmentsPage: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatchIndex, setSelectedBatchIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/batches');
        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
        setError('Failed to fetch batches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

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

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  function handleTabChange(newIndex: number): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Box sx={{ padding: 2 }}>
      <BatchTabs
        batches={batches}
        selectedIndex={selectedBatchIndex}
        onTabChange={handleTabChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, marginBottom: 2 }}>
        <AddAssessmentButton />
      </Box>
      {batches[selectedBatchIndex] && (
        <AssessmentsTable batchId={batches[selectedBatchIndex].id} />
      )}
    </Box>
  );
};

export default AssessmentsPage;
