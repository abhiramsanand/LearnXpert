import React from 'react';
import { Grid, Pagination } from '@mui/material';
import AssessmentCard from './AssessmentCard';

interface Assessment {
  assessmentName: string;
  score?: number;
  dueDate?: string;
  traineeId: number;
  id: number;
  dateToBeTaken?: string;
  dateTaken?: string;
}

interface AssessmentListProps {
  assessments: Assessment[];
  isCompleted: boolean;
  onCardClick: (assessmentName: string) => void; // Update here
}

const AssessmentList: React.FC<AssessmentListProps> = ({ assessments, isCompleted, onCardClick }) => {
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 3;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedAssessments = assessments.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {paginatedAssessments.map((assessment) => (
          <Grid item xs={12} key={assessment.id}>
            <AssessmentCard
              title={assessment.assessmentName}
              description={isCompleted ? 'Completed' : 'Pending'}
              date={isCompleted ? assessment.dateTaken : assessment.dueDate}
              dateLabel={isCompleted ? 'Date of Submission' : 'Due Date'}
              score={assessment.score}
              onClick={() => onCardClick(assessment.assessmentName)} // Correctly pass assessmentName
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(assessments.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ mt: 2 }}
      />
    </div>
  );
};

export default AssessmentList;
