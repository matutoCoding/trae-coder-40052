import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import PageHeader from '@/components/PageHeader'
import { useAppStore } from '@/store'

const ESTIMATED_LIFESPAN = 500000

export default function LifespanStats() {
  const { inventory, projects } = useAppStore()

  const chartData = inventory.map((inv) => ({
    name: inv.projectName,
    totalShots: inv.totalShots,
  }))

  const summaryData = inventory.map((inv) => {
    const project = projects.find((p) => p.id === inv.projectId)
    const remaining = Math.max(0, ESTIMATED_LIFESPAN - inv.totalShots)
    const remainingPct = Math.round((remaining / ESTIMATED_LIFESPAN) * 100)
    let status = '正常'
    if (remainingPct < 20) status = '危险'
    else if (remainingPct < 40) status = '警告'

    return {
      id: inv.id,
      projectName: inv.projectName,
      totalShots: inv.totalShots,
      estimatedLife: ESTIMATED_LIFESPAN,
      remainingPct,
      status,
    }
  })

  const statusStyle = (status: string) => {
    if (status === '危险') return 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
    if (status === '警告') return 'bg-amber-100 text-amber-700 ring-1 ring-amber-600/20'
    return 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
  }

  return (
    <div className="p-6">
      <PageHeader
        title="模具寿命统计"
        subtitle="模具使用模次统计与寿命预测"
      />

      <div className="card p-5 mb-6">
        <h2 className="text-sm font-medium text-gray-500 mb-4">模次统计</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EAF0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${(v / 10000).toFixed(0)}万`} />
            <Tooltip formatter={(value: number) => [value.toLocaleString(), '总模次']} />
            <Bar dataKey="totalShots" fill="#1B3A5C" radius={[4, 4, 0, 0]} />
            <ReferenceLine
              y={500000}
              stroke="#EF4444"
              strokeDasharray="6 3"
              label={{ value: '警戒线', position: 'insideTopRight', fill: '#EF4444', fontSize: 12 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="pb-3 font-medium">项目名称</th>
              <th className="pb-3 font-medium text-right">总模次</th>
              <th className="pb-3 font-medium text-right">预估寿命</th>
              <th className="pb-3 font-medium text-right">剩余寿命%</th>
              <th className="pb-3 font-medium">状态</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3">{row.projectName}</td>
                <td className="py-3 text-right font-mono">{row.totalShots.toLocaleString()}</td>
                <td className="py-3 text-right font-mono">{row.estimatedLife.toLocaleString()}</td>
                <td className="py-3 text-right font-mono">{row.remainingPct}%</td>
                <td className="py-3">
                  <span className={`status-badge ${statusStyle(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
            {summaryData.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-400">
                  暂无寿命数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
