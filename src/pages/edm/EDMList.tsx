import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import Modal from '@/components/Modal'
import { useAppStore } from '@/store'
import type { EDMRecord, ProcessStatus } from '@/types'
import { STATUS_LABELS } from '@/types'

const STATUS_OPTIONS: { value: '' | ProcessStatus; label: string }[] = [
  { value: '', label: '全部' },
  { value: 'pending', label: STATUS_LABELS.pending },
  { value: 'processing', label: STATUS_LABELS.processing },
  { value: 'completed', label: STATUS_LABELS.completed },
]

function getWearColor(rate: number): string {
  if (rate < 0.2) return 'text-green-600'
  if (rate <= 0.3) return 'text-amber-600'
  return 'text-red-600'
}
function getWearBadge(rate: number): string {
  if (rate < 0.2) return 'bg-green-50 text-green-700 ring-green-600/20'
  if (rate <= 0.3) return 'bg-amber-50 text-amber-700 ring-amber-600/20'
  return 'bg-red-50 text-red-700 ring-red-600/20'
}

export default function EDMList() {
  const navigate = useNavigate()
  const { edmRecords } = useAppStore()
  const [statusFilter, setStatusFilter] = useState<'' | ProcessStatus>('')
  const [selected, setSelected] = useState<EDMRecord | null>(null)

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
          <button className="btn-primary" onClick={() => navigate('/edm/new')}>
            + 新建记录
          </button>
        }
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
                <th className="pb-3 font-medium whitespace-nowrap">电极类型</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">电流(A)</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">电压(V)</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">脉冲开(μs)</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">脉冲关(μs)</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">消耗率</th>
                <th className="pb-3 font-medium whitespace-nowrap">状态</th>
                <th className="pb-3 font-medium whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-steel-800 font-mono whitespace-nowrap">{r.id}</td>
                  <td className="py-3 whitespace-nowrap">{r.projectName}</td>
                  <td className="py-3 whitespace-nowrap">{r.electrodeType}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.dischargeParams.current}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.dischargeParams.voltage}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.dischargeParams.pulseOn}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.dischargeParams.pulseOff}</td>
                  <td className="py-3 text-right whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center min-w-[56px] h-5 px-2 rounded-full text-xs font-mono ring-1 ${getWearBadge(r.wearRate)}`}>
                      {(r.wearRate * 100).toFixed(1)}%
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
                  <td colSpan={10} className="py-12 text-center text-gray-400">
                    暂无电火花记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="电火花记录详情" width="max-w-xl">
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
                <p className="text-xs text-gray-400 mb-1">电极类型</p>
                <p>{selected.electrodeType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">当前状态</p>
                <StatusBadge type="process" status={selected.status} />
              </div>
            </div>

            <div className="card p-4 border-steel-800/20 bg-steel-800/[0.02]">
              <h4 className="text-sm font-bold text-steel-800 mb-3">放电参数</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">电流</span>
                  <span className="font-mono font-semibold">{selected.dischargeParams.current} <span className="text-gray-400 text-xs font-normal">A</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">电压</span>
                  <span className="font-mono font-semibold">{selected.dischargeParams.voltage} <span className="text-gray-400 text-xs font-normal">V</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">脉冲开启</span>
                  <span className="font-mono font-semibold">{selected.dischargeParams.pulseOn} <span className="text-gray-400 text-xs font-normal">μs</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-sm text-gray-500">脉冲关闭</span>
                  <span className="font-mono font-semibold">{selected.dischargeParams.pulseOff} <span className="text-gray-400 text-xs font-normal">μs</span></span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">电极消耗率</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${selected.wearRate < 0.2 ? 'bg-green-500' : selected.wearRate <= 0.3 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(selected.wearRate * 300, 100)}%` }}
                  />
                </div>
                <span className={`font-mono font-bold text-sm ${getWearColor(selected.wearRate)}`}>
                  {(selected.wearRate * 100).toFixed(1)}%
                </span>
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
