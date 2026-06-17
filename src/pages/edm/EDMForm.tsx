import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useAppStore } from '@/store'
import type { EDMRecord, DischargeParams, ProcessStatus } from '@/types'

export default function EDMForm() {
  const navigate = useNavigate()
  const { addEDMRecord, projects } = useAppStore()

  const [projectName, setProjectName] = useState('')
  const [electrodeType, setElectrodeType] = useState('铜电极')
  const [current, setCurrent] = useState(6)
  const [voltage, setVoltage] = useState(55)
  const [pulseOn, setPulseOn] = useState(45)
  const [pulseOff, setPulseOff] = useState(28)
  const [wearRate, setWearRate] = useState(0.2)
  const [status, setStatus] = useState<ProcessStatus>('pending')

  const handleSubmit = () => {
    if (!projectName) return

    const project = projects.find((p) => p.name === projectName)
    const projectId = project?.id || ''

    const id = `E${Date.now().toString().slice(-4)}`

    const dischargeParams: DischargeParams = {
      current,
      voltage,
      pulseOn,
      pulseOff,
    }

    const record: EDMRecord = {
      id,
      projectId,
      projectName,
      electrodeType,
      dischargeParams,
      wearRate,
      status,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    addEDMRecord(record)
    navigate('/edm')
  }

  const action = (
    <div className="flex items-center gap-3">
      <button className="btn-secondary flex items-center gap-1.5" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        返回
      </button>
      <button className="btn-amber" onClick={handleSubmit}>
        提交记录
      </button>
    </div>
  )

  return (
    <div className="p-6">
      <PageHeader title="新建EDM放电加工记录" action={action} />

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
              <label className="block text-sm font-medium text-gray-700 mb-1">电极类型</label>
              <select
                value={electrodeType}
                onChange={(e) => setElectrodeType(e.target.value)}
                className="input-field"
              >
                <option value="铜电极">铜电极</option>
                <option value="石墨电极">石墨电极</option>
                <option value="铜钨电极">铜钨电极</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">消耗率(%)</label>
              <input
                type="number"
                step="0.01"
                value={wearRate}
                onChange={(e) => setWearRate(Number(e.target.value) || 0)}
                className="input-field font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProcessStatus)}
                className="input-field"
              >
                <option value="pending">待处理</option>
                <option value="processing">进行中</option>
                <option value="completed">已完成</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">放电参数</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电流(A)</label>
              <input
                type="number"
                value={current}
                onChange={(e) => setCurrent(Number(e.target.value) || 0)}
                className="input-field font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电压(V)</label>
              <input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value) || 0)}
                className="input-field font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">脉冲开(μs)</label>
              <input
                type="number"
                value={pulseOn}
                onChange={(e) => setPulseOn(Number(e.target.value) || 0)}
                className="input-field font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">脉冲关(μs)</label>
              <input
                type="number"
                value={pulseOff}
                onChange={(e) => setPulseOff(Number(e.target.value) || 0)}
                className="input-field font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
