import { DollarSign, Building2, Rocket } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '500',
    period: '/mes',
    features: ['Hasta 20 sensores', 'Dashboard básico', 'Alertas en tiempo real', 'Soporte por email'],
    highlight: false,
  },
  {
    name: 'Business',
    price: '2.000',
    period: '/mes',
    features: ['Hasta 500 sensores', 'IA predictiva', 'Integración ERP', 'Agentes autónomos', 'SLA 99.5%'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Sensores ilimitados', 'SLA dedicado', 'Contratos personalizados', 'Auditorías', 'On-premise option'],
    highlight: false,
  },
]

export function BusinessModelAndRoi() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-emerald-400" />
        <h2 className="text-sm font-medium text-slate-300">MODELO SAAS & ROI</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`card p-5 flex flex-col ${
              plan.highlight ? 'border-sky-500/40 shadow-lg shadow-sky-500/10' : ''
            }`}
          >
            {plan.highlight && (
              <span className="badge bg-sky-500/20 text-sky-300 self-start mb-3">Más popular</span>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-slate-400 text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-300 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`mt-5 w-full py-2 rounded-lg text-sm font-medium transition ${
                plan.highlight
                  ? 'bg-sky-500 hover:bg-sky-400 text-white'
                  : 'bg-dark-600 hover:bg-dark-500 text-slate-200'
              }`}
            >
              {plan.name === 'Enterprise' ? 'Contactar ventas' : 'Comenzar'}
            </button>
          </div>
        ))}
      </div>

      <div className="card p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-sky-400" />
          <div>
            <h4 className="font-medium">Propuesta de valor</h4>
            <p className="text-sm text-slate-400">
              Mega Pulse no vende blockchain. Vende menos desperdicio, menos pérdidas, más seguridad
              alimentaria y cumplimiento normativo.
            </p>
          </div>
        </div>
        <div className="md:ml-auto flex items-center gap-2 text-sm text-emerald-300">
          <Rocket className="w-4 h-4" />
          ROI típico 4–8x en el primer año
        </div>
      </div>
    </div>
  )
}
