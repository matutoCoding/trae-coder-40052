import { create } from 'zustand'
import type {
  MoldProject, Quotation, MoldBase, MachiningOrder,
  EDMRecord, WireCutRecord, AssemblyOrder, TrialRecord,
  InspectionRecord, MaintenanceOrder, WearPart, MoldInventory
} from '@/types'
import {
  mockProjects, mockQuotations, mockMoldBases, mockMachiningOrders,
  mockEDMRecords, mockWireCutRecords, mockAssemblyOrders, mockTrialRecords,
  mockInspectionRecords, mockMaintenanceOrders, mockWearParts, mockInventory
} from '@/data/mockData'

const STORAGE_KEY = 'mold_mgmt_store_v1'

interface PersistedState {
  quotations: Quotation[]
  moldBases: MoldBase[]
  wearParts: WearPart[]
  inventory: MoldInventory[]
  machiningOrders: MachiningOrder[]
  edmRecords: EDMRecord[]
  wireCutRecords: WireCutRecord[]
  assemblyOrders: AssemblyOrder[]
  trialRecords: TrialRecord[]
  inspectionRecords: InspectionRecord[]
  maintenanceOrders: MaintenanceOrder[]
}

const PERSIST_KEYS: (keyof PersistedState)[] = [
  'quotations', 'moldBases', 'wearParts', 'inventory',
  'machiningOrders', 'edmRecords', 'wireCutRecords',
  'assemblyOrders', 'trialRecords', 'inspectionRecords', 'maintenanceOrders'
]

function loadPersistedState(): Partial<PersistedState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as PersistedState
    const result: Partial<PersistedState> = {}
    for (const key of PERSIST_KEYS) {
      if (parsed[key] !== undefined) {
        (result as any)[key] = parsed[key]
      }
    }
    return result
  } catch (e) {
    console.warn('Failed to load persisted state:', e)
    return {}
  }
}

