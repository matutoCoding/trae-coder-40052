import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { TrialResult } from '@/types'

const RESULT_OPTIONS: { value: '' | TrialResult; label: string }[] = [
  { value: '', label: '全部结果' },
  { value: 'pass', label: '合格' },
  { value: 'fail', label: '不合格' },
  { value: 'conditional', label: '有条件合格' },
]

export default function TrialList() {
  const navigate = useNavigate()
  const { trialRecords } = useAppStore()
  const [resultFilter, setResultFilter] = useState<'' | TrialResult>('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = trialRecords.filter((r) => {
    const matchResult = !resultFilter || r.result === resultFilter
    return matchResult
  })

  return (
    <div className="p-6">
      <PageHeader
        title="首次试模记录"
        subtitle="记录首次试模参数、样品情况与结果"
        action={
          <button className="btn-primary" onClick={() => navigate('/trial/new')}>
            + 新建试模记录
          </button>
        }
      />

      <div className="card p-4">
        <div className="flex items-center gap-4 mb-4">
          <select
            value={resultFilter}
            onChange={(e) => setResultFilter(e.target.value as '' | TrialResult)}
            className="input-field w-32"
          >
            {RESULT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-gray-400">共 {filtered.length} 条记录</span>
        </div>

        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-3 font-medium whitespace-nowrap">记录编号</th>
                <th className="pb-3 font-medium whitespace-nowrap">项目名称</th>
                <th className="pb-3 font-medium whitespace-nowrap">试模日期</th>
                <th className="pb-3 font-medium whitespace-nowrap">注塑机号</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">温度(℃)</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">压力(MPa)</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">速度(%)</th>
                <th className="pb-3 font-medium text-right whitespace-nowrap">冷却(s)</th>
                <th className="pb-3 font-medium whitespace-nowrap">样品情况</th>
                <th className="pb-3 font-medium whitespace-nowrap">结果</th>
                <th className="pb-3 font-medium whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.flatMap((r) => [
                <tr
                  key={r.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                >
                  <td className="py-3 text-steel-800 font-mono whitespace-nowrap">{r.id}</td>
                  <td className="py-3 whitespace-nowrap font-medium">{r.projectName}</td>
                  <td className="py-3 whitespace-nowrap font-mono text-xs">{r.trialDate}</td>
                  <td className="py-3 whitespace-nowrap">{r.machineNo}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.injectionParams.temperature}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.injectionParams.pressure}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.injectionParams.speed}</td>
                  <td className="py-3 text-right font-mono whitespace-nowrap">{r.injectionParams.coolingTime}</td>
                  <td className="py-3 whitespace-nowrap">
                    {r.issues.length > 0 ? (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-mono font-semibold ring-1 ring-amber-600/20">
                        {r.issues.length}项问题
                      </span>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">正常</span>
                    )}
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <StatusBadge type="trial" status={r.result} />
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedId === r.id ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </td>
                </tr>,
                ...(expandedId === r.id
                  ? [<tr key={`${r.id}-exp`} className="bg-gray-50/60">
                      <td colSpan={11} className="py-4 px-8">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="card p-4 border-dashed">
                              <p className="text-xs text-gray-400 mb-2">样品情况描述</p>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {r.sampleCondition || '无特殊说明'}
                              </p>
                            </div>
                            <div className="card p-4 bg-steel-800/[0.02] border-steel-800/20">
                              <p className="text-xs text-gray-400 mb-2">注塑参数明细</p>
                              <div className="grid grid-cols-2 gap-y-1.5 text-sm">
                                <div className="flex justify-between"><span className="text-gray-500">温度</span><span className="font-mono font-semibold">{r.injectionParams.temperature} ℃</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">压力</span><span className="font-mono font-semibold">{r.injectionParams.pressure} MPa</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">速度</span><span className="font-mono font-semibold">{r.injectionParams.speed} %</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">冷却</span><span className="font-mono font-semibold">{r.injectionParams.coolingTime} s</span></div>
                              </div>
                            </div>
                          </div>
                          {r.issues.length > 0 && (
                            <div>
                              <p className="text-xs text-gray-400 mb-2">发现问题 ({r.issues.length}项)</p>
                              <div className="flex flex-wrap gap-2">
                                {r.issues.map((issue, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-3 py-1 rounded-md bg-red-50 text-red-700 text-sm ring-1 ring-red-500/20"
                                  >
                                    <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center mr-1.5 font-mono">{idx + 1}</span>
                                    {issue}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>]
                  : [])
              ])}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-gray-400">
                    暂无试模记录
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
