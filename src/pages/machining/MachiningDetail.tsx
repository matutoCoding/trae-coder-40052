import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { PartType, ProcessStatus } from '@/types'

const PART_TYPE_LABELS: Record<PartType, string> = {
  cavity: '型腔',
  core: '型芯',
  electrode: '电极',
  other: '其他',
}

const PART_TYPE_STYLES: Record<PartType, string> = {
  cavity: 'bg-blue-100 text-blue-700',
  core: 'bg-purple-100 text-purple-700',
  electrode: 'bg-amber-100 text-amber-700',
  other: 'bg-gray-100 text-gray-600',
}

const PROCESS_STATUS_LABELS: Record<ProcessStatus, string> = {
  pending: '待加工',
  processing: '加工中',
  completed: '已完成',
}

export default function MachiningDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { machiningOrders } = useAppStore()

  const order = machiningOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <div>
        <PageHeader title="加工详情" />
        <div className="text-center py-20 text-gray-400">未找到该加工订单</div>
        <div className="text-center">
          <button className="btn-secondary" onClick={() => navigate('/machining')}>
            返回列表
          </button>
        </div>
      </div>
    )
  }

  const completedCount = order.processes.filter((p) => p.status === 'completed').length
  const totalCount = order.processes.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div>
      <PageHeader title="加工详情" subtitle={`${order.partName} - ${order.projectName}`} />

      <button
        className="btn-secondary flex items-center gap-1.5 mb-6"
        onClick={() => navigate('/machining')}
      >
        <ArrowLeft size={16} />
        返回列表
      </button>

      <div className="card p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-xs text-gray-400 mb-1">项目名称</div>
            <div className="text-sm font-semibold text-gray-900">{order.projectName}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">零件名称</div>
            <div className="text-sm font-semibold text-gray-900">{order.partName}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">零件类型</div>
            <span className={`text-xs px-2 py-0.5 rounded ${PART_TYPE_STYLES[order.partType]}`}>
              {PART_TYPE_LABELS[order.partType]}
            </span>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">整体状态</div>
            <StatusBadge type="process" status={order.status} />
          </div>
        </div>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">加工进度</h3>
          <span className="text-xs text-gray-500 font-mono">
            {completedCount} / {totalCount} 工序完成（{progressPercent}%）
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-amber-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">工序列表</h3>
        <div className="space-y-3">
          {order.processes.map((process, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-steel-800 text-white text-xs font-mono font-semibold">
                  {index + 1}
                </span>
                <div>
                  <div className="text-sm font-medium text-gray-900">{process.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {process.machine} · {process.duration}h
                  </div>
                </div>
              </div>
              <StatusBadge type="process" status={process.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
