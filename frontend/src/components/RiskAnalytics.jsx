import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Sparkles } from "lucide-react";

const data = [
  { day: "Today", flood: 32, landslide: 48 },
  { day: "Wed", flood: 38, landslide: 55 },
  { day: "Thu", flood: 44, landslide: 61 },
  { day: "Fri", flood: 50, landslide: 67 },
  { day: "Sat", flood: 47, landslide: 70 },
  { day: "Sun", flood: 58, landslide: 76 },
  { day: "Mon", flood: 63, landslide: 82 },
];

function RiskAnalytics() {
  const [active, setActive] = useState(6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#07131d] p-6"
    >
      {/* Subtle ambient light */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-400/[0.025] blur-3xl" />

      {/* HEADER */}
      <div className="relative mb-6 flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
            <Activity className="h-5.5 w-5.5 text-cyan-300" />
          </div>

          <div>
            <h3 className="text-[20px] font-semibold tracking-tight text-slate-100">
              Prediction analytics
            </h3>

            <p className="mt-1 text-[14px] text-slate-500">
              Risk trend
            </p>
          </div>
        </div>

        {/* AI STATUS */}
        <div className="flex items-center gap-2.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

          <span className="text-[13px] font-medium text-emerald-300">
            AI prediction active
          </span>
        </div>
      </div>

      {/* LEGEND */}
      <div className="relative mb-5 flex items-center justify-between">
        <div className="flex items-center gap-7">
          <Legend
            color="cyan"
            label="Flood risk"
          />

          <Legend
            color="orange"
            label="Landslide risk"
          />
        </div>

        <div className="flex items-center gap-2.5 text-[14px] text-slate-500">
          <Sparkles className="h-4 w-4 text-cyan-300" />

          <span>7-day forecast</span>
        </div>
      </div>

      {/* CHART */}
      <div className="relative min-h-[260px] flex-1">
        <Chart
          data={data}
          active={active}
          setActive={setActive}
        />
      </div>

      {/* FOOTER */}
      <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-cyan-300" />

          <span className="text-[14px] text-slate-400">
            AI model continuously updating
          </span>
        </div>

        <span className="text-[14px] text-slate-500">
          Updated 12 seconds ago
        </span>
      </div>
    </motion.div>
  );
}

function Chart({ data, active, setActive }) {
  const width = 760;
  const height = 330;

  const left = 58;
  const right = 20;
  const top = 20;
  const bottom = 55;

  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;

  const getX = (index) =>
    left + (index / (data.length - 1)) * chartWidth;

  const getY = (value) =>
    top + ((100 - value) / 100) * chartHeight;

  const createPath = (key) =>
    data
      .map((item, index) => {
        const x = getX(index);
        const y = getY(item[key]);

        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  const createAreaPath = (key) => {
    const line = createPath(key);

    const firstX = getX(0);
    const lastX = getX(data.length - 1);
    const baseY = getY(0);

    return `${line} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
  };

  const activeData = data[active];

  const tooltipWidth = 155;
  const tooltipHeight = 82;

  const tooltipX = Math.min(
    Math.max(
      getX(active) - tooltipWidth / 2,
      left
    ),
    width - right - tooltipWidth
  );

  const highestPoint = Math.min(
    getY(activeData.flood),
    getY(activeData.landslide)
  );

  const tooltipY = Math.max(
    highestPoint - tooltipHeight - 12,
    6
  );

  return (
    <div className="h-full w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          {/* Flood area */}
          <linearGradient
            id="floodAreaGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#22d3ee"
              stopOpacity="0.08"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
              stopOpacity="0"
            />
          </linearGradient>

          {/* Landslide area */}
          <linearGradient
            id="landslideAreaGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#fb923c"
              stopOpacity="0.06"
            />

            <stop
              offset="100%"
              stopColor="#fb923c"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* HORIZONTAL GRID */}
        {[0, 25, 50, 75, 100].map((value) => {
          const y = getY(value);

          return (
            <g key={value}>
              <line
                x1={left}
                x2={width - right}
                y1={y}
                y2={y}
                stroke="rgba(148,163,184,0.08)"
                strokeWidth="1"
              />

              <text
                x={left - 14}
                y={y + 5}
                textAnchor="end"
                fill="#718096"
                fontSize="16"
                fontWeight="400"
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* VERTICAL GRID */}
        {data.map((item, index) => {
          const x = getX(index);

          return (
            <line
              key={`vertical-${item.day}`}
              x1={x}
              x2={x}
              y1={top}
              y2={height - bottom}
              stroke="rgba(148,163,184,0.035)"
              strokeWidth="1"
            />
          );
        })}

        {/* FLOOD AREA */}
        <motion.path
          d={createAreaPath("flood")}
          fill="url(#floodAreaGradient)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* LANDSLIDE AREA */}
        <motion.path
          d={createAreaPath("landslide")}
          fill="url(#landslideAreaGradient)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.1,
          }}
        />

        {/* ACTIVE VERTICAL GUIDE */}
        <line
  x1={getX(active)}
  x2={getX(active)}
  y1={top}
  y2={height - bottom}
  stroke="rgba(148,163,184,0.18)"
  strokeWidth="1"
  strokeDasharray="4 5"
/>

        {/* FLOOD LINE */}
        <motion.path
          d={createPath("flood")}
          fill="none"
          stroke="#32d8ef"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          whileInView={{
            pathLength: 1,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            pathLength: {
              duration: 1.3,
              ease: "easeOut",
            },
            opacity: {
              duration: 0.3,
            },
          }}
        />

        {/* LANDSLIDE LINE */}
        <motion.path
          d={createPath("landslide")}
          fill="none"
          stroke="#fb923c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          whileInView={{
            pathLength: 1,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            pathLength: {
              duration: 1.3,
              delay: 0.1,
              ease: "easeOut",
            },
            opacity: {
              duration: 0.3,
              delay: 0.1,
            },
          }}
        />

        {/* DATA POINTS */}
        {data.map((item, index) => {
          const x = getX(index);

          const floodY = getY(item.flood);
          const landslideY = getY(item.landslide);

          const isActive = index === active;

          return (
            <g
              key={item.day}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
              className="cursor-pointer"
            >
              {/* Hover zone */}
              <rect
                x={x - 30}
                y={top}
                width="60"
                height={chartHeight}
                fill="transparent"
              />

              {/* Flood active ring */}
              {isActive && (
                <circle
                  cx={x}
                  cy={floodY}
                  r="8"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1"
                  opacity="0.35"
                />
              )}

              {/* Flood point */}
              <circle
  cx={x}
  cy={floodY}
  r={isActive ? 5 : 3.5}
  fill="#07131d"
  stroke="#32d8ef"
  strokeWidth="2"
/>

              {/* Landslide active ring */}
              {isActive && (
                <circle
                  cx={x}
                  cy={landslideY}
                  r="8"
                  fill="none"
                  stroke="#fb923c"
                  strokeWidth="1"
                  opacity="0.35"
                />
              )}

              {/* Landslide point */}
              <circle
  cx={x}
  cy={landslideY}
  r={isActive ? 5 : 3.5}
  fill="#07131d"
  stroke="#fb923c"
  strokeWidth="2"
/>

              {/* DAY LABEL */}
              <text
                x={x}
                y={height - 17}
                textAnchor="middle"
                fill={isActive ? "#e2e8f0" : "#718096"}
                fontSize="16"
                fontWeight={isActive ? "600" : "400"}
              >
                {item.day}
              </text>
            </g>
          );
        })}

        {/* TOOLTIP */}
        <g
          transform={`translate(${tooltipX}, ${tooltipY})`}
          pointerEvents="none"
        >
          <rect
            width={tooltipWidth}
            height={tooltipHeight}
            rx="11"
            fill="#0b1925"
            stroke="rgba(255,255,255,0.13)"
          />

          {/* Day */}
          <text
            x="13"
            y="21"
            fill="#e2e8f0"
            fontSize="15"
            fontWeight="500"
          >
            {activeData.day}
          </text>

          {/* Flood */}
          <circle
            cx="13"
            cy="43"
            r="3.5"
            fill="#32d8ef"
          />

          <text
            x="24"
            y="47"
            fill="#a8b4c3"
            fontSize="14"
          >
            Flood
          </text>

          <text
            x="140"
            y="47"
            textAnchor="end"
            fill="#67e8f9"
            fontSize="15"
            fontWeight="600"
          >
            {activeData.flood}%
          </text>

          {/* Landslide */}
          <circle
            cx="13"
            cy="63"
            r="3.5"
            fill="#fb923c"
          />

          <text
            x="24"
            y="67"
            fill="#a8b4c3"
            fontSize="14"
          >
            Landslide
          </text>

          <text
            x="128"
            y="67"
            textAnchor="end"
            fill="#fdba74"
            fontSize="15"
            fontWeight="600"
          >
            {activeData.landslide}%
          </text>
        </g>
      </svg>
    </div>
  );
}

function Legend({ color, label }) {
  const isCyan = color === "cyan";

  return (
    <div className="flex items-center gap-3">
      <span
        className={`h-3 w-3 rounded-full ${
          isCyan ? "bg-cyan-300" : "bg-orange-400"
        }`}
      />

      <span className="text-[15px] font-medium text-slate-400">
        {label}
      </span>
    </div>
  );
}

export default RiskAnalytics;