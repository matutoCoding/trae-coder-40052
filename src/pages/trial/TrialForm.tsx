import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import { useAppStore } from '@/store'
import type { TrialRecord, TrialResult, InjectionParams } from '@/types'

export default function TrialForm() {
  const navigate = useNavigate()
  const { addTrialRecord, projects } = useAppStore()

  const today = new Date().toISOString().slice(0, 10)

  const [projectName, setProjectName] = useState('')
  const [trialDate, setTrialDate] = useState(today)
  const [machineNo, setMachineNo] = useState('')
  const [temperature, setTemperature] = useState(240)
  const [pressure, setPressure] = useState(90)
  const [speed, setSpeed] = useState(60)
  const [coolingTime, setCoolingTime] = useState(15)
  const [sampleCondition, setSampleCondition] = useState('')
  const [issuesText, setIssuesText] = useState('')
  const [result, setResult] = useState<TrialResult>('pass')

  const handleSubmit = () => {
    if (!projectName || !trialDate || !machineNo) return

    const project = projects.find((p) => p.name === projectName)
    const projectId = project?.id || ''

    const id = `T${Date.now().toString().slice(-4)}`

    const injectionParams: InjectionParams = {
      temperature,
      pressure,
      speed,
      coolingTime,
    }

    const issues = issuesText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    const record: TrialRecord = {
      id,
      projectId,
      projectName,
      trialDate,
      machineNo,
      injectionParams,
      sampleCondition,
      issues,
      result,
    }

    addTrialRecord(record)
    navigate('/trial')
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
      <PageHeader title="新建试模记录" action={action} />

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
              <label className="block text-sm font-medium text-gray-700 mb-1">试模日期</label>
              <input
                type="date"
                value={trialDate}
                onChange={(e) => setTrialDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">注塑机号</label>
              <input
                type="text"
                value={machineNo}
                onChange={(e) => setMachineNo(e.target.value)}
                className="input-field"
                placeholder="例如：IJ-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">试模结果</label>
              <select
                value={result}
                onChange={(e) => setResult(e.target.value as TrialResult)}
                className="input-field"
              >
                <option value="pass">合格</option>
                <option value="fail">不合格</option>
                <option value="conditional">有条件合格</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">注塑参数</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">温度(℃)</label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value) || 0)}
                className="input-field font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">压力(MPa)</label>
              <input
                type="number"
                value={pressure}
                onChange={(e) => setPressure(Number(e.target.value) || 0)}
                className="input-field font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">速度(%)</label>
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value) || 0)}
                className="input-field font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">冷却时间(s)</label>
              <input
                type="number"
                value={coolingTime}
                onChange={(e) => setCoolingTime(Number(e.target.value) || 0)}
                className="input-field font-mono"
              />
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">样品情况</h3>
          <textarea
            value={sampleCondition}
            onChange={(e) => setSampleCondition(e.target.value)}
            className="input-field min-h-[100px] resize-none"
            placeholder="描述样品外观、尺寸、功能等情况"
          />
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">问题记录</h3>
          <textarea
            value={issuesText}
            onChange={(e) => setIssuesText(e.target.value)}
            className="input-field min-h-[100px] resize-none"
            placeholder="每行记录一个问题"
          />
        </div>
      </div>
    </div>
  )
}
