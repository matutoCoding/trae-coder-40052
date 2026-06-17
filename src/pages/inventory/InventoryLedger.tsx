import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { InventoryStatus } from '@/types'

export default function InventoryLedger() {
  const navigate = useNavigate()
  const { inventory, updateInventory } = useAppStore()

  const handleToggleStatus = (id: string, currentStatus: InventoryStatus) => {
    const today = new Date().toISOString().slice(0, 10)
    if (currentStatus === 'in_stock') {
      updateInventory(id, { status: 'out_stock', outDate: today })
    } else if (currentStatus === 'out_stock') {
      updateInventory(id, { status: 'in_stock', outDate: undefined })
    }
  }

  return (
    <div className="p-6">
      <PageHeader
        title="模具入库台账"
        subtitle="模具入库、出库与存放管理"
        action={
          <button className="btn-primary" onClick={() => navigate('/inventory/new')}>
            + 新建入库
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <span className="text-green-600 font-bold text-lg font-mono">
              {inventory.filter((i) => i.status === 'in_stock').length}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400">在库模具</p>
            <p className="text-sm font-medium">正常存放</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-gray-600 font-bold text-lg font-mono">
              {inventory.filter((i) => i.status === 'out_stock').length}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400">出库模具</p>
            <p className="text-sm font-medium">客户使用中</p>
          </div>
        </div>
        <div className="card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <span className="text-amber-600 font-bold text-lg font-mono">
              {inventory.filter((i) => i.status === 'maintenance').length}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400">维修中</p>
            <p className="text-sm font-medium">保养/维修</p>
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium whitespace-nowrap">台账编号</th>
                <th className="pb-3 font-medium whitespace-nowrap">项目名称</th>
                <th className="pb-3 font-medium whitespace-nowrap">存放位置</th>
                <th className="pb-3 font-medium whitespace-nowrap">状态</th>
                <th className="pb-3 font-medium whitespace-nowrap">入库日期</th>
                <th className="pb-3 font-medium whitespace-nowrap">出库日期</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">总模次</th>
                <th className="pb-3 font-medium whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-steel-800 font-mono whitespace-nowrap font-semibold">{inv.id}</td>
                  <td className="py-3 whitespace-nowrap font-medium">{inv.projectName}</td>
                  <td className="py-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-steel-800/5 text-steel-800 text-xs font-medium ring-1 ring-steel-800/10">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {inv.storageLocation}
                    </span>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <StatusBadge type="inventory" status={inv.status} />
                  </td>
                  <td className="py-3 font-mono text-xs whitespace-nowrap text-gray-500">{inv.inDate}</td>
                  <td className="py-3 font-mono text-xs whitespace-nowrap text-gray-500">{inv.outDate ?? '-'}</td>
                  <td className="py-3 text-right whitespace-nowrap">
                    <span className="font-mono font-bold">{inv.totalShots.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 ml-1">次</span>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    {inv.status === 'in_stock' && (
                      <button
                        className="btn-secondary text-xs px-3 py-1"
                        onClick={() => handleToggleStatus(inv.id, inv.status)}
                      >
                        出库
                      </button>
                    )}
                    {inv.status === 'out_stock' && (
                      <button
                        className="btn-primary text-xs px-3 py-1"
                        onClick={() => handleToggleStatus(inv.id, inv.status)}
                      >
                        入库
                      </button>
                    )}
                    {inv.status === 'maintenance' && (
                      <button
                        className="text-xs px-3 py-1 rounded bg-amber-50 text-amber-700 ring-1 ring-amber-500/30 hover:bg-amber-100 transition-colors"
                        onClick={() => updateInventory(inv.id, { status: 'in_stock' })}
                      >
                        完成维修
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {inventory.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    暂无入库台账数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
