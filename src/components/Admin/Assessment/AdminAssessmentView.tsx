import React, { useState } from 'react';
import { Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import assessmentData from '../../../../public/AssessmentList.json';

interface StudentAttended {
  count: number;
  students: string[];
}

interface Assessment {
  assessmentName: string;
  status: string;
  studentsAttended: StudentAttended;
}

interface Batch {
  batch: string;
  assessments: Assessment[];
}

interface AssessmentList {
  batches: Batch[];
}

const AssessmentTabs: React.FC = () => {
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);
  const data: AssessmentList = assessmentData;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedBatchIndex(newValue);
  };

  const selectedBatch = data.batches[selectedBatchIndex];

  return (
    <div>
      <Tabs
        value={selectedBatchIndex}
        onChange={handleTabChange}
        aria-label="batch tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        {data.batches.map((batch, index) => (
          <Tab key={batch.batch} label={batch.batch} />
        ))}
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assessment Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Students Attended</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedBatch.assessments.map((assessment) => (
              <TableRow key={assessment.assessmentName}>
                <TableCell>{assessment.assessmentName}</TableCell>
                <TableCell>{assessment.status}</TableCell>
                <TableCell>{assessment.studentsAttended.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AssessmentTabs;
