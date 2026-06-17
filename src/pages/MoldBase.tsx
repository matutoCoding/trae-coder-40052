import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { useAppStore } from '@/store'

const CAVITY_OPTIONS = [1, 2, 4, 8, 16] as const
const TYPE_OPTIONS = ['两板模', '三板模', '热流道'] as const

export default function MoldBase() {
  const { moldBases, updateMoldBase } = useAppStore()
  const [cavityFilter, setCavityFilter] = useState<number | '全部'>('全部')
  const [typeFilter, setTypeFilter] = useState<string>('全部')
  const [search, setSearch] = useState('')

  const filtered = moldBases.filter((mb) => {
    if (cavityFilter !== '全部' && mb.cavities !== cavityFilter) return false
    if (typeFilter !== '全部' && mb.type !== typeFilter) return false
    if (search && !mb.model.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleToggle = (id: string, currentSelected: boolean) => {
    updateMoldBase(id, { selected: !currentSelected })
  }

  return (
    <div>
      <PageHeader title="标准模架选型" subtitle="选择适合的标准模架规格" />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-gray-500 mr-1">型腔数</span>
          {CAVITY_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => setCavityFilter(n)}
              className={`px-3 py-1 rounded text-sm ${
                cavityFilter === n
                  ? 'btn-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setCavityFilter('全部')}
            className={`px-3 py-1 rounded text-sm ${
              cavityFilter === '全部'
                ? 'btn-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200" />

        <div className="flex items-center gap-1.5">
          <span className="text-sm text-gray-500 mr-1">模架类型</span>
          {TYPE_OPTIONS.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded text-sm ${
                typeFilter === t
                  ? 'btn-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => setTypeFilter('全部')}
            className={`px-3 py-1 rounded text-sm ${
              typeFilter === '全部'
                ? 'btn-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200" />

        <input
          type="text"
          placeholder="搜索型号..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field w-48"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((mb) => (
          <div
            key={mb.id}
            onClick={() => handleToggle(mb.id, mb.selected)}
            className={`card cursor-pointer relative transition-all ${
              mb.selected
                ? 'border-l-4 border-amber-500 bg-amber-50/50'
                : 'hover:shadow-md'
            }`}
          >
            {mb.selected && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            <div className="font-bold text-gray-900 mb-2">{mb.model}</div>

            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2 py-0.5 rounded ${
                mb.type === '两板模'
                  ? 'bg-blue-100 text-blue-700'
                  : mb.type === '三板模'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {mb.type}
              </span>
              <span className="text-xs bg-amber-100 text-amber-500 px-2 py-0.5 rounded">
                {mb.cavities}腔
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>尺寸</span>
                <span>{mb.size}</span>
              </div>
              <div className="flex justify-between">
                <span>材质</span>
                <span>{mb.material}</span>
              </div>
              <div className="flex justify-between">
                <span>供应商</span>
                <span>{mb.supplier}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 text-right">
              <span className="font-mono text-lg font-semibold text-gray-900">
                ¥{mb.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          没有匹配的模架规格
        </div>
      )}
    </div>
  )
}
