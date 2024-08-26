import React, { useState } from 'react';
import BatchSelect from '../../shared components/Admin/BatchSelect';
import CourseContainer from '../../components/Admin/CourseView/CourseContainer';

const AdminCoursePage = () => {
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);

  const handleBatchSelect = (batchId: number) => {
    setSelectedBatch(batchId);
  };

  return (
    <div>
      <BatchSelect selectedBatch={selectedBatch || 0} onBatchSelect={handleBatchSelect} />
      <CourseContainer selectedBatch={selectedBatch} />
    </div>
  );
};

export default AdminCoursePage;
