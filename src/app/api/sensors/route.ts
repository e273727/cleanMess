import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface SensorData {
  id: string;
  name: string;
  type: 'pH' | 'Turbidity' | 'Temperature' | 'Microbial';
  currentValue: number;
  status?: 'good' | 'warning' | 'critical';
  lastUpdated?: string;
  normalRange: { min: number; max: number };
}

// Helper to determine status based on value and range
function determineStatus(value: number, range: { min: number; max: number }, type: string): 'good' | 'warning' | 'critical' {
  // Turbidity and Microbial are typically "lower is better"
  if (type === 'Microbial') {
    if (value > range.max * 1.5) return 'critical';
    if (value > range.max) return 'warning';
    return 'good';
  }
  
  if (type === 'Turbidity') {
    if (value > range.max * 1.5) return 'critical';
    if (value > range.max) return 'warning';
    return 'good';
  }

  // pH and Temperature have min/max bounds
  const tolerance = (range.max - range.min) * 0.2; // 20% tolerance for warning
  
  if (value < range.min - tolerance || value > range.max + tolerance) {
    return 'critical';
  } else if (value < range.min || value > range.max) {
    return 'warning';
  }
  
  return 'good';
}

// Force dynamic execution for this route to prevent caching the file
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Read directly from the external JSON file
    const dataPath = path.join(process.cwd(), 'data', 'sensors.json');
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const rawSensors: SensorData[] = JSON.parse(fileContents);

    // 2. Automatically compute the status for each sensor so you only have to edit the "currentValue"
    const enrichedSensors = rawSensors.map(sensor => {
      const computedStatus = determineStatus(sensor.currentValue, sensor.normalRange, sensor.type);
      
      return {
        ...sensor,
        status: computedStatus,
        lastUpdated: new Date().toISOString(),
      };
    });

    return NextResponse.json({
      success: true,
      data: enrichedSensors,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error reading sensors.json:", error);
    return NextResponse.json({ success: false, error: "Failed to read sensor data" }, { status: 500 });
  }
}
