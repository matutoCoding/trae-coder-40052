import { useMemo } from 'react'
import {
  FolderKanban, Cog, ClipboardCheck, Truck,
  AlertTriangle, Wrench, FileText, Zap,
} from 'lucide-react'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import PageHeader from '@/components/PageHeader'
import StatCard from '@/components/StatCard'
import StatusBadge from '@/components/StatusBadge'
import { useAppStore } from '@/store'
import { PROJECT_STATUS_LABELS } from '@/types'
import type { ProjectStatus } from '@/types'

const STAGES: ProjectStatus[] = ['quotation', 'design', 'machining', 'assembly', 'trial', 'accepted', 'inventory']

const STAGE_COLORS: Record<ProjectStatus, string> = {
  quotation: '#93C5FD',
  design: '#A5B4FC',
  machining: '#E8913A',
  assembly: '#FBBF24',
  trial: '#6EE7B7',
  accepted: '#34D399',
  inventory: '#1B3A5C',
}

const PIE_COLORS = ['#93C5FD', '#A5B4FC', '#E8913A', '#FBBF24', '#6EE7B7', '#34D399', '#1B3A5C']

export default function Dashboard() {
  const {
    projects, quotations, machiningOrders, assemblyOrders,
    trialRecords, inspectionRecords, maintenanceOrders,
  } = useAppStore()

  const activeStatuses: ProjectStatus[] = ['quotation', 'design', 'machining', 'assembly', 'trial']
  const activeCount = projects.filter((p) => activeStatuses.includes(p.status)).length
  const pendingInspection = inspectionRecords.filter((i) => i.overallResult === 'conditional').length
    + projects.filter((p) => p.status === 'accepted').length
  const thisMonth = '2026-06'
  const deliveredThisMonth = projects.filter(
    (p) => p.status === 'inventory' && p.deadline.startsWith(thisMonth),
  ).length + projects.filter((p) => p.status === 'accepted').length

  const statusDistribution = useMemo(() => {
    const map: Record<string, number> = {}
    for (const s of STAGES) {
      map[s] = projects.filter((p) => p.status === s).length
    }
    return STAGES.map((s) => ({ name: PROJECT_STATUS_LABELS[s], value: map[s] }))
  }, [projects])

  const monthlyDelivery = useMemo(() => {
    const months = ['1月', '2月', '3月', '4月', '5月', '6月']
    return months.map((m, i) => {
      const mm = String(i + 1).padStart(2, '0')
      const count = projects.filter((p) => p.deadline.startsWith(`2026-${mm}`)).length
      return { month: m, 项目数: count }
    })
  }, [projects])

  const todos = useMemo(() => {
    const items: { id: string; module: string; text: string; priority: 'high' | 'medium' | 'low' }[] = []

    quotations
      .filter((q) => q.status === 'draft' || q.status === 'submitted')
      .forEach((q) => {
        items.push({
          id: q.id,
          module: '报价',
          text: `${q.projectName} - ${q.status === 'draft' ? '报价待提交' : '报价待审批'}`,
          priority: q.status === 'submitted' ? 'high' : 'medium',
        })
      })

    machiningOrders
      .filter((o) => o.status === 'pending')
      .forEach((o) => {
        items.push({
          id: o.id,
          module: '加工',
          text: `${o.projectName} - ${o.partName} 待安排加工`,
          priority: 'high',
        })
      })

    assemblyOrders
      .filter((o) => o.status === 'pending')
      .forEach((o) => {
        items.push({
          id: o.id,
          module: '装配',
          text: `${o.projectName} - 装配待启动`,
          priority: 'medium',
        })
      })

    trialRecords
      .filter((t) => t.result === 'conditional')
      .forEach((t) => {
        items.push({
          id: t.id,
          module: '试模',
          text: `${t.projectName} - 试模有条件合格，需整改`,
          priority: 'high',
        })
      })

    maintenanceOrders
      .filter((m) => m.status === 'pending')
      .forEach((m) => {
        items.push({
          id: m.id,
          module: '维保',
          text: `${m.projectName} - ${m.description}`,
          priority: 'low',
        })
      })

    return items
  }, [quotations, machiningOrders, assemblyOrders, trialRecords, maintenanceOrders])

  const priorityStyle: Record<string, string> = {
    high: 'text-red-600 bg-red-50',
    medium: 'text-amber-600 bg-amber-50',
    low: 'text-blue-600 bg-blue-50',
  }
  const priorityLabel: Record<string, string> = {
    high: '紧急',
    medium: '一般',
    low: '低',
  }

  return (
    <div>
      <PageHeader title="工作台" subtitle="模具制造管理概览" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="总项目数" value={projects.length} icon={FolderKanban} color="steel" />
        <StatCard label="在制项目" value={activeCount} icon={Cog} color="amber" />
        <StatCard label="待验收" value={pendingInspection} icon={ClipboardCheck} color="green" />
        <StatCard label="本月交付" value={deliveredThisMonth} icon={Truck} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 card p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">项目进度</h2>
          <div className="space-y-4">
            {projects.map((project) => {
              const currentIdx = STAGES.indexOf(project.status)
              return (
                <div key={project.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium text-gray-800 truncate">{project.name}</span>
                      <StatusBadge type="project" status={project.status} />
                    </div>
                    <span className="text-xs text-gray-400 font-mono flex-shrink-0">{project.deadline}</span>
                  </div>
                  <div className="flex gap-0.5 h-5 rounded overflow-hidden">
                    {STAGES.map((stage, idx) => {
                      const isComplete = idx < currentIdx
                      const isCurrent = idx === currentIdx
                      return (
                        <div
                          key={stage}
                          className="flex-1 relative group"
                          style={{
                            backgroundColor: isComplete
                              ? STAGE_COLORS[stage]
                              : isCurrent
                                ? STAGE_COLORS[stage]
                                : '#E5E7EB',
                            opacity: isComplete ? 0.85 : isCurrent ? 1 : 0.5,
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              className="text-[9px] font-medium leading-none"
                              style={{ color: isComplete || isCurrent ? '#fff' : '#9CA3AF' }}
                            >
                              {PROJECT_STATUS_LABELS[stage].replace('中', '').replace('已', '')}
                            </span>
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {PROJECT_STATUS_LABELS[stage]}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">待办事项</h2>
          {todos.length === 0 ? (
            <div className="text-sm text-gray-400 text-center py-8">暂无待办事项</div>
          ) : (
            <div className="space-y-2.5 max-h-[400px] overflow-y-auto">
              {todos.map((item) => (
                <div key={item.id} className="flex items-start gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="mt-0.5">
                    {item.priority === 'high' ? (
                      <AlertTriangle size={14} className="text-red-500" />
                    ) : item.priority === 'medium' ? (
                      <Zap size={14} className="text-amber-500" />
                    ) : (
                      <FileText size={14} className="text-blue-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-700 leading-snug truncate">{item.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-steel-800 text-white" style={{ backgroundColor: 'var(--steel-800, #1B3A5C)' }}>
                        {item.module}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${priorityStyle[item.priority]}`}>
                        {priorityLabel[item.priority]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">项目状态分布</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => value > 0 ? `${name} ${value}` : ''}
                >
                  {statusDistribution.map((_entry, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #e5e7eb' }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-base font-semibold text-gray-800 mb-4">月度交付趋势</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDelivery} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey="项目数" radius={[4, 4, 0, 0]}>
                  {monthlyDelivery.map((_entry, index) => (
                    <Cell
                      key={index}
                      fill={index === monthlyDelivery.length - 1 ? '#E8913A' : '#1B3A5C'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
