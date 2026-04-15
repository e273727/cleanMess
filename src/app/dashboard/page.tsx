'use client';

import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import ParentDashboard from '@/components/dashboard/ParentDashboard';
import NotificationCenter from '@/components/dashboard/NotificationCenter';

type UserRole = 'admin' | 'student' | 'parent';

interface SensorData {
  id: string;
  name: string;
  type: 'pH' | 'Turbidity' | 'Temperature' | 'Microbial';
  currentValue: number;
  status: 'good' | 'warning' | 'critical';
  lastUpdated: string;
  normalRange: { min: number; max: number };
}

interface Notification {
  id: string;
  type: 'alert' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  sensorId?: string;
}

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch real-time mock data from the Next.js API
  const fetchSensorData = async () => {
    try {
      const response = await fetch('/api/sensors');
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      
      if (result.success && result.data) {
        setSensorData(result.data);
        
        // Generate notifications based on fetched data
        const newNotifications: Notification[] = result.data
          .filter((s: SensorData) => s.status !== 'good')
          .map((sensor: SensorData) => ({
            id: `notif-${sensor.id}-${Date.now()}`,
            type: sensor.status === 'critical' ? 'alert' : 'warning',
            title: `${sensor.status === 'critical' ? '🚨 CRITICAL' : '⚠️ WARNING'}: ${sensor.name}`,
            message: `${sensor.name} is ${sensor.status}. Current value: ${sensor.currentValue}${
              sensor.type === 'Temperature' ? '°C' : sensor.type === 'pH' ? '' : ' units'
            } (Normal: ${sensor.normalRange.min}-${sensor.normalRange.max})`,
            timestamp: new Date().toISOString(),
            read: false,
            sensorId: sensor.id,
          }));

        // Avoid notification spam on polling by filtering out notifications
        // for sensors that already have an unread notification.
        setNotifications((prev) => {
          const prevUnreadIds = new Set(prev.filter(n => !n.read).map(n => n.sensorId));
          const filteredNew = newNotifications.filter(n => !prevUnreadIds.has(n.sensorId));
          return [...filteredNew, ...prev].slice(0, 20); // keep max 20 notifications
        });
      }
    } catch (error) {
      console.error('Failed to fetch sensor data:', error);
    }
  };

  useEffect(() => {
    fetchSensorData(); // Initial fetch
    
    // Setup polling every 5 seconds
    const interval = setInterval(() => {
      fetchSensorData();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Recalculate unread count whenever notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const switchRole = (role: UserRole) => {
    setUserRole(role);
    // Mark notifications as read when switching roles
    notifications.forEach((n) => {
      if (!n.read) markNotificationAsRead(n.id);
    });
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logoSection}>
            <h1 className={styles.title}>CLEANMess Dashboard</h1>
            <p className={styles.subtitle}>
              Real-time Food Safety Monitoring
            </p>
          </div>

          {/* Notification Center */}
          <NotificationCenter
            notifications={notifications}
            unreadCount={unreadCount}
            onDismiss={dismissNotification}
            onRead={markNotificationAsRead}
          />
        </div>

        {/* Role Selector - Centered and Enhanced */}
        <div className={styles.roleSelectorWrapper}>
          <div className={styles.roleSelector}>
            {(['admin', 'student', 'parent'] as const).map((role) => (
              <button
                key={role}
                className={`${styles.roleCard} ${
                  userRole === role ? styles.active : ''
                }`}
                onClick={() => switchRole(role)}
              >
                <span className={styles.roleIcon}>
                  {role === 'admin' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="#000000" style={{ verticalAlign: 'middle' }}>
                      <path d="M12.5 24H0c0-4.651 4.542-7.727 6.039-8.027C9.138,15.733 11.579,13.155 11.579,10c0-3.314-2.686-6-6-6S-0.001,6.686-0.001,10c0,.88.291,1.806.811,2.6 C4.37,13.633 6.002,16.5 6.002,20.5C6.002,21.658 5.822,22.849 5.502,24h7v0z" opacity="0" />
                      <path d="M15,9c0-3.314-2.686-6-6-6S3,5.686,3,9c0,3.155,2.44,5.733,5.539,5.973C3.542,15.273-1,18.349-1,23h12.5c-0.32-1.049-0.5-2.155-0.5-3.313c0-4.004,2.37-7.46,5.811-9.2C16.067,9.606,15,8.88,15,9z" />
                      <path d="M22.314,18.006c0.082-0.344,0.125-0.702,0.125-1.068c0-0.367-0.043-0.725-0.125-1.069l0.983-0.509l-1.071-1.854l-1.037,0.366c-0.301-0.279-0.643-0.518-1.011-0.707l-0.25-1.066h-2.143l-0.25,1.066c-0.368,0.189-0.71,0.428-1.011,0.707l-1.037-0.366l-1.071,1.854l0.983,0.509c-0.082,0.344-0.125,0.702-0.125,1.069c0,0.367,0.043,0.725,0.125,1.068l-0.983,0.51l1.071,1.854l1.037-0.367c0.301,0.28,0.643,0.519,1.011,0.708l0.25,1.066h2.143l0.25-1.066c0.368-0.189,0.71-0.428,1.011-0.708l1.037,0.367l1.071-1.854L22.314,18.006z M17.708,19.089c-1.188,0-2.15-0.963-2.15-2.151c0-1.189,0.963-2.151,2.15-2.151c1.189,0,2.152,0.962,2.152,2.151C19.86,18.126,18.897,19.089,17.708,19.089z" />
                    </svg>
                  )}
                  {role === 'student' && (
                    <svg width="32" height="32" viewBox="0 0 448 512" fill="#000000" style={{ verticalAlign: 'middle' }}>
                      <path d="M319.4 320.6L224 415l-95.4-94.4C57.1 323.7 0 382.2 0 454.4v9.6c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-9.6c0-72.2-57.1-130.7-128.6-133.8zM13.6 79.8l6.4 1.5v58.4c-7 4.2-12 11.5-12 20.3 0 8.4 4.6 15.4 11.1 19.7L3.5 242c-1.7 6.9 2.1 14 7.6 14h41.8c5.5 0 9.3-7.1 7.6-14l-15.6-62.3C51.4 175.4 56 168.4 56 160c0-8.8-5-16.1-12-20.3V87.1l66 15.9c-8.6 17.2-14 36.4-14 57 0 70.7 57.3 128 128 128s128-57.3 128-128c0-20.6-5.3-39.8-14-57l96.3-23.2L235.8 4.8C228 2.9 220 2.9 212.1 4.8L13.6 48.3c-18.2 4.4-18.2 27.1 0 31.5z" />
                    </svg>
                  )}
                  {role === 'parent' && (
                    <svg width="32" height="32" viewBox="0 0 640 512" fill="#000000" style={{ verticalAlign: 'middle' }}>
                      <path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z" />
                    </svg>
                  )}
                </span>
                <span className={styles.roleName}>
                  {role === 'admin' && 'Admin'}
                  {role === 'student' && 'Student'}
                  {role === 'parent' && 'Parent'}
                </span>
                <span className={styles.roleLabel}>
                  {role === 'admin' && 'Management'}
                  {role === 'student' && 'Dining'}
                  {role === 'parent' && 'Guardian'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {userRole === 'admin' && (
          <AdminDashboard sensorData={sensorData} notifications={notifications} />
        )}
        {userRole === 'student' && (
          <StudentDashboard sensorData={sensorData} notifications={notifications} />
        )}
        {userRole === 'parent' && (
          <ParentDashboard sensorData={sensorData} notifications={notifications} />
        )}
      </main>
    </div>
  );
}
