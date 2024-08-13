import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import SearchBar from '../../components/Trainee/Assessment/SearchBar';
import Filter from '../../components/Trainee/Assessment/Filter';
import AssessmentList from '../../components/Trainee/Assessment/AssessmentList';
import CompletedAssessmentCard from '../../components/Trainee/Assessment/CompletedAssessmentCard';
import PendingAssessmentCard from '../../components/Trainee/Assessment/PendingAssessmentCard';

interface Assessment {
  id: number;
  name: string;
  dateTaken?: string;  // For completed assessments
  score?: number;
  dateToBeTaken?: string;  // For pending assessments
}

const NewAssessmentPage: React.FC = () => {
  const [showCompleted, setShowCompleted] = useState(true);
  const [completedAssessments, setCompletedAssessments] = useState<Assessment[]>([]);
  const [pendingAssessments, setPendingAssessments] = useState<Assessment[]>([]);
  const [selectedCard, setSelectedCard] = useState<'completed' | 'pending' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>(''); // Added state for filter

  useEffect(() => {
    fetch('/CompletedAssessment.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setCompletedAssessments(data.completedAssessments))
      .catch((error) => console.error('Error loading completed assessments:', error));

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

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  // Filter assessments based on searchTerm and selected filter
  const filterAssessments = (assessments: Assessment[]) => {
    return assessments
      .filter((assessment) =>
        assessment.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (filter === 'dateOfSubmission') {
          return (new Date(b.dateTaken || '').getTime() - new Date(a.dateTaken || '').getTime());
        } else if (filter === 'dueDate') {
          return (new Date(b.dateToBeTaken || '').getTime() - new Date(a.dateToBeTaken || '').getTime());
        } else {
          return 0;
        }
      });
  };

  return (
    <Box sx={{ padding: '5px', height: '100vh', overflow: 'hidden' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={3} sx={{ overflowY: 'auto', height: '100%',width:'50%' }}>
          <Box sx={{ display: 'flex', gap: '8px', marginBottom: '30px' }}>
            <SearchBar onSearchChange={handleSearchChange} />
            <Filter onFilterChange={handleFilterChange} />
          </Box>
          <Box sx={{ marginBottom: '24px', marginTop: '80px' }}>
            <CompletedAssessmentCard
              onClick={() => {
                setShowCompleted(true);
                setSelectedCard('completed');
              }}
              isSelected={selectedCard === 'completed'}
            />
          </Box>
          <Box>
            <PendingAssessmentCard
              onClick={() => {
                setShowCompleted(false);
                setSelectedCard('pending');
              }}
              isSelected={selectedCard === 'pending'}
            />
          </Box>
        </Grid>
        <Grid item xs={9} sx={{ overflowY: 'auto', height: '100%' }}>
          <Box sx={{ maxWidth: '700px', margin: '0 auto' }}>
            <AssessmentList
              assessments={showCompleted ? filterAssessments(completedAssessments) : filterAssessments(pendingAssessments)}
              isCompleted={showCompleted}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewAssessmentPage;
