import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Activity, Pause, Play } from 'lucide-react'

interface HeaderProps {
  isLive: boolean
  onToggleLive: () => void
  gasPrice?: string
}

export function Header({ isLive, onToggleLive, gasPrice = '~$0.00002' }: HeaderProps) {
  return (
    <header className="border-b border-white/5 bg-dark-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 shadow-lg shadow-sky-500/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight truncate">Mega Pulse</h1>
              <span className="hidden sm:inline-flex badge bg-sky-500/15 text-sky-300 border border-sky-500/20">
                MEGAETH COLDCHAIN
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate hidden md:block">
              Protegiendo la cadena de frío con IA, IoT y blockchain en tiempo real.
            </p>
          </div>
        </div>

        {/* Center status pills */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            MegaETH
          </div>
          <div className="px-3 py-1.5 rounded-full bg-dark-700 border border-white/5 text-xs text-slate-300">
            #4,920,936 · 10ms finality
          </div>
          <div className="px-3 py-1.5 rounded-full bg-dark-700 border border-white/5 text-xs text-slate-300">
            Gas {gasPrice}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLive}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isLive
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
            }`}
          >
            {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isLive ? 'Pausar Feed' : 'Reanudar'}
          </button>

          <ConnectButton
            accountStatus="address"
            chainStatus="icon"
            showBalance={false}
          />
        </div>
      </div>
    </header>
  )
}
