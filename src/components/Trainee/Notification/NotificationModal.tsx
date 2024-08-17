import React from 'react';
import styles from './NotificationPage.module.css';

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onNotificationClose: (id: number) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, notifications, onNotificationClose }) => {

  if (!isOpen) return null;

  const getRandomColor = () => {
    const colors = ['#FFC107', '#FF5722', '#4CAF50', '#2196F3', '#9C27B0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Notifications</h2>
        <div className={styles.notificationContainer}>
          {notifications.map((notification) => (
            !notification.read && (
              <div
                key={notification.id}
                className={styles.notificationItem}
                style={{ backgroundColor: getRandomColor() }}
              >
                <button
                  className={styles.notificationCloseButton}
                  onClick={() => onNotificationClose(notification.id)}
                >
                  X
                </button>
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
