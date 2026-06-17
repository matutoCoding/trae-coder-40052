import type {
  MoldProject, Quotation, MoldBase, MachiningOrder,
  EDMRecord, WireCutRecord, AssemblyOrder, TrialRecord,
  InspectionRecord, MaintenanceOrder, WearPart, MoldInventory
} from '@/types'

export const mockProjects: MoldProject[] = [
  { id: 'P001', name: '汽车保险杠模具', customer: '长安汽车', productName: '前保险杠', status: 'machining', createdAt: '2026-03-15', deadline: '2026-07-20' },
  { id: 'P002', name: '家电外壳模具', customer: '美的集团', productName: '空调面板', status: 'assembly', createdAt: '2026-02-20', deadline: '2026-06-30' },
  { id: 'P003', name: '手机壳模具', customer: '华为终端', productName: 'Mate60保护壳', status: 'trial', createdAt: '2026-04-01', deadline: '2026-06-15' },
  { id: 'P004', name: '医疗器械模具', customer: '迈瑞医疗', productName: '监护仪外壳', status: 'quotation', createdAt: '2026-05-10', deadline: '2026-09-30' },
  { id: 'P005', name: '连接器模具', customer: '富士康', productName: 'Type-C接口', status: 'design', createdAt: '2026-04-25', deadline: '2026-08-15' },
  { id: 'P006', name: '齿轮模具', customer: '博世汽车', productName: '传动齿轮', status: 'accepted', createdAt: '2026-01-10', deadline: '2026-05-30' },
  { id: 'P007', name: '瓶盖模具', customer: '农夫山泉', productName: '5L瓶盖', status: 'inventory', createdAt: '2025-11-20', deadline: '2026-03-15' },
  { id: 'P008', name: '笔记本电脑外壳', customer: '联想集团', productName: 'ThinkPad外壳', status: 'machining', createdAt: '2026-03-28', deadline: '2026-08-01' },
]

export const mockQuotations: Quotation[] = [
  { id: 'Q001', projectId: 'P001', projectName: '汽车保险杠模具', customer: '长安汽车', materialCost: 85000, machiningCost: 120000, designCost: 45000, managementCost: 18000, totalCost: 268000, status: 'approved', createdAt: '2026-03-16' },
  { id: 'Q002', projectId: 'P002', projectName: '家电外壳模具', customer: '美的集团', materialCost: 42000, machiningCost: 68000, designCost: 25000, managementCost: 9500, totalCost: 144500, status: 'approved', createdAt: '2026-02-22' },
  { id: 'Q003', projectId: 'P003', projectName: '手机壳模具', customer: '华为终端', materialCost: 28000, machiningCost: 52000, designCost: 35000, managementCost: 8200, totalCost: 123200, status: 'approved', createdAt: '2026-04-02' },
  { id: 'Q004', projectId: 'P004', projectName: '医疗器械模具', customer: '迈瑞医疗', materialCost: 65000, machiningCost: 95000, designCost: 55000, managementCost: 15000, totalCost: 230000, status: 'draft', createdAt: '2026-05-11' },
  { id: 'Q005', projectId: 'P005', projectName: '连接器模具', customer: '富士康', materialCost: 18000, machiningCost: 35000, designCost: 22000, managementCost: 5600, totalCost: 80600, status: 'submitted', createdAt: '2026-04-26' },
  { id: 'Q006', projectId: 'P006', projectName: '齿轮模具', customer: '博世汽车', materialCost: 55000, machiningCost: 88000, designCost: 38000, managementCost: 12800, totalCost: 193800, status: 'approved', createdAt: '2026-01-12' },
  { id: 'Q007', projectId: 'P007', projectName: '瓶盖模具', customer: '农夫山泉', materialCost: 22000, machiningCost: 38000, designCost: 15000, managementCost: 5200, totalCost: 80200, status: 'approved', createdAt: '2025-11-22' },
  { id: 'Q008', projectId: 'P008', projectName: '笔记本电脑外壳', customer: '联想集团', materialCost: 72000, machiningCost: 105000, designCost: 48000, managementCost: 16000, totalCost: 241000, status: 'submitted', createdAt: '2026-03-29' },
]

