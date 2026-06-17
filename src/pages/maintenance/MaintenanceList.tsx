import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { MaintenanceType, ProcessStatus } from '@/types'

const TYPE_OPTIONS: { value: '' | MaintenanceType; label: string }[] = [
  { value: '', label: '全部' },
  { value: 'repair', label: '维修' },
  { value: 'maintenance', label: '保养' },
]

const STATUS_OPTIONS: { value: '' | ProcessStatus; label: string }[] = [
  { value: '', label: '全部' },
  { value: 'pending', label: '待处理' },
  { value: 'processing', label: '进行中' },
  { value: 'completed', label: '已完成' },
]

export default function MaintenanceList() {
  const { maintenanceOrders } = useAppStore()
  const [typeFilter, setTypeFilter] = useState<'' | MaintenanceType>('')
  const [statusFilter, setStatusFilter] = useState<'' | ProcessStatus>('')

  const filtered = maintenanceOrders.filter((o) => {
    const matchType = !typeFilter || o.type === typeFilter
    const matchStatus = !statusFilter || o.status === statusFilter
    return matchType && matchStatus
  })

  return (
    <div className="p-6">
      <PageHeader
        title="模具维修工单"
        subtitle="管理模具维修与保养工单"
        action={
          <button className="btn-primary">+ 新建工单</button>
        }
      />

      <div className="card">
        <div className="flex items-center gap-4 mb-4">
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
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 font-medium">工单号</th>
              <th className="pb-3 font-medium">项目名称</th>
              <th className="pb-3 font-medium">类型</th>
              <th className="pb-3 font-medium">描述</th>
              <th className="pb-3 font-medium">责任人</th>
              <th className="pb-3 font-medium">状态</th>
              <th className="pb-3 font-medium">创建日期</th>
              <th className="pb-3 font-medium">完成日期</th>
              <th className="pb-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 text-steel-800 font-mono">{o.id}</td>
                <td className="py-3">{o.projectName}</td>
                <td className="py-3">
                  <StatusBadge type="maintenance" status={o.type} />
                </td>
                <td className="py-3 max-w-[200px] truncate">{o.description}</td>
                <td className="py-3">{o.assignee}</td>
                <td className="py-3">
                  <StatusBadge type="process" status={o.status} />
                </td>
                <td className="py-3 font-mono text-xs">{o.createdAt}</td>
                <td className="py-3 font-mono text-xs">{o.completedAt ?? '-'}</td>
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
                  暂无维修工单
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
