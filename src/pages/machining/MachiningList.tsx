import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { MachiningOrder, ProcessStatus, PartType } from '@/types'

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

const COLUMNS: { status: ProcessStatus; title: string; headerClass: string }[] = [
  { status: 'pending', title: '待加工', headerClass: 'bg-gray-500' },
  { status: 'processing', title: '加工中', headerClass: 'bg-amber-500' },
  { status: 'completed', title: '已完成', headerClass: 'bg-green-600' },
]

export default function MachiningList() {
  const { machiningOrders } = useAppStore()

  const grouped = useMemo(() => {
    const map: Record<ProcessStatus, MachiningOrder[]> = {
      pending: [],
      processing: [],
      completed: [],
    }
    machiningOrders.forEach((order) => {
      map[order.status].push(order)
    })
    return map
  }, [machiningOrders])

  return (
    <div>
      <PageHeader title="型腔型芯加工" subtitle="管理型腔型芯的加工工序与进度" />

      <div className="grid grid-cols-3 gap-5">
        {COLUMNS.map(({ status, title, headerClass }) => (
          <div key={status} className="flex flex-col">
            <div className={`${headerClass} text-white text-sm font-semibold px-4 py-2.5 rounded-t-lg flex items-center justify-between`}>
              <span>{title}</span>
              <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs font-mono">
                {grouped[status].length}
              </span>
            </div>

            <div className="bg-steel-800 rounded-b-lg p-3 space-y-3 min-h-[300px]">
              {grouped[status].map((order) => (
                <Link
                  key={order.id}
                  to={`/machining/${order.id}`}
                  className="card block p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 text-sm truncate">
                      {order.partName}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${PART_TYPE_STYLES[order.partType]}`}>
                      {PART_TYPE_LABELS[order.partType]}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 mb-2">{order.projectName}</div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {order.processes.length} 道工序
                    </span>
                    <StatusBadge type="process" status={order.status} />
                  </div>

                  <div className="text-xs text-gray-400 mt-2 font-mono">
                    {order.createdAt}
                  </div>
                </Link>
              ))}

              {grouped[status].length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">暂无数据</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