export const mockMoldBases: MoldBase[] = [
  { id: 'MB001', model: 'HASCO Z4440', type: '两板模', cavities: 4, size: '400×500×450', material: 'P20', supplier: '龙记LKM', price: 18500, selected: true },
  { id: 'MB002', model: 'DME A8010', type: '三板模', cavities: 2, size: '300×400×350', material: '718H', supplier: '龙记LKM', price: 22000, selected: false },
  { id: 'MB003', model: 'LKM CI3550', type: '两板模', cavities: 8, size: '500×600×500', material: 'P20', supplier: '龙记LKM', price: 28000, selected: true },
  { id: 'MB004', model: 'HASCO Z4560', type: '热流道', cavities: 1, size: '600×700×600', material: 'H13', supplier: 'HASCO', price: 45000, selected: false },
  { id: 'MB005', model: 'MISUMI SA', type: '两板模', cavities: 16, size: '250×300×250', material: 'S50C', supplier: 'MISUMI', price: 9800, selected: true },
  { id: 'MB006', model: 'LKM AI2535', type: '三板模', cavities: 4, size: '350×450×400', material: '718H', supplier: '龙记LKM', price: 19500, selected: false },
]

export const mockMachiningOrders: MachiningOrder[] = [
  { id: 'M001', projectId: 'P001', projectName: '汽车保险杠模具', partName: '前保险杠型腔', partType: 'cavity', processes: [{ name: '粗铣', machine: 'CNC-01', duration: 8, status: 'completed' }, { name: '精铣', machine: 'CNC-02', duration: 12, status: 'processing' }, { name: '抛光', machine: '抛光机-01', duration: 6, status: 'pending' }], status: 'processing', createdAt: '2026-04-10' },
  { id: 'M002', projectId: 'P001', projectName: '汽车保险杠模具', partName: '前保险杠型芯', partType: 'core', processes: [{ name: '粗铣', machine: 'CNC-03', duration: 10, status: 'completed' }, { name: '精铣', machine: 'CNC-01', duration: 14, status: 'pending' }, { name: '抛光', machine: '抛光机-02', duration: 8, status: 'pending' }], status: 'processing', createdAt: '2026-04-12' },
  { id: 'M003', projectId: 'P002', projectName: '家电外壳模具', partName: '空调面板型腔', partType: 'cavity', processes: [{ name: '粗铣', machine: 'CNC-02', duration: 6, status: 'completed' }, { name: '精铣', machine: 'CNC-01', duration: 10, status: 'completed' }, { name: '抛光', machine: '抛光机-01', duration: 4, status: 'completed' }], status: 'completed', createdAt: '2026-03-15' },
  { id: 'M004', projectId: 'P008', projectName: '笔记本电脑外壳', partName: 'ThinkPad外壳型腔', partType: 'cavity', processes: [{ name: '粗铣', machine: 'CNC-03', duration: 9, status: 'completed' }, { name: '精铣', machine: 'CNC-02', duration: 13, status: 'processing' }, { name: '抛光', machine: '抛光机-01', duration: 7, status: 'pending' }], status: 'processing', createdAt: '2026-04-20' },
  { id: 'M005', projectId: 'P005', projectName: '连接器模具', partName: 'Type-C接口型芯', partType: 'core', processes: [{ name: '粗铣', machine: 'CNC-01', duration: 4, status: 'pending' }, { name: '精铣', machine: 'CNC-03', duration: 6, status: 'pending' }], status: 'pending', createdAt: '2026-05-01' },
  { id: 'M006', projectId: 'P003', projectName: '手机壳模具', partName: 'Mate60保护壳型腔', partType: 'cavity', processes: [{ name: '粗铣', machine: 'CNC-02', duration: 5, status: 'completed' }, { name: '精铣', machine: 'CNC-01', duration: 8, status: 'completed' }, { name: '抛光', machine: '抛光机-02', duration: 3, status: 'completed' }], status: 'completed', createdAt: '2026-04-05' },
]

export const mockEDMRecords: EDMRecord[] = [
  { id: 'E001', projectId: 'P001', projectName: '汽车保险杠模具', electrodeType: '铜电极', dischargeParams: { current: 8, voltage: 60, pulseOn: 50, pulseOff: 30 }, wearRate: 0.3, status: 'processing', createdAt: '2026-04-18' },
  { id: 'E002', projectId: 'P003', projectName: '手机壳模具', electrodeType: '石墨电极', dischargeParams: { current: 5, voltage: 50, pulseOn: 40, pulseOff: 25 }, wearRate: 0.15, status: 'completed', createdAt: '2026-04-08' },
  { id: 'E003', projectId: 'P008', projectName: '笔记本电脑外壳', electrodeType: '铜钨电极', dischargeParams: { current: 10, voltage: 70, pulseOn: 60, pulseOff: 35 }, wearRate: 0.25, status: 'pending', createdAt: '2026-05-05' },
  { id: 'E004', projectId: 'P005', projectName: '连接器模具', electrodeType: '铜电极', dischargeParams: { current: 3, voltage: 40, pulseOn: 30, pulseOff: 20 }, wearRate: 0.2, status: 'pending', createdAt: '2026-05-02' },
  { id: 'E005', projectId: 'P002', projectName: '家电外壳模具', electrodeType: '石墨电极', dischargeParams: { current: 6, voltage: 55, pulseOn: 45, pulseOff: 28 }, wearRate: 0.18, status: 'completed', createdAt: '2026-03-20' },
]

