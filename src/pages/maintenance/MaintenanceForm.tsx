import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useAppStore } from '@/store'
import type { MaintenanceOrder, MaintenanceType } from '@/types'

export default function MaintenanceForm() {
  const navigate = useNavigate()
  const { addMaintenanceOrder, projects } = useAppStore()

  const [projectName, setProjectName] = useState('')
  const [type, setType] = useState<MaintenanceType>('maintenance')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState('')

  const handleSubmit = () => {
    if (!projectName || !description || !assignee) return

    const project = projects.find((p) => p.name === projectName)
    const projectId = project?.id || ''

    const id = `MT${Date.now().toString().slice(-4)}`

    const order: MaintenanceOrder = {
      id,
      projectId,
      projectName,
      type,
      description,
      assignee,
      status: 'pending',
      createdAt: new Date().toISOString().slice(0, 10),
    }

    addMaintenanceOrder(order)
    navigate('/maintenance')
  }

  const action = (
    <div className="flex items-center gap-3">
      <button className="btn-secondary flex items-center gap-1.5" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        返回
      </button>
      <button className="btn-primary" onClick={handleSubmit}>
        提交工单
      </button>
    </div>
  )

  return (
    <div className="p-6">
      <PageHeader title="新建维修保养工单" action={action} />

      <div className="space-y-6 max-w-4xl">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">工单信息</h3>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">工单类型</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MaintenanceType)}
                className="input-field"
              >
                <option value="maintenance">保养</option>
                <option value="repair">维修</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">责任人</label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="input-field"
                placeholder="请输入责任人姓名"
              />
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">问题描述</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field min-h-[160px] resize-none"
            placeholder="请详细描述维修或保养内容..."
          />
        </div>
      </div>
    </div>
  )
}
