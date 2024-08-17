import React from 'react';
import NotificationsNoneOutlinedIcon  from '@mui/icons-material/NotificationsNoneOutlined';
import styles from './NotificationPage.module.css';

interface NotificationIconProps {
  unreadCount: number;
  onClick: () => void;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ unreadCount, onClick }) => {
  return (
    <div className={styles.notificationIconContainer} onClick={onClick}>
      <NotificationsNoneOutlinedIcon sx={{ color: "#8061C3", fontSize: '30px' }} />
      {unreadCount > 0 && (
        <div className={styles.notificationBadge}>
          {unreadCount}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
