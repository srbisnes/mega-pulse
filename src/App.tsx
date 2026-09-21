import { useState, useEffect, useCallback } from 'react'
import { Header } from './components/Header'
import { HeroOverview } from './components/HeroOverview'
import { LiveTelemetryView } from './components/LiveTelemetryView'
import { AutonomousAgentPanel } from './components/AutonomousAgentPanel'
import { SmartContractViewer } from './components/SmartContractViewer'
import { SentimentOracleExplainer } from './components/SentimentOracleExplainer'
import { BusinessModelAndRoi } from './components/BusinessModelAndRoi'
import { ComplianceAndPitch } from './components/ComplianceAndPitch'
import { initialSensors, initialAlerts, initialKpis, generateRandomReading } from './mockData'
import type { SensorReading, AlertEvent, KpiData, TabId, OperationalStatus } from './types'
import {
  Radio,
  Bot,
  Code2,
  Brain,
  DollarSign,
  Scale,
} from 'lucide-react'

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'telemetry', label: 'Telemetría IoT & Sensores', icon: <Radio className="w-3.5 h-3.5" /> },
  { id: 'agents', label: 'Agentes IA Autónomos', icon: <Bot className="w-3.5 h-3.5" /> },
  { id: 'contract', label: 'MegaETH Smart Contract', icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: 'oracle', label: 'Oráculo de Sentimiento', icon: <Brain className="w-3.5 h-3.5" /> },
  { id: 'saas', label: 'Modelo SaaS & ROI', icon: <DollarSign className="w-3.5 h-3.5" /> },
  { id: 'legal', label: 'Legal (Ley 25.326) & Pitch', icon: <Scale className="w-3.5 h-3.5" /> },
]

export default function App() {
  const [sensors, setSensors] = useState<SensorReading[]>(initialSensors)
  const [alerts, setAlerts] = useState<AlertEvent[]>(initialAlerts)
  const [kpis, setKpis] = useState<KpiData>(initialKpis)
  const [isLive, setIsLive] = useState(true)
  const [activeTab, setActiveTab] = useState<TabId>('telemetry')
  const [history, setHistory] = useState<{ time: string; temp: number }[]>([])
  const [lastActions, setLastActions] = useState<string[]>([])

  // Live simulation
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setSensors((prev) => {
        const next = prev.map((s) => generateRandomReading(s))
        const avgTemp = next.reduce((a, s) => a + s.temperature, 0) / next.length
        const avgHum = next.reduce((a, s) => a + s.humidity, 0) / next.length
        const criticalCount = next.filter((s) => s.status === 'critical').length
        const warningCount = next.filter((s) => s.status === 'warning').length

        let sentiment = 12
        if (criticalCount > 0) sentiment = 75 + criticalCount * 8
        else if (warningCount > 0) sentiment = 40 + warningCount * 10

        setKpis((k) => ({
          ...k,
          avgTemperature: +avgTemp.toFixed(1),
          avgHumidity: Math.round(avgHum),
          sentimentScore: Math.min(100, Math.round(sentiment)),
          activeAlerts: criticalCount + warningCount,
          responseTimeMs: 8 + Math.floor(Math.random() * 6),
        }))

        setHistory((h) => {
          const point = {
            time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            temp: +avgTemp.toFixed(1),
          }
          return [...h.slice(-29), point]
        })

        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  const overallStatus: OperationalStatus =
    kpis.sentimentScore > 60 ? 'critical' : kpis.sentimentScore > 30 ? 'warning' : 'normal'

  const handleInjectAnomaly = useCallback((sensorId: string, type: 'heat' | 'freeze' | 'humidity') => {
    setSensors((prev) =>
      prev.map((s) => {
        if (s.id !== sensorId) return s
        let temperature = s.temperature
        let humidity = s.humidity
        if (type === 'heat') temperature = s.range.max + 4 + Math.random() * 3
        if (type === 'freeze') temperature = s.range.min - 5 - Math.random() * 3
        if (type === 'humidity') humidity = 88 + Math.random() * 8

        return {
          ...s,
          temperature: +temperature.toFixed(1),
          humidity: Math.round(humidity),
          status: 'critical' as const,
          lastUpdate: new Date(),
        }
      })
    )

    const alert: AlertEvent = {
      id: `alert-${Date.now()}`,
      sensorId,
      type: type === 'humidity' ? 'HUMIDITY_RISK' : 'TEMPERATURE_RISK',
      message:
        type === 'heat'
          ? 'Temperatura fuera de rango — riesgo de deterioro'
          : type === 'freeze'
          ? 'Congelamiento detectado — posible daño de producto'
          : 'Humedad crítica — riesgo de condensación y contaminación',
      timestamp: new Date(),
      action: type === 'humidity' ? 'HUMIDITY_RISK' : 'TEMPERATURE_RISK',
      txHash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
    }

    setAlerts((a) => [alert, ...a])
    setLastActions((prev) => [
      `Agente activó refrigeración de respaldo + ticket ERP (SLA 15 min) · ${new Date().toLocaleTimeString()}`,
      ...prev.slice(0, 4),
    ])
    setKpis((k) => ({ ...k, activeAlerts: k.activeAlerts + 1, sentimentScore: Math.min(100, k.sentimentScore + 25) }))
  }, [])

  return (
    <div className="min-h-screen bg-dark-900">
      <Header isLive={isLive} onToggleLive={() => setIsLive((v) => !v)} />

      <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 space-y-6">
        <HeroOverview kpis={kpis} status={overallStatus} sensorCount={sensors.length} />

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-dark-700 border border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-[480px]">
          {activeTab === 'telemetry' && (
            <LiveTelemetryView
              sensors={sensors}
              onInjectAnomaly={handleInjectAnomaly}
              history={history}
            />
          )}
          {activeTab === 'agents' && (
            <AutonomousAgentPanel alerts={alerts} lastActions={lastActions} />
          )}
          {activeTab === 'contract' && <SmartContractViewer />}
          {activeTab === 'oracle' && <SentimentOracleExplainer score={kpis.sentimentScore} />}
          {activeTab === 'saas' && <BusinessModelAndRoi />}
          {activeTab === 'legal' && <ComplianceAndPitch />}
        </div>
      </main>

      <footer className="border-t border-white/5 py-6 mt-10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © 2026 Mega Pulse · Infraestructura crítica para la cadena de frío en Latinoamérica
          </p>
          <p className="font-mono">Built on MegaETH · From Detection to Action in Seconds</p>
        </div>
      </footer>
    </div>
  )
}
