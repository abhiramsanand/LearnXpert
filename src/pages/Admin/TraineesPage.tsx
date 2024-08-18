import React, { useState } from 'react';
import BatchSelect from '../../shared components/Admin/BatchSelect';
import TraineeTable from '../../components/Admin/AdminTrainees/TraineeTable';

const TraineesPage: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(1);

  const handleBatchSelect = (batchId: number) => {
    setSelectedBatch(batchId);
  };

  return (
    <div>
      <BatchSelect selectedBatch={selectedBatch} onBatchSelect={handleBatchSelect} />
      <TraineeTable selectedBatch={selectedBatch} />
    </div>
  );
};

export default TraineesPage;
