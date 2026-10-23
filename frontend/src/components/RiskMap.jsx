

import { useEffect, useState } from "react";

import {

  MapContainer,

  TileLayer,

  Circle,

  CircleMarker,

  ZoomControl,

  useMap,

} from "react-leaflet";

import {

  Activity,

  Crosshair,

  Map as MapIcon,

  Satellite,

  Waves,

  CloudRain,

  Mountain,

  Layers3,

} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import "leaflet/dist/leaflet.css";




const fallbackRiskZones = [

  {

    name: "Darjeeling",

    position: [27.041, 88.266],

    risk: "HIGH",

    color: "#ef4444",

    radius: 24000,

    flood: 42,

    landslide: 82,

    rainfall: 118,

  },

  {

    name: "Malda",

    position: [25.01, 88.14],

    risk: "MODERATE",

    color: "#f59e0b",

    radius: 30000,

    flood: 67,

    landslide: 34,

    rainfall: 74,

  },

  {

    name: "Kolkata",

    position: [22.5726, 88.3639],

    risk: "LOW",

    color: "#10b981",

    radius: 26000,

    flood: 32,

    landslide: 12,

    rainfall: 45,

  },

];




function MapCenterController({ location, focusSignal }) {

  const map = useMap();

  useEffect(() => {

    if (!location) return;

    map.flyTo(location.position, 9, {

      duration: 1.2,

      easeLinearity: 0.25,

    });

  }, [location, map]);

  useEffect(() => {

    if (!location || focusSignal === 0) return;

    map.flyTo(location.position, 9, {

      duration: 1.2,

      easeLinearity: 0.25,

    });

  }, [focusSignal, location, map]);

  return null;

}




function RiskMarker({ zone, selected, onSelect }) {

  const isHigh = zone.risk === "HIGH";

  return (

    <>

      {/* Large risk zone */}

      <Circle

        center={zone.position}

        radius={zone.radius}

        pathOptions={{

          color: zone.color,

          fillColor: zone.color,

          fillOpacity: isHigh ? 0.09 : 0.055,

          weight: 1.5,

          opacity: 0.65,

        }}

      />

      {/* Animated high-risk rings */}

      {isHigh && (

        <>

          <Circle

            center={zone.position}

            radius={zone.radius * 0.58}

            pathOptions={{

              color: zone.color,

              fillColor: "transparent",

              fillOpacity: 0,

              weight: 1,

              opacity: 0.3,

              dashArray: "7 8",

            }}

          />

          <Circle

            center={zone.position}

            radius={zone.radius * 0.32}

            pathOptions={{

              color: zone.color,

              fillColor: "transparent",

              fillOpacity: 0,

              weight: 1,

              opacity: 0.45,

              dashArray: "4 7",

            }}

          />

        </>

      )}

      {/* Main location marker */}

      <CircleMarker

        center={zone.position}

        radius={selected ? 11 : 8}

        pathOptions={{

          color: "#ffffff",

          weight: 2,

          fillColor: zone.color,

          fillOpacity: 1,

        }}

        eventHandlers={{

          click: () => onSelect(zone),

        }}

      />

      {/* Selected glow */}

      {selected && (

        <>

          <CircleMarker

            center={zone.position}

            radius={18}

            pathOptions={{

              color: zone.color,

              fillColor: "transparent",

              fillOpacity: 0,

              weight: 2,

              opacity: 0.8,

            }}

          />

          <CircleMarker

            center={zone.position}

            radius={28}

            pathOptions={{

              color: zone.color,

              fillColor: "transparent",

              fillOpacity: 0,

              weight: 1,

              opacity: 0.4,

              dashArray: "5 7",

            }}

          />

        </>

      )}

    </>

  );

}




