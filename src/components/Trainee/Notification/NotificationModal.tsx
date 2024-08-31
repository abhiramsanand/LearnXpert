import React from 'react';
import styles from './NotificationPage.module.css';

interface Notification {
  id: number;
  assessmentName: string;
  notificationTime: string; // ISO 8601 format date string
  isRead: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onNotificationClose: (id: number) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, notifications, onNotificationClose }) => {

  if (!isOpen) return null;

  const handleNotificationClose = async (id: number) => {
    try {
      // API call to mark notification as read
      await fetch(`http://localhost:8080/api/v1/notifications/${id}/mark-read`, {
        method: 'POST', 
      });
      // Notify parent component to update the notification list
      onNotificationClose(id);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getRandomColor = () => {
    const colors = ['#CBC3E3'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Notifications</h2>
        <div className={styles.notificationContainer}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              !notification.isRead && (
                <div
                  key={notification.id}
                  className={styles.notificationItem}
                  style={{ backgroundColor: getRandomColor() }}
                >
                  <button
                    className={styles.notificationCloseButton}
                    onClick={() => handleNotificationClose(notification.id)}
                  >
                    X
                  </button>
                  <h3>NEW ASSESSMENT: {notification.assessmentName}</h3>
                  <p>Posted on: {new Date(notification.notificationTime).toLocaleString()}</p>
                </div>
              )
            ))
          ) : (
            <p>No new notifications.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
