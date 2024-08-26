import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [selectedCard, setSelectedCard] = useState<'completed' | 'pending'>('pending');
  const [filteredCompletedAssessments, setFilteredCompletedAssessments] = useState<Assessment[]>([]);
  const [filteredPendingAssessments, setFilteredPendingAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    const traineeId = 1283; // Replace this with dynamic traineeId if needed

    // Fetch completed assessments
    fetch(`http://localhost:8080/api/v1/assessments/completed/${traineeId}`)
      .then((response) => response.json())
      .then((data) => {
        setCompletedAssessments(data);
        setFilteredCompletedAssessments(data);
      })
      .catch((error) => console.error('Error loading completed assessments:', error));

    // Fetch pending assessments
    fetch(`http://localhost:8080/api/v1/assessments/pending/${traineeId}`)
      .then((response) => response.json())
      .then((data) => {
        setPendingAssessments(data);
        setFilteredPendingAssessments(data);
      })
      .catch((error) => console.error('Error loading pending assessments:', error));
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
    console.log(`Navigating to assessment with Name: ${assessmentName}`);
    navigate(`/Trainee-Assessments/assessment?name=${encodeURIComponent(assessmentName)}`);
  };
  

  return (
    <Container>
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
            onCardClick={handleCardClick} // Correctly pass only assessmentName
          />
        )}
        {selectedCard === 'pending' && (
          <AssessmentList
            assessments={filteredPendingAssessments}
            isCompleted={false}
            onCardClick={handleCardClick} // Correctly pass only assessmentName
          />
        )}
      </Content>
    </Container>
  );
};

export default NewAssessmentPage;
