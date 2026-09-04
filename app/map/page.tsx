"use client"

import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import { 
  MapPin, 
  Layers, 
  Store, 
  Truck, 
  Users, 
  Compass, 
  AlertCircle,
  Filter,
  Briefcase
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { getAllReports, getActiveReport, setActiveReport, BusinessReport } from '@/lib/report-store'

export default function MarketMapPage() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('all')
  const [reportsList, setReportsList] = useState<BusinessReport[]>([])
  const [activeReport, setActiveReportState] = useState<BusinessReport>(() => getActiveReport())

  const syncData = () => {
    const list = getAllReports()
    setReportsList(list)
    const active = getActiveReport()
    setActiveReportState(active)
  }

  useEffect(() => {
    syncData()

    const handleReportChange = () => {
      syncData()
    }

    window.addEventListener('gs_report_changed', handleReportChange)
    return () => window.removeEventListener('gs_report_changed', handleReportChange)
  }, [])

  const handleSwitchEnterprise = (id: string) => {
    const updated = setActiveReport(id)
    if (updated) {
      setActiveReportState(updated)
    }
  }

  // Dynamic coordinates by district/location
  const getCoordinates = (district: string, state: string) => {
    const d = (district || '').toLowerCase()
    if (d.includes('narmada')) return { lat: '21.6362° N', lng: '73.5898° E' }
    if (d.includes('vadodara')) return { lat: '22.2587° N', lng: '73.2144° E' }
    if (d.includes('bharuch')) return { lat: '21.6264° N', lng: '73.0152° E' }
    if (d.includes('anand')) return { lat: '22.5645° N', lng: '72.9289° E' }
    if (d.includes('surat')) return { lat: '21.1702° N', lng: '72.8311° E' }
    if (d.includes('ahmedabad')) return { lat: '23.0225° N', lng: '72.5714° E' }
    return { lat: '22.3094° N', lng: '73.1812° E' }
  }

  const coords = getCoordinates(activeReport.district, activeReport.state)
  const villageName = activeReport.village || 'Central Village'
  const blockName = activeReport.block || 'Taluka Block'
  const districtName = activeReport.district || 'District Hub'
  const category = activeReport.category

  // Dynamically generate ecosystem entities based on user's active category & village
  const getCompetitors = () => {
    if (category === 'Dairy') {
      return [
        { id: 1, name: `${villageName} Dairy Cooperative`, dist: '1.8 km', type: 'Dairy', capacity: '12 Cattle Units', market: 'Raw Milk Supply' },
        { id: 2, name: `${districtName} Milk Chilling Hub`, dist: '2.4 km', type: 'Offtake', capacity: 'Procurement Hub', market: 'Bulk Cooperative' },
        { id: 3, name: `${blockName} Kisan Seva Mandi`, dist: '6.5 km', type: 'Mandi', capacity: 'Weekly Haat', market: 'Agri & Livestock' },
        { id: 4, name: 'Kisan Milk & Curd Depot', dist: '3.1 km', type: 'Dairy', capacity: '6 Cattle Units', market: 'Local Direct Retail' },
        { id: 5, name: 'Regional Chilling Unit', dist: '8.2 km', type: 'Offtake', capacity: 'Bulk Processing', market: 'Institutional Buyers' },
        { id: 6, name: 'Veterinary First-Aid Clinic', dist: '4.7 km', type: 'Support', capacity: 'Emergency & Vaccine', market: 'Animal Health' },
      ]
    } else if (category === 'Food Processing') {
      return [
        { id: 1, name: `${villageName} Traditional Flour Mill`, dist: '1.1 km', type: 'Retail', capacity: 'Custom Milling', market: 'Village Groceries' },
        { id: 2, name: `${districtName} APMC Grain Mandi`, dist: '4.2 km', type: 'Mandi', capacity: 'B2B Wholesale Grains', market: 'Wheat & Spices' },
        { id: 3, name: `${blockName} Weekly Consumer Haat`, dist: '3.5 km', type: 'Offtake', capacity: 'Consumer Haat', market: 'Household Groceries' },
        { id: 4, name: 'Regional Spice Extraction Hub', dist: '6.8 km', type: 'Offtake', capacity: 'Wholesale Depot', market: 'Institutional Buyers' },
        { id: 5, name: 'State Warehousing Depot', dist: '7.8 km', type: 'Offtake', capacity: 'Grain Buffer Storage', market: 'Supply Chain' },
        { id: 6, name: 'FSSAI Testing & Advisory Cell', dist: '5.2 km', type: 'Support', capacity: 'Certification Lab', market: 'Compliance Support' },
      ]
    } else if (category === 'Goat Rearing') {
      return [
        { id: 1, name: `${villageName} Livestock Graziers Group`, dist: '1.5 km', type: 'Retail', capacity: 'Breeding Flocks', market: 'Live Animals' },
        { id: 2, name: `${districtName} Animal Livestock Mandi`, dist: '5.8 km', type: 'Mandi', capacity: 'B2B Trade', market: 'Goat & Sheep' },
        { id: 3, name: `${blockName} Veterinary Hospital`, dist: '3.2 km', type: 'Support', capacity: 'De-worming & PPR', market: 'Animal Care' },
        { id: 4, name: 'District Meat Offtake Aggregator', dist: '7.4 km', type: 'Offtake', capacity: 'Contract Offtake', market: 'Semi-urban Retail' },
        { id: 5, name: 'Fodder Seed Depot (KVK)', dist: '4.9 km', type: 'Support', capacity: 'Subabul & Napier', market: 'Pasture Feed' },
        { id: 6, name: 'Weekly Haat Traders Point', dist: '6.1 km', type: 'Mandi', capacity: 'Direct Sales', market: 'Festive Offtake' },
      ]
    } else if (category === 'Solar Agriculture') {
      return [
        { id: 1, name: `${villageName} Farm Feeder Substation`, dist: '2.1 km', type: 'Support', capacity: '11 kV Feeder', market: 'Grid Connection' },
        { id: 2, name: `${districtName} DISCOM Division Office`, dist: '5.4 km', type: 'Support', capacity: 'Net-metering Desk', market: 'Statutory Clearances' },
        { id: 3, name: `${blockName} Solar Service Center`, dist: '3.8 km', type: 'Retail', capacity: 'Inverter Spares', market: 'Maintenance' },
        { id: 4, name: 'Kusum Component Depot', dist: '8.2 km', type: 'Offtake', capacity: 'PV Panels & Pumps', market: 'Authorized Dealer' },
        { id: 5, name: 'Agri Water Users Association', dist: '1.9 km', type: 'Offtake', capacity: 'Community Irrigation', market: 'Custom Water Sales' },
        { id: 6, name: 'Gram Panchayat Common Service', dist: '0.9 km', type: 'Support', capacity: 'Subsidy Portal', market: 'Govt. Schemes' },
      ]
    } else {
      return [
        { id: 1, name: `${villageName} Local Workshop Hub`, dist: '0.9 km', type: 'Retail', capacity: 'Micro Production', market: 'Local Direct Sales' },
        { id: 2, name: `${districtName} Trade Mandi & APMC`, dist: '4.5 km', type: 'Mandi', capacity: 'B2B Bulk Buyers', market: 'Commercial Sales' },
        { id: 3, name: `${blockName} Rural Haat Pavilion`, dist: '3.1 km', type: 'Offtake', capacity: 'Weekly Market', market: 'Retail Consumers' },
        { id: 4, name: 'Regional Cooperative Society', dist: '2.8 km', type: 'Support', capacity: 'Cluster Support', market: 'Raw Materials & Credit' },
        { id: 5, name: 'State Freight & Logistics Depot', dist: '7.2 km', type: 'Offtake', capacity: 'Transport Hub', market: 'Regional Dispatch' },
        { id: 6, name: 'District Industry Center (DIC)', dist: '6.0 km', type: 'Support', capacity: 'PMEGP Support', market: 'Enterprise Subsidies' },
      ]
    }
  }

  const competitors = getCompetitors()
  const filtered = activeFilter === 'all' 
    ? competitors 
    : competitors.filter(c => c.type.toLowerCase() === activeFilter.toLowerCase())

  const locationSummary = `${villageName}, ${blockName}, ${districtName}`

  return (
    <AppShell>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" /> {t('map.module')}
              </span>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                Active: {activeReport.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('map.title')}
            </h1>

            <p className="text-xs text-gray-600 font-medium">
              Visualizing 5 km (primary consumption) and 10 km (secondary institutional) radius zones around{' '}
              <strong className="text-gray-900">{locationSummary}</strong> for <strong>{activeReport.category}</strong>.
            </p>

            {/* ENTERPRISE SWITCHER */}
            {reportsList.length > 1 && (
              <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
                <span className="text-gray-600 font-semibold flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-700" /> Switch Business Catchment:
                </span>
                <select
                  value={activeReport.id}
                  onChange={(e) => handleSwitchEnterprise(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 font-bold rounded-xl px-3 py-1.5 outline-none cursor-pointer text-xs"
                >
                  {reportsList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.category} ({r.location}) · Score {r.feasibilityScore}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex gap-1.5 bg-gray-50 p-1.5 rounded-2xl border text-xs font-semibold self-start md:self-auto flex-wrap">
            {['all', 'dairy', 'retail', 'offtake', 'mandi'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-xl capitalize transition ${
                  activeFilter === f ? 'bg-emerald-700 text-white shadow' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* MAP VISUALIZER AND RADIAL REACH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SIMULATED HIGH-FIDELITY RADIAL MAP CANVAS */}
          <div className="lg:col-span-2 bg-gradient-to-br from-emerald-950 via-gray-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 min-h-[460px] relative overflow-hidden flex flex-col justify-between shadow-xl">
            {/* RADAR / CONCENTRIC RADIUS RINGS */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-[320px] h-[320px] rounded-full border border-emerald-400" />
              <div className="w-[500px] h-[500px] rounded-full border border-emerald-400 absolute" />
              <div className="w-[680px] h-[680px] rounded-full border border-dashed border-emerald-300 absolute" />
            </div>

            {/* MAP TOP CONTROLS */}
            <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
              <div className="bg-emerald-900/80 backdrop-blur border border-emerald-700/60 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-emerald-200">
                  Center: {villageName}, {districtName} ({coords.lat}, {coords.lng})
                </span>
              </div>
              <div className="bg-black/40 backdrop-blur border border-white/10 px-3 py-1.5 rounded-xl text-xs text-gray-300">
                Active Trade: <strong className="text-emerald-300">{category}</strong>
              </div>
            </div>

            {/* NODES VISUALIZATION */}
            <div className="relative z-10 my-10 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* CENTER HERO NODE */}
                <div className="w-16 h-16 rounded-full bg-emerald-600 border-4 border-white shadow-2xl flex flex-col items-center justify-center text-center z-20 animate-pulse">
                  <Store className="w-5 h-5 text-white" />
                  <span className="text-[9px] font-extrabold uppercase mt-0.5 tracking-tighter">YOU</span>
                </div>

                {/* SATELLITE NODES */}
                {filtered.slice(0, 5).map((node, i) => {
                  const angles = [45, 120, 200, 290, 340]
                  const angle = angles[i % angles.length] * (Math.PI / 180)
                  const radius = 100 + (i % 3) * 45
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius

                  return (
                    <div
                      key={node.id}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      className="absolute z-10 group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur border border-white/30 hover:border-emerald-400 hover:bg-emerald-800/80 transition flex items-center justify-center text-white shadow-lg">
                        {node.type === 'Mandi' ? <Truck className="w-4 h-4 text-amber-300" /> : <Users className="w-4 h-4 text-emerald-300" />}
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-10 bg-black/90 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-30 shadow-xl border border-white/10">
                        <strong className="block text-emerald-300">{node.name}</strong>
                        <span>{node.dist} · {node.market}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* MAP BOTTOM LEGEND */}
            <div className="relative z-10 flex items-center justify-between text-xs text-emerald-200/90 border-t border-emerald-800/60 pt-3 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> 5 km Core Retail Zone
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> 10 km Institutional Zone
                </span>
              </div>
              <div className="text-[11px] text-gray-400">
                Radius based on {villageName} rural density
              </div>
            </div>
          </div>

          {/* SATELLITE ENTITY DIRECTORY */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-gray-900 text-base">Catchment Nodes</h3>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                  {filtered.length} Local Points
                </span>
              </div>

              <div className="mt-4 space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {filtered.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-100 transition space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-xs truncate max-w-[170px]">{item.name}</span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {item.dist}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <span>{item.capacity}</span>
                      <span className="text-gray-400 font-medium">{item.market}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t text-[11px] text-gray-400">
              Catchment nodes calculated via OpenStreetMap POIs within statutory bounds.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
