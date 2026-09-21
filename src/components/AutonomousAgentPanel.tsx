import { Bot, MessageSquare, Wrench, Truck, ThermometerSnowflake, CheckCircle2 } from 'lucide-react'
import type { AlertEvent } from '../types'

interface AutonomousAgentPanelProps {
  alerts: AlertEvent[]
  lastActions: string[]
}

export function AutonomousAgentPanel({ alerts, lastActions }: AutonomousAgentPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Bot className="w-4 h-4 text-violet-400" />
        <h2 className="text-sm font-medium text-slate-300">AGENTES IA AUTÓNOMOS</h2>
        <span className="badge bg-violet-500/15 text-violet-300">2 activos</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5 space-y-4">
          <h3 className="font-medium text-white">Pipeline de respuesta automática</h3>
          <p className="text-sm text-slate-400">
            El agente escucha el evento <code className="text-sky-300">AlertTriggered</code> del contrato
            inteligente y ejecuta acciones preventivas en segundos.
          </p>

          <div className="space-y-3">
            {[
              { icon: <ThermometerSnowflake className="w-4 h-4" />, label: 'Activar refrigeración de respaldo', status: 'listo' },
              { icon: <MessageSquare className="w-4 h-4" />, label: 'Enviar alerta crítica (WhatsApp / Slack)', status: 'listo' },
              { icon: <Wrench className="w-4 h-4" />, label: 'Crear ticket de mantenimiento con SLA', status: 'listo' },
              { icon: <Truck className="w-4 h-4" />, label: 'Reasignación logística preventiva', status: 'listo' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-dark-700/50 border border-white/5">
                <div className="text-sky-400">{item.icon}</div>
                <span className="flex-1 text-sm text-slate-200">{item.label}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5 space-y-4">
          <h3 className="font-medium text-white">Últimas acciones & eventos on-chain</h3>

          {alerts.length === 0 && lastActions.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              <Bot className="w-8 h-8 mx-auto mb-2 opacity-40" />
              Sin alertas activas. Los agentes están en modo escucha.
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {alerts.slice(0, 8).map((a) => (
                <div key={a.id} className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-rose-300">{a.type}</span>
                    <span className="text-[10px] text-slate-500">
                      {a.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">{a.message}</p>
                  {a.txHash && (
                    <p className="text-[10px] font-mono text-slate-500 mt-1 truncate">
                      tx: {a.txHash}
                    </p>
                  )}
                </div>
              ))}
              {lastActions.map((action, i) => (
                <div key={i} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-sm text-emerald-200">
                  {action}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
