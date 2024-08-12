import React, { useState } from 'react';
import EnquiryModal from '../../components/Trainee/Enquiry/EnquiryModal';

const EnquiryPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h1>Enquiry Page</h1>
      <button onClick={handleOpenModal}>Open Enquiry Modal</button>
      <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default EnquiryPage;
