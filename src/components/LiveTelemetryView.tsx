import { useState } from 'react'
import { Thermometer, Droplets, Radio, Zap, AlertTriangle, Snowflake } from 'lucide-react'
import type { SensorReading } from '../types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts'

interface LiveTelemetryViewProps {
  sensors: SensorReading[]
  onInjectAnomaly: (sensorId: string, type: 'heat' | 'freeze' | 'humidity') => void
  history: { time: string; temp: number }[]
}

export function LiveTelemetryView({ sensors, onInjectAnomaly, history }: LiveTelemetryViewProps) {
  const [selected, setSelected] = useState(sensors[0]?.id ?? '')

  const active = sensors.find((s) => s.id === selected) ?? sensors[0]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Radio className="w-4 h-4 text-sky-400" />
          FEED DE SENSORES IOT EN TIEMPO REAL
        </h2>
        <div className="flex gap-2 flex-wrap">
          {sensors.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selected === s.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'bg-dark-700 text-slate-400 border border-white/5 hover:border-white/10'
              }`}
            >
              {s.name.split(' - ')[0]}
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="card p-5 xl:col-span-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-white">{active.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{active.location}</p>
                <p className="text-xs text-slate-500 font-mono mt-1">{active.deviceId}</p>
              </div>
              <span
                className={`badge ${
                  active.status === 'normal'
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : active.status === 'warning'
                    ? 'bg-amber-500/15 text-amber-300'
                    : 'bg-rose-500/15 text-rose-300'
                }`}
              >
                {active.status === 'normal' ? 'NOMINAL' : active.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-dark-700/60 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Thermometer className="w-3.5 h-3.5" /> Temperatura
                </div>
                <div className="text-2xl font-semibold">{active.temperature.toFixed(1)}°C</div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Rango seguro: {active.range.min}°C a {active.range.max}°C
                </p>
              </div>
              <div className="bg-dark-700/60 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Droplets className="w-3.5 h-3.5" /> Humedad
                </div>
                <div className="text-2xl font-semibold">{active.humidity}%</div>
                <p className="text-[10px] text-slate-500 mt-0.5">Máx: {active.humidityMax}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                MegaETH: {active.latencyMs}ms
              </span>
              <span>Actualizado: hace {Math.floor((Date.now() - active.lastUpdate.getTime()) / 1000)}s</span>
            </div>

            <div className="pt-3 border-t border-white/5">
              <p className="text-xs text-slate-400 mb-2">Inyectar anomalía (demo)</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onInjectAnomaly(active.id, 'heat')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/15 text-rose-300 text-xs hover:bg-rose-500/25 transition"
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> Fallo Térmico
                </button>
                <button
                  onClick={() => onInjectAnomaly(active.id, 'freeze')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/15 text-cyan-300 text-xs hover:bg-cyan-500/25 transition"
                >
                  <Snowflake className="w-3.5 h-3.5" /> Congelamiento
                </button>
                <button
                  onClick={() => onInjectAnomaly(active.id, 'humidity')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-500/15 text-violet-300 text-xs hover:bg-violet-500/25 transition"
                >
                  <Droplets className="w-3.5 h-3.5" /> Humedad Crítica
                </button>
              </div>
            </div>
          </div>

          <div className="card p-5 xl:col-span-2">
            <h4 className="text-sm font-medium text-slate-300 mb-4">Evolución térmica en tiempo real</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2a3d" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{
                      background: '#0f1623',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 8,
                    }}
                  />
                  <ReferenceArea y1={0} y2={8} fill="#0ea5e9" fillOpacity={0.06} />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Zona sombreada = rango óptimo normativo (0°C – 8°C). Latencia de red MegaETH: 8–14 ms.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
