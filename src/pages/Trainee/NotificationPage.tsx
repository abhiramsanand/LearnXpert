import React, { useState, useEffect } from 'react';
import NotificationModal from '../../components/Trainee/Notification/NotificationModal';
import NotificationIcon from '../../components/Trainee/Notification/NotificationIcon';
import styles from '../../components/Trainee/Notification/NotificationPage.module.css';

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
}

const NotificationPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/notifications.json');
      const data: Notification[] = await response.json();
      setNotifications(data);
      updateUnreadCount(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const updateUnreadCount = (notifications: Notification[]) => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  };

  const handleNotificationClose = (id: number) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      );
      updateUnreadCount(updatedNotifications);
      return updatedNotifications;
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <NotificationIcon unreadCount={unreadCount} onClick={handleOpenModal} />
      <NotificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        notifications={notifications}
        onNotificationClose={handleNotificationClose}
      />
    </div>
  );
};

export default NotificationPage;
