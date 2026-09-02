"use client"

import { useState } from 'react'
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

export default function MarketMapPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const competitors = [
    { id: 1, name: 'Patel Dairy Farm', dist: '1.8 km', type: 'Dairy', capacity: '12 Cattle', market: 'Raw Milk' },
    { id: 2, name: 'Amul Chilling Collection Center', dist: '2.4 km', type: 'Offtake', capacity: 'Procurement Hub', market: 'Bulk Cooperative' },
    { id: 3, name: 'Savli Taluka Kisan Seva Mandi', dist: '6.5 km', type: 'Mandi', capacity: 'Weekly Haat', market: 'Agri & Livestock' },
    { id: 4, name: 'Jay Ranchhod Milk Center', dist: '3.1 km', type: 'Dairy', capacity: '6 Cattle', market: 'Local Retail' },
    { id: 5, name: 'Baroda Dairy Regional Chilling Unit', dist: '8.2 km', type: 'Offtake', capacity: 'Bulk Processing', market: 'Institutional' },
    { id: 6, name: 'Govt. Veterinary Dispensary', dist: '4.7 km', type: 'Support', capacity: 'First Aid & Vaccines', market: 'Healthcare' },
  ]

  const filtered = activeFilter === 'all' 
    ? competitors 
    : competitors.filter(c => c.type.toLowerCase() === activeFilter.toLowerCase())

  return (
    <AppShell>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" /> Module 1: Spatial Catchment Intelligence
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Hyper-Local Market & Competitor Map
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Visualizing 5 km (primary consumption) and 10 km (secondary institutional) radius zones around Savli, Vadodara.
            </p>
          </div>
          <div className="flex gap-1.5 bg-gray-50 p-1.5 rounded-2xl border text-xs font-semibold">
            {['all', 'dairy', 'offtake', 'mandi'].map((f) => (
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
                <span className="font-semibold text-emerald-200">Center: Tarsali Village (22.2587° N, 73.2144° E)</span>
              </div>
              <div className="text-[11px] bg-black/40 backdrop-blur px-3 py-1 rounded-lg border border-white/10 text-gray-300">
                Scale: 10 km Radius
              </div>
            </div>

            {/* SIMULATED SPATIAL NODES */}
            <div className="relative z-10 my-auto grid grid-cols-3 gap-4 py-8">
              {/* HOME NODE */}
              <div className="col-start-2 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold shadow-lg shadow-emerald-500/50 border-2 border-white animate-bounce">
                  YOU
                </div>
                <span className="text-xs font-bold mt-2 text-white bg-black/50 px-2 py-0.5 rounded">Tarsali Farm</span>
                <span className="text-[10px] text-emerald-300">0.0 km</span>
              </div>

              {/* NODE 1: AMUL */}
              <div className="col-start-1 -mt-8 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/60">
                  AMUL
                </div>
                <span className="text-[11px] font-semibold mt-1 text-gray-200">Collection Hub</span>
                <span className="text-[10px] text-blue-300">2.4 km</span>
              </div>

              {/* NODE 2: RIVAL DAIRY */}
              <div className="col-start-3 mt-4 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/60">
                  DF
                </div>
                <span className="text-[11px] font-semibold mt-1 text-gray-200">Patel Dairy</span>
                <span className="text-[10px] text-amber-300">1.8 km</span>
              </div>

              {/* NODE 3: MANDI */}
              <div className="col-start-1 mt-6 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/60">
                  HAAT
                </div>
                <span className="text-[11px] font-semibold mt-1 text-gray-200">Savli Mandi</span>
                <span className="text-[10px] text-purple-300">6.5 km</span>
              </div>

              {/* NODE 4: VET CLINIC */}
              <div className="col-start-3 -mt-6 flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-md border border-white/60">
                  VET
                </div>
                <span className="text-[11px] font-semibold mt-1 text-gray-200">Dispensary</span>
                <span className="text-[10px] text-rose-300">4.7 km</span>
              </div>
            </div>

            {/* MAP BOTTOM LEGEND */}
            <div className="relative z-10 flex flex-wrap gap-4 text-xs bg-black/60 backdrop-blur p-3 rounded-2xl border border-white/10 text-gray-300">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500" /> Proposed Unit
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-500" /> Guaranteed Offtake (Amul)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500" /> Traditional Competitor
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
                <p className="text-xs text-gray-500">Model-driven rural demographic estimates</p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-100">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                    <span>5 km Inner Core Catchment</span>
                    <span className="bg-emerald-200/70 text-emerald-950 px-2 py-0.5 rounded-md">Primary</span>
                  </div>
                  <p className="text-xl font-extrabold text-emerald-950 mt-1">4,200 Residents</p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">3 Villages · Daily doorstep raw milk & curd consumption</p>
                </div>

                <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-100">
                  <div className="flex justify-between items-center text-xs font-bold text-blue-900">
                    <span>10 km Institutional Catchment</span>
                    <span className="bg-blue-200/70 text-blue-950 px-2 py-0.5 rounded-md">Secondary</span>
                  </div>
                  <p className="text-xl font-extrabold text-blue-950 mt-1">11,800 Residents</p>
                  <p className="text-[11px] text-blue-800 mt-0.5">Savli Peri-urban · Sweet shops, boarding schools, bulk off-take</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-2xl border text-xs text-gray-600 space-y-1">
              <span className="font-bold text-gray-900">Offtake Security: 95%</span>
              <p className="text-[11px] leading-relaxed">
                Collection tankers stop daily at Manjusar junction (2.4 km). Logistics overhead is negligible under Gujarat cooperative grid.
              </p>
            </div>
          </div>
        </div>

        {/* DETAILED COMPETITOR AND INFRASTRUCTURE TABLE */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="border-b pb-3">
            <h3 className="font-bold text-gray-900 text-base">Surrounding Enterprise & Ecosystem Inventory</h3>
            <p className="text-xs text-gray-500">Identified points of interest influencing supply elasticity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl border border-gray-200 hover:border-emerald-500 transition space-y-1.5">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                  <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                    {item.dist}
                  </span>
                </div>
                <div className="text-xs text-emerald-800 font-semibold">{item.type} · {item.capacity}</div>
                <p className="text-[11px] text-gray-500">Target Focus: {item.market}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
