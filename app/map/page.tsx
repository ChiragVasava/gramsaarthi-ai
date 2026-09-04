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
  Filter
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export default function MarketMapPage() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('all')
  const [mapLocation, setMapLocation] = useState({
    village: 'Tarsali',
    block: 'Savli',
    district: 'Vadodara',
    state: 'Gujarat',
    category: 'Dairy',
    lat: '22.2587° N',
    lng: '73.2144° E',
  })

  useEffect(() => {
    const saved = localStorage.getItem('gs_analysis')
    if (saved) {
      try {
        const a = JSON.parse(saved)
        setMapLocation({
          village: a.village || 'Tarsali',
          block: a.block || 'Savli',
          district: a.district || 'Vadodara',
          state: a.state || 'Gujarat',
          category: a.category || 'Dairy',
          lat: a.district === 'Vadodara' ? '22.2587° N' : '23.0225° N',
          lng: a.district === 'Vadodara' ? '73.2144° E' : '72.5714° E',
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Dynamically generate ecosystem entities based on user's actual category & village
  const getCompetitors = () => {
    const v = mapLocation.village
    const d = mapLocation.district
    const c = mapLocation.category

    if (c === 'Dairy') {
      return [
        { id: 1, name: `${v} Dairy Cooperative`, dist: '1.8 km', type: 'Dairy', capacity: '12 Cattle', market: 'Raw Milk' },
        { id: 2, name: `${d} Milk Chilling Collection Hub`, dist: '2.4 km', type: 'Offtake', capacity: 'Procurement Hub', market: 'Bulk Cooperative' },
        { id: 3, name: `${mapLocation.block} Kisan Seva Mandi`, dist: '6.5 km', type: 'Mandi', capacity: 'Weekly Haat', market: 'Agri & Livestock' },
        { id: 4, name: 'Kisan Milk & Curd Center', dist: '3.1 km', type: 'Dairy', capacity: '6 Cattle', market: 'Local Retail' },
        { id: 5, name: 'Regional Chilling Unit', dist: '8.2 km', type: 'Offtake', capacity: 'Bulk Processing', market: 'Institutional' },
        { id: 6, name: 'Govt. Veterinary Clinic', dist: '4.7 km', type: 'Support', capacity: 'First Aid & Vaccines', market: 'Healthcare' },
      ]
    } else if (c === 'Retail' || c === 'Food Processing') {
      return [
        { id: 1, name: `${v} Provision Store`, dist: '0.8 km', type: 'Retail', capacity: 'General Store', market: 'Village Groceries' },
        { id: 2, name: `${d} Wholesale Mandi APMC`, dist: '4.2 km', type: 'Mandi', capacity: 'B2B Wholesale', market: 'Grains & FMCG' },
        { id: 3, name: `${mapLocation.block} Weekly Haat`, dist: '3.5 km', type: 'Offtake', capacity: 'Consumer Haat', market: 'Household Goods' },
        { id: 4, name: 'Gramin Mini Mart', dist: '2.1 km', type: 'Retail', capacity: 'Digital Store', market: 'Packaged Goods' },
        { id: 5, name: 'State Warehousing Depot', dist: '7.8 km', type: 'Offtake', capacity: 'Grain Storage', market: 'Supply Chain' },
        { id: 6, name: 'District Trade Federation', dist: '5.6 km', type: 'Support', capacity: 'Merchant Support', market: 'Advisory' },
      ]
    } else {
      return [
        { id: 1, name: `${v} Local Craft Unit`, dist: '1.2 km', type: 'Retail', capacity: 'Artisanal Studio', market: 'Local Products' },
        { id: 2, name: `${d} District Trade Mandi`, dist: '5.1 km', type: 'Mandi', capacity: 'Bulk Distribution', market: 'B2B Buyers' },
        { id: 3, name: 'State Rural Haat Pavilion', dist: '3.9 km', type: 'Offtake', capacity: 'Direct Sales', market: 'Exhibition Hub' },
        { id: 4, name: 'Regional Cooperative Society', dist: '2.6 km', type: 'Support', capacity: 'Cluster Support', market: 'Financing & Raw Material' },
        { id: 5, name: `${mapLocation.block} Logistics Point`, dist: '6.8 km', type: 'Offtake', capacity: 'Freight Depot', market: 'Inter-district' },
        { id: 6, name: 'Technical Training Center', dist: '4.3 km', type: 'Support', capacity: 'Skill Upgradation', market: 'Training' },
      ]
    }
  }

  const competitors = getCompetitors()
  const filtered = activeFilter === 'all' 
    ? competitors 
    : competitors.filter(c => c.type.toLowerCase() === activeFilter.toLowerCase())

  const locationSummary = `${mapLocation.village}, ${mapLocation.block}, ${mapLocation.district}`

  return (
    <AppShell>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" /> {t('map.module')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('map.title')}
            </h1>
            <p className="text-xs text-gray-600 mt-1 font-medium">
              Visualizing 5 km (primary consumption) and 10 km (secondary institutional) radius zones around <strong className="text-gray-900">{locationSummary}</strong> for <strong>{mapLocation.category}</strong>.
            </p>
          </div>
          <div className="flex gap-1.5 bg-gray-50 p-1.5 rounded-2xl border text-xs font-semibold">
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
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-emerald-900/80 backdrop-blur border border-emerald-700/60 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold text-emerald-200">Center: {mapLocation.village} ({mapLocation.lat}, {mapLocation.lng})</span>
              </div>
              <div className="text-[11px] bg-black/40 backdrop-blur px-3 py-1 rounded-lg border border-white/10 text-gray-300 font-medium">
                {t('map.scale')}
              </div>
            </div>

            {/* SIMULATED SPATIAL NODES */}
            <div className="relative z-10 my-auto grid grid-cols-3 gap-4 py-8">
              {/* HOME NODE */}
              <div className="col-start-2 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold shadow-lg shadow-emerald-500/50 border-2 border-white animate-bounce">
                  {t('map.you')}
                </div>
                <span className="text-xs font-bold mt-2 text-white bg-black/50 px-2 py-0.5 rounded">{mapLocation.village} {mapLocation.category}</span>
                <span className="text-[10px] text-emerald-300 font-bold">0.0 km</span>
              </div>

              {/* NODE 1 */}
              <div className="col-start-1 -mt-8 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/60">
                  HUB
                </div>
                <span className="text-[11px] font-semibold mt-1 text-gray-200">{competitors[1]?.name || 'Collection Hub'}</span>
                <span className="text-[10px] text-blue-300">2.4 km</span>
              </div>

              {/* NODE 2 */}
              <div className="col-start-3 mt-4 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/60">
                  DF
                </div>
                <span className="text-[11px] font-semibold mt-1 text-gray-200">{competitors[0]?.name || 'Local Unit'}</span>
                <span className="text-[10px] text-amber-300">1.8 km</span>
              </div>

              {/* NODE 3 */}
              <div className="col-start-1 mt-6 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/60">
                  MANDI
                </div>
                <span className="text-[11px] font-semibold mt-1 text-gray-200">{competitors[2]?.name || 'Mandi'}</span>
                <span className="text-[10px] text-purple-300">6.5 km</span>
              </div>

              {/* NODE 4 */}
              <div className="col-start-3 -mt-6 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/60">
                  SVCS
                </div>
                <span className="text-[11px] font-semibold mt-1 text-gray-200">{competitors[5]?.name || 'Dispensary'}</span>
                <span className="text-[10px] text-rose-300">4.7 km</span>
              </div>
            </div>

            {/* MAP BOTTOM LEGEND */}
            <div className="relative z-10 flex flex-wrap gap-4 text-xs bg-black/60 backdrop-blur p-3 rounded-2xl border border-white/10 text-gray-300">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500" /> Proposed Unit ({mapLocation.category})
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-500" /> Guaranteed Offtake & Hub
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500" /> Competitors
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-purple-500" /> Mandi / Weekly Haat
              </div>
            </div>
          </div>

          {/* SPATIAL CATCHMENT DEMOGRAPHICS */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="border-b pb-3">
                <h3 className="font-bold text-gray-900 text-base">Catchment Consumer Sizing</h3>
                <p className="text-xs text-gray-600 font-medium">{mapLocation.village} & surrounding {mapLocation.block} cluster</p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                    <span>{t('map.coreCatchment')}</span>
                    <span className="bg-emerald-200/70 text-emerald-950 px-2 py-0.5 rounded-md">{t('map.primary')}</span>
                  </div>
                  <p className="text-xl font-extrabold text-emerald-950 mt-1">4,200 {t('map.residents')}</p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">{mapLocation.village} + 2 adjoining hamlets · Daily doorstep demand</p>
                </div>

                <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100">
                  <div className="flex justify-between items-center text-xs font-bold text-blue-900">
                    <span>{t('map.institutionalCatchment')}</span>
                    <span className="bg-blue-200/70 text-blue-950 px-2 py-0.5 rounded-md">{t('map.secondary')}</span>
                  </div>
                  <p className="text-xl font-extrabold text-blue-950 mt-1">11,800 {t('map.residents')}</p>
                  <p className="text-[11px] text-blue-800 mt-0.5">{mapLocation.block} Peri-urban · Bulk off-take, food stalls, commercial markets</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl border text-xs text-gray-700 space-y-1">
              <span className="font-bold text-gray-900">{t('map.offtakeSecurity')}</span>
              <p className="text-[11px] leading-relaxed text-gray-600 font-medium">
                Logistics network connected through {mapLocation.district} arterial highways. Feasibility risk is low given structured local transport.
              </p>
            </div>
          </div>
        </div>

        {/* DETAILED COMPETITOR AND INFRASTRUCTURE TABLE */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="border-b pb-3">
            <h3 className="font-bold text-gray-900 text-base">{t('map.surroundingTitle')}</h3>
            <p className="text-xs text-gray-600 font-medium">Active points of interest around {mapLocation.village}, {mapLocation.district}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl border border-gray-200 hover:border-emerald-500 transition space-y-1.5">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                  <span className="text-[10px] font-bold bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                    {item.dist}
                  </span>
                </div>
                <div className="text-xs text-emerald-800 font-semibold">{item.type} · {item.capacity}</div>
                <p className="text-[11px] text-gray-600">{t('map.targetFocus')}: {item.market}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
