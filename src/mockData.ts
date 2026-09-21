import type { SensorReading, AlertEvent, KpiData } from './types'

export const initialSensors: SensorReading[] = [
  {
    id: 'cam-01',
    name: 'Cámara 01 - Lácteos y Derivados',
    location: 'Centro de Distribución Norte - Dock 04',
    deviceId: 'ESP32-MEGA-8941',
    temperature: 3.3,
    humidity: 64,
    status: 'normal',
    lastUpdate: new Date(),
    latencyMs: 8,
    range: { min: 0, max: 8 },
    humidityMax: 75,
  },
  {
    id: 'cam-02',
    name: 'Cámara 02 - Farmacéuticos',
    location: 'Almacén Central - Sector B',
    deviceId: 'ESP32-MEGA-2103',
    temperature: 4.1,
    humidity: 58,
    status: 'normal',
    lastUpdate: new Date(),
    latencyMs: 11,
    range: { min: 2, max: 8 },
    humidityMax: 60,
  },
  {
    id: 'cam-03',
    name: 'Cámara 03 - Congelados',
    location: 'Hub Logístico Sur',
    deviceId: 'ESP32-MEGA-5512',
    temperature: -18.2,
    humidity: 42,
    status: 'normal',
    lastUpdate: new Date(),
    latencyMs: 9,
    range: { min: -22, max: -15 },
    humidityMax: 50,
  },
  {
    id: 'unit-08',
    name: 'Unidad Frío Móvil 08',
    location: 'Flota - Ruta 9 Norte',
    deviceId: 'ESP32-MEGA-7701',
    temperature: 2.8,
    humidity: 61,
    status: 'normal',
    lastUpdate: new Date(),
    latencyMs: 14,
    range: { min: 0, max: 6 },
    humidityMax: 70,
  },
]

export const initialAlerts: AlertEvent[] = []

export const initialKpis: KpiData = {
  avgTemperature: 3.3,
  avgHumidity: 64,
  sentimentScore: 12,
  activeAlerts: 0,
  inventoryProtectedUsd: 1_535_000,
  estimatedRoiYearly: 46_000,
  activeSensors: 4,
  responseTimeMs: 10,
}

export function generateRandomReading(base: SensorReading): SensorReading {
  const tempDelta = (Math.random() - 0.5) * 1.2
  const humDelta = (Math.random() - 0.5) * 4
  const temperature = +(base.temperature + tempDelta).toFixed(1)
  const humidity = Math.round(Math.max(20, Math.min(95, base.humidity + humDelta)))

  let status: SensorReading['status'] = 'normal'
  if (temperature > base.range.max || temperature < base.range.min) {
    status = temperature > base.range.max + 3 || temperature < base.range.min - 3 ? 'critical' : 'warning'
  }
  if (humidity > base.humidityMax) {
    status = status === 'critical' ? 'critical' : 'warning'
  }

  return {
    ...base,
    temperature,
    humidity,
    status,
    lastUpdate: new Date(),
    latencyMs: 8 + Math.floor(Math.random() * 8),
  }
}
