import type { ProcessStatus, QuotationStatus, ProjectStatus, InventoryStatus, TrialResult, MaintenanceType } from '@/types'
import { STATUS_LABELS, QUOTATION_STATUS_LABELS, PROJECT_STATUS_LABELS, INVENTORY_STATUS_LABELS, TRIAL_RESULT_LABELS, MAINTENANCE_TYPE_LABELS } from '@/types'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
  warning: 'bg-amber-100 text-amber-700 ring-1 ring-amber-600/20',
  danger: 'bg-red-50 text-red-700 ring-1 ring-red-600/20',
  info: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
  neutral: 'bg-gray-100 text-gray-600 ring-1 ring-gray-500/20',
}

const processStatusVariant: Record<ProcessStatus, BadgeVariant> = {
  pending: 'neutral',
  processing: 'info',
  completed: 'success',
}

const quotationStatusVariant: Record<QuotationStatus, BadgeVariant> = {
  draft: 'neutral',
  submitted: 'info',
  approved: 'success',
  rejected: 'danger',
}

const projectStatusVariant: Record<ProjectStatus, BadgeVariant> = {
  quotation: 'info',
  design: 'info',
  machining: 'warning',
  assembly: 'warning',
  trial: 'info',
  accepted: 'success',
  inventory: 'success',
}

const inventoryStatusVariant: Record<InventoryStatus, BadgeVariant> = {
  in_stock: 'success',
  out_stock: 'neutral',
  maintenance: 'warning',
}

const trialResultVariant: Record<TrialResult, BadgeVariant> = {
  pass: 'success',
  fail: 'danger',
  conditional: 'warning',
}

const maintenanceTypeVariant: Record<MaintenanceType, BadgeVariant> = {
  repair: 'danger',
  maintenance: 'info',
}

interface StatusBadgeProps {
  type: 'process' | 'quotation' | 'project' | 'inventory' | 'trial' | 'maintenance'
  status: string
}

export default function StatusBadge({ type, status }: StatusBadgeProps) {
  let label = status
  let variant: BadgeVariant = 'neutral'

  if (type === 'process') {
    label = STATUS_LABELS[status as ProcessStatus] || status
    variant = processStatusVariant[status as ProcessStatus] || 'neutral'
  } else if (type === 'quotation') {
    label = QUOTATION_STATUS_LABELS[status as QuotationStatus] || status
    variant = quotationStatusVariant[status as QuotationStatus] || 'neutral'
  } else if (type === 'project') {
    label = PROJECT_STATUS_LABELS[status as ProjectStatus] || status
    variant = projectStatusVariant[status as ProjectStatus] || 'neutral'
  } else if (type === 'inventory') {
    label = INVENTORY_STATUS_LABELS[status as InventoryStatus] || status
    variant = inventoryStatusVariant[status as InventoryStatus] || 'neutral'
  } else if (type === 'trial') {
    label = TRIAL_RESULT_LABELS[status as TrialResult] || status
    variant = trialResultVariant[status as TrialResult] || 'neutral'
  } else if (type === 'maintenance') {
    label = MAINTENANCE_TYPE_LABELS[status as MaintenanceType] || status
    variant = maintenanceTypeVariant[status as MaintenanceType] || 'neutral'
  }

  return <span className={`status-badge ${variantStyles[variant]}`}>{label}</span>
}