function savePersistedState(state: Partial<PersistedState>) {
  try {
    const toSave: Partial<PersistedState> = {}
    for (const key of PERSIST_KEYS) {
      if (state[key] !== undefined) {
        (toSave as any)[key] = state[key]
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch (e) {
    console.warn('Failed to save persisted state:', e)
  }
}

const persisted = loadPersistedState()

interface AppStore {
  projects: MoldProject[]
  quotations: Quotation[]
  moldBases: MoldBase[]
  machiningOrders: MachiningOrder[]
  edmRecords: EDMRecord[]
  wireCutRecords: WireCutRecord[]
  assemblyOrders: AssemblyOrder[]
  trialRecords: TrialRecord[]
  inspectionRecords: InspectionRecord[]
  maintenanceOrders: MaintenanceOrder[]
  wearParts: WearPart[]
  inventory: MoldInventory[]

  addQuotation: (q: Quotation) => void
  updateQuotation: (id: string, updates: Partial<Quotation>) => void
  addMachiningOrder: (o: MachiningOrder) => void
  updateMachiningOrder: (id: string, updates: Partial<MachiningOrder>) => void
  addEDMRecord: (r: EDMRecord) => void
  updateEDMRecord: (id: string, updates: Partial<EDMRecord>) => void
  addWireCutRecord: (r: WireCutRecord) => void
  updateWireCutRecord: (id: string, updates: Partial<WireCutRecord>) => void
  addAssemblyOrder: (o: AssemblyOrder) => void
  updateAssemblyOrder: (id: string, updates: Partial<AssemblyOrder>) => void
  addTrialRecord: (r: TrialRecord) => void
  addInspectionRecord: (r: InspectionRecord) => void
  addMaintenanceOrder: (o: MaintenanceOrder) => void
  updateMaintenanceOrder: (id: string, updates: Partial<MaintenanceOrder>) => void
  addWearPart: (p: WearPart) => void
  updateWearPart: (id: string, updates: Partial<WearPart>) => void
  addInventory: (i: MoldInventory) => void
  updateInventory: (id: string, updates: Partial<MoldInventory>) => void
  updateMoldBase: (id: string, updates: Partial<MoldBase>) => void
}

const persistMiddleware = (getState: () => AppStore) => {
  const state = getState()
  const toPersist: Partial<PersistedState> = {}
  for (const key of PERSIST_KEYS) {
    (toPersist as any)[key] = state[key]
  }
  savePersistedState(toPersist)
}

export const useAppStore = create<AppStore>((set, get) => ({
  projects: mockProjects,
  quotations: persisted.quotations ?? mockQuotations,
  moldBases: persisted.moldBases ?? mockMoldBases,
  machiningOrders: persisted.machiningOrders ?? mockMachiningOrders,
  edmRecords: persisted.edmRecords ?? mockEDMRecords,
  wireCutRecords: persisted.wireCutRecords ?? mockWireCutRecords,
  assemblyOrders: persisted.assemblyOrders ?? mockAssemblyOrders,
  trialRecords: persisted.trialRecords ?? mockTrialRecords,
  inspectionRecords: persisted.inspectionRecords ?? mockInspectionRecords,
  maintenanceOrders: persisted.maintenanceOrders ?? mockMaintenanceOrders,
  wearParts: persisted.wearParts ?? mockWearParts,
  inventory: persisted.inventory ?? mockInventory,

  addQuotation: (q) => {
    set((s) => ({ quotations: [...s.quotations, q] }))
    persistMiddleware(get)
  },
  updateQuotation: (id, updates) => {
    set((s) => ({
      quotations: s.quotations.map((q) => q.id === id ? { ...q, ...updates } : q)
    }))
    persistMiddleware(get)
  },

  addMachiningOrder: (o) => {
    set((s) => ({ machiningOrders: [...s.machiningOrders, o] }))
    persistMiddleware(get)
  },
  updateMachiningOrder: (id, updates) => {
    set((s) => ({
      machiningOrders: s.machiningOrders.map((o) => o.id === id ? { ...o, ...updates } : o)
    }))
    persistMiddleware(get)
  },

  addEDMRecord: (r) => {
    set((s) => ({ edmRecords: [...s.edmRecords, r] }))
    persistMiddleware(get)
  },
  updateEDMRecord: (id, updates) => {
    set((s) => ({
      edmRecords: s.edmRecords.map((r) => r.id === id ? { ...r, ...updates } : r)
    }))
    persistMiddleware(get)
  },

  addWireCutRecord: (r) => {
    set((s) => ({ wireCutRecords: [...s.wireCutRecords, r] }))
    persistMiddleware(get)
  },
  updateWireCutRecord: (id, updates) => {
    set((s) => ({
      wireCutRecords: s.wireCutRecords.map((r) => r.id === id ? { ...r, ...updates } : r)
    }))
    persistMiddleware(get)
  },

  addAssemblyOrder: (o) => {
    set((s) => ({ assemblyOrders: [...s.assemblyOrders, o] }))
    persistMiddleware(get)
  },
  updateAssemblyOrder: (id, updates) => {
    set((s) => ({
      assemblyOrders: s.assemblyOrders.map((o) => o.id === id ? { ...o, ...updates } : o)
    }))
    persistMiddleware(get)
  },

  addTrialRecord: (r) => {
    set((s) => ({ trialRecords: [...s.trialRecords, r] }))
    persistMiddleware(get)
  },
  addInspectionRecord: (r) => {
    set((s) => ({ inspectionRecords: [...s.inspectionRecords, r] }))
    persistMiddleware(get)
  },

  addMaintenanceOrder: (o) => {
    set((s) => ({ maintenanceOrders: [...s.maintenanceOrders, o] }))
    persistMiddleware(get)
  },
  updateMaintenanceOrder: (id, updates) => {
    set((s) => ({
      maintenanceOrders: s.maintenanceOrders.map((o) => o.id === id ? { ...o, ...updates } : o)
    }))
    persistMiddleware(get)
  },

  addWearPart: (p) => {
    set((s) => ({ wearParts: [...s.wearParts, p] }))
    persistMiddleware(get)
  },
  updateWearPart: (id, updates) => {
    set((s) => ({
      wearParts: s.wearParts.map((p) => p.id === id ? { ...p, ...updates } : p)
    }))
    persistMiddleware(get)
  },

  addInventory: (i) => {
    set((s) => ({ inventory: [...s.inventory, i] }))
    persistMiddleware(get)
  },
  updateInventory: (id, updates) => {
    set((s) => ({
      inventory: s.inventory.map((inv) => inv.id === id ? { ...inv, ...updates } : inv)
    }))
    persistMiddleware(get)
  },

  updateMoldBase: (id, updates) => {
    set((s) => ({
      moldBases: s.moldBases.map((mb) => mb.id === id ? { ...mb, ...updates } : mb)
    }))
    persistMiddleware(get)
  },
}))
