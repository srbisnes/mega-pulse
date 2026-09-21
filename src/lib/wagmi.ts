import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { defineChain } from 'viem'

// MegaETH Testnet (placeholder configuration — update with official RPC when available)
export const megaeth = defineChain({
  id: 6342,
  name: 'MegaETH Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://carrot.megaeth.com/rpc'], // placeholder
    },
  },
  blockExplorers: {
    default: {
      name: 'MegaExplorer',
      url: 'https://explorer.megaeth.com',
    },
  },
  testnet: true,
})

export const config = getDefaultConfig({
  appName: 'Mega Pulse',
  projectId: 'mega-pulse-demo', // Replace with real WalletConnect projectId for production
  chains: [megaeth, sepolia],
  transports: {
    [megaeth.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: false,
})
