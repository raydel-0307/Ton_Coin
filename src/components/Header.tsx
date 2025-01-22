import { MoreHorizontal } from 'lucide-react'

export default function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <button className="text-[#007AFF] text-base font-semibold">
        Cerrar
      </button>
      <div className="text-center">
        <h1 className="text-xl font-bold text-white">TronKeeper</h1>
        <p className="text-xs text-gray-400">mini app</p>
      </div>
      <button className="text-[#007AFF]">
        <MoreHorizontal className="w-6 h-6" />
      </button>
    </div>
  )
}

