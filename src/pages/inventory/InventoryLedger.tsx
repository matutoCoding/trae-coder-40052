import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { InventoryStatus } from '@/types'

export default function InventoryLedger() {
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
          <button className="btn-primary">+ 新建入库</button>
        }
      />

      <div className="card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 font-medium">台账编号</th>
              <th className="pb-3 font-medium">项目名称</th>
              <th className="pb-3 font-medium">存放位置</th>
              <th className="pb-3 font-medium">状态</th>
              <th className="pb-3 font-medium">入库日期</th>
              <th className="pb-3 font-medium">出库日期</th>
              <th className="pb-3 font-medium text-right">总模次</th>
              <th className="pb-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 text-steel-800 font-mono">{inv.id}</td>
                <td className="py-3">{inv.projectName}</td>
                <td className="py-3">{inv.storageLocation}</td>
                <td className="py-3">
                  <StatusBadge type="inventory" status={inv.status} />
                </td>
                <td className="py-3 font-mono text-xs">{inv.inDate}</td>
                <td className="py-3 font-mono text-xs">{inv.outDate ?? '-'}</td>
                <td className="py-3 text-right font-mono">{inv.totalShots.toLocaleString()}</td>
                <td className="py-3">
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
                    <span className="text-xs text-gray-400">维修中</span>
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
  )
}
