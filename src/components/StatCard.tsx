import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  color: 'steel' | 'amber' | 'green' | 'red' | 'blue'
  sub?: string
}

const colorMap = {
  steel: { bg: 'bg-[#E0EEF8]', icon: 'text-[#1B3A5C]' },
  amber: { bg: 'bg-[#FEF0DC]', icon: 'text-[#D07A2A]' },
  green: { bg: 'bg-green-50', icon: 'text-green-600' },
  red: { bg: 'bg-red-50', icon: 'text-red-600' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
}

export default function StatCard({ label, value, icon: Icon, color, sub }: StatCardProps) {
  const c = colorMap[color]
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={22} className={c.icon} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-2xl font-bold font-mono leading-tight">{value}</p>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}
