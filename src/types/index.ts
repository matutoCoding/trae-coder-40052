export type ProjectStatus = 'quotation' | 'design' | 'machining' | 'assembly' | 'trial' | 'accepted' | 'inventory'

export interface MoldProject {
  id: string
  name: string
  customer: string
  productName: string
  status: ProjectStatus
  createdAt: string
  deadline: string
}

export type QuotationStatus = 'draft' | 'submitted' | 'approved' | 'rejected'

export interface Quotation {
  id: string
  projectId: string
  projectName: string
  customer: string
  materialCost: number
  machiningCost: number
  designCost: number
  managementCost: number
  totalCost: number
  status: QuotationStatus
  createdAt: string
}

export interface MoldBase {
  id: string
  model: string
  type: string
  cavities: number
  size: string
  material: string
  supplier: string
  price: number
  selected: boolean
}

export type PartType = 'cavity' | 'core' | 'electrode' | 'other'
export type ProcessStatus = 'pending' | 'processing' | 'completed'

export interface MachiningProcess {
  name: string
  machine: string
  duration: number
  status: ProcessStatus
}

export interface MachiningOrder {
  id: string
  projectId: string
  projectName: string
  partName: string
  partType: PartType
  processes: MachiningProcess[]
  status: ProcessStatus
  createdAt: string
}

export interface DischargeParams {
  current: number
  voltage: number
  pulseOn: number
  pulseOff: number
}

export interface EDMRecord {
  id: string
  projectId: string
  projectName: string
  electrodeType: string
  dischargeParams: DischargeParams
  wearRate: number
  status: ProcessStatus
  createdAt: string
}

export interface WireCutParams {
  wireDiameter: number
  cutSpeed: number
  surfaceRoughness: number
}

export interface WireCutRecord {
  id: string
  projectId: string
  projectName: string
  wireType: string
  cutParams: WireCutParams
  precision: number
  status: ProcessStatus
  createdAt: string
}

export interface AssemblyStep {
  name: string
  description: string
  status: ProcessStatus
}

export interface AssemblyOrder {
  id: string
  projectId: string
  projectName: string
  steps: AssemblyStep[]
  issues: string[]
  status: ProcessStatus
  assignee: string
  createdAt: string
}

export interface InjectionParams {
  temperature: number
  pressure: number
  speed: number
  coolingTime: number
}

export type TrialResult = 'pass' | 'fail' | 'conditional'

export interface TrialRecord {
  id: string
  projectId: string
  projectName: string
  trialDate: string
  machineNo: string
  injectionParams: InjectionParams
  sampleCondition: string
  issues: string[]
  result: TrialResult
}

export interface InspectionItem {
  name: string
  standard: string
  measured: string
  result: 'pass' | 'fail'
}

export interface InspectionRecord {
  id: string
  projectId: string
  projectName: string
  trialId: string
  items: InspectionItem[]
  overallResult: TrialResult
  createdAt: string
}

export type MaintenanceType = 'repair' | 'maintenance'

export interface MaintenanceOrder {
  id: string
  projectId: string
  projectName: string
  type: MaintenanceType
  description: string
  assignee: string
  status: ProcessStatus
  createdAt: string
  completedAt?: string
}

export interface ReplacementRecord {
  date: string
  reason: string
  operator: string
}

export interface WearPart {
  id: string
  projectId: string
  projectName: string
  name: string
  specification: string
  currentLife: number
  maxLife: number
  replacementHistory: ReplacementRecord[]
}

export type InventoryStatus = 'in_stock' | 'out_stock' | 'maintenance'

export interface MoldInventory {
  id: string
  projectId: string
  projectName: string
  storageLocation: string
  status: InventoryStatus
  inDate: string
  outDate?: string
  totalShots: number
}

export const STATUS_LABELS: Record<ProcessStatus, string> = {
  pending: '待处理',
  processing: '进行中',
  completed: '已完成',
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  quotation: '报价中',
  design: '设计中',
  machining: '加工中',
  assembly: '装配中',
  trial: '试模中',
  accepted: '已验收',
  inventory: '已入库',
}

export const QUOTATION_STATUS_LABELS: Record<QuotationStatus, string> = {
  draft: '草稿',
  submitted: '已提交',
  approved: '已审批',
  rejected: '已驳回',
}

export const INVENTORY_STATUS_LABELS: Record<InventoryStatus, string> = {
  in_stock: '在库',
  out_stock: '出库',
  maintenance: '维修中',
}

export const MAINTENANCE_TYPE_LABELS: Record<MaintenanceType, string> = {
  repair: '维修',
  maintenance: '保养',
}

export const TRIAL_RESULT_LABELS: Record<TrialResult, string> = {
  pass: '合格',
  fail: '不合格',
  conditional: '有条件合格',
}