export const mockWireCutRecords: WireCutRecord[] = [
  { id: 'W001', projectId: 'P001', projectName: '汽车保险杠模具', wireType: '黄铜丝Φ0.25', cutParams: { wireDiameter: 0.25, cutSpeed: 120, surfaceRoughness: 0.4 }, precision: 0.005, status: 'processing', createdAt: '2026-04-20' },
  { id: 'W002', projectId: 'P003', projectName: '手机壳模具', wireType: '黄铜丝Φ0.20', cutParams: { wireDiameter: 0.20, cutSpeed: 100, surfaceRoughness: 0.3 }, precision: 0.003, status: 'completed', createdAt: '2026-04-10' },
  { id: 'W003', projectId: 'P002', projectName: '家电外壳模具', wireType: '镀锌丝Φ0.25', cutParams: { wireDiameter: 0.25, cutSpeed: 110, surfaceRoughness: 0.35 }, precision: 0.004, status: 'completed', createdAt: '2026-03-18' },
  { id: 'W004', projectId: 'P005', projectName: '连接器模具', wireType: '黄铜丝Φ0.15', cutParams: { wireDiameter: 0.15, cutSpeed: 80, surfaceRoughness: 0.2 }, precision: 0.002, status: 'pending', createdAt: '2026-05-03' },
  { id: 'W005', projectId: 'P008', projectName: '笔记本电脑外壳', wireType: '镀锌丝Φ0.25', cutParams: { wireDiameter: 0.25, cutSpeed: 115, surfaceRoughness: 0.38 }, precision: 0.005, status: 'pending', createdAt: '2026-05-06' },
]

export const mockAssemblyOrders: AssemblyOrder[] = [
  { id: 'A001', projectId: 'P002', projectName: '家电外壳模具', steps: [{ name: '模架组装', description: '将定模和动模板安装到模架上', status: 'completed' }, { name: '型腔安装', description: '安装型腔镶件并调整间隙', status: 'completed' }, { name: '顶出系统安装', description: '安装顶针、顶板和复位弹簧', status: 'completed' }, { name: '冷却系统连接', description: '连接冷却水路并测试密封性', status: 'processing' }], issues: ['冷却水路接头处有轻微渗漏'], status: 'processing', assignee: '张师傅', createdAt: '2026-04-25' },
  { id: 'A002', projectId: 'P003', projectName: '手机壳模具', steps: [{ name: '模架组装', description: '将定模和动模板安装到模架上', status: 'completed' }, { name: '型腔安装', description: '安装型腔镶件并调整间隙', status: 'completed' }, { name: '顶出系统安装', description: '安装顶针、顶板和复位弹簧', status: 'completed' }, { name: '冷却系统连接', description: '连接冷却水路并测试密封性', status: 'completed' }], issues: [], status: 'completed', assignee: '李师傅', createdAt: '2026-04-18' },
  { id: 'A003', projectId: 'P001', projectName: '汽车保险杠模具', steps: [{ name: '模架组装', description: '将定模和动模板安装到模架上', status: 'pending' }, { name: '型腔安装', description: '安装型腔镶件并调整间隙', status: 'pending' }, { name: '热流道系统安装', description: '安装热流道系统及温控箱', status: 'pending' }], issues: [], status: 'pending', assignee: '王师傅', createdAt: '2026-05-01' },
]

export const mockTrialRecords: TrialRecord[] = [
  { id: 'T001', projectId: 'P003', projectName: '手机壳模具', trialDate: '2026-05-08', machineNo: 'IJ-003', injectionParams: { temperature: 230, pressure: 85, speed: 65, coolingTime: 12 }, sampleCondition: '表面光泽度不足，边缘有轻微飞边', issues: ['飞边', '光泽度不足'], result: 'conditional' },
  { id: 'T002', projectId: 'P002', projectName: '家电外壳模具', trialDate: '2026-05-12', machineNo: 'IJ-001', injectionParams: { temperature: 250, pressure: 92, speed: 70, coolingTime: 18 }, sampleCondition: '产品外观良好，尺寸在公差范围内', issues: [], result: 'pass' },
  { id: 'T003', projectId: 'P006', projectName: '齿轮模具', trialDate: '2026-04-20', machineNo: 'IJ-005', injectionParams: { temperature: 260, pressure: 110, speed: 55, coolingTime: 25 }, sampleCondition: '齿轮啮合精度不达标', issues: ['齿形偏差', '缩水'], result: 'fail' },
]