function RiskMap() {

  const [riskZones, setRiskZones] = useState(fallbackRiskZones);

  const [mapMode, setMapMode] = useState("satellite");

  const [selectedZone, setSelectedZone] = useState(fallbackRiskZones[0]);

  const [scanActive, setScanActive] = useState(true);

  const [pulse, setPulse] = useState(0);




  const [focusSignal, setFocusSignal] = useState(0);

  // Fetch risk values from the Flask API without changing the existing UI.

  useEffect(() => {

    let cancelled = false;

    async function loadRiskData() {

      try {

        const response = await fetch("http://127.0.0.1:5000/api/risk");

        if (!response.ok) throw new Error(`Risk API returned ${response.status}`);

        const data = await response.json();

        if (!data.success || !Array.isArray(data.locations)) {

          throw new Error("Unexpected risk API response");

        }

        const updatedZones = data.locations.map((item) => {

          const existing = fallbackRiskZones.find(

            (zone) => zone.name.toLowerCase() === String(item.name).toLowerCase()

          );

          if (!existing) return null;

          const flood = Number(item.flood_risk ?? existing.flood);

          const landslide = Number(item.landslide_risk ?? existing.landslide);

          const rainfall = Number(item.rainfall_mm ?? existing.rainfall);

          const risk = String(item.risk_level ?? existing.risk).toUpperCase();

          const color = risk === "HIGH" ? "#ef4444" : risk === "MODERATE" ? "#f59e0b" : "#10b981";

          return { ...existing, flood, landslide, rainfall, risk, color };

        }).filter(Boolean);

        if (!cancelled && updatedZones.length > 0) {

          setRiskZones(updatedZones);

          setSelectedZone((current) =>

            updatedZones.find((zone) => zone.name === current.name) || updatedZones[0]

          );

        }

      } catch (error) {

        console.warn("Could not load DisasterSafe risk API; using demo data.", error);

      }

    }

    loadRiskData();

    return () => { cancelled = true; };

  }, []);

  useEffect(() => {

    const timer = setInterval(() => {

      setPulse((value) => value + 1);

    }, 3500);

    return () => clearInterval(timer);

  }, []);


  const focusLocation = () => {

    setFocusSignal((value) => value + 1);

  };

  return (

    <motion.div

      initial={{

        opacity: 0,

        y: 30,

      }}

      whileInView={{

        opacity: 1,

        y: 0,

      }}

      viewport={{

        once: true,

        amount: 0.15,

      }}

      transition={{

        duration: 0.7,

        ease: [0.16, 1, 0.3, 1],

      }}

      className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#07131d] shadow-[0_24px_80px_rgba(0,0,0,0.22)]"

    >




      <div className="relative z-[1000] flex min-h-[82px] items-center justify-between gap-4 border-b border-white/10 bg-[#07131d] px-5 py-4">

        {/* LEFT */}

        <div className="flex min-w-0 items-center gap-3">

          <motion.div

            animate={{

              y: [0, -2, 0],

            }}

            transition={{

              duration: 3,

              repeat: Infinity,

              ease: "easeInOut",

            }}

            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10"

          >

            <MapIcon

              size={21}

              className="text-cyan-300"

            />

          </motion.div>

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <h3 className="truncate text-lg font-semibold tracking-tight text-white">

                Live risk map

              </h3>

              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">

                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                Live

              </span>

            </div>

            <p className="mt-1 truncate text-sm text-slate-500">

              Flood and landslide risk across monitored locations

            </p>

          </div>

        </div>




        <div className="flex shrink-0 items-center rounded-xl border border-white/10 bg-[#0b1923] p-1">

          {/* MAP */}

          <button

            type="button"

            onClick={() => setMapMode("map")}

            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${

              mapMode === "map"

                ? "bg-cyan-400/10 text-cyan-300"

                : "text-slate-500 hover:text-white"

            }`}

          >

            <MapIcon size={15} />

            <span className="hidden sm:inline">

              Map

            </span>

          </button>

          {/* SATELLITE */}

          <button

            type="button"

            onClick={() => setMapMode("satellite")}

            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${

              mapMode === "satellite"

                ? "bg-cyan-400/10 text-cyan-300"

                : "text-slate-500 hover:text-white"

            }`}

          >

            <Satellite size={15} />

            <span className="hidden sm:inline">

              Satellite

            </span>

          </button>

          {/* TERRAIN */}

          <button

            type="button"

            onClick={() => setMapMode("terrain")}

            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${

              mapMode === "terrain"

                ? "bg-cyan-400/10 text-cyan-300"

                : "text-slate-500 hover:text-white"

            }`}

          >

            <Layers3 size={15} />

            <span className="hidden sm:inline">

              Terrain

            </span>

          </button>

        </div>

      </div>




      <div className="relative h-[390px] sm:h-[430px] lg:h-[470px]">

        <MapContainer

          center={[23.5, 87.8]}

          zoom={7}

          zoomControl={false}

          scrollWheelZoom={true}

          className="h-full w-full"

        >

          {/* LEAFLET ZOOM */}

          <ZoomControl position="topleft" />




          {mapMode === "satellite" ? (
            <TileLayer
              key="satellite"
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              maxZoom={19}
            />
          ) : mapMode === "terrain" ? (
            <TileLayer
              key="terrain"
              attribution="&copy; OpenStreetMap contributors"
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
          ) : (
            <TileLayer
              key="map"
              attribution="&copy; OpenStreetMap contributors"
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
          )}

          {/* MAP CENTER */}

          <MapCenterController

            location={selectedZone}

            focusSignal={focusSignal}

          />

          {/* RISK ZONES */}

          {riskZones.map((zone) => (

            <RiskMarker

              key={zone.name}

              zone={zone}

              selected={

                selectedZone.name === zone.name

              }

              onSelect={setSelectedZone}

            />

          ))}

        </MapContainer>




        <AnimatePresence>

          {scanActive && (

            <motion.div

              key={pulse}

              initial={{

                top: "5%",

                opacity: 0,

              }}

              animate={{

                top: "92%",

                opacity: [0, 0.65, 0],

              }}

              transition={{

                duration: 4.5,

                ease: "linear",

              }}

              className="pointer-events-none absolute left-0 right-0 z-[500] h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"

            />

          )}

        </AnimatePresence>




        <div className="pointer-events-none absolute left-4 top-4 z-[600]">

          <motion.div

            animate={{

              y: [0, -2, 0],

            }}

            transition={{

              duration: 3,

              repeat: Infinity,

              ease: "easeInOut",

            }}

            className="flex items-center gap-2 rounded-full border border-cyan-300/20 bg-[#07131d]/80 px-3 py-2 text-xs text-slate-300 shadow-lg backdrop-blur-md"

          >

            <Activity

              size={14}

              className="text-cyan-300"

            />

            <span>

              Environmental scan active

            </span>

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

          </motion.div>

        </div>




        <motion.div

          key={selectedZone.name}

          initial={{

            opacity: 0,

            x: 15,

          }}

          animate={{

            opacity: 1,

            x: 0,

          }}

          transition={{

            duration: 0.35,

          }}

          className="pointer-events-none absolute right-4 top-4 z-[600]"

        >

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#07131d]/85 px-3 py-2 shadow-lg backdrop-blur-md">

            <span

              className="h-2 w-2 rounded-full"

              style={{

                backgroundColor:

                  selectedZone.color,

                boxShadow: `0 0 10px ${selectedZone.color}`,

              }}

            />

            <span className="text-xs text-slate-400">

              Selected

            </span>

            <span className="text-xs font-semibold text-white">

              {selectedZone.name}

            </span>

            <span

              className="text-xs font-semibold"

              style={{

                color: selectedZone.color,

              }}

            >

              {Math.round(

                (selectedZone.flood +

                  selectedZone.landslide) /

                  2

              )}

              /100

            </span>

          </div>

        </motion.div>





        <motion.button

          type="button"

          onClick={focusLocation}

          whileHover={{

            scale: 1.06,

          }}

          whileTap={{

            scale: 0.94,

          }}

          aria-label="Focus selected location"

          title={`Focus ${selectedZone.name}`}

          className="absolute left-[14px] top-[112px] z-[700] flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-white/10 bg-[#07131d]/95 text-slate-300 shadow-[0_8px_25px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"

        >

          <Crosshair size={17} />

        </motion.button>




        <div className="absolute bottom-4 left-4 z-[600]">

          <div className="rounded-xl border border-white/10 bg-[#07131d]/90 px-4 py-3 shadow-xl backdrop-blur-md">

            <p className="mb-2 text-xs font-semibold text-white">

              Risk level

            </p>

            <div className="flex items-center gap-4">

              <LegendItem

                color="#ef4444"

                label="High"

              />

              <LegendItem

                color="#f59e0b"

                label="Moderate"

              />

              <LegendItem

                color="#10b981"

                label="Low"

              />

            </div>

          </div>

        </div>




        <motion.div

          initial={{

            opacity: 0,

            y: 12,

          }}

          whileInView={{

            opacity: 1,

            y: 0,

          }}

          viewport={{

            once: true,

          }}

          transition={{

            delay: 0.3,

          }}

          className="absolute bottom-4 right-4 z-[600] hidden overflow-hidden rounded-xl border border-white/10 bg-[#07131d]/90 shadow-xl backdrop-blur-md sm:block"

        >

          <div className="flex items-center divide-x divide-white/10">

            <DataItem

              icon={Waves}

              label="Flood"

              value={selectedZone.flood}

              color="#22d3ee"

            />

            <DataItem

              icon={Mountain}

              label="Landslide"

              value={selectedZone.landslide}

              color="#f59e0b"

            />

            <DataItem

              icon={CloudRain}

              label="Rainfall"

              value={`${selectedZone.rainfall} mm`}

              color="#60a5fa"

            />

          </div>

        </motion.div>

      </div>




      <div className="flex min-h-[52px] items-center justify-between border-t border-white/10 bg-[#07131d] px-5">

        <div className="flex items-center gap-2">

          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-sm text-slate-500">

            Environmental data synced

          </span>

        </div>

        <span className="text-sm text-slate-600">

          Monitoring 3 active locations

        </span>

      </div>

    </motion.div>

  );

}




function LegendItem({

  color,

  label,

}) {

  return (

    <div className="flex items-center gap-2">

      <span

        className="h-2.5 w-2.5 rounded-full"

        style={{

          backgroundColor: color,

          boxShadow: `0 0 8px ${color}`,

        }}

      />

      <span className="text-xs text-slate-400">

        {label}

      </span>

    </div>

  );

}




function DataItem({

  icon: Icon,

  label,

  value,

  color,

}) {

  return (

    <div className="flex items-center gap-2 px-3 py-2.5">

      <Icon

        size={14}

        style={{

          color,

        }}

      />

      <div>

        <p className="text-[9px] uppercase tracking-[0.14em] text-slate-600">

          {label}

        </p>

        <p className="text-xs font-semibold text-white">

          {value}

        </p>

      </div>

    </div>

  );

}

export default RiskMap;
