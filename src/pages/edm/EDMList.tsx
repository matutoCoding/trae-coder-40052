import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { ProcessStatus } from '@/types'
import { STATUS_LABELS } from '@/types'

const STATUS_OPTIONS: { value: '' | ProcessStatus; label: string }[] = [
  { value: '', label: '全部' },
  { value: 'pending', label: STATUS_LABELS.pending },
  { value: 'processing', label: STATUS_LABELS.processing },
  { value: 'completed', label: STATUS_LABELS.completed },
]

function getWearColor(rate: number): string {
  if (rate < 0.2) return 'text-green-600'
  if (rate <= 0.3) return 'text-amber-500'
  return 'text-red-600'
}

function getWearDot(rate: number): string {
  if (rate < 0.2) return 'bg-green-500'
  if (rate <= 0.3) return 'bg-amber-500'
  return 'bg-red-500'
}

export default function EDMList() {
  const { edmRecords } = useAppStore()
  const [statusFilter, setStatusFilter] = useState<'' | ProcessStatus>('')

  const filtered = edmRecords.filter((r) => {
    const matchStatus = !statusFilter || r.status === statusFilter
    return matchStatus
  })

  return (
    <div className="p-6">
      <PageHeader
        title="电火花电极"
        subtitle="管理电火花放电加工电极及参数"
        action={
          <button className="btn-primary">
            + 新建记录
          </button>
        }
      />

      <div className="card">
        <div className="flex items-center gap-4 mb-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as '' | ProcessStatus)}
            className="input-field w-32"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 font-medium">编号</th>
              <th className="pb-3 font-medium">项目名称</th>
              <th className="pb-3 font-medium">电极类型</th>
              <th className="pb-3 font-medium text-right">电流(A)</th>
              <th className="pb-3 font-medium text-right">电压(V)</th>
              <th className="pb-3 font-medium text-right">脉冲开(μs)</th>
              <th className="pb-3 font-medium text-right">脉冲关(μs)</th>
              <th className="pb-3 font-medium text-right">消耗率(%)</th>
              <th className="pb-3 font-medium">状态</th>
              <th className="pb-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 text-steel-800 font-mono">{r.id}</td>
                <td className="py-3">{r.projectName}</td>
                <td className="py-3">{r.electrodeType}</td>
                <td className="py-3 text-right font-mono">{r.dischargeParams.current}</td>
                <td className="py-3 text-right font-mono">{r.dischargeParams.voltage}</td>
                <td className="py-3 text-right font-mono">{r.dischargeParams.pulseOn}</td>
                <td className="py-3 text-right font-mono">{r.dischargeParams.pulseOff}</td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`inline-block w-2 h-2 rounded-full ${getWearDot(r.wearRate)}`} />
                    <span className={`font-mono ${getWearColor(r.wearRate)}`}>
                      {(r.wearRate * 100).toFixed(1)}
                    </span>
                  </span>
                </td>
                <td className="py-3">
                  <StatusBadge type="process" status={r.status} />
                </td>
                <td className="py-3">
                  <button className="text-[#1B3A5C] hover:underline text-sm">
                    查看
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="py-12 text-center text-gray-400">
                  暂无电火花记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
