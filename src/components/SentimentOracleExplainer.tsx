import { Brain } from 'lucide-react'

interface SentimentOracleExplainerProps {
  score: number
}

export function SentimentOracleExplainer({ score }: SentimentOracleExplainerProps) {
  const level =
    score <= 30 ? { label: 'Saludable', color: 'text-emerald-400' } :
    score <= 60 ? { label: 'Atención', color: 'text-amber-400' } :
    { label: 'Crítico', color: 'text-rose-400' }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Brain className="w-4 h-4 text-violet-400" />
        <h2 className="text-sm font-medium text-slate-300">ORÁCULO DE SENTIMIENTO OPERACIONAL</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5 space-y-4">
          <h3 className="font-medium">Índice de Riesgo IA</h3>
          <p className="text-sm text-slate-400">
            Combina 5 factores ponderados para producir un score de 0–100 que los agentes autónomos
            utilizan para decidir el nivel de respuesta.
          </p>

          <div className="space-y-2 text-sm">
            {[
              { name: 'Temperatura', weight: '30%' },
              { name: 'Humedad', weight: '20%' },
              { name: 'Frecuencia de fallos históricos', weight: '20%' },
              { name: 'Tiempo de respuesta de equipos', weight: '15%' },
              { name: 'Estado mecánico de equipos', weight: '15%' },
            ].map((f) => (
              <div key={f.name} className="flex justify-between py-1.5 border-b border-white/5 last:border-0">
                <span className="text-slate-300">{f.name}</span>
                <span className="text-slate-500">{f.weight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5 flex flex-col items-center justify-center gap-4">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2a3d" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${score * 2.64} 264`}
                className={level.color}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-semibold">{score}</span>
              <span className={`text-xs ${level.color}`}>{level.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> 0-30</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> 31-60</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400" /> 61-100</span>
          </div>
          <p className="text-xs text-center text-slate-500 max-w-xs">
            Los agentes autónomos registran toda la trazabilidad de decisiones en MegaETH.
          </p>
        </div>
      </div>
    </div>
  )
}
