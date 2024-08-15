import React, { useState } from 'react';
import assessmentData from '../../../../public/AssessmentList.json';
import BatchTabs from './BatchTabs';
import AssessmentTable from './AssessmentTable';

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
  const [sortOption, setSortOption] = useState('all');
  const data: AssessmentList = assessmentData;

  const handleTabChange = (newIndex: number) => {
    setSelectedBatchIndex(newIndex);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
  };

  const selectedBatch = data.batches[selectedBatchIndex];

  return (
    <div>
      <BatchTabs
        batches={data.batches}
        selectedIndex={selectedBatchIndex}
        onTabChange={handleTabChange}
      />
      <AssessmentTable
        assessments={selectedBatch.assessments}
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default AssessmentTabs;
