import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { InspectionRecord } from '@/types'

export default function InspectionList() {
  const { inspectionRecords, trialRecords } = useAppStore()
  const [selectedRecord, setSelectedRecord] = useState<InspectionRecord | null>(null)

  const getTrialLabel = (trialId: string) => {
    const trial = trialRecords.find((t) => t.id === trialId)
    return trial ? trial.id : trialId
  }

  return (
    <div className="p-6">
      <PageHeader
        title="注塑产品检验"
        subtitle="注塑产品尺寸检验与合格判定"
      />

      <div className="card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 font-medium">检验编号</th>
              <th className="pb-3 font-medium">项目名称</th>
              <th className="pb-3 font-medium">关联试模</th>
              <th className="pb-3 font-medium text-right">检验项数</th>
              <th className="pb-3 font-medium text-right">合格项</th>
              <th className="pb-3 font-medium text-right">不合格项</th>
              <th className="pb-3 font-medium">总体结果</th>
              <th className="pb-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {inspectionRecords.map((r) => {
              const passCount = r.items.filter((i) => i.result === 'pass').length
              const failCount = r.items.filter((i) => i.result === 'fail').length

              return (
                <tr
                  key={r.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedRecord(r)}
                >
                  <td className="py-3 text-steel-800 font-mono">{r.id}</td>
                  <td className="py-3">{r.projectName}</td>
                  <td className="py-3 font-mono text-xs">{getTrialLabel(r.trialId)}</td>
                  <td className="py-3 text-right font-mono">{r.items.length}</td>
                  <td className="py-3 text-right font-mono text-green-600">{passCount}</td>
                  <td className="py-3 text-right font-mono text-red-600">{failCount}</td>
                  <td className="py-3">
                    <StatusBadge type="trial" status={r.overallResult} />
                  </td>
                  <td className="py-3">
                    <button
                      className="text-[#1B3A5C] hover:underline text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedRecord(r)
                      }}
                    >
                      查看
                    </button>
                  </td>
                </tr>
              )
            })}
            {inspectionRecords.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-gray-400">
                  暂无检验记录
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedRecord && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  检验详情 - {selectedRecord.id}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {selectedRecord.projectName}
                </p>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                onClick={() => setSelectedRecord(null)}
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-3 flex items-center gap-4 border-b border-gray-100 bg-gray-50/50">
              <span className="text-xs text-gray-500">
                关联试模: <span className="font-mono">{getTrialLabel(selectedRecord.trialId)}</span>
              </span>
              <span className="text-xs text-gray-500">
                检验项数: <span className="font-mono">{selectedRecord.items.length}</span>
              </span>
              <StatusBadge type="trial" status={selectedRecord.overallResult} />
            </div>

            <div className="overflow-auto flex-1 px-6 py-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="pb-2 font-medium">检验项名称</th>
                    <th className="pb-2 font-medium text-right">标准值</th>
                    <th className="pb-2 font-medium text-right">实测值</th>
                    <th className="pb-2 font-medium text-center">结果</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRecord.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-2.5">{item.name}</td>
                      <td className="py-2.5 text-right font-mono">{item.standard}</td>
                      <td className="py-2.5 text-right font-mono">{item.measured}</td>
                      <td className="py-2.5 text-center">
                        {item.result === 'pass' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 ring-1 ring-green-600/20">
                            合格
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 ring-1 ring-red-600/20">
                            不合格
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
