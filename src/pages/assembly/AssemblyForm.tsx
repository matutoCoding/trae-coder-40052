import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useAppStore } from '@/store'
import type { AssemblyOrder, AssemblyStep } from '@/types'

interface StepFormItem {
  name: string
  description: string
}

export default function AssemblyForm() {
  const navigate = useNavigate()
  const { addAssemblyOrder, projects } = useAppStore()

  const [projectName, setProjectName] = useState('')
  const [assignee, setAssignee] = useState('')
  const [steps, setSteps] = useState<StepFormItem[]>([
    { name: '模架组装', description: '将定模和动模板安装到模架上' },
    { name: '型腔安装', description: '安装型腔镶件并调整间隙' },
    { name: '顶出系统安装', description: '安装顶针、顶板和复位弹簧' },
    { name: '冷却系统连接', description: '连接冷却水路并测试密封性' },
  ])
  const [issuesText, setIssuesText] = useState('')

  const handleStepChange = (index: number, field: keyof StepFormItem, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = { ...newSteps[index], [field]: value }
    setSteps(newSteps)
  }

  const handleAddStep = () => {
    setSteps([...steps, { name: '', description: '' }])
  }

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) return
    const newSteps = steps.filter((_, i) => i !== index)
    setSteps(newSteps)
  }

  const handleSubmit = () => {
    if (!projectName || !assignee) return

    const project = projects.find((p) => p.name === projectName)
    const projectId = project?.id || ''

    const id = `A${Date.now().toString().slice(-4)}`

    const assemblySteps: AssemblyStep[] = steps.map((s) => ({
      name: s.name,
      description: s.description,
      status: 'pending',
    }))

    const issues = issuesText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    const order: AssemblyOrder = {
      id,
      projectId,
      projectName,
      steps: assemblySteps,
      issues,
      status: 'pending',
      assignee,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    addAssemblyOrder(order)
    navigate('/assembly')
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
      <PageHeader title="新建装配工单" action={action} />

      <div className="space-y-6 max-w-4xl">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">基本信息</h3>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">负责人</label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="input-field"
                placeholder="例如：张师傅"
              />
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">装配步骤</h3>
            <button
              className="text-sm text-steel-600 hover:text-steel-800 font-medium"
              onClick={handleAddStep}
            >
              + 添加步骤
            </button>
          </div>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-3 items-start p-3 bg-gray-50 rounded-md">
                <div className="w-8 h-8 flex items-center justify-center bg-steel-800 text-white rounded-md text-sm font-medium flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={step.name}
                    onChange={(e) => handleStepChange(index, 'name', e.target.value)}
                    className="input-field"
                    placeholder="步骤名称"
                  />
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                    className="input-field"
                    placeholder="步骤描述"
                  />
                </div>
                <button
                  onClick={() => handleRemoveStep(index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  disabled={steps.length <= 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">问题记录</h3>
          <textarea
            value={issuesText}
            onChange={(e) => setIssuesText(e.target.value)}
            className="input-field min-h-[100px] resize-none"
            placeholder="可选：每行记录一个问题"
          />
        </div>
      </div>
    </div>
  )
}
