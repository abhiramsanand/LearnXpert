import React, { useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import AssessmentCard from './AssessmentCard';

interface AssessmentListProps {
  assessments: { id: number; name: string; dateToBeTaken?: string; dateTaken?: string; score?: number }[];
}

const AssessmentList: React.FC<AssessmentListProps> = ({ assessments }) => {
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
              title={assessment.name}
              description={assessment.dateToBeTaken ? 'Pending' : 'Completed'}
              date={assessment.dateToBeTaken || assessment.dateTaken!}
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
        sx={{ mt: 2 }} // Adding margin-top to create a gap
      />
    </div>
  );
};

export default AssessmentList;
