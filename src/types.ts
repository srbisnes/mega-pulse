export type OperationalStatus = 'normal' | 'warning' | 'critical'

export interface SensorReading {
  id: string
  name: string
  location: string
  deviceId: string
  temperature: number
  humidity: number
  status: OperationalStatus
  lastUpdate: Date
  latencyMs: number
  range: { min: number; max: number }
  humidityMax: number
}

export interface AlertEvent {
  id: string
  sensorId: string
  type: 'TEMPERATURE_RISK' | 'HUMIDITY_RISK' | 'SYSTEM'
  message: string
  temperature?: number
  humidity?: number
  timestamp: Date
  action: string
  txHash?: string
}

export interface KpiData {
  avgTemperature: number
  avgHumidity: number
  sentimentScore: number
  activeAlerts: number
  inventoryProtectedUsd: number
  estimatedRoiYearly: number
  activeSensors: number
  responseTimeMs: number
}

export type TabId =
  | 'telemetry'
  | 'agents'
  | 'contract'
  | 'oracle'
  | 'saas'
  | 'legal'
