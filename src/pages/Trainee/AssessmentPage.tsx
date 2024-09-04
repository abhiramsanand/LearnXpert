import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import CompletedAssessmentCard from '../../components/Trainee/Assessment/CompletedAssessmentCard';
import PendingAssessmentCard from '../../components/Trainee/Assessment/PendingAssessmentCard';
import AssessmentList from '../../components/Trainee/Assessment/AssessmentList';
import SearchBar from '../../components/Trainee/Assessment/SearchBar';
import { styled } from '@mui/system';

interface Assessment {
  assessmentName: string;
  score?: number;
  dueDate?: string;
  traineeId: number;
  id: number;
  dateToBeTaken?: string;
  dateTaken?: string;
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  padding: '16px',
});

const Sidebar = styled('div')({
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const Content = styled('div')({
  flex: 1,
  paddingLeft: '16px',
});

const SidebarHeader = styled('div')({
  marginBottom: '16px',
});

const NewAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [completedAssessments, setCompletedAssessments] = useState<Assessment[]>([]);
  const [pendingAssessments, setPendingAssessments] = useState<Assessment[]>([]);
  const [filteredCompletedAssessments, setFilteredCompletedAssessments] = useState<Assessment[]>([]);
  const [filteredPendingAssessments, setFilteredPendingAssessments] = useState<Assessment[]>([]);
  const [selectedCard, setSelectedCard] = useState<'completed' | 'pending'>('pending');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const traineeId = localStorage.getItem('traineeId'); // Retrieve the stored traineeId

    // Fetch completed and pending assessments
    Promise.all([
      fetch(`http://localhost:8080/api/v1/assessments/completed/${traineeId}`).then((res) => res.json()),
      fetch(`http://localhost:8080/api/v1/assessments/pending/${traineeId}`).then((res) => res.json()),
    ])
      .then(([completedData, pendingData]) => {
        setCompletedAssessments(completedData);
        setFilteredCompletedAssessments(completedData);
        setPendingAssessments(pendingData);
        setFilteredPendingAssessments(pendingData);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => console.error('Error loading assessments:', error));
  }, []);

  const handleSearchChange = (searchTerm: string) => {
    if (selectedCard === 'completed') {
      setFilteredCompletedAssessments(
        completedAssessments.filter((assessment) =>
          assessment.assessmentName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else if (selectedCard === 'pending') {
      setFilteredPendingAssessments(
        pendingAssessments.filter((assessment) =>
          assessment.assessmentName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const handleCardClick = (assessmentName: string) => {
    navigate(`/Trainee-Assessments/assessment?name=${encodeURIComponent(assessmentName)}`);
  };

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
          ILPex{" "}
          <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: "20px" }}>
      <Sidebar>
        <SidebarHeader>
          <SearchBar onSearchChange={handleSearchChange} />
        </SidebarHeader>
        <PendingAssessmentCard
          onClick={() => setSelectedCard('pending')}
          isSelected={selectedCard === 'pending'}
        />
        <CompletedAssessmentCard
          onClick={() => setSelectedCard('completed')}
          isSelected={selectedCard === 'completed'}
        />
      </Sidebar>
      <Content>
        {selectedCard === 'completed' && (
          <AssessmentList
            assessments={filteredCompletedAssessments}
            isCompleted={true}
            onCardClick={handleCardClick}
          />
        )}
        {selectedCard === 'pending' && (
          <AssessmentList
            assessments={filteredPendingAssessments}
            isCompleted={false}
            onCardClick={handleCardClick}
          />
        )}
      </Content>
    </Container>
  );
};

export default NewAssessmentPage;
