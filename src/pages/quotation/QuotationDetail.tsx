import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { QuotationStatus } from '@/types'
import { QUOTATION_STATUS_LABELS } from '@/types'

export default function QuotationDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { quotations, updateQuotation } = useAppStore()

  const quotation = quotations.find((q) => q.id === id)
  const [status, setStatus] = useState<QuotationStatus | ''>(quotation?.status ?? '')

  const fmt = (n: number) => `¥ ${n.toLocaleString('zh-CN')}`

  if (!quotation) {
    return (
      <div className="p-6">
        <PageHeader title="报价单详情" />
        <div className="text-center py-20 text-gray-400">未找到该报价单</div>
        <div className="text-center">
          <button className="btn-secondary" onClick={() => navigate('/quotation')}>
            返回
          </button>
        </div>
      </div>
    )
  }

  const handleStatusChange = (newStatus: QuotationStatus) => {
    setStatus(newStatus)
    updateQuotation(quotation.id, { status: newStatus })
  }

  const costItems = [
    { label: '材料费', value: quotation.materialCost },
    { label: '加工费', value: quotation.machiningCost },
    { label: '设计费', value: quotation.designCost },
    { label: '管理费', value: quotation.managementCost },
  ]

  const statusOptions = Object.entries(QUOTATION_STATUS_LABELS).map(([value, label]) => ({
    value: value as QuotationStatus,
    label,
  }))

  return (
    <div className="p-6">
      <PageHeader
        title="报价单详情"
        subtitle={quotation.projectName}
        action={
          <button
            className="btn-secondary flex items-center gap-1.5"
            onClick={() => navigate('/quotation')}
          >
            <ArrowLeft size={16} />
            返回
          </button>
        }
      />

      <div className="card p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-xs text-gray-400 mb-1">报价单号</div>
            <div className="text-sm font-semibold text-steel-800 font-mono">{quotation.id}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">项目名称</div>
            <div className="text-sm font-semibold text-gray-900">{quotation.projectName}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">客户</div>
            <div className="text-sm font-semibold text-gray-900">{quotation.customer}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">创建日期</div>
            <div className="text-sm text-gray-700 font-mono">{quotation.createdAt}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">状态</div>
            <StatusBadge type="quotation" status={quotation.status} />
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">编辑状态</div>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value as QuotationStatus)}
              className="input-field w-40"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-5">费用明细</h3>
        <div className="space-y-0">
          {costItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-mono text-steel-800">{fmt(item.value)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 bg-amber-500 border-amber-500">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white">合计金额</span>
          <span className="text-3xl font-bold font-mono text-white">
            {fmt(quotation.totalCost)}
          </span>
        </div>
      </div>
    </div>
  )
}
