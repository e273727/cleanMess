'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import styles from './ParentDashboard.module.css';

const WEEKLY_TREND = [
  { day: 'Mon', safety: 92, alerts: 0 },
  { day: 'Tue', safety: 88, alerts: 1 },
  { day: 'Wed', safety: 95, alerts: 0 },
  { day: 'Thu', safety: 80, alerts: 2 },
  { day: 'Fri', safety: 85, alerts: 1 },
  { day: 'Sat', safety: 97, alerts: 0 },
  { day: 'Sun', safety: 91, alerts: 0 },
];

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

interface ParentDashboardProps {
  sensorData: SensorData[];
  notifications: Notification[];
}

export default function ParentDashboard({
  sensorData,
  notifications,
}: ParentDashboardProps) {
  const criticalAlerts = notifications.filter((n) => n.type === 'alert');

  return (
    <div className={styles.parentDashboard}>
      {/* Welcome Message */}
      <section className={styles.welcome}>
        <h2 className={styles.welcomeTitle}>Monitoring Your Child's Safety</h2>
        <p className={styles.welcomeText}>
          Get real-time updates on food quality at your child's institution. We'll
          notify you immediately if any issues are detected.
        </p>
      </section>

      {/* Critical Alerts Section */}
      {criticalAlerts.length > 0 && (
        <section className={styles.criticalAlerts}>
          <h2 className={styles.sectionTitle}>🚨 Critical Issues Detected</h2>
          <div className={styles.alertsList}>
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className={styles.alertBox}>
                <div className={styles.alertIconBig}>🚨</div>
                <div className={styles.alertContent}>
                  <h3 className={styles.alertTitle}>{alert.title}</h3>
                  <p className={styles.alertMessage}>{alert.message}</p>
                  <p className={styles.alertTime}>
                    Detected at:{' '}
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Peace of Mind Card */}
      <section className={styles.peaceOfMind}>
        <div className={styles.pomCard}>
          <div className={styles.pomIcon}>🛡️</div>
          <h3 className={styles.pomTitle}>How We Keep Your Child Safe</h3>
          <ul className={styles.pomList}>
            <li>
              <strong>24/7 Monitoring:</strong> Real-time sensors track food quality
              continuously
            </li>
            <li>
              <strong>Instant Notifications:</strong> You're alerted immediately if
              there's any issue
            </li>
            <li>
              <strong>Expert Standards:</strong> We follow WHO-certified food safety
              guidelines
            </li>
            <li>
              <strong>Transparent Data:</strong> View all sensor readings anytime
            </li>
          </ul>
        </div>
      </section>

      {/* Current Status Overview */}
      <section className={styles.statusOverview}>
        <h2 className={styles.sectionTitle}>Current Food Quality Status</h2>
        <div className={styles.statusGrid}>
          {Array.from(new Set(sensorData.map((s) => s.name.split(' - ')[1]))).map(
            (canteen) => {
              const canteenSensors = sensorData.filter((s) =>
                s.name.includes(canteen)
              );
              const canteenStatus = canteenSensors.some(
                (s) => s.status === 'critical'
              )
                ? 'critical'
                : canteenSensors.some((s) => s.status === 'warning')
                  ? 'warning'
                  : 'good';

              const statusEmoji =
                canteenStatus === 'good'
                  ? '✅ Safe'
                  : canteenStatus === 'warning'
                    ? '⚠️ Caution'
                    : '🚨 Issue';

              return (
                <div
                  key={canteen}
                  className={`${styles.statusCard} ${styles[canteenStatus]}`}
                >
                  <h4 className={styles.canteenName}>{canteen}</h4>
                  <p className={styles.statusEmoji}>{statusEmoji}</p>
                  <div className={styles.statusDetails}>
                    {canteenSensors.map((sensor) => (
                      <div key={sensor.id} className={styles.detail}>
                        <span className={styles.detailLabel}>{sensor.type}:</span>
                        <span className={styles.detailValue}>
                          {sensor.currentValue}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* All Sensors Data */}
      <section className={styles.allSensors}>
        <h2 className={styles.sectionTitle}>Detailed Sensor Readings</h2>
        <div className={styles.sensorsTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Location</th>
                <th>Sensor Type</th>
                <th>Current Value</th>
                <th>Status</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.map((sensor) => (
                <tr key={sensor.id} className={styles[sensor.status]}>
                  <td>{sensor.name}</td>
                  <td>{sensor.type}</td>
                  <td>
                    {sensor.currentValue}
                    {sensor.type === 'Temperature'
                      ? '°C'
                      : sensor.type === 'pH'
                        ? ''
                        : ''}
                  </td>
                  <td className={styles.statusCell}>
                    {sensor.status === 'good'
                      ? '✅ Good'
                      : sensor.status === 'warning'
                        ? '⚠️ Warning'
                        : '🚨 Critical'}
                  </td>
                  <td>
                    {new Date(sensor.lastUpdated).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Weekly Safety Trend Chart */}
      <section className={styles.trendSection}>
        <h2 className={styles.sectionTitle}>Weekly Safety Trend</h2>
        <p className={styles.trendSubtitle}>7-day overview of canteen safety score and alert count</p>
        <div className={styles.trendChartWrapper}>
          <ResponsiveContainer width="100%" height={220} minWidth={1} minHeight={1}>
            <LineChart data={WEEKLY_TREND} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,138,78,0.1)" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: '#4A6548' }}
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
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '11px', color: '#4A6548' }}
              />
              <Line
                type="monotone"
                dataKey="safety"
                name="Safety Score"
                stroke="#2D8A4E"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#2D8A4E' }}
                activeDot={{ r: 6 }}
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="alerts"
                name="Alerts"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 3"
                dot={{ r: 3, fill: '#ef4444' }}
                activeDot={{ r: 5 }}
                animationDuration={1400}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Contact & Support */}
      <section className={styles.support}>
        <h2 className={styles.sectionTitle}>Questions or Concerns?</h2>
        <div className={styles.supportBox}>
          <p>
            For any questions about our food safety monitoring system, please reach
            out to us:
          </p>
          <div className={styles.contactInfo}>
            <p>
              📧 <strong>Email:</strong>{' '}
              <a href="mailto:support@cleanmess.com">support@cleanmess.com</a>
            </p>
            <p>
              📞 <strong>Phone:</strong>{' '}
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
