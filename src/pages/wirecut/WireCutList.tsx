import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import Modal from '@/components/Modal'
import { useAppStore } from '@/store'
import type { ProcessStatus, WireCutRecord } from '@/types'
import { STATUS_LABELS } from '@/types'

const STATUS_OPTIONS: { value: '' | ProcessStatus; label: string }[] = [
  { value: '', label: '全部' },
  { value: 'pending', label: STATUS_LABELS.pending },
  { value: 'processing', label: STATUS_LABELS.processing },
  { value: 'completed', label: STATUS_LABELS.completed },
]

function getPrecisionColor(val: number): string {
  if (val <= 0.003) return 'text-green-600'
  if (val <= 0.005) return 'text-amber-600'
  return 'text-red-600'
}
function getPrecisionBadge(val: number): string {
  if (val <= 0.003) return 'bg-green-50 text-green-700 ring-green-600/20'
  if (val <= 0.005) return 'bg-amber-50 text-amber-700 ring-amber-600/20'
  return 'bg-red-50 text-red-700 ring-red-600/20'
}

export default function WireCutList() {
  const { wireCutRecords } = useAppStore()
  const [statusFilter, setStatusFilter] = useState<'' | ProcessStatus>('')
  const [selected, setSelected] = useState<WireCutRecord | null>(null)

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

      <div className="card p-4">
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
          <span className="text-xs text-gray-400">共 {filtered.length} 条记录</span>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium whitespace-nowrap">编号</th>
                <th className="pb-3 font-medium whitespace-nowrap">项目名称</th>
                <th className="pb-3 font-medium whitespace-nowrap">线材类型</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">线径(mm)</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">切割速度</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">粗糙度(Ra)</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">精度</th>
                <th className="pb-3 font-medium whitespace-nowrap">状态</th>
                <th className="pb-3 font-medium whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-steel-800 font-mono whitespace-nowrap">{r.id}</td>
                  <td className="py-3 whitespace-nowrap">{r.projectName}</td>
                  <td className="py-3 whitespace-nowrap">{r.wireType}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.cutParams.wireDiameter}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.cutParams.cutSpeed}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.cutParams.surfaceRoughness}</td>
                  <td className="py-3 text-right whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center min-w-[64px] h-5 px-2 rounded-full text-xs font-mono ring-1 ${getPrecisionBadge(r.precision)}`}>
                      {r.precision.toFixed(3)} mm
                    </span>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <StatusBadge type="process" status={r.status} />
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <button
                      className="text-[#1B3A5C] hover:underline text-sm font-medium"
                      onClick={() => setSelected(r)}
                    >
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

      <Modal open={!!selected} onClose={() => setSelected(null)} title="慢走丝记录详情" width="max-w-xl">
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">记录编号</p>
                <p className="font-mono text-steel-800 font-semibold">{selected.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">项目名称</p>
                <p className="font-medium">{selected.projectName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">线材类型</p>
                <p>{selected.wireType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">当前状态</p>
                <StatusBadge type="process" status={selected.status} />
              </div>
            </div>

            <div className="card p-4 bg-steel-800/[0.02] border-steel-800/20">
              <h4 className="text-sm font-bold text-steel-800 mb-3">切割参数</h4>
              <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">线径</span>
                  <span className="font-mono font-semibold">{selected.cutParams.wireDiameter} <span className="text-gray-400 text-xs font-normal">mm</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">切割速度</span>
                  <span className="font-mono font-semibold">{selected.cutParams.cutSpeed} <span className="text-gray-400 text-xs font-normal">mm²/min</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">表面粗糙度</span>
                  <span className="font-mono font-semibold">Ra {selected.cutParams.surfaceRoughness}</span>
                </div>
              </div>
            </div>

            <div className="card p-4 border-l-4 border-l-[#22C55E] bg-green-50/40">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">加工精度</p>
                  <p className={`text-2xl font-bold font-mono mt-1 ${getPrecisionColor(selected.precision)}`}>
                    ± {selected.precision.toFixed(3)} mm
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">精度等级</p>
                  <span className={`status-badge ${getPrecisionBadge(selected.precision)}`}>
                    {selected.precision <= 0.003 ? '精密级' : selected.precision <= 0.005 ? '标准级' : '需复检'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
              创建时间：{selected.createdAt}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
