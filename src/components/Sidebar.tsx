import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Calculator, Box, Cog, Zap, Wrench,
  ClipboardCheck, Settings2, Package, Activity, HardHat
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', label: '仪表盘', icon: LayoutDashboard },
  { path: '/quotation', label: '模具报价', icon: Calculator },
  { path: '/mold-base', label: '模架选型', icon: Box },
  { path: '/machining', label: '零件加工', icon: Cog },
  {
    label: '电极放电', icon: Zap,
    children: [
      { path: '/edm', label: '电火花电极' },
      { path: '/wire-cut', label: '慢走丝线切割' },
    ]
  },
  { path: '/assembly', label: '装配钳工', icon: Wrench },
  {
    label: '试模验收', icon: ClipboardCheck,
    children: [
      { path: '/trial', label: '首次试模记录' },
      { path: '/inspection', label: '注塑产品检验' },
    ]
  },
  {
    label: '维修保养', icon: Settings2,
    children: [
      { path: '/maintenance', label: '模具维修工单' },
      { path: '/wear-parts', label: '易损件更换' },
      { path: '/lifespan', label: '模具寿命统计' },
      { path: '/inventory', label: '模具入库台账' },
    ]
  },
]

export default function Sidebar() {
  const location = useLocation()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    '电极放电': true,
    '试模验收': true,
    '维修保养': true,
  })

  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <aside className="w-60 bg-steel-900 text-white flex flex-col h-screen fixed left-0 top-0 z-30">
      <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center">
          <HardHat size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold leading-tight">注塑模管理</h1>
          <p className="text-[10px] text-white/50 leading-tight">Mold Management System</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {navItems.map((item) => {
          if ('children' in item && item.children) {
            const isChildActive = item.children.some((c) => location.pathname === c.path)
            const isExpanded = expanded[item.label] ?? isChildActive
            const Icon = item.icon
            return (
              <div key={item.label} className="mb-1">
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors duration-150 ${
                    isChildActive ? 'bg-white/15 text-amber-400' : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1 text-left">{item.label}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="ml-5 mt-0.5 space-y-0.5">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-xs transition-colors duration-150 ${
                            isActive
                              ? 'bg-amber-500/20 text-amber-400 font-medium'
                              : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          const Icon = item.icon!
          return (
            <NavLink
              key={item.path}
              to={item.path!}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors duration-150 mb-0.5 ${
                  isActive
                    ? 'bg-amber-500 text-white font-medium'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-steel-700 flex items-center justify-center text-xs font-medium">管</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">管理员</p>
            <p className="text-[10px] text-white/40">admin@mold.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
