import React from 'react';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import styles from './NotificationPage.module.css';

interface NotificationIconProps {
  unreadCount: number;
  onClick: () => void;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ unreadCount, onClick }) => {
  return (
    <div className={styles.notificationIconContainer} onClick={onClick}>
      <NotificationsIcon fontSize="large" sx={{ color: "#8518FF" }} />
      {unreadCount > 0 && (
        <div className={styles.notificationBadge}>
          {unreadCount}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
