import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import SearchBar from '../../components/Trainee/NewAssessment/SearchBar';
import Filter from '../../components/Trainee/NewAssessment/Filter';
import AssessmentList from '../../components/Trainee/NewAssessment/AssessmentList';
import CompletedAssessmentCard from '../../components/Trainee/NewAssessment/CompletedAssessmentCard';
import PendingAssessmentCard from '../../components/Trainee/NewAssessment/PendingAssessmentCard';

interface Assessment {
  id: number;
  name: string;
  dateTaken?: string;
  score?: number;
  dateOfSubmission?: string;
  dueDate?: string;
}

const NewAssessmentPage: React.FC = () => {
  const [showCompleted, setShowCompleted] = useState(true);
  const [completedAssessments, setCompletedAssessments] = useState<Assessment[]>([]);
  const [pendingAssessments, setPendingAssessments] = useState<Assessment[]>([]);
  const [selectedCard, setSelectedCard] = useState<'completed' | 'pending' | null>(null); // State to track the selected card

  useEffect(() => {
    // Fetch completed assessments
    fetch('/CompletedAssessment.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setCompletedAssessments(data.completedAssessments))
      .catch((error) => console.error('Error loading completed assessments:', error));

    // Fetch pending assessments
    fetch('/PendingAssessment.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setPendingAssessments(data.pendingAssessments))
      .catch((error) => console.error('Error loading pending assessments:', error));
  }, []);

  return (
    <Box sx={{ padding: '5px', height: '100vh', overflow: 'hidden' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={3} sx={{ overflowY: 'auto', height: '100%' }}>
          <Box sx={{ display: 'flex', gap: '8px', marginBottom: '30px' }}>
            <SearchBar />
            <Filter />
          </Box>
          <Box sx={{ marginBottom: '24px' }}>
            <CompletedAssessmentCard
              onClick={() => {
                setShowCompleted(true);
                setSelectedCard('completed'); // Set selected card state
              }}
              isSelected={selectedCard === 'completed'} // Pass isSelected prop
            />
          </Box>
          <Box>
            <PendingAssessmentCard
              onClick={() => {
                setShowCompleted(false);
                setSelectedCard('pending'); // Set selected card state
              }}
              isSelected={selectedCard === 'pending'} // Pass isSelected prop
            />
          </Box>
        </Grid>
        <Grid item xs={9} sx={{ overflowY: 'auto', height: '100%' }}>
          <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
            <AssessmentList assessments={showCompleted ? completedAssessments : pendingAssessments} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewAssessmentPage;
