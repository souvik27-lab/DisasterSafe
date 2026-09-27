import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  CloudRain,
  Droplets,
  Radio,
  Thermometer,
  Waves,
  Activity,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================
   ENVIRONMENTAL DATA
========================================================= */

const metrics = [
  {
    label: "Rainfall",
    description: "Rainfall intensity",
    value: "45",
    unit: "mm",
    change: "+20%",
    status: "Rising",
    color: "#22d3ee",
    icon: CloudRain,
    bars: [35, 42, 38, 55, 48, 65, 58, 72, 67, 82],
  },
  {
    label: "Temperature",
    description: "Current temperature",
    value: "28",
    unit: "°C",
    change: "+2°C",
    status: "Rising",
    color: "#fb7185",
    icon: Thermometer,
    bars: [35, 40, 48, 43, 58, 61, 55, 68, 72, 78],
  },
  {
    label: "Humidity",
    description: "Atmospheric humidity",
    value: "78",
    unit: "%",
    change: "+5%",
    status: "Rising",
    color: "#60a5fa",
    icon: Droplets,
    bars: [30, 35, 43, 40, 50, 57, 55, 67, 72, 78],
  },
  {
    label: "Water level",
    description: "Nearby water level",
    value: "2.4",
    unit: "m",
    change: "Rising",
    status: "Warning",
    color: "#818cf8",
    icon: Waves,
    bars: [30, 35, 42, 38, 48, 55, 61, 67, 72, 82],
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

function EnvironmentalConditions() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((value) => value + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 28,
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
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07131d] shadow-[0_20px_70px_rgba(0,0,0,0.2)]"
    >
      {/* =================================================
          SUBTLE AMBIENT GLOW
      ================================================= */}

      <motion.div
        animate={{
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="relative flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-3">

          <motion.div
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10"
          >
            <Radio
              size={19}
              className="text-cyan-300"
            />

            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#07131d] bg-emerald-400" />
          </motion.div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="text-lg font-semibold tracking-tight text-white">
                Environmental Conditions
              </h3>

              <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2 py-1 text-xs font-medium text-emerald-300">
                <motion.span
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                />

                Live data
              </span>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              Current environmental indicators
            </p>

          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 sm:flex">

            <Activity
              size={14}
              className="text-cyan-300"
            />

            <div>
              <p className="text-[9px] uppercase tracking-[0.14em] text-slate-600">
                Data sync
              </p>

              <p className="text-xs font-medium text-slate-300">
                Continuous
              </p>
            </div>

          </div>

          <div className="text-left sm:text-right">

            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
              Last updated
            </p>

            <motion.p
              key={tick}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-sm font-medium text-slate-400"
            >
              12 seconds ago
            </motion.p>

          </div>

        </div>
      </div>

      {/* =================================================
          METRIC GRID
      ================================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            metric={metric}
            index={index}
            tick={tick}
          />
        ))}

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="relative flex min-h-[50px] items-center justify-between border-t border-white/10 px-5">

        <div className="flex items-center gap-2">

          <motion.span
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-2 w-2 rounded-full bg-emerald-400"
          />

          <span className="text-sm text-slate-400">
            Environmental data synced successfully
          </span>

        </div>

        <div className="hidden items-center gap-2 text-sm text-slate-600 sm:flex">

          <Activity
            size={14}
            className="text-cyan-400"
          />

          AI monitoring active

          <ArrowUpRight
            size={13}
            className="text-slate-500"
          />

        </div>

      </div>
    </motion.div>
  );
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  metric,
  index,
  tick,
}) {
  const Icon = metric.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -4,
      }}
      className="group relative overflow-hidden border-b border-white/10 p-5 transition-colors duration-300 sm:border-r xl:border-b-0"
      style={{
        borderRightColor:
          index === 3 ? "transparent" : undefined,
      }}
    >
      {/* ================================================
          HOVER GLOW
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${metric.color}12, transparent 65%)`,
        }}
      />

      {/* ================================================
          TOP SHINE
      ================================================= */}

      <motion.div
        initial={{
          x: "-100%",
          opacity: 0,
        }}
        whileHover={{
          x: "100%",
          opacity: 0.7,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-0 top-0 h-px w-1/2"
        style={{
          background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`,
        }}
      />

      <div className="relative z-10">

        {/* ==============================================
            ICON + STATUS
        ============================================== */}

        <div className="flex items-start justify-between">

          <motion.div
            whileHover={{
              scale: 1.08,
              rotate: -3,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border"
            style={{
              backgroundColor: `${metric.color}10`,
              borderColor: `${metric.color}20`,
            }}
          >
            <Icon
              size={20}
              style={{
                color: metric.color,
              }}
            />

            {/* ICON GLOW */}

            <motion.span
              animate={{
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-xl blur-md"
              style={{
                backgroundColor: metric.color,
              }}
            />
          </motion.div>

          <span
            className={`rounded-full border px-2 py-1 text-[10px] font-medium ${
              metric.status === "Warning"
                ? "border-red-400/20 bg-red-400/5 text-red-400"
                : "border-white/10 bg-white/[0.02] text-slate-500"
            }`}
          >
            {metric.status}
          </span>

        </div>

        {/* ==============================================
            LABEL
        ============================================== */}

        <p className="mt-5 text-sm font-medium text-slate-400">
          {metric.label}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          {metric.description}
        </p>

        {/* ==============================================
            VALUE
        ============================================== */}

        <div className="mt-2 flex items-end gap-2">

          <motion.span
            key={tick}
            initial={{
              opacity: 0.3,
              y: 4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="text-4xl font-semibold tracking-tight text-white"
          >
            {metric.value}
          </motion.span>

          <span className="mb-1.5 text-sm font-medium text-slate-500">
            {metric.unit}
          </span>

        </div>

        {/* ==============================================
            CHANGE
        ============================================== */}

        <p
          className="mt-3 text-sm font-medium"
          style={{
            color: metric.color,
          }}
        >
          ↑ {metric.change}

          <span className="ml-2 font-normal text-slate-600">
            vs previous reading
          </span>
        </p>

        {/* ==============================================
            LIVE SIGNAL
        ============================================== */}

        <div className="mt-5 flex items-center justify-between">

          <span className="text-[9px] uppercase tracking-[0.16em] text-slate-600">
            Live signal
          </span>

          <motion.span
            animate={{
              opacity: [0.25, 1, 0.25],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: index * 0.2,
            }}
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: metric.color,
              boxShadow: `0 0 9px ${metric.color}`,
            }}
          />

        </div>

        {/* ==============================================
            MINI LIVE CHART
        ============================================== */}

        <div className="mt-2 flex h-9 items-end gap-1">

          {metric.bars.map((height, i) => (
            <motion.span
              key={i}
              initial={{
                height: "8%",
                opacity: 0,
              }}
              animate={{
                height: `${height}%`,
                opacity:
                  i === metric.bars.length - 1
                    ? 1
                    : 0.28,
              }}
              transition={{
                duration: 0.65,
                delay: index * 0.08 + i * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                opacity: 1,
                scaleY: 1.08,
              }}
              className="relative flex-1 origin-bottom rounded-t-sm"
              style={{
                backgroundColor:
                  i === metric.bars.length - 1
                    ? metric.color
                    : `${metric.color}35`,
                boxShadow:
                  i === metric.bars.length - 1
                    ? `0 0 8px ${metric.color}60`
                    : "none",
              }}
            />
          ))}

        </div>

      </div>
    </motion.div>
  );
}

export default EnvironmentalConditions;