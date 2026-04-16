'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import styles from './AdminDashboard.module.css';
import SystemSettingsModal from './SystemSettingsModal';
import BroadcastAlertModal from './BroadcastAlertModal';
import ManageUsersModal from './ManageUsersModal';

interface SensorData {
  id: string;
  name: string;
  type: string;
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

interface AdminDashboardProps {
  sensorData: SensorData[];
  notifications: Notification[];
}

const STATUS_COLORS: Record<string, string> = {
  good: '#10b981',
  warning: '#f59e0b',
  critical: '#ef4444',
};

export default function AdminDashboard({
  sensorData: initialSensorData,
  notifications,
}: AdminDashboardProps) {
  const [sensorData, setSensorData] = useState(initialSensorData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  useEffect(() => {
    // Simulate real-time data fluctuations every 2 seconds for a dynamic feel
    const interval = setInterval(() => {
      setSensorData((prevData) => 
        prevData.map((sensor) => {
          // Fluctuate between -8% and +8%
          const fluctuation = sensor.currentValue * (Math.random() * 0.16 - 0.08);
          let newValue = sensor.currentValue + fluctuation;
          
          if (sensor.type === 'pH') {
            newValue = Math.max(0, Math.min(14, Number(newValue.toFixed(2))));
          } else {
            newValue = Math.max(0, Math.floor(newValue));
          }

          let newStatus = sensor.status;
          const range = sensor.normalRange.max - sensor.normalRange.min;
          
          if (newValue > sensor.normalRange.max + range * 0.15 || newValue < sensor.normalRange.min - range * 0.15) {
            newStatus = 'critical';
          } else if (newValue > sensor.normalRange.max || newValue < sensor.normalRange.min) {
            newStatus = 'warning';
          } else {
            newStatus = 'good';
          }

          return {
            ...sensor,
            currentValue: newValue,
            status: newStatus as 'good' | 'warning' | 'critical',
            lastUpdated: new Date().toISOString(),
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    try {
      const headers = ['Sensor ID', 'Name', 'Type', 'Current Value', 'Status', 'Last Updated', 'Normal Min', 'Normal Max'];
      const rows = sensorData.map((s) => [
        s.id,
        s.name,
        s.type,
        s.currentValue,
        s.status,
        new Date(s.lastUpdated).toLocaleString(),
        s.normalRange.min,
        s.normalRange.max
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `cleanmess_sensor_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate report:', error);
      alert('Failed to generate report.');
    } finally {
      setTimeout(() => setIsGenerating(false), 800);
    }
  };

  const criticalCount = sensorData.filter((s) => s.status === 'critical').length;
  const warningCount = sensorData.filter((s) => s.status === 'warning').length;
  const goodCount = sensorData.filter((s) => s.status === 'good').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return '✅';
      case 'warning': return '⚠️';
      case 'critical': return '🚨';
      default: return '❓';
    }
  };

  // Chart data for bar chart
  const barData = sensorData.map((s) => ({
    name: s.name.replace(' - ', '\n'),
    value: s.currentValue,
    status: s.status,
  }));

  // Radial data for health score
  const healthScore = Math.round((goodCount / Math.max(sensorData.length, 1)) * 100);
  const radialData = [{ name: 'Health', value: healthScore, fill: '#2D8A4E' }];

  return (
    <div className={styles.adminDashboard}>
      {/* Overview Cards */}
      <section className={styles.overview}>
        <h2 className={styles.sectionTitle}>System Overview</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>All Good</p>
              <p className={`${styles.statValue} ${styles.valueGood}`}>{goodCount}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>⚠️</div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Warnings</p>
              <p className={`${styles.statValue} ${styles.valueWarning}`}>{warningCount}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>🚨</div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Critical</p>
              <p className={`${styles.statValue} ${styles.valueCritical}`}>{criticalCount}</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📡</div>
            <div className={styles.statContent}>
              <p className={styles.statLabel}>Total Sensors</p>
              <p className={styles.statValue}>{sensorData.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Row */}
      <section className={styles.chartsRow}>
        {/* Bar Chart — Sensor Values */}
        <div className={styles.chartCard}>
          <h2 className={styles.sectionTitle}>Current Sensor Readings</h2>
          <p className={styles.chartSubtitle}>Live values across all monitored sensors</p>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={220} minWidth={1} minHeight={1}>
              <BarChart data={barData} margin={{ top: 8, right: 8, left: -20, bottom: 40 }}>
                <defs>
                  <linearGradient id="colorGood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,138,78,0.1)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#4A6548', fontWeight: 500 }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 10, fill: '#4A6548' }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(45,138,78,0.05)' }}
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1500} 
                  animationEasing="ease-out"
                >
                  {barData.map((entry, index) => {
                    const gradientId = entry.status === 'good' ? 'colorGood' : entry.status === 'warning' ? 'colorWarning' : 'colorCritical';
                    return <Cell key={`cell-${index}`} fill={`url(#${gradientId})`} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radial Chart — Health Score */}
        <div className={styles.chartCard}>
          <h2 className={styles.sectionTitle}>System Health Score</h2>
          <p className={styles.chartSubtitle}>Percentage of sensors operating normally</p>
          <div className={styles.radialWrapper}>
            <ResponsiveContainer width="100%" height={200} minWidth={1} minHeight={1}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                startAngle={90}
                endAngle={-270}
                data={radialData}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={12}
                  background={{ fill: '#EFF9E8' }}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className={styles.radialLabel}>
              <span className={styles.radialScore}>{healthScore}%</span>
              <span className={styles.radialMeta}>Healthy</span>
            </div>
          </div>
        </div>
      </section>

      {/* All Sensors Monitoring */}
      <section className={styles.sensors}>
        <h2 className={styles.sectionTitle}>All Sensors — Real-Time Monitoring</h2>
        <div className={styles.sensorGrid}>
          {sensorData.map((sensor) => (
            <div
              key={sensor.id}
              className={styles.sensorCard}
              style={{
                borderLeftColor: STATUS_COLORS[sensor.status],
              }}
            >
              <div className={styles.sensorHeader}>
                <h3 className={styles.sensorName}>{sensor.name}</h3>
                <span className={styles.sensorIcon}>
                  {getStatusIcon(sensor.status)}
                </span>
              </div>

              <div className={styles.sensorValue}>
                <span className={styles.value}>{sensor.currentValue}</span>
                <span className={styles.unit}>
                  {sensor.type === 'Temperature'
                    ? '°C'
                    : sensor.type === 'pH'
                      ? ''
                      : 'units'}
                </span>
              </div>

              <div className={styles.sensorRange}>
                <p className={styles.rangeLabel}>Normal Range:</p>
                <p className={styles.rangeValue}>
                  {sensor.normalRange.min} – {sensor.normalRange.max}
                </p>
              </div>

              <div className={styles.sensorStatus}>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: STATUS_COLORS[sensor.status] }}
                >
                  {sensor.status.toUpperCase()}
                </span>
              </div>

              <p className={styles.lastUpdated}>
                Updated: {new Date(sensor.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Alert Log */}
      <section className={styles.alertLog}>
        <h2 className={styles.sectionTitle}>Alert Log</h2>
        <div className={styles.alertsList}>
          {notifications.length === 0 ? (
            <p className={styles.noAlerts}>All systems operating normally 🎉</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`${styles.alertItem} ${styles[notif.type]}`}
              >
                <div className={styles.alertHeader}>
                  <h4 className={styles.alertTitle}>{notif.title}</h4>
                  <p className={styles.alertTime}>
                    {new Date(notif.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <p className={styles.alertMessage}>{notif.message}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Admin Actions */}
      <section className={styles.adminActions}>
        <h2 className={styles.sectionTitle}>Admin Actions</h2>
        <div className={styles.actionButtons}>
          <button 
            className={styles.actionButton} 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            style={{ opacity: isGenerating ? 0.7 : 1, cursor: isGenerating ? 'wait' : 'pointer' }}
          >
            {isGenerating ? '⏳ Generating...' : '📊 Generate Report'}
          </button>
          <button className={styles.actionButton} onClick={() => setIsSettingsOpen(true)}>🔧 System Settings</button>
          <button className={styles.actionButton} onClick={() => setIsBroadcastOpen(true)}>📢 Broadcast Alert</button>
          <button className={styles.actionButton} onClick={() => setIsUsersOpen(true)}>👥 Manage Users</button>
        </div>
      </section>

      <SystemSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
      <BroadcastAlertModal 
        isOpen={isBroadcastOpen} 
        onClose={() => setIsBroadcastOpen(false)} 
      />
      <ManageUsersModal 
        isOpen={isUsersOpen} 
        onClose={() => setIsUsersOpen(false)} 
      />
    </div>
  );
}
