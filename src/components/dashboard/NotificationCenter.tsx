'use client';

import { useState } from 'react';
import styles from './NotificationCenter.module.css';

interface Notification {
  id: string;
  type: 'alert' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
  unreadCount: number;
  onDismiss: (id: string) => void;
  onRead: (id: string) => void;
}

export default function NotificationCenter({
  notifications,
  unreadCount,
  onDismiss,
  onRead,
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.notificationCenter}>
      {/* Bell Icon */}
      <button
        className={styles.bellButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <span className={styles.bellIcon}>🔔</span>
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <h3>Notifications</h3>
            <span className={styles.count}>
              {unreadCount} unread
            </span>
          </div>

          <div className={styles.notificationsList}>
            {notifications.length === 0 ? (
              <p className={styles.empty}>You're all caught up! 🎉</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`${styles.notificationItem} ${styles[notif.type]} ${
                    !notif.read ? styles.unread : ''
                  }`}
                  onClick={() => !notif.read && onRead(notif.id)}
                >
                  <div className={styles.notifContent}>
                    <p className={styles.notifTitle}>{notif.title}</p>
                    <p className={styles.notifMessage}>{notif.message}</p>
                    <p className={styles.notifTime}>
                      {new Date(notif.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    className={styles.dismissBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDismiss(notif.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
