import React, { useState, useEffect } from 'react';
import NotificationModal from '../../components/Trainee/Notification/NotificationModal';
import NotificationIcon from '../../components/Trainee/Notification/NotificationIcon';
import styles from '../../components/Trainee/Notification/NotificationPage.module.css';

interface Notification {
  id: number;
  assessmentName: string;
  notificationTime: string; // ISO 8601 format date string
  isRead: boolean;
}

const NotificationPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchNotifications = async () => {
    const Id = localStorage.getItem("traineeId");
    const traineeId = Id; 
    try {
      const response = await fetch(`http://localhost:8080/api/v1/notifications/trainee/${traineeId}`);
      const data: Notification[] = await response.json();
      setNotifications(data);
      updateUnreadCount(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const updateUnreadCount = (notifications: Notification[]) => {
    const count = notifications.filter(notification => !notification.isRead).length;
    setUnreadCount(count);
  };

  const handleNotificationClose = async (id: number) => {
    try {
      // Make API call to mark the notification as read
      await fetch(`http://localhost:8080/api/v1/notifications/${id}/mark-read`, {
        method: 'PATCH',
      });
      // Update UI by removing the closed notification
      setNotifications(prevNotifications => {
        const updatedNotifications = prevNotifications.map(notification => 
          notification.id === id ? { ...notification, isRead: true } : notification
        );
        updateUnreadCount(updatedNotifications);
        return updatedNotifications;
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
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
