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

function getPrecisionColor(val: number): string {
  if (val <= 0.003) return 'text-green-600'
  if (val <= 0.005) return 'text-amber-500'
  return 'text-red-600'
}

function getPrecisionDot(val: number): string {
  if (val <= 0.003) return 'bg-green-500'
  if (val <= 0.005) return 'bg-amber-500'
  return 'bg-red-500'
}

export default function WireCutList() {
  const { wireCutRecords } = useAppStore()
  const [statusFilter, setStatusFilter] = useState<'' | ProcessStatus>('')

  const filtered = wireCutRecords.filter((r) => {
    const matchStatus = !statusFilter || r.status === statusFilter
    return matchStatus
  })

  return (
    <div className="p-6">
      <PageHeader
        title="慢走丝线切割"
        subtitle="管理慢走丝线切割加工工序与精度"
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
              <th className="pb-3 font-medium">线材类型</th>
              <th className="pb-3 font-medium text-right">线径(mm)</th>
              <th className="pb-3 font-medium text-right">切割速度(mm²/min)</th>
              <th className="pb-3 font-medium text-right">表面粗糙度(Ra)</th>
              <th className="pb-3 font-medium text-right">精度(mm)</th>
              <th className="pb-3 font-medium">状态</th>
              <th className="pb-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 text-steel-800 font-mono">{r.id}</td>
                <td className="py-3">{r.projectName}</td>
                <td className="py-3">{r.wireType}</td>
                <td className="py-3 text-right font-mono">{r.cutParams.wireDiameter}</td>
                <td className="py-3 text-right font-mono">{r.cutParams.cutSpeed}</td>
                <td className="py-3 text-right font-mono">{r.cutParams.surfaceRoughness}</td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`inline-block w-2 h-2 rounded-full ${getPrecisionDot(r.precision)}`} />
                    <span className={`font-mono ${getPrecisionColor(r.precision)}`}>
                      {r.precision.toFixed(3)}
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
                <td colSpan={9} className="py-12 text-center text-gray-400">
                  暂无线切割记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
