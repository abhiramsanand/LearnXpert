import React, { useState } from 'react';
import NotificationModal from '../../components/Trainee/Notification/NotificationModal'; // Import the NotificationModal component
import styles from '../../components/Trainee/Notification/NotificationPage.module.css'; // Import your styles for NotificationPage

const NotificationPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className={styles.pageContainer}>
      <h1>Notifications Page</h1>
      <button className={styles.openModalButton} onClick={handleOpenModal}>
        Show Notifications
      </button>
      <NotificationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default NotificationPage;
