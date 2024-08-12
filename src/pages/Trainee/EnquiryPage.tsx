import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EnquiryModal from '../../components/Trainee/Enquiry/EnquiryModal';
 // Import your EnquiryModal component

const EnquiryPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBlurred, setBlurred] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/Trainee-Enquiry') {
      setModalOpen(true);
      setBlurred(true);
    } else {
      setModalOpen(false);
      setBlurred(false);
    }
  }, [location]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setBlurred(false);
    navigate('/'); // Navigate back to a different route after closing the modal
  };

  return (
    <div className={isBlurred ? 'blurred' : ''}>
      <EnquiryModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default EnquiryPage;
