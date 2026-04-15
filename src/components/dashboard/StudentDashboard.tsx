'use client';

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import styles from './StudentDashboard.module.css';

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

interface StudentDashboardProps {
  sensorData: SensorData[];
  notifications: Notification[];
}

export default function StudentDashboard({
  sensorData,
  notifications,
}: StudentDashboardProps) {
  const isSafeToDine =
    sensorData.filter((s) => s.status !== 'critical').length === sensorData.length;

  const getQualityScore = () => {
    const good = sensorData.filter((s) => s.status === 'good').length;
    const warning = sensorData.filter((s) => s.status === 'warning').length;
    const critical = sensorData.filter((s) => s.status === 'critical').length;

    const score = (good * 100 + warning * 50 + critical * 0) / sensorData.length;
    return Math.round(score);
  };

  return (
    <div className={styles.studentDashboard}>
      {/* Safety Status Banner */}
      <section className={styles.safeBanner}>
        <div
          className={`${styles.bannerContent} ${isSafeToDine ? styles.safe : styles.unsafe}`}
        >
          <div className={styles.bannerIcon}>
            {isSafeToDine ? '✅ Safe to Dine' : '⚠️ Caution Advised'}
          </div>
          <div className={styles.bannerText}>
            <h2 className={styles.bannerTitle}>
              {isSafeToDine
                ? 'All canteens are safe!'
                : 'Some canteens need attention'}
            </h2>
            <p className={styles.bannerDesc}>
              {isSafeToDine
                ? 'Food quality standards are being maintained across all canteens.'
                : 'Please check the details below before dining.'}
            </p>
          </div>
        </div>
      </section>

      {/* Quality Score */}
      <section className={styles.qualitySection}>
        <h2 className={styles.sectionTitle}>Overall Quality Score</h2>
        <div className={styles.qualityCard}>
          {/* Recharts Gauge */}
          <div className={styles.gaugeWrapper}>
            <ResponsiveContainer width="100%" height={180} minWidth={1} minHeight={1}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                startAngle={90}
                endAngle={-270}
                data={[{ value: getQualityScore(), fill: getQualityScore() >= 80 ? '#10b981' : getQualityScore() >= 60 ? '#F0B429' : '#ef4444' }]}
              >
                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#EFF9E8' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className={styles.gaugeLabel}>
              <span className={styles.score}>{getQualityScore()}</span>
              <span className={styles.scoreLabel}>/ 100</span>
            </div>
          </div>

          {/* Status breakdown pie */}
          <div className={styles.pieWrapper}>
            <ResponsiveContainer width="100%" height={180} minWidth={1} minHeight={1}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Good', value: sensorData.filter(s => s.status === 'good').length },
                    { name: 'Warning', value: sensorData.filter(s => s.status === 'warning').length },
                    { name: 'Critical', value: sensorData.filter(s => s.status === 'critical').length },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={1000}
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #D4E8CE',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <p className={styles.pieLabel}>Sensor Status Breakdown</p>
          </div>

          <div className={styles.scoreDetails}>
            <p className={styles.scoreStatus}>
              {getQualityScore() >= 80
                ? '🎉 Excellent'
                : getQualityScore() >= 60
                  ? '👍 Good'
                  : getQualityScore() >= 40
                    ? '⚠️ Fair'
                    : '🚨 Poor'}
            </p>
            <p className={styles.scoreText}>
              Based on real-time monitoring of all canteen sensors
            </p>
          </div>
        </div>
      </section>

      {/* Canteen Status */}
      <section className={styles.canteens}>
        <h2 className={styles.sectionTitle}>Canteen Status</h2>
        <div className={styles.canteenGrid}>
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

              return (
                <div
                  key={canteen}
                  className={`${styles.canteenCard} ${styles[canteenStatus]}`}
                >
                  <h3 className={styles.canteenName}>{canteen}</h3>
                  <p className={styles.canteenStatus}>
                    {canteenStatus === 'good'
                      ? '✅ Safe'
                      : canteenStatus === 'warning'
                        ? '⚠️ Warning'
                        : '🚨 Critical'}
                  </p>
                  <ul className={styles.sensorList}>
                    {canteenSensors.map((sensor) => (
                      <li
                        key={sensor.id}
                        className={`${styles.sensorItem} ${styles[sensor.status]}`}
                      >
                        {sensor.type}: {sensor.currentValue}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <section className={styles.notifications}>
          <h2 className={styles.sectionTitle}>Recent Alerts</h2>
          <div className={styles.notificationsList}>
            {notifications.slice(0, 3).map((notif) => (
              <div
                key={notif.id}
                className={`${styles.notificationItem} ${styles[notif.type]}`}
              >
                <p className={styles.notifTitle}>{notif.title}</p>
                <p className={styles.notifMessage}>{notif.message}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className={styles.faqs}>
        <h2 className={styles.sectionTitle}>Quick Tips</h2>
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <h4 className={styles.tipTitle}>🍽️ Safe To Eat?</h4>
            <p className={styles.tipText}>
              Green status means all food safety standards are met. Check scores
              before visiting.
            </p>
          </div>
          <div className={styles.tipCard}>
            <h4 className={styles.tipTitle}>🔔 Get Alerts</h4>
            <p className={styles.tipText}>
              We notify you instantly when food quality changes. Stay safe!
            </p>
          </div>
          <div className={styles.tipCard}>
            <h4 className={styles.tipTitle}>📱 Check Anytime</h4>
            <p className={styles.tipText}>
              View real-time sensor data 24/7 to make informed dining choices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
