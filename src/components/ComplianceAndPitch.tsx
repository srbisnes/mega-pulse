import { Scale, ShieldCheck, Map } from 'lucide-react'

export function ComplianceAndPitch() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Scale className="w-4 h-4 text-amber-400" />
        <h2 className="text-sm font-medium text-slate-300">LEGAL (LEY 25.326) & PITCH</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="font-medium">Cumplimiento Ley 25.326 (Argentina)</h3>
          </div>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Principio de minimización: solo temperatura, humedad, ubicación operativa e IDs de dispositivos.</li>
            <li>• No se almacenan datos personales en blockchain.</li>
            <li>• On-chain: únicamente hashes, eventos y pruebas de auditoría.</li>
            <li>• Cifrado: TLS 1.3 en tránsito + AES-256 en reposo.</li>
            <li>• Consentimiento e información de finalidad cuando corresponde.</li>
            <li>• Derecho de acceso y eliminación de datos.</li>
          </ul>
        </div>

        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Map className="w-4 h-4 text-sky-400" />
            <h3 className="font-medium">Roadmap Latinoamérica</h3>
          </div>
          <div className="space-y-3 text-sm">
            {[
              { phase: 'Fase 1 · Q1', desc: 'MVP Testnet MegaETH + Dashboard + Simulación IoT' },
              { phase: 'Fase 2 · Q2', desc: 'Pilotos 2–5 supermercados + métricas reales' },
              { phase: 'Fase 3 · Q3', desc: 'Auditoría externa + pentesting + certificaciones' },
              { phase: 'Fase 4 · Q4', desc: 'Mainnet + lanzamiento comercial' },
              { phase: 'Año 2', desc: 'Expansión: Argentina, Chile, Uruguay, Brasil, México' },
            ].map((r) => (
              <div key={r.phase} className="flex gap-3">
                <span className="text-sky-400 font-medium whitespace-nowrap w-28">{r.phase}</span>
                <span className="text-slate-300">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5 bg-gradient-to-r from-sky-500/10 to-violet-500/10 border-sky-500/20">
        <h3 className="font-medium text-lg mb-2">Pitch para inversores</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Mega Pulse es una infraestructura inteligente para cadena de frío que combina IoT, IA y MegaETH
          para ejecutar acciones preventivas en tiempo real. La plataforma reduce desperdicios, protege
          inventario crítico y proporciona trazabilidad auditable con costes de operación mínimos gracias
          a la ejecución ultrarrápida de MegaETH. El modelo SaaS genera ingresos recurrentes mientras crea
          una barrera de entrada basada en datos, automatización y cumplimiento regulatorio.
        </p>
      </div>
    </div>
  )
}
