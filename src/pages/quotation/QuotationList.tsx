import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import type { QuotationStatus } from '@/types'
import { QUOTATION_STATUS_LABELS } from '@/types'

const STATUS_OPTIONS: { value: '' | QuotationStatus; label: string }[] = [
  { value: '', label: '全部' },
  { value: 'draft', label: QUOTATION_STATUS_LABELS.draft },
  { value: 'submitted', label: QUOTATION_STATUS_LABELS.submitted },
  { value: 'approved', label: QUOTATION_STATUS_LABELS.approved },
  { value: 'rejected', label: QUOTATION_STATUS_LABELS.rejected },
]

export default function QuotationList() {
  const navigate = useNavigate()
  const { quotations } = useAppStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'' | QuotationStatus>('')

  const filtered = quotations.filter((q) => {
    const matchSearch =
      q.projectName.includes(search) ||
      q.customer.includes(search) ||
      q.id.includes(search)
    const matchStatus = !statusFilter || q.status === statusFilter
    return matchSearch && matchStatus
  })

  const fmt = (n: number) => n.toLocaleString('zh-CN')

  return (
    <div className="p-6">
      <PageHeader
        title="模具报价"
        subtitle="管理所有模具项目的报价单"
        action={
          <button className="btn-primary" onClick={() => navigate('/quotation/new')}>
            + 新建报价
          </button>
        }
      />

      <div className="card">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="搜索项目名称、客户、报价单号..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field flex-1"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as '' | QuotationStatus)}
            className="input-field w-32"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 font-medium">报价单号</th>
              <th className="pb-3 font-medium">项目名称</th>
              <th className="pb-3 font-medium">客户</th>
              <th className="pb-3 font-medium text-right">材料费</th>
              <th className="pb-3 font-medium text-right">加工费</th>
              <th className="pb-3 font-medium text-right">设计费</th>
              <th className="pb-3 font-medium text-right">管理费</th>
              <th className="pb-3 font-medium text-right">合计</th>
              <th className="pb-3 font-medium">状态</th>
              <th className="pb-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 text-steel-800 font-mono">{q.id}</td>
                <td className="py-3">{q.projectName}</td>
                <td className="py-3">{q.customer}</td>
                <td className="py-3 text-right font-mono">{fmt(q.materialCost)}</td>
                <td className="py-3 text-right font-mono">{fmt(q.machiningCost)}</td>
                <td className="py-3 text-right font-mono">{fmt(q.designCost)}</td>
                <td className="py-3 text-right font-mono">{fmt(q.managementCost)}</td>
                <td className="py-3 text-right font-mono font-bold">{fmt(q.totalCost)}</td>
                <td className="py-3">
                  <StatusBadge type="quotation" status={q.status} />
                </td>
                <td className="py-3">
                  <button
                    className="text-[#1B3A5C] hover:underline text-sm"
                    onClick={() => navigate(`/quotation/${q.id}`)}
                  >
                    查看
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="py-12 text-center text-gray-400">
                  暂无报价数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
