'use client';

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
  sensorData,
  notifications,
}: AdminDashboardProps) {
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
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,138,78,0.1)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#4A6548' }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 10, fill: '#4A6548' }} />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #D4E8CE',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.status] ?? '#2D8A4E'}
                    />
                  ))}
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
                  cornerRadius={8}
                  background={{ fill: '#EFF9E8' }}
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
          <button className={styles.actionButton}>📊 Generate Report</button>
          <button className={styles.actionButton}>🔧 System Settings</button>
          <button className={styles.actionButton}>📢 Broadcast Alert</button>
          <button className={styles.actionButton}>👥 Manage Users</button>
        </div>
      </section>
    </div>
  );
}