export const mockInspectionRecords: InspectionRecord[] = [
  { id: 'I001', projectId: 'P003', projectName: '手机壳模具', trialId: 'T001', items: [{ name: '外形尺寸', standard: '158×78×8mm', measured: '158.02×77.98×8.05mm', result: 'pass' }, { name: '表面粗糙度', standard: 'Ra≤0.8', measured: 'Ra1.2', result: 'fail' }, { name: '壁厚均匀性', standard: '±0.1mm', measured: '+0.15/-0.08mm', result: 'fail' }], overallResult: 'conditional', createdAt: '2026-05-09' },
  { id: 'I002', projectId: 'P002', projectName: '家电外壳模具', trialId: 'T002', items: [{ name: '外形尺寸', standard: '420×320×15mm', measured: '420.05×320.02×15.01mm', result: 'pass' }, { name: '表面粗糙度', standard: 'Ra≤1.2', measured: 'Ra0.9', result: 'pass' }, { name: '平面度', standard: '≤0.3mm', measured: '0.18mm', result: 'pass' }], overallResult: 'pass', createdAt: '2026-05-13' },
  { id: 'I003', projectId: 'P006', projectName: '齿轮模具', trialId: 'T003', items: [{ name: '齿形精度', standard: '6级', measured: '8级', result: 'fail' }, { name: '齿距偏差', standard: '±0.02mm', measured: '+0.05mm', result: 'fail' }, { name: '外观检查', standard: '无缩水、气泡', measured: '有缩水痕迹', result: 'fail' }], overallResult: 'fail', createdAt: '2026-04-21' },
]

export const mockMaintenanceOrders: MaintenanceOrder[] = [
  { id: 'MT001', projectId: 'P006', projectName: '齿轮模具', type: 'repair', description: '齿模型腔磨损，需修复齿形', assignee: '赵工', status: 'processing', createdAt: '2026-04-22' },
  { id: 'MT002', projectId: 'P007', projectName: '瓶盖模具', type: 'maintenance', description: '定期保养，清洗冷却水路', assignee: '钱师傅', status: 'completed', createdAt: '2026-04-01', completedAt: '2026-04-02' },
  { id: 'MT003', projectId: 'P007', projectName: '瓶盖模具', type: 'repair', description: '螺纹型芯磨损，需更换', assignee: '赵工', status: 'pending', createdAt: '2026-05-15' },
  { id: 'MT004', projectId: 'P006', projectName: '齿轮模具', type: 'repair', description: '顶针卡滞，需修配', assignee: '孙师傅', status: 'pending', createdAt: '2026-05-10' },
]

export const mockWearParts: WearPart[] = [
  { id: 'WP001', projectId: 'P007', projectName: '瓶盖模具', name: '螺纹型芯', specification: 'M28×1.5', currentLife: 480000, maxLife: 500000, replacementHistory: [{ date: '2025-12-15', reason: '达到使用寿命', operator: '赵工' }, { date: '2026-03-10', reason: '磨损超限', operator: '赵工' }] },
  { id: 'WP002', projectId: 'P007', projectName: '瓶盖模具', name: '顶针', specification: 'Φ4×120', currentLife: 350000, maxLife: 400000, replacementHistory: [{ date: '2026-01-20', reason: '弯曲变形', operator: '钱师傅' }] },
  { id: 'WP003', projectId: 'P006', projectName: '齿轮模具', name: '齿模型腔镶件', specification: 'Z=20 M=2', currentLife: 180000, maxLife: 200000, replacementHistory: [{ date: '2026-02-28', reason: '齿形磨损', operator: '赵工' }] },
  { id: 'WP004', projectId: 'P001', projectName: '汽车保险杠模具', name: '浇口套', specification: 'Φ12×80', currentLife: 120000, maxLife: 150000, replacementHistory: [] },
  { id: 'WP005', projectId: 'P002', projectName: '家电外壳模具', name: '斜顶滑块', specification: '15°×60', currentLife: 95000, maxLife: 100000, replacementHistory: [{ date: '2026-03-05', reason: '导轨磨损', operator: '孙师傅' }] },
]

export const mockInventory: MoldInventory[] = [
  { id: 'IV001', projectId: 'P007', projectName: '瓶盖模具', storageLocation: 'A区-03号架', status: 'in_stock', inDate: '2026-03-16', totalShots: 480000 },
  { id: 'IV002', projectId: 'P006', projectName: '齿轮模具', storageLocation: 'B区-01号架', status: 'maintenance', inDate: '2026-05-28', totalShots: 180000 },
]
