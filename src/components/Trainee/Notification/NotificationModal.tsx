import React, { useState, useEffect } from 'react';
import styles from './NotificationPage.module.css';
import axios from 'axios';

interface Notification {
  id: number;
  title: string;
  message: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Fetch notifications when the modal opens
      const fetchNotifications = async () => {
        try {
          // Assuming the JSON file is in the public directory
          const response = await axios.get('/notifications.json');
          setNotifications(response.data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      fetchNotifications();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Notifications</h2>
        <ul className={styles.notificationList}>
          {notifications.map((notification) => (
            <li key={notification.id} className={styles.notificationItem}>
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
