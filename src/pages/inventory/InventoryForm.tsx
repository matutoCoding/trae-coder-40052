import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useAppStore } from '@/store'
import type { MoldInventory, InventoryStatus } from '@/types'

export default function InventoryForm() {
  const navigate = useNavigate()
  const { addInventory, projects } = useAppStore()

  const today = new Date().toISOString().slice(0, 10)

  const [projectName, setProjectName] = useState('')
  const [storageLocation, setStorageLocation] = useState('')
  const [status, setStatus] = useState<InventoryStatus>('in_stock')
  const [inDate, setInDate] = useState(today)
  const [totalShots, setTotalShots] = useState(0)

  const handleSubmit = () => {
    if (!projectName || !storageLocation || !inDate) return

    const project = projects.find((p) => p.name === projectName)
    const projectId = project?.id || ''

    const id = `IV${Date.now().toString().slice(-4)}`

    const inventory: MoldInventory = {
      id,
      projectId,
      projectName,
      storageLocation,
      status,
      inDate,
      totalShots,
    }

    if (status === 'out_stock') {
      inventory.outDate = today
    }

    addInventory(inventory)
    navigate('/inventory')
  }

  const action = (
    <div className="flex items-center gap-3">
      <button className="btn-secondary flex items-center gap-1.5" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        返回
      </button>
      <button className="btn-primary" onClick={handleSubmit}>
        提交入库
      </button>
    </div>
  )

  return (
    <div className="p-6">
      <PageHeader title="新建库存入库" action={action} />

      <div className="space-y-6 max-w-4xl">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">库存信息</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
              <select
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="input-field"
              >
                <option value="">请选择项目</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">存放位置</label>
              <input
                type="text"
                value={storageLocation}
                onChange={(e) => setStorageLocation(e.target.value)}
                className="input-field"
                placeholder="例如：A区-01号架"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as InventoryStatus)}
                className="input-field"
              >
                <option value="in_stock">在库</option>
                <option value="out_stock">出库</option>
                <option value="maintenance">维修中</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">入库日期</label>
              <input
                type="date"
                value={inDate}
                onChange={(e) => setInDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">总模次</label>
              <input
                type="number"
                value={totalShots}
                onChange={(e) => setTotalShots(Number(e.target.value) || 0)}
                className="input-field font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
