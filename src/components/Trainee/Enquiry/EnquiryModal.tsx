import React, { useState } from 'react';
import styles from './EnquiryModal.module.css';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState('');
  const [enquiry, setEnquiry] = useState('');

  const handleSubmit = () => {
    // Add your submit logic here
    console.log('Subject:', subject);
    console.log('Enquiry:', enquiry);
    onClose(); // Close modal on submit
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Enquiry</h2>
        <div className={styles.formGroup}>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="enquiry">Enquire Here</label>
          <textarea
            id="enquiry"
            value={enquiry}
            onChange={(e) => setEnquiry(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>Enquire</button>
      </div>
    </div>
  );
};

export default EnquiryModal;



