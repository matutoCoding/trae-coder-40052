import { useAppStore } from '@/store'
import PageHeader from '@/components/PageHeader'
import type { WearPart } from '@/types'

function LifeProgressBar({ current, max }: { current: number; max: number }) {
  const pct = Math.round((current / max) * 100)
  let barColor = 'bg-green-500'
  if (pct < 40) barColor = 'bg-red-500'
  else if (pct < 70) barColor = 'bg-amber-500'

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>
          {current.toLocaleString()} / {max.toLocaleString()}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function WearPartsList() {
  const { wearParts, updateWearPart } = useAppStore()

  const handleReplace = (part: WearPart) => {
    updateWearPart(part.id, {
      currentLife: 0,
      replacementHistory: [
        ...part.replacementHistory,
        {
          date: new Date().toISOString().slice(0, 10),
          reason: '定期更换',
          operator: '系统',
        },
      ],
    })
  }

  return (
    <div className="p-6">
      <PageHeader
        title="易损件更换"
        subtitle="易损件寿命监控与更换管理"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wearParts.map((part) => (
          <div key={part.id} className="card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{part.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{part.projectName}</p>
              </div>
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-steel-800 text-white">
                {part.replacementHistory.length}次更换
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-2">规格: {part.specification}</p>

            <LifeProgressBar current={part.currentLife} max={part.maxLife} />

            <button
              className="btn-amber w-full mt-4 text-center"
              onClick={() => handleReplace(part)}
            >
              更换
            </button>
          </div>
        ))}
        {wearParts.length === 0 && (
          <div className="col-span-3 py-12 text-center text-gray-400">
            暂无易损件数据
          </div>
        )}
      </div>
    </div>
  )
}
