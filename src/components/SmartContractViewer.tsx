import { Code2, FileCode, Hash } from 'lucide-react'

const CONTRACT_SNIPPET = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MegaPulseOracle {
    struct SensorData {
        int256 temperature;
        uint256 humidity;
        uint256 timestamp;
    }

    mapping(bytes32 => SensorData) public sensors;

    event AlertTriggered(
        bytes32 indexed sensorId,
        int256 temperature,
        uint256 humidity,
        string action
    );

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function updateSensor(
        bytes32 sensorId,
        int256 temperature,
        uint256 humidity
    ) external {
        sensors[sensorId] = SensorData({
            temperature: temperature,
            humidity: humidity,
            timestamp: block.timestamp
        });

        if (temperature > 8 || temperature < 0) {
            emit AlertTriggered(
                sensorId,
                temperature,
                humidity,
                "TEMPERATURE_RISK"
            );
        }

        if (humidity > 80) {
            emit AlertTriggered(
                sensorId,
                temperature,
                humidity,
                "HUMIDITY_RISK"
            );
        }
    }
}`

export function SmartContractViewer() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Code2 className="w-4 h-4 text-emerald-400" />
        <h2 className="text-sm font-medium text-slate-300">MEGAETH SMART CONTRACT</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 space-y-3 lg:col-span-1">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileCode className="w-4 h-4 text-sky-400" />
            MegaPulseOracle.sol
          </div>
          <p className="text-sm text-slate-400">
            Contrato en Solidity ^0.8.24 desplegado en MegaETH. Almacena lecturas de sensores y emite
            eventos <code className="text-sky-300">AlertTriggered</code> cuando se detectan anomalías.
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5">
            <li>• Mapping <code>sensors[sensorId]</code> en vivo</li>
            <li>• Eventos indexados para agentes off-chain</li>
            <li>• Gas ultra-bajo (&lt; $0.00002)</li>
            <li>• Finalidad ~10 ms</li>
          </ul>
          <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
            <Hash className="w-3.5 h-3.5" />
            <span className="font-mono truncate">0x71C8...4e8f · Corp Cold</span>
          </div>
        </div>

        <div className="card p-0 overflow-hidden lg:col-span-2">
          <div className="px-4 py-2 border-b border-white/5 bg-dark-700/50 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">MegaPulseOracle.sol</span>
            <span className="text-[10px] text-slate-500">Solidity 0.8.24</span>
          </div>
          <pre className="p-4 text-xs leading-relaxed overflow-x-auto text-slate-300 font-mono max-h-96">
            {CONTRACT_SNIPPET}
          </pre>
        </div>
      </div>
    </div>
  )
}
