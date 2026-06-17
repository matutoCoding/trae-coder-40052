import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'

export default function AssemblyList() {
  const navigate = useNavigate()
  const { assemblyOrders } = useAppStore()

  const orders = useMemo(() => assemblyOrders, [assemblyOrders])

  return (
    <div className="p-6">
      <PageHeader
        title="模具装配钳工"
        subtitle="管理模具装配工单与进度跟踪"
        action={
          <button className="btn-primary" onClick={() => navigate('/assembly/new')}>
            新建工单
          </button>
        }
      />

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-500 py-3 px-4">工单号</th>
              <th className="text-left text-xs font-medium text-gray-500 py-3 px-4">项目名称</th>
              <th className="text-left text-xs font-medium text-gray-500 py-3 px-4">负责人</th>
              <th className="text-left text-xs font-medium text-gray-500 py-3 px-4">工序进度</th>
              <th className="text-left text-xs font-medium text-gray-500 py-3 px-4">问题数</th>
              <th className="text-left text-xs font-medium text-gray-500 py-3 px-4">状态</th>
              <th className="text-left text-xs font-medium text-gray-500 py-3 px-4">操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const completedCount = order.steps.filter((s) => s.status === 'completed').length
              const totalCount = order.steps.length
              const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

              return (
                <tr
                  key={order.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-3 px-4 font-mono text-sm text-gray-800">{order.id}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.projectName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.assignee}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-gray-500">
                        {completedCount}/{totalCount}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {order.issues.length > 0 ? (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-red-50 text-red-600 text-xs font-mono font-semibold ring-1 ring-red-500/20">
                        {order.issues.length}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">0</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge type="process" status={order.status} />
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="text-[#1B3A5C] hover:underline text-sm"
                      onClick={() => navigate(`/assembly/${order.id}`)}
                    >
                      查看
                    </button>
                  </td>
                </tr>
              )
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-400">
                  暂无装配工单
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
