import { motion } from "framer-motion";
import {
  Activity,
  Radio,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import RiskMap from "./RiskMap";
import EnvironmentalConditions from "./EnvironmentalConditions";
import RiskAnalytics from "./RiskAnalytics";

/* =========================================================
   DASHBOARD INTELLIGENCE
========================================================= */

function DashboardIntelligence() {
  return (
    <section
      id="dashboard-intelligence"
      className="relative mx-auto w-full max-w-none px-0 pb-8"
    >
      {/* =====================================================
          SECTION INTRO
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 35,
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
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
      >
        {/* LEFT */}

        <div className="max-w-4xl">
          {/* eyebrow */}

          <div className="mb-4 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.7)]" />

            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300 sm:text-sm">
              Disaster intelligence
            </span>

            <span className="h-px w-12 bg-gradient-to-r from-cyan-400/60 to-transparent" />
          </div>

          {/* heading */}

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-[58px] lg:leading-[1.02]">
            Live environmental{" "}
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              intelligence.
            </span>
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Monitor environmental conditions, multi-hazard risk
            and AI-generated predictions across monitored
            locations in real time.
          </p>
        </div>

        {/* RIGHT STATUS */}

        <div className="flex shrink-0 flex-wrap gap-3">
          <StatusCard
            icon={Radio}
            label="Data stream"
            value="Connected"
          />

          <StatusCard
            icon={ShieldCheck}
            label="AI engine"
            value="Active"
          />
        </div>
      </motion.div>

      {/* =====================================================
          MAIN DASHBOARD GRID
          
          LEFT  = MAP + RISK DISTRIBUTION
          RIGHT = ENVIRONMENT + RISK TREND
      ===================================================== */}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <div className="flex min-w-0 flex-col gap-5">
          {/* MAP */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -2,
            }}
            className="min-w-0"
          >
            <RiskMap />
          </motion.div>

          {/* RISK DISTRIBUTION */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -2,
            }}
          >
            <CurrentOverview />
          </motion.div>
        </div>

        {/* ===================================================
            RIGHT COLUMN
        =================================================== */}

        <div className="flex min-w-0 flex-col gap-5">
          {/* ENVIRONMENT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -2,
            }}
            className="min-w-0"
          >
            <EnvironmentalConditions />
          </motion.div>

          {/* RISK TREND */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -2,
            }}
            className="min-w-0"
          >
            <RiskAnalytics />
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM SYSTEM STATUS
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
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
          duration: 0.6,
          delay: 0.15,
        }}
        className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#07131d]/80 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
            <Activity
              size={17}
              className="text-cyan-300"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              AI model continuously analyzing environmental signals
            </p>

            <p className="mt-0.5 text-xs text-slate-600">
              Multi-hazard intelligence engine active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-emerald-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          3 locations monitored
        </div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   STATUS CARD
========================================================= */

function StatusCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        borderColor:
          "rgba(34,211,238,0.25)",
      }}
      transition={{
        duration: 0.25,
      }}
      className="flex min-w-[145px] items-center gap-3 rounded-2xl border border-white/10 bg-[#07131d]/75 px-4 py-3 backdrop-blur-xl"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
        <Icon
          size={17}
          className="text-cyan-300"
        />
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-wider text-slate-600">
          {label}
        </p>

        <div className="mt-0.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-sm font-medium text-emerald-300">
            {value}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   CURRENT OVERVIEW / RISK DISTRIBUTION
========================================================= */

function CurrentOverview() {
  const distribution = [
    {
      label: "High risk",
      value: 22,
      color: "#ef4444",
    },
    {
      label: "Moderate",
      value: 38,
      color: "#f59e0b",
    },
    {
      label: "Low risk",
      value: 40,
      color: "#10b981",
    },
  ];

  const circumference = 2 * Math.PI * 76;

  return (
    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#07131d] shadow-[0_20px_70px_rgba(0,0,0,0.2)]">
      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Current overview
            </p>
          </div>

          <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            Risk distribution
          </h3>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Distribution across monitored locations
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-xs text-emerald-300">
            Live
          </span>
        </div>
      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 gap-8 p-5 sm:p-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        {/* DONUT */}

        <div className="flex justify-center">
          <div className="relative h-[230px] w-[230px]">
            {/* ambient glow */}

            <div className="absolute inset-10 rounded-full bg-cyan-400/5 blur-2xl" />

            <svg
              viewBox="0 0 200 200"
              className="relative h-full w-full -rotate-90"
            >
              {/* base */}

              <circle
                cx="100"
                cy="100"
                r="76"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="18"
              />

              {/* high */}

              <motion.circle
                initial={{
                  strokeDashoffset: circumference,
                }}
                whileInView={{
                  strokeDashoffset:
                    circumference *
                    (1 - 0.22),
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                cx="100"
                cy="100"
                r="76"
                fill="none"
                stroke="#ef4444"
                strokeWidth="18"
                strokeDasharray={`${circumference}`}
                strokeLinecap="butt"
              />

              {/* moderate */}

              <motion.circle
                initial={{
                  strokeDashoffset:
                    circumference,
                }}
                whileInView={{
                  strokeDashoffset:
                    circumference *
                    (1 - 0.38),
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.15,
                  ease: "easeOut",
                }}
                cx="100"
                cy="100"
                r="76"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="18"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={-circumference * 0.22}
                strokeLinecap="butt"
              />

              {/* low */}

              <motion.circle
                initial={{
                  strokeDashoffset:
                    circumference,
                }}
                whileInView={{
                  strokeDashoffset:
                    circumference *
                    (1 - 0.4),
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                cx="100"
                cy="100"
                r="76"
                fill="none"
                stroke="#10b981"
                strokeWidth="18"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={
                  -circumference * 0.6
                }
                strokeLinecap="butt"
              />
            </svg>

            {/* CENTER */}

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                }}
                className="text-4xl font-semibold tracking-tight text-white"
              >
                100%
              </motion.span>

              <span className="mt-1 text-sm text-slate-500">
                monitored
              </span>
            </div>
          </div>
        </div>

        {/* LEGEND */}

        <div className="space-y-4">
          {distribution.map(
            (item, index) => (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  x: 15,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.4,
                  delay:
                    index * 0.1,
                }}
                whileHover={{
                  x: 5,
                }}
                className="group flex items-center justify-between rounded-xl border border-transparent px-3 py-3 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.025]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      background:
                        item.color,
                      boxShadow: `0 0 12px ${item.color}88`,
                    }}
                  />

                  <span className="text-base text-slate-400 transition-colors group-hover:text-white">
                    {item.label}
                  </span>
                </div>

                <span className="text-lg font-semibold text-white">
                  {item.value}%
                </span>
              </motion.div>
            )
          )}

          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Activity
                  size={16}
                  className="text-cyan-300"
                />

                <span>
                  AI monitored
                </span>
              </div>

              <span className="text-sm text-slate-600">
                03 locations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardIntelligence;