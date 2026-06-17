import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { useAppStore } from '@/store'
import type { Quotation } from '@/types'

export default function QuotationForm() {
  const navigate = useNavigate()
  const { addQuotation, quotations } = useAppStore()

  const [projectName, setProjectName] = useState('')
  const [customer, setCustomer] = useState('')
  const [materialCost, setMaterialCost] = useState(0)
  const [machiningCost, setMachiningCost] = useState(0)
  const [designCost, setDesignCost] = useState(0)
  const [managementCost, setManagementCost] = useState(0)

  const totalCost = materialCost + machiningCost + designCost + managementCost

  const fmt = (n: number) => n.toLocaleString('zh-CN')

  const handleSubmit = () => {
    if (!projectName || !customer) return

    const id = `Q${String(quotations.length + 1).padStart(3, '0')}`
    const quotation: Quotation = {
      id,
      projectId: '',
      projectName,
      customer,
      materialCost,
      machiningCost,
      designCost,
      managementCost,
      totalCost,
      status: 'draft',
      createdAt: new Date().toISOString().slice(0, 10),
    }
    addQuotation(quotation)
    navigate('/quotation')
  }

  const costFields = [
    { label: '材料费', value: materialCost, setter: setMaterialCost },
    { label: '加工费', value: machiningCost, setter: setMachiningCost },
    { label: '设计费', value: designCost, setter: setDesignCost },
    { label: '管理费', value: managementCost, setter: setManagementCost },
  ]

  return (
    <div className="p-6">
      <PageHeader title="新建报价" subtitle="创建新的模具报价单" />

      <div className="flex gap-6">
        <div className="flex-1">
          <div className="card">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="input-field w-full"
                  placeholder="请输入项目名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">客户</label>
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="input-field w-full"
                  placeholder="请输入客户名称"
                />
              </div>
              {costFields.map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="number"
                    value={field.value || ''}
                    onChange={(e) => field.setter(Number(e.target.value) || 0)}
                    className="input-field w-full font-mono"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-80">
          <div className="card sticky top-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">费用概览</h3>
            <div className="space-y-3">
              {costFields.map((field) => (
                <div key={field.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{field.label}</span>
                  <span className="font-mono text-steel-800">¥ {fmt(field.value)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">合计</span>
                  <span className="text-lg font-bold font-mono bg-amber-500 text-white px-3 py-1 rounded-md">
                    ¥ {fmt(totalCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="btn-primary" onClick={handleSubmit}>
          保存报价单
        </button>
        <button
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={() => navigate('/quotation')}
        >
          取消
        </button>
      </div>
    </div>
  )
}
