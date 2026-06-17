import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'
import QuotationList from '@/pages/quotation/QuotationList'
import QuotationForm from '@/pages/quotation/QuotationForm'
import QuotationDetail from '@/pages/quotation/QuotationDetail'
import MoldBase from '@/pages/MoldBase'
import MachiningList from '@/pages/machining/MachiningList'
import MachiningDetail from '@/pages/machining/MachiningDetail'
import EDMList from '@/pages/edm/EDMList'
import EDMForm from '@/pages/edm/EDMForm'
import WireCutList from '@/pages/wirecut/WireCutList'
import AssemblyList from '@/pages/assembly/AssemblyList'
import AssemblyDetail from '@/pages/assembly/AssemblyDetail'
import AssemblyForm from '@/pages/assembly/AssemblyForm'
import TrialList from '@/pages/trial/TrialList'
import TrialForm from '@/pages/trial/TrialForm'
import InspectionList from '@/pages/inspection/InspectionList'
import MaintenanceList from '@/pages/maintenance/MaintenanceList'
import MaintenanceForm from '@/pages/maintenance/MaintenanceForm'
import WearPartsList from '@/pages/wearparts/WearPartsList'
import LifespanStats from '@/pages/lifespan/LifespanStats'
import InventoryLedger from '@/pages/inventory/InventoryLedger'
import InventoryForm from '@/pages/inventory/InventoryForm'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/quotation" element={<QuotationList />} />
          <Route path="/quotation/new" element={<QuotationForm />} />
          <Route path="/quotation/:id" element={<QuotationDetail />} />
          <Route path="/mold-base" element={<MoldBase />} />
          <Route path="/machining" element={<MachiningList />} />
          <Route path="/machining/:id" element={<MachiningDetail />} />
          <Route path="/edm" element={<EDMList />} />
          <Route path="/edm/new" element={<EDMForm />} />
          <Route path="/wire-cut" element={<WireCutList />} />
          <Route path="/assembly" element={<AssemblyList />} />
          <Route path="/assembly/new" element={<AssemblyForm />} />
          <Route path="/assembly/:id" element={<AssemblyDetail />} />
          <Route path="/trial" element={<TrialList />} />
          <Route path="/trial/new" element={<TrialForm />} />
          <Route path="/inspection" element={<InspectionList />} />
          <Route path="/maintenance" element={<MaintenanceList />} />
          <Route path="/maintenance/new" element={<MaintenanceForm />} />
          <Route path="/wear-parts" element={<WearPartsList />} />
          <Route path="/lifespan" element={<LifespanStats />} />
          <Route path="/inventory" element={<InventoryLedger />} />
          <Route path="/inventory/new" element={<InventoryForm />} />
        </Route>
      </Routes>
    </Router>
  )
}
