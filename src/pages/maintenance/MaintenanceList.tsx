import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import Modal from '@/components/Modal'
import { useAppStore } from '@/store'
import type { MaintenanceOrder, MaintenanceType, ProcessStatus } from '@/types'
import { STATUS_LABELS, MAINTENANCE_TYPE_LABELS } from '@/types'

const TYPE_OPTIONS: { value: '' | MaintenanceType; label: string }[] = [
  { value: '', label: '全部' },
  { value: 'repair', label: MAINTENANCE_TYPE_LABELS.repair },
  { value: 'maintenance', label: MAINTENANCE_TYPE_LABELS.maintenance },
]

const STATUS_OPTIONS: { value: '' | ProcessStatus; label: string }[] = [
  { value: '', label: '全部' },
  { value: 'pending', label: STATUS_LABELS.pending },
  { value: 'processing', label: STATUS_LABELS.processing },
  { value: 'completed', label: STATUS_LABELS.completed },
]

export default function MaintenanceList() {
  const navigate = useNavigate()
  const { maintenanceOrders, updateMaintenanceOrder } = useAppStore()
  const [typeFilter, setTypeFilter] = useState<'' | MaintenanceType>('')
  const [statusFilter, setStatusFilter] = useState<'' | ProcessStatus>('')
  const [selected, setSelected] = useState<MaintenanceOrder | null>(null)

  const filtered = maintenanceOrders.filter((o) => {
    const matchType = !typeFilter || o.type === typeFilter
    const matchStatus = !statusFilter || o.status === statusFilter
    return matchType && matchStatus
  })

  const handleToggleStatus = (id: string, current: ProcessStatus) => {
    const next: Record<ProcessStatus, ProcessStatus> = {
      pending: 'processing',
      processing: 'completed',
      completed: 'pending',
    }
    const nextStatus = next[current]
    const updates: Partial<MaintenanceOrder> = { status: nextStatus }
    if (nextStatus === 'completed') {
      updates.completedAt = new Date().toISOString().slice(0, 10)
    }
    updateMaintenanceOrder(id, updates)
    if (selected?.id === id) {
      setSelected({ ...selected, ...updates })
    }
  }

  return (
    <div className="p-6">
      <PageHeader
        title="模具维修工单"
        subtitle="管理模具维修与保养工单"
        action={
          <button className="btn-primary" onClick={() => navigate('/maintenance/new')}>
            + 新建工单
          </button>
        }
      />

      <div className="card p-4">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as '' | MaintenanceType)}
            className="input-field w-32"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
          <span className="text-xs text-gray-400">共 {filtered.length} 条工单</span>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium whitespace-nowrap">工单号</th>
                <th className="pb-3 font-medium whitespace-nowrap">项目名称</th>
                <th className="pb-3 font-medium whitespace-nowrap">类型</th>
                <th className="pb-3 font-medium whitespace-nowrap min-w-[220px]">描述</th>
                <th className="pb-3 font-medium whitespace-nowrap">责任人</th>
                <th className="pb-3 font-medium whitespace-nowrap">状态</th>
                <th className="pb-3 font-medium whitespace-nowrap">创建日期</th>
                <th className="pb-3 font-medium whitespace-nowrap">完成日期</th>
                <th className="pb-3 font-medium whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-steel-800 font-mono whitespace-nowrap">{o.id}</td>
                  <td className="py-3 whitespace-nowrap font-medium">{o.projectName}</td>
                  <td className="py-3 whitespace-nowrap">
                    <StatusBadge type="maintenance" status={o.type} />
                  </td>
                  <td className="py-3 max-w-[260px] text-gray-600">
                    <span className="line-clamp-2">{o.description}</span>
                  </td>
                  <td className="py-3 whitespace-nowrap">{o.assignee}</td>
                  <td className="py-3 whitespace-nowrap">
                    <StatusBadge type="process" status={o.status} />
                  </td>
                  <td className="py-3 font-mono text-xs whitespace-nowrap text-gray-500">{o.createdAt}</td>
                  <td className="py-3 font-mono text-xs whitespace-nowrap text-gray-500">{o.completedAt ?? '-'}</td>
                  <td className="py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-[#1B3A5C] hover:underline text-sm font-medium"
                        onClick={() => setSelected(o)}
                      >
                        查看
                      </button>
                      {o.status !== 'completed' && (
                        <button
                          className="text-xs px-2 py-1 rounded bg-amber-50 text-amber-600 ring-1 ring-amber-500/30 hover:bg-amber-100 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleStatus(o.id, o.status)
                          }}
                        >
                          {o.status === 'pending' ? '开始' : '完成'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">
                    暂无维修工单
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="维修工单详情" width="max-w-xl">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400 mb-1">工单号</p>
                <p className="font-mono text-xl font-bold text-steel-800">{selected.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge type="maintenance" status={selected.type} />
                <StatusBadge type="process" status={selected.status} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">项目名称</p>
                <p className="font-medium">{selected.projectName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">责任人</p>
                <p>{selected.assignee}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">创建日期</p>
                <p className="font-mono text-sm">{selected.createdAt}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">完成日期</p>
                <p className="font-mono text-sm">{selected.completedAt ?? '未完成'}</p>
              </div>
            </div>

            <div className="card p-4 bg-gray-50/60 border-gray-200">
              <p className="text-xs text-gray-400 mb-2">工单描述</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {selected.description}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {selected.status !== 'completed' && (
                <button
                  className="btn-primary flex-1"
                  onClick={() => handleToggleStatus(selected.id, selected.status)}
                >
                  {selected.status === 'pending' ? '标记为进行中' : '标记为已完成'}
                </button>
              )}
              <button
                className="btn-secondary"
                onClick={() => setSelected(null)}
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
