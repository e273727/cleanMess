'use client';

import Link from 'next/link';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import styles from './DashboardTeaseSection.module.css';

interface StatReading {
  label: string;
  value: string;
  unit: string;
  status: 'good' | 'warning' | 'critical';
}

const STAT_READINGS: StatReading[] = [
  {
    label: 'pH Level',
    value: '7.2',
    unit: '',
    status: 'good',
  },
  {
    label: 'Turbidity',
    value: '2.1',
    unit: 'NTU',
    status: 'good',
  },
  {
    label: 'Temperature',
    value: '24°C',
    unit: '',
    status: 'good',
  },
];

const CHART_DATA = [
  { day: 'Mon', pH: 7.1, turbidity: 2.3, temperature: 23.5 },
  { day: 'Tue', pH: 7.3, turbidity: 2.0, temperature: 24.1 },
  { day: 'Wed', pH: 6.9, turbidity: 2.5, temperature: 24.8 },
  { day: 'Thu', pH: 7.2, turbidity: 1.9, temperature: 23.9 },
  { day: 'Fri', pH: 7.4, turbidity: 2.1, temperature: 25.2 },
  { day: 'Sat', pH: 7.0, turbidity: 2.4, temperature: 24.3 },
  { day: 'Sun', pH: 7.3, turbidity: 2.0, temperature: 24.0 },
];

const CUSTOM_TOOLTIP = ({ active, payload, label }: { active?: boolean; payload?: Array<{name: string; value: number; color: string}>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white',
        border: '1px solid #D4E8CE',
        borderRadius: '10px',
        padding: '10px 14px',
        fontSize: '12px',
        boxShadow: '0 4px 12px rgba(45,138,78,0.12)',
      }}>
        <p style={{ margin: '0 0 6px', fontWeight: 600, color: '#1A2E1A' }}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ margin: '2px 0', color: p.color }}>
            {p.name}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardTeaseSection() {
  return (
    <section id="dashboard-tease" className={styles.section} aria-label="Dashboard Preview">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>See It in Action</h2>
          <p className={styles.subtitle}>
            Here's what CLEANMess monitoring looks like in real-time.
          </p>
        </div>

        {/* Dashboard Preview Box */}
        <div className={styles.dashboard}>
          {/* Chart Section */}
          <div className={styles.chartSection}>
            <h3 className={styles.chartTitle}>Live Sensor Trends</h3>
            <p className={styles.chartSubtitle}>Last 7 days — normalized readings</p>

            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={CHART_DATA} margin={{ top: 6, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillPH" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D8A4E" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#2D8A4E" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F0B429" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F0B429" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="fillTurb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E6035" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1E6035" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,138,78,0.1)" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 11, fill: '#4A6548' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<CUSTOM_TOOLTIP />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px', color: '#4A6548', paddingTop: '8px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="pH"
                    stroke="#2D8A4E"
                    strokeWidth={2.5}
                    fill="url(#fillPH)"
                    dot={{ r: 3, fill: '#2D8A4E', strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                    animationDuration={1200}
                  />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    name="temp"
                    stroke="#F0B429"
                    strokeWidth={2}
                    fill="url(#fillTemp)"
                    dot={{ r: 3, fill: '#F0B429', strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                    animationDuration={1400}
                  />
                  <Area
                    type="monotone"
                    dataKey="turbidity"
                    stroke="#1E6035"
                    strokeWidth={1.5}
                    strokeDasharray="5 3"
                    fill="url(#fillTurb)"
                    dot={false}
                    animationDuration={1600}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p className={styles.chartCaption}>
              All values normalized — hover over points for exact readings
            </p>
          </div>

          {/* Live Stats Grid */}
          <div className={styles.statsGrid}>
            {STAT_READINGS.map((stat) => (
              <div
                key={stat.label}
                className={`${styles.statReading} ${styles[`status_${stat.status}`]}`}
              >
                <div className={styles.statusIndicator} />
                <p className={styles.statLabel}>{stat.label}</p>
                <p className={styles.statValue}>
                  {stat.value}
                  {stat.unit && <span className={styles.unit}>{stat.unit}</span>}
                </p>
                <p className={styles.statusText}>
                  {stat.status === 'good' && '✓ Normal'}
                  {stat.status === 'warning' && '⚠ Alert'}
                  {stat.status === 'critical' && '✕ Critical'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <p className={styles.ctaDescription}>
            This is just a preview. The full dashboard includes 30-day historical data,
            trend analysis, alerts, and detailed sensor correlations.
          </p>
          <Link href="/dashboard" className={styles.ctaButton}>
            Explore Full Dashboard
            <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
