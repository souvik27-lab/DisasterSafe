import { motion } from "framer-motion";
import {
  AlertTriangle,
  BrainCircuit,
  CloudRain,
  ShieldCheck,
  Clock3,
  TrendingUp,
  MapPin,
  Activity,
} from "lucide-react";

const alerts = [
  {
    severity: "HIGH",
    title: "Landslide risk increasing",
    description:
      "Terrain conditions and recent rainfall indicate an elevated landslide risk.",
    score: "82",
    trend: "+12.8%",
    location: "Darjeeling",
    time: "Today, 2:42 PM",
    icon: AlertTriangle,
    color: "#fb923c",
  },
  {
    severity: "WATCH",
    title: "Heavy rainfall detected",
    description:
      "Recent rainfall is above the normal range and may increase local flood probability.",
    score: "74",
    trend: "+8.4%",
    location: "Malda",
    time: "Today, 1:18 PM",
    icon: CloudRain,
    color: "#22d3ee",
  },
];

const insights = [
  {
    title: "Risk trend",
    description:
      "Landslide risk is expected to remain elevated during the next 24 hours.",
    icon: TrendingUp,
  },
  {
    title: "Recommended action",
    description:
      "Avoid steep slopes and monitor official local advisories if rainfall continues.",
    icon: ShieldCheck,
  },
];

function AlertsInsights() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 55,
        scale: 0.985,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative mt-5 overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#07131d]"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="relative flex flex-col gap-4 border-b border-white/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-orange-400" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
              Live intelligence
            </span>
          </div>

          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Alerts & insights
          </h2>

          <p className="mt-1 text-sm text-slate-500 sm:text-[15px]">
            AI-generated risk signals and recommended actions
          </p>
        </div>

        {/* LIVE STATUS */}

        <div className="flex w-fit items-center gap-2.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3.5 py-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />

            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>

          <span className="text-xs font-medium text-emerald-300">
            Monitoring active
          </span>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 xl:grid-cols-[1.15fr_0.85fr]">
        {/* ===================================================
            ACTIVE ALERTS
        =================================================== */}

        <div className="rounded-2xl border border-white/[0.06] bg-[#091722] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-semibold text-slate-100">
                Active alerts
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Conditions requiring attention
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-orange-400/10 bg-orange-400/[0.04] px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />

              <span className="text-[11px] font-medium text-orange-300">
                2 active
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <AlertCard
                key={alert.title}
                alert={alert}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            AI INSIGHTS
        =================================================== */}

        <div className="rounded-2xl border border-white/[0.06] bg-[#091722] p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
              <BrainCircuit className="h-5 w-5 text-cyan-300" />
            </div>

            <div>
              <h3 className="text-[16px] font-semibold text-slate-100">
                AI insights
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Model interpretation
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {insights.map((insight, index) => (
              <InsightCard
                key={insight.title}
                insight={insight}
                index={index}
              />
            ))}
          </div>

          {/* MODEL CONFIDENCE */}

          <div className="mt-4 rounded-xl border border-cyan-400/[0.08] bg-cyan-400/[0.025] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Activity className="h-4 w-4 text-cyan-300" />

                <span className="text-[13px] font-medium text-slate-300">
                  Model confidence
                </span>
              </div>

              <span className="text-[14px] font-semibold text-cyan-300">
                89%
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: "89%",
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                }}
                className="h-full rounded-full bg-cyan-400"
              />
            </div>

            <p className="mt-2 text-[11px] leading-5 text-slate-600">
              Confidence reflects the current quality and availability
              of environmental inputs.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM SAFETY BAR
      ===================================================== */}

      <div className="mx-5 mb-5 flex flex-col gap-4 rounded-xl border border-white/[0.05] bg-white/[0.015] p-4 sm:mx-6 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-400/[0.06]">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
          </div>

          <div>
            <p className="text-[13px] font-medium text-slate-300">
              Stay prepared
            </p>

            <p className="mt-1 text-[12px] leading-5 text-slate-600">
              Continue monitoring conditions and follow official
              emergency advisories.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-slate-600">
          <Clock3 className="h-3.5 w-3.5" />

          Updated 12 seconds ago
        </div>
      </div>

      {/* DISCLAIMER */}

      <div className="border-t border-white/[0.05] px-5 py-3.5 sm:px-6">
        <p className="text-[11px] leading-5 text-slate-600">
          AI estimates are informational and are not a substitute for
          official emergency warnings or instructions from local authorities.
        </p>
      </div>
    </motion.section>
  );
}

/* =========================================================
   ALERT CARD
========================================================= */

function AlertCard({ alert, index }) {
  const Icon = alert.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -35,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.65,
        delay: 0.15 + index * 0.14,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -2,
      }}
      className="group rounded-xl border border-white/[0.05] bg-[#07131d] p-4 transition-all duration-300 hover:border-white/[0.09]"
    >
      <div className="flex items-start gap-3.5">
        {/* ICON */}

        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${alert.color}12`,
          }}
        >
          <Icon
            className="h-5 w-5"
            style={{
              color: alert.color,
            }}
          />
        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{
                color: alert.color,
              }}
            >
              {alert.severity}
            </span>

            <span className="h-1 w-1 rounded-full bg-slate-700" />

            <div className="flex items-center gap-1 text-[11px] text-slate-600">
              <MapPin className="h-3 w-3" />

              {alert.location}
            </div>

            <span className="h-1 w-1 rounded-full bg-slate-700" />

            {/* ALERT TIME */}

            <span className="text-[11px] text-slate-600">
              {alert.time}
            </span>
          </div>

          <h4 className="mt-1.5 text-[14px] font-semibold text-slate-200 sm:text-[15px]">
            {alert.title}
          </h4>

          <p className="mt-1.5 text-[12px] leading-5 text-slate-500 sm:text-[13px]">
            {alert.description}
          </p>

          {/* MINI TREND */}

          <div className="mt-3 flex items-center gap-2">
            <TrendingUp
              className="h-3.5 w-3.5"
              style={{
                color: alert.color,
              }}
            />

            <span
              className="text-[11px] font-medium"
              style={{
                color: alert.color,
              }}
            >
              {alert.trend}
            </span>

            <span className="text-[11px] text-slate-600">
              from previous reading
            </span>
          </div>
        </div>

        {/* SCORE */}

        <div className="shrink-0 text-right">
          <div
            className="text-[21px] font-semibold tracking-tight"
            style={{
              color: alert.color,
            }}
          >
            {alert.score}
          </div>

          <div className="text-[10px] text-slate-600">
            / 100
          </div>
        </div>
      </div>

      {/* RISK BAR */}

      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: `${alert.score}%`,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              delay: 0.15 + index * 0.1,
              ease: "easeOut",
            }}
            className="h-full rounded-full"
            style={{
              backgroundColor: alert.color,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   INSIGHT CARD
========================================================= */

function InsightCard({ insight, index }) {
  const Icon = insight.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        x: 15,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay: 0.25 + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-xl border border-white/[0.05] bg-[#07131d] p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/[0.06]">
          <Icon className="h-4 w-4 text-cyan-300" />
        </div>

        <div>
          <h4 className="text-[14px] font-semibold text-slate-200">
            {insight.title}
          </h4>

          <p className="mt-1.5 text-[12px] leading-5 text-slate-500 sm:text-[13px]">
            {insight.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AlertsInsights;