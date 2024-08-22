import React, { useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import AssessmentCard from './AssessmentCard';

interface AssessmentListProps {
  assessments: {
    assessmentName: string;
    score?: number;
    dueDate?: string;
    traineeId: number;
    id: number;
    dateToBeTaken?: string; // Due date for pending assessments
    dateTaken?: string; // Submission date for completed assessments
  }[];
  isCompleted: boolean; // Prop to determine if the assessments are completed or pending
}

const AssessmentList: React.FC<AssessmentListProps> = ({ assessments, isCompleted }) => {
  const [page, setPage] = useState(1);
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
              title={assessment.assessmentName} // Changed from 'name' to 'assessmentName'
              description={isCompleted ? 'Completed' : 'Pending'}
              date={isCompleted ? assessment.dateTaken : assessment.dueDate} // Used the appropriate date field
              dateLabel={isCompleted ? 'Date of Submission' : 'Due Date'}
              score={assessment.score}
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
