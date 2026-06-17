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

export const useAppStore = create<AppStore>((set) => ({
  projects: mockProjects,
  quotations: mockQuotations,
  moldBases: mockMoldBases,
  machiningOrders: mockMachiningOrders,
  edmRecords: mockEDMRecords,
  wireCutRecords: mockWireCutRecords,
  assemblyOrders: mockAssemblyOrders,
  trialRecords: mockTrialRecords,
  inspectionRecords: mockInspectionRecords,
  maintenanceOrders: mockMaintenanceOrders,
  wearParts: mockWearParts,
  inventory: mockInventory,

  addQuotation: (q) => set((s) => ({ quotations: [...s.quotations, q] })),
  updateQuotation: (id, updates) => set((s) => ({
    quotations: s.quotations.map((q) => q.id === id ? { ...q, ...updates } : q)
  })),

  addMachiningOrder: (o) => set((s) => ({ machiningOrders: [...s.machiningOrders, o] })),
  updateMachiningOrder: (id, updates) => set((s) => ({
    machiningOrders: s.machiningOrders.map((o) => o.id === id ? { ...o, ...updates } : o)
  })),

  addEDMRecord: (r) => set((s) => ({ edmRecords: [...s.edmRecords, r] })),
  updateEDMRecord: (id, updates) => set((s) => ({
    edmRecords: s.edmRecords.map((r) => r.id === id ? { ...r, ...updates } : r)
  })),

  addWireCutRecord: (r) => set((s) => ({ wireCutRecords: [...s.wireCutRecords, r] })),
  updateWireCutRecord: (id, updates) => set((s) => ({
    wireCutRecords: s.wireCutRecords.map((r) => r.id === id ? { ...r, ...updates } : r)
  })),

  addAssemblyOrder: (o) => set((s) => ({ assemblyOrders: [...s.assemblyOrders, o] })),
  updateAssemblyOrder: (id, updates) => set((s) => ({
    assemblyOrders: s.assemblyOrders.map((o) => o.id === id ? { ...o, ...updates } : o)
  })),

  addTrialRecord: (r) => set((s) => ({ trialRecords: [...s.trialRecords, r] })),
  addInspectionRecord: (r) => set((s) => ({ inspectionRecords: [...s.inspectionRecords, r] })),

  addMaintenanceOrder: (o) => set((s) => ({ maintenanceOrders: [...s.maintenanceOrders, o] })),
  updateMaintenanceOrder: (id, updates) => set((s) => ({
    maintenanceOrders: s.maintenanceOrders.map((o) => o.id === id ? { ...o, ...updates } : o)
  })),

  addWearPart: (p) => set((s) => ({ wearParts: [...s.wearParts, p] })),
  updateWearPart: (id, updates) => set((s) => ({
    wearParts: s.wearParts.map((p) => p.id === id ? { ...p, ...updates } : p)
  })),

  addInventory: (i) => set((s) => ({ inventory: [...s.inventory, i] })),
  updateInventory: (id, updates) => set((s) => ({
    inventory: s.inventory.map((inv) => inv.id === id ? { ...inv, ...updates } : inv)
  })),

  updateMoldBase: (id, updates) => set((s) => ({
    moldBases: s.moldBases.map((mb) => mb.id === id ? { ...mb, ...updates } : mb)
  })),
}))
