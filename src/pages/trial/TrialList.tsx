import { useState } from 'react'
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
          <button className="btn-primary">
            + 新建试模记录
          </button>
        }
      />

      <div className="card">
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
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 font-medium">记录编号</th>
              <th className="pb-3 font-medium">项目名称</th>
              <th className="pb-3 font-medium">试模日期</th>
              <th className="pb-3 font-medium">注塑机号</th>
              <th className="pb-3 font-medium text-right">温度(℃)</th>
              <th className="pb-3 font-medium text-right">压力(MPa)</th>
              <th className="pb-3 font-medium text-right">速度(%)</th>
              <th className="pb-3 font-medium text-right">冷却时间(s)</th>
              <th className="pb-3 font-medium">样品情况</th>
              <th className="pb-3 font-medium">结果</th>
              <th className="pb-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <>
                <tr
                  key={r.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                >
                  <td className="py-3 text-steel-800 font-mono">{r.id}</td>
                  <td className="py-3">{r.projectName}</td>
                  <td className="py-3">{r.trialDate}</td>
                  <td className="py-3">{r.machineNo}</td>
                  <td className="py-3 text-right font-mono">{r.injectionParams.temperature}</td>
                  <td className="py-3 text-right font-mono">{r.injectionParams.pressure}</td>
                  <td className="py-3 text-right font-mono">{r.injectionParams.speed}</td>
                  <td className="py-3 text-right font-mono">{r.injectionParams.coolingTime}</td>
                  <td className="py-3">
                    {r.issues.length > 0 ? (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-mono font-semibold ring-1 ring-amber-600/20">
                        {r.issues.length}项问题
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">正常</span>
                    )}
                  </td>
                  <td className="py-3">
                    <StatusBadge type="trial" status={r.result} />
                  </td>
                  <td className="py-3">
                    <button className="text-[#1B3A5C] hover:underline text-sm">
                      查看
                    </button>
                  </td>
                </tr>
                {expandedId === r.id && r.issues.length > 0 && (
                  <tr key={`${r.id}-issues`} className="bg-gray-50/50">
                    <td colSpan={11} className="py-3 px-6">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-500 mr-1">问题记录:</span>
                        {r.issues.map((issue, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-xs ring-1 ring-amber-600/20"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
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
  )
}
