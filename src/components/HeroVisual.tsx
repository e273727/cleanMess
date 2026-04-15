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
import styles from './HeroVisual.module.css';

const DATA = [
  { time: 'Mon', pH: 7.1, temp: 23.5, turbidity: 2.0 },
  { time: 'Tue', pH: 7.3, temp: 24.1, turbidity: 1.8 },
  { time: 'Wed', pH: 6.9, temp: 24.8, turbidity: 2.3 },
  { time: 'Thu', pH: 7.2, temp: 23.9, turbidity: 2.1 },
  { time: 'Fri', pH: 7.4, temp: 25.2, turbidity: 1.9 },
  { time: 'Sat', pH: 7.0, temp: 24.3, turbidity: 2.4 },
  { time: 'Sun', pH: 7.3, temp: 24.0, turbidity: 2.0 },
];

export default function HeroVisual() {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <LineChart data={DATA} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="heroGradientPH" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2D8A4E" />
              <stop offset="100%" stopColor="#F0B429" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,138,78,0.12)" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11, fill: '#4A6548' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
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
            dataKey="pH"
            stroke="#2D8A4E"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#2D8A4E' }}
            activeDot={{ r: 5 }}
            animationDuration={1200}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#F0B429"
            strokeWidth={2}
            dot={{ r: 3, fill: '#F0B429' }}
            activeDot={{ r: 5 }}
            animationDuration={1400}
          />
          <Line
            type="monotone"
            dataKey="turbidity"
            stroke="#1E6035"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            dot={false}
            animationDuration={1600}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
