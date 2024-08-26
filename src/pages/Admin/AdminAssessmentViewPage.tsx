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
        const response = await axios.get('http://localhost:8080/api/v1/ilpex/batches');
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

  const handleTabChange = (newIndex: number) => {
    setSelectedBatchIndex(newIndex);
  };

  if (loading) {
    return <Typography>Loading batches...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
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
