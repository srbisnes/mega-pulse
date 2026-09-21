import { Thermometer, Droplets, Activity, AlertTriangle, Shield, TrendingUp } from 'lucide-react'
import type { KpiData, OperationalStatus } from '../types'

interface HeroOverviewProps {
  kpis: KpiData
  status: OperationalStatus
  sensorCount: number
}

const statusConfig = {
  normal: {
    label: 'Operación normal',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  warning: {
    label: 'Riesgo moderado',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    dot: 'bg-amber-400',
  },
  critical: {
    label: 'Acción inmediata requerida',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
    dot: 'bg-rose-400',
  },
}

export function HeroOverview({ kpis, status, sensorCount }: HeroOverviewProps) {
  const cfg = statusConfig[status]

  return (
    <section className="space-y-4">
      {/* Status banner */}
      <div className={`card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${cfg.bg}`}>
        <div className="flex items-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} animate-pulse`} />
          <div>
            <p className={`font-medium ${cfg.color}`}>{cfg.label}</p>
            <p className="text-sm text-slate-400">
              {sensorCount} Sensores IoT Activos · Todos los sensores operan en rangos térmicos óptimos y seguros.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Shield className="w-3.5 h-3.5 text-sky-400" />
          Trazabilidad inmutable & Ejecución autónoma en MegaETH
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard
          icon={<Thermometer className="w-4 h-4 text-sky-400" />}
          label="Temperatura"
          value={`${kpis.avgTemperature.toFixed(1)}°C`}
          sub="Rango: 0°C a 8°C"
        />
        <KpiCard
          icon={<Droplets className="w-4 h-4 text-cyan-400" />}
          label="Humedad"
          value={`${kpis.avgHumidity}%`}
          sub="Máx. normativo < 80%"
        />
        <KpiCard
          icon={<Activity className="w-4 h-4 text-violet-400" />}
          label="Sentimiento"
          value={`${kpis.sentimentScore}/100`}
          sub={kpis.sentimentScore <= 30 ? 'Saludable' : kpis.sentimentScore <= 60 ? 'Atención' : 'Crítico'}
        />
        <KpiCard
          icon={<AlertTriangle className="w-4 h-4 text-amber-400" />}
          label="Alertas Activas"
          value={String(kpis.activeAlerts)}
          sub={kpis.activeAlerts === 0 ? 'Sin disparos' : 'En curso'}
        />
        <KpiCard
          icon={<Shield className="w-4 h-4 text-emerald-400" />}
          label="Inventario Protegido"
          value={`$${(kpis.inventoryProtectedUsd / 1000).toFixed(0)}k`}
          sub="Alimentos + Farma"
        />
        <KpiCard
          icon={<TrendingUp className="w-4 h-4 text-sky-400" />}
          label="ROI Estimado"
          value={`+$${(kpis.estimatedRoiYearly / 1000).toFixed(0)}k/año`}
          sub="4.8x vs suscripción"
        />
      </div>
    </section>
  )
}

function KpiCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="card p-4 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
        {icon}
        {label}
      </div>
      <div className="kpi-value text-white">{value}</div>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </div>
  )
}
