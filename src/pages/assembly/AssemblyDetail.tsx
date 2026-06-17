import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, AlertTriangle } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { ProcessStatus } from '@/types'

const STEP_DOT: Record<ProcessStatus, { dot: string; ring: string }> = {
  completed: { dot: 'bg-green-500', ring: 'ring-green-100' },
  processing: { dot: 'bg-amber-500', ring: 'ring-amber-100' },
  pending: { dot: 'bg-gray-300', ring: 'ring-gray-100' },
}

export default function AssemblyDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { assemblyOrders } = useAppStore()

  const order = assemblyOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <div>
        <PageHeader title="装配详情" />
        <div className="text-center py-20 text-gray-400">未找到该装配工单</div>
        <div className="text-center">
          <button className="btn-secondary" onClick={() => navigate('/assembly')}>
            返回列表
          </button>
        </div>
      </div>
    )
  }

  const completedCount = order.steps.filter((s) => s.status === 'completed').length
  const totalCount = order.steps.length
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div>
      <PageHeader title="装配详情" subtitle={order.projectName} />

      <button
        className="btn-secondary flex items-center gap-1.5 mb-6"
        onClick={() => navigate('/assembly')}
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
            <div className="text-xs text-gray-400 mb-1">负责人</div>
            <div className="text-sm font-semibold text-gray-900">{order.assignee}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">整体状态</div>
            <StatusBadge type="process" status={order.status} />
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">创建时间</div>
            <div className="text-sm text-gray-700 font-mono">{order.createdAt}</div>
          </div>
        </div>
      </div>

      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">装配进度</h3>
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

      <div className="card p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-5">装配步骤</h3>
        <div className="relative">
          {order.steps.map((step, index) => {
            const isLast = index === order.steps.length - 1
            const { dot, ring } = STEP_DOT[step.status]

            return (
              <div key={index} className="flex gap-4 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full ring-4 ${ring} flex items-center justify-center flex-shrink-0`}>
                    {step.status === 'completed' ? (
                      <Check size={16} className="text-white" />
                    ) : (
                      <div className={`w-3 h-3 rounded-full ${dot}`} />
                    )}
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-gray-200 mt-1" />
                  )}
                </div>
                <div className="pt-0.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{step.name}</span>
                    <StatusBadge type="process" status={step.status} />
                  </div>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {order.issues.length > 0 && (
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">问题记录</h3>
          <div className="space-y-3">
            {order.issues.map((issue, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100"
              >
                <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-700">{issue}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
