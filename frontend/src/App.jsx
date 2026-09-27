import { useState, useEffect } from "react";
import DashboardIntelligence from "./components/DashboardIntelligence";
import AlertsInsights from "./components/AlertsInsights";


import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  MapPin,
  CloudRain,
  Mountain,
  Waves,
  Satellite,
  ShieldCheck,
  Globe2,
  Menu,
  X,
  ArrowRight,
  TrendingUp,
  Activity,
  Gauge,
  Wind,
  Home,
  Map,
  BarChart3,
  Bell,
  BookOpen,
  Info,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [heroWord, setHeroWord] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const heroWords = [
    "Prepared.",
    "Protected.",
    "Ready.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroWord((prev) => (prev + 1) % heroWords.length);
    }, 2200);

    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";

    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 650);

    return () => {
      clearInterval(interval);
      clearTimeout(loaderTimer);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  const popularLocations = [
    "Kolkata",
    "Darjeeling",
    "Sundarban",
    "Siliguri",
    "Digha",
  ];

  return (
    <main className="min-h-screen overflow-x-hidden overscroll-y-auto bg-[#020b14] text-white">

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020b14]"
          >
            <div className="flex flex-col items-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/25 bg-[#061722]">
                <div className="absolute inset-1.5 rounded-full border border-emerald-400/20" />
                <img
                  src="/images/logo.png"
                  alt="DisasterSafe"
                  className="relative z-10 h-full w-full rounded-full object-cover"
                />
              </div>

              <div className="mt-5 text-[10px] font-medium tracking-[0.3em] text-slate-500">
                DISASTERSAFE
              </div>

              <div className="mt-4 h-1 w-28 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="h-full w-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          GLOBAL BACKGROUND
      ========================================================= */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(0,180,255,0.14),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(0,255,170,0.08),transparent_28%)]" />

        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:70px_70px]" />

      </div>


      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-[#020b14]/80 backdrop-blur-2xl">

        <div className="mx-auto flex h-[82px] max-w-[1800px] items-center justify-between px-5 lg:px-10">

          {/* LOGO */}
          <div className="flex shrink-0 items-center gap-3.5">

            <div className="relative flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border border-cyan-300/30 bg-[#061722] shadow-[0_0_25px_rgba(34,211,238,0.12)]">
              <div className="absolute inset-[3px] rounded-full border border-emerald-400/20" />

              <img
                src="/images/logo.png"
                alt="DisasterSafe Logo"
                className="relative z-10 h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="leading-none">
              <h1 className="text-[27px] font-bold tracking-[-0.035em] text-white">
                <span className="text-[1.18em]">D</span>isaster
                <span className="text-emerald-400">
                  <span className="text-[1.18em]">S</span>afe
                </span>
              </h1>

              <p className="mt-1.5 text-[9px] font-medium tracking-[0.28em] text-slate-500">
                AI DISASTER INTELLIGENCE
              </p>
            </div>
          </div>


          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-1.5 md:flex">

            {[
              { label: "Home", icon: Home },
              { label: "Risk Map", icon: Map },
              { label: "Live Data", icon: BarChart3 },
              { label: "Alerts", icon: Bell, notification: true },
              { label: "Resources", icon: BookOpen },
              { label: "About", icon: Info },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href="#"
                  className={`group relative flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                    index === 0
                      ? "bg-cyan-400/[0.09] text-cyan-300"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="relative">
                    <Icon
                      className={`h-4 w-4 transition-colors ${
                        index === 0
                          ? "text-cyan-300"
                          : "text-slate-500 group-hover:text-slate-300"
                      }`}
                      strokeWidth={1.8}
                    />

                    {item.notification && (
                      <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_7px_rgba(248,113,113,0.8)]" />
                    )}
                  </span>

                  {item.label}

                  {index === 0 && (
                    <span className="absolute -bottom-[17px] left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                  )}
                </a>
              );
            })}
          </div>


          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-2.5 lg:flex">

            {/* Search */}
            <div className="group flex w-[255px] items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2.5 backdrop-blur-xl transition-all duration-200 focus-within:border-cyan-400/30 focus-within:bg-cyan-400/[0.025]">
              <Search className="h-[17px] w-[17px] text-slate-500 transition-colors group-focus-within:text-cyan-300" />

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-slate-500"
                placeholder="Search location..."
              />

              <span className="hidden rounded-md border border-white/[0.08] bg-white/[0.035] px-1.5 py-0.5 text-[9px] text-slate-600 xl:block">
                Ctrl K
              </span>
            </div>


            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="relative flex h-11 w-[78px] items-center rounded-full border border-white/[0.08] bg-white/[0.035] p-1 transition-all duration-300 hover:border-cyan-400/25"
              aria-label="Toggle theme"
            >
              <div
                className={`absolute flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                  darkMode
                    ? "translate-x-[34px] bg-cyan-400/10"
                    : "translate-x-0 bg-amber-400/10"
                }`}
              >
                {darkMode ? (
                  <Moon className="h-4 w-4 text-cyan-300" />
                ) : (
                  <Sun className="h-4 w-4 text-amber-300" />
                )}
              </div>

              <Sun
                className={`ml-2 h-3.5 w-3.5 ${
                  darkMode ? "text-slate-600" : "text-amber-300"
                }`}
              />

              <Moon
                className={`ml-auto mr-2 h-3.5 w-3.5 ${
                  darkMode ? "text-cyan-300" : "text-slate-600"
                }`}
              />
            </button>


            {/* Notification */}
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035] text-slate-400 transition-all hover:border-cyan-400/25 hover:text-cyan-300"
            >
              <Bell className="h-[17px] w-[17px]" />
              <span className="absolute right-[9px] top-[8px] h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_7px_rgba(248,113,113,0.8)]" />
            </button>


            {/* PROFILE */}
            <div className="relative">

              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] p-1.5 pr-2.5 transition-all hover:border-cyan-400/25"
              >
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/20 to-emerald-400/10">
                  <User className="h-4 w-4 text-cyan-300" />
                </div>

                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>


              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-[58px] w-[270px] overflow-hidden rounded-2xl border border-white/[0.1] bg-[#07131d]/95 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                >

                  <div className="border-b border-white/[0.07] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10">
                        <User className="h-5 w-5 text-cyan-300" />
                      </div>

                      <div>
                        <p className="text-[14px] font-semibold text-white">
                          DisasterSafe User
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          AI monitoring account
                        </p>
                      </div>
                    </div>
                  </div>


                  <div className="p-2">

                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] text-slate-300 transition hover:bg-white/[0.04] hover:text-white">
                      <User className="h-4 w-4 text-slate-500" />
                      My Profile
                    </button>

                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] text-slate-300 transition hover:bg-white/[0.04] hover:text-white">
                      <Settings className="h-4 w-4 text-slate-500" />
                      Settings
                    </button>

                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[13px] text-slate-300 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <span className="flex items-center gap-3">
                        {darkMode ? (
                          <Moon className="h-4 w-4 text-cyan-300" />
                        ) : (
                          <Sun className="h-4 w-4 text-amber-300" />
                        )}

                        {darkMode ? "Dark Mode" : "Light Mode"}
                      </span>

                      <span
                        className={`relative h-5 w-9 rounded-full transition ${
                          darkMode ? "bg-cyan-400/80" : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-3 w-3 rounded-full bg-white transition ${
                            darkMode ? "left-5" : "left-1"
                          }`}
                        />
                      </span>
                    </button>

                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] text-slate-300 transition hover:bg-white/[0.04] hover:text-white">
                      <Bell className="h-4 w-4 text-slate-500" />
                      Notifications
                    </button>

                  </div>


                  <div className="border-t border-white/[0.07] p-2">
                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] text-red-400 transition hover:bg-red-400/[0.06]">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>

                </motion.div>
              )}

            </div>

          </div>


          {/* MOBILE MENU */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-white/10 p-2 md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

        </div>


        {/* MOBILE NAV */}
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#020b14]/95 p-5 md:hidden">
            {[
              "Home",
              "Risk Map",
              "Live Data",
              "Alerts",
              "Resources",
              "About",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="block border-b border-white/5 py-4 text-sm text-slate-300"
              >
                {item}
              </a>
            ))}
          </div>
        )}

      </nav>


      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <section className="relative min-h-[500px] overflow-hidden pt-[76px]">

        {/* HERO IMAGE */}

        <div className="absolute inset-0">

          <img
            src="/images/hero%20image.png"
            alt="DisasterSafe environmental landscape"
            className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center"
          />

          <div className="absolute inset-0 bg-[#020b14]/35" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#020b14] via-[#020b14]/75 to-[#020b14]/15" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#020b14] via-transparent to-[#020b14]/40" />

          <div className="absolute right-[18%] top-[25%] h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-[120px]" />

          <div className="absolute bottom-[5%] right-[5%] h-[300px] w-[300px] rounded-full bg-emerald-400/10 blur-[110px]" />

          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.75)]" />

        </div>


        {/* HERO CONTENT */}

        <div className="relative z-10 mx-auto h-full max-w-[1800px] px-6 lg:px-10">

          <div className="grid min-h-[500px] grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">


            {/* LEFT HERO */}

            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-center pb-8 pt-4 lg:pb-8"
            >

              {/* BADGE */}

              <div className="mb-6 flex w-fit items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-2 text-[10px] font-medium tracking-[0.18em] text-emerald-300 backdrop-blur-xl shadow-[0_0_25px_rgba(52,211,153,0.08)]">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

                </span>

                AI POWERED

                <span className="text-slate-600">
                  •
                </span>

                MULTI-HAZARD EARLY WARNING

              </div>


              {/* HERO TITLE */}

              <h2 className="max-w-[760px] text-5xl font-bold leading-[0.96] tracking-[-0.045em] text-white sm:text-6xl lg:text-[64px] xl:text-[70px]">

                Understand Risk.

                <br />

                <span className="mr-3">
                  Stay
                </span>

                <span className="relative inline-flex min-w-[260px] overflow-hidden align-bottom">

                  <AnimatePresence
                    initial={false}
                    mode="wait"
                  >

                    <motion.span
                      key={heroWords[heroWord]}
                      initial={{
                        opacity: 0,
                        x: -24,
                        filter: "blur(7px)",
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        x: 24,
                        filter: "blur(7px)",
                      }}
                      transition={{
                        duration: 0.38,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="whitespace-nowrap bg-gradient-to-r from-cyan-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent"
                    >
                      {heroWords[heroWord]}
                    </motion.span>

                  </AnimatePresence>

                </span>

              </h2>


              {/* DESCRIPTION */}

              <p className="mt-6 max-w-[590px] text-sm leading-7 text-slate-300/90 sm:text-base">

                Real-time disaster risk analysis using AI,
                environmental data and geographical intelligence
                to help communities stay informed and prepared.

              </p>


              {/* SEARCH */}

              <div className="mt-7 max-w-[620px]">

                <div className="group flex items-center rounded-2xl border border-cyan-300/30 bg-[#031522]/75 p-2 shadow-[0_0_45px_rgba(0,200,255,0.10)] backdrop-blur-2xl transition-all duration-300 focus-within:border-cyan-300/70 focus-within:shadow-[0_0_50px_rgba(0,200,255,0.16)]">

                  <MapPin className="ml-3 h-5 w-5 shrink-0 text-cyan-300 transition group-focus-within:scale-110" />

                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="Search your location..."
                  />

                  <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-[#021018] shadow-[0_0_25px_rgba(34,211,238,0.28)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(34,211,238,0.42)]">

                    <Search className="h-5 w-5" />

                  </button>

                </div>


                {/* POPULAR */}

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">

                  <span className="mr-1 text-slate-400">
                    Popular:
                  </span>

                  {popularLocations.map((item) => (

                    <button
                      key={item}
                      onClick={() => setLocation(item)}
                      className="rounded-full border border-white/[0.08] bg-black/25 px-3 py-1.5 text-slate-400 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/35 hover:bg-cyan-400/[0.08] hover:text-cyan-300"
                    >
                      {item}
                    </button>

                  ))}

                </div>

              </div>


              {/* STATUS */}

              <div className="mt-7 flex items-center gap-5 text-[10px] text-slate-500">

                <div className="flex items-center gap-2">

                  <ShieldCheck className="h-4 w-4 text-emerald-400" />

                  AI Risk Intelligence

                </div>

                <div className="h-3 w-px bg-white/10" />

                <div className="flex items-center gap-2">

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />

                  Live Environmental Data

                </div>

              </div>

            </motion.div>


            {/* RIGHT HERO */}

            <div className="relative hidden h-full lg:block">

              <div className="absolute right-[10%] top-[17%] h-[330px] w-[330px] rounded-full border border-cyan-400/[0.08] shadow-[0_0_80px_rgba(34,211,238,0.05)]" />

              <div className="absolute right-[14%] top-[21%] h-[250px] w-[250px] rounded-full border border-emerald-400/[0.06]" />


              {/* HEAVY RAINFALL */}

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-[43%] top-[10%] w-[220px] rounded-2xl border border-cyan-400/25 bg-[#061a29]/80 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              >

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-cyan-400/10 p-3">

                    <CloudRain className="h-5 w-5 text-cyan-300" />

                  </div>

                  <div>

                    <p className="text-[10px] text-slate-500">
                      Heavy Rainfall
                    </p>

                    <p className="mt-0.5 text-xl font-semibold text-white">
                      120 mm
                    </p>

                  </div>

                </div>

                <div className="mt-3 flex items-center justify-between">

                  <span className="text-[9px] text-slate-500">
                    Last 24 hours
                  </span>

                  <span className="text-[9px] text-cyan-300">
                    +18%
                  </span>

                </div>

              </motion.div>


              {/* LANDSLIDE */}

              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-[17%] top-[42%] w-[225px] rounded-2xl border border-red-400/30 bg-[#24131a]/80 p-4 shadow-[0_20px_50px_rgba(239,68,68,0.12)] backdrop-blur-2xl"
              >

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-red-400/10 p-3">

                    <Mountain className="h-5 w-5 text-red-400" />

                  </div>

                  <div>

                    <p className="text-[10px] text-slate-500">
                      Landslide Risk
                    </p>

                    <p className="mt-0.5 text-xl font-semibold text-red-300">
                      HIGH
                    </p>

                  </div>

                </div>

                <div className="mt-3 flex items-center justify-between">

                  <span className="text-[9px] text-slate-500">
                    Darjeeling
                  </span>

                  <span className="rounded-full bg-red-400/10 px-2 py-1 text-[8px] text-red-300">
                    71 / 100
                  </span>

                </div>

              </motion.div>


              {/* RIVER */}

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[15%] right-[5%] w-[230px] rounded-2xl border border-emerald-400/20 bg-[#061a29]/80 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              >

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-emerald-400/10 p-3">

                    <Waves className="h-5 w-5 text-emerald-300" />

                  </div>

                  <div>

                    <p className="text-[10px] text-slate-500">
                      River Water Level
                    </p>

                    <p className="mt-0.5 text-xl font-semibold text-emerald-300">
                      RISING
                    </p>

                  </div>

                </div>

                <div className="mt-3 flex items-center justify-between">

                  <span className="text-[9px] text-slate-500">
                    Current change
                  </span>

                  <span className="text-[10px] font-medium text-emerald-300">
                    +2.4 m
                  </span>

                </div>

              </motion.div>


              {/* LIVE CHIP */}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.6,
                }}
                className="absolute bottom-[7%] right-[13%] flex items-center gap-2 rounded-full border border-white/10 bg-[#06131d]/75 px-4 py-2 text-[9px] text-slate-400 backdrop-blur-xl"
              >

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />

                Monitoring environmental conditions

              </motion.div>

            </div>

          </div>

        </div>


        {/* BOTTOM FADE */}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#020b14] to-transparent" />

      </section>


      {/* =========================================================
          PREMIUM RISK CARDS
      ========================================================= */}

      <section className="relative mx-auto w-full max-w-[1800px] px-6 pb-16 lg:px-10">
        <Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <RiskCard
            icon={<Waves />}
            title="Flood Risk"
            score="32"
            level="LOW"
            color="cyan"
            trend="+4.2%"
            trendLabel="vs last update"
            description="Current flood conditions remain relatively stable."
          />

          <RiskCard
            icon={<Mountain />}
            title="Landslide Risk"
            score="71"
            level="HIGH"
            color="red"
            trend="+12.8%"
            trendLabel="risk increasing"
            description="Terrain conditions indicate elevated landslide risk."
          />

          <RiskCard
            icon={<ShieldCheck />}
            title="Overall Status"
            score="MODERATE"
            level="Stay alert and follow advisories."
            color="amber"
            trend="ACTIVE"
            trendLabel="monitoring"
            description="Multiple environmental indicators are being monitored."
          />

          <WeatherCard />

        </div>


        {/* DASHBOARD BUTTON */}

        <div className="mt-8 flex justify-center">

          <button className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-slate-300 backdrop-blur-xl transition hover:border-cyan-400/30 hover:text-cyan-300">

            Explore DisasterSafe Dashboard

            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />

          </button>

        </div>

        </Reveal>
      </section>


      {/* =========================================================
          LIVE ENVIRONMENTAL INTELLIGENCE DASHBOARD
      ========================================================= */}

      <section className="relative mx-auto w-full max-w-[1800px] px-6 pb-20 lg:px-10">

        <Reveal>
          <DashboardIntelligence />
        </Reveal>

        <Reveal delay={0.04} className="mt-10">
          <AlertsInsights />
        </Reveal>

      </section>

    </main>
  );
}


/* =========================================================
   LIGHTWEIGHT SCROLL REVEAL
========================================================= */

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


/* =========================================================
   WEATHER CARD
========================================================= */

function WeatherCard() {

  return (

    <motion.div
      whileHover={{
        y: -7,
        scale: 1.01,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 20,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-400/15
        bg-[#06131d]/75
        p-6
        backdrop-blur-2xl
        transition-all
        duration-500
        hover:border-cyan-400/35
        hover:shadow-[0_20px_70px_rgba(34,211,238,0.10)]
      "
    >

      {/* Ambient Glow */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-cyan-400/10
          blur-3xl
        "
      />


      {/* Scanning Light */}

      <motion.div
        animate={{
          x: ["-120%", "220%"],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-full
          w-20
          skew-x-12
          bg-gradient-to-r
          from-transparent
          via-cyan-300/[0.04]
          to-transparent
        "
      />


      {/* TOP */}

      <div className="relative z-10 flex items-start justify-between">

        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px rgba(34,211,238,0)",
              "0 0 25px rgba(34,211,238,0.15)",
              "0 0 0px rgba(34,211,238,0)",
            ],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
          }}
          className="
            rounded-2xl
            bg-cyan-400/10
            p-3
            text-cyan-300
          "
        >

          <CloudRain className="h-6 w-6" />

        </motion.div>


        <div className="
          flex
          items-center
          gap-2
          rounded-full
          border
          border-emerald-400/20
          bg-emerald-400/[0.05]
          px-3
          py-1.5
          text-[9px]
          text-emerald-300
        ">

          <motion.span
            animate={{
              opacity: [1, 0.3, 1],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-emerald-400
              shadow-[0_0_8px_#34d399]
            "
          />

          LIVE

        </div>

      </div>


      {/* WEATHER */}

      <div className="relative z-10 mt-6">

        <div className="flex items-end justify-between">

          <div>

            <p className="text-xs text-slate-500">
              CURRENT CONDITIONS
            </p>

            <p className="mt-1 text-sm text-slate-300">
              Kolkata, WB
            </p>

            <div className="mt-2 flex items-end gap-2">

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="
                  text-5xl
                  font-semibold
                  tracking-tight
                  text-white
                "
              >
                28°
              </motion.span>

              <span className="pb-2 text-sm text-slate-500">
                C
              </span>

            </div>

          </div>


          <div className="text-right">

            <p className="text-xs text-slate-500">
              Light Rain
            </p>

            <p className="mt-1 text-[10px] text-slate-600">
              Updated 10:24 AM
            </p>

          </div>

        </div>


        {/* WEATHER METRICS */}

        <div className="mt-6 grid grid-cols-3 gap-2">

          <WeatherMetric
            icon={<Activity />}
            label="Humidity"
            value="78%"
          />

          <WeatherMetric
            icon={<CloudRain />}
            label="Rainfall"
            value="45 mm"
          />

          <WeatherMetric
            icon={<Wind />}
            label="Wind"
            value="12 km/h"
          />

        </div>

      </div>


      {/* BOTTOM */}

      <div className="
        relative
        z-10
        mt-5
        flex
        items-center
        justify-between
        border-t
        border-white/[0.06]
        pt-4
      ">

        <span className="text-[9px] text-slate-600">
          Environmental data
        </span>

        <div className="flex items-center gap-2">

          <span className="text-[9px] text-cyan-300">
            LIVE
          </span>

          <div className="flex items-end gap-0.5">

            {[1, 2, 3, 4, 5].map((item) => (

              <motion.span
                key={item}
                animate={{
                  height: ["3px", `${4 + item}px`, "3px"],
                }}
                transition={{
                  duration: 0.8 + item * 0.08,
                  repeat: Infinity,
                  delay: item * 0.08,
                }}
                className="w-[2px] rounded-full bg-cyan-400"
              />

            ))}

          </div>

        </div>

      </div>

    </motion.div>

  );
}


/* =========================================================
   WEATHER METRIC
========================================================= */

function WeatherMetric({
  icon,
  label,
  value,
}) {

  return (

    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        rounded-xl
        border
        border-white/[0.05]
        bg-white/[0.025]
        p-2.5
        transition
        hover:bg-white/[0.05]
      "
    >

      <div className="
        flex
        items-center
        gap-1.5
        text-slate-600
      ">

        <span className="text-cyan-400">
          {icon}
        </span>

        <span className="text-[8px]">
          {label}
        </span>

      </div>

      <p className="
        mt-2
        text-[11px]
        font-medium
        text-slate-200
      ">
        {value}
      </p>

    </motion.div>

  );
}


/* =========================================================
   RISK CARD
========================================================= */

function RiskCard({
  icon,
  title,
  score,
  level,
  color,
  trend,
  trendLabel,
  description,
}) {

  const colors = {

    cyan: {
      border: "border-cyan-400/20",
      hoverBorder: "hover:border-cyan-400/45",
      icon: "bg-cyan-400/10 text-cyan-300",
      glow: "rgba(34,211,238,0.18)",
      progress: "from-cyan-400 via-cyan-300 to-emerald-400",
      text: "text-cyan-300",
      dot: "bg-cyan-400",
      shadow: "hover:shadow-[0_20px_70px_rgba(34,211,238,0.10)]",
    },

    red: {
      border: "border-red-400/20",
      hoverBorder: "hover:border-red-400/45",
      icon: "bg-red-400/10 text-red-300",
      glow: "rgba(248,113,113,0.18)",
      progress: "from-red-400 via-orange-400 to-yellow-300",
      text: "text-red-300",
      dot: "bg-red-400",
      shadow: "hover:shadow-[0_20px_70px_rgba(248,113,113,0.10)]",
    },

    amber: {
      border: "border-amber-400/20",
      hoverBorder: "hover:border-amber-400/45",
      icon: "bg-amber-400/10 text-amber-300",
      glow: "rgba(251,191,36,0.18)",
      progress: "from-amber-400 via-yellow-300 to-emerald-300",
      text: "text-amber-300",
      dot: "bg-amber-400",
      shadow: "hover:shadow-[0_20px_70px_rgba(251,191,36,0.10)]",
    },

  };

  const c = colors[color];

  const numericScore =
    typeof score === "string" && !isNaN(Number(score))
      ? Number(score)
      : 50;

  return (

    <motion.div
      whileHover={{
        y: -7,
        scale: 1.012,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        ${c.border}
        ${c.hoverBorder}
        bg-[#06131d]/75
        p-6
        backdrop-blur-2xl
        transition-all
        duration-500
        ${c.shadow}
      `}
    >

      {/* AMBIENT GLOW */}

      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.18, 0.35, 0.18],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundColor: c.glow,
        }}
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          blur-3xl
        "
      />


      {/* SCANNING LIGHT */}

      <motion.div
        animate={{
          x: ["-130%", "230%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-full
          w-24
          skew-x-12
          bg-gradient-to-r
          from-transparent
          via-white/[0.045]
          to-transparent
        "
      />


      {/* TOP ROW */}

      <div className="
        relative
        z-10
        flex
        items-start
        justify-between
      ">

        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px rgba(34,211,238,0)",
              `0 0 28px ${c.glow}`,
              "0 0 0px rgba(34,211,238,0)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className={`
            rounded-2xl
            p-3
            ${c.icon}
          `}
        >

          {icon}

        </motion.div>


        {/* AI BADGE */}

        <div className="
          flex
          items-center
          gap-1.5
          rounded-full
          border
          border-white/10
          bg-white/[0.035]
          px-3
          py-1.5
          text-[9px]
          text-slate-500
        ">

          <motion.span
            animate={{
              opacity: [1, 0.35, 1],
              scale: [1, 0.75, 1],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
            }}
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${c.dot}
            `}
          />

          AI ESTIMATE

        </div>

      </div>


      {/* TITLE + SCORE */}

      <div className="
        relative
        z-10
        mt-6
      ">

        <p className="
          text-xs
          uppercase
          tracking-[0.15em]
          text-slate-500
        ">
          {title}
        </p>


        <div className="
          mt-2
          flex
          items-end
          justify-between
          gap-3
        ">

          <div className="flex items-end gap-2">

            <motion.span
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                text-5xl
                font-semibold
                leading-none
                tracking-[-0.04em]
                text-white
              "
            >
              {score}
            </motion.span>

            {title !== "Overall Status" && (

              <span className="
                pb-1
                text-sm
                text-slate-600
              ">
                /100
              </span>

            )}

          </div>


          {/* TREND */}

          <div className="
            flex
            flex-col
            items-end
            gap-1
          ">

            <div className={`
              flex
              items-center
              gap-1
              text-[10px]
              font-medium
              ${c.text}
            `}>

              {title !== "Overall Status" && (
                <TrendingUp className="h-3 w-3" />
              )}

              {trend}

            </div>

            <span className="
              text-[8px]
              text-slate-600
            ">
              {trendLabel}
            </span>

          </div>

        </div>

      </div>


      {/* DESCRIPTION */}

      <p className="
        relative
        z-10
        mt-3
        max-w-[260px]
        text-[10px]
        leading-5
        text-slate-500
      ">
        {description}
      </p>


      {/* RISK METER */}

      <div className="
        relative
        z-10
        mt-5
      ">

        <div className="
          flex
          items-center
          justify-between
          text-[8px]
          text-slate-600
        ">

          <span>
            RISK INDEX
          </span>

          <span>
            {title === "Overall Status"
              ? "ACTIVE"
              : `${numericScore}%`}
          </span>

        </div>


        {/* Track */}

        <div className="
          relative
          mt-2
          h-2
          overflow-hidden
          rounded-full
          bg-white/[0.055]
        ">

          {/* Scale markers */}

          <div className="
            absolute
            inset-0
            z-10
            flex
            justify-between
            px-[20%]
            opacity-30
          ">

            <span className="h-full w-px bg-white/20" />

            <span className="h-full w-px bg-white/20" />

            <span className="h-full w-px bg-white/20" />

          </div>


          {/* Progress */}

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width:
                title === "Overall Status"
                  ? "52%"
                  : `${numericScore}%`,
            }}
            transition={{
              duration: 1.5,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`
              relative
              h-full
              rounded-full
              bg-gradient-to-r
              ${c.progress}
            `}
          >

            {/* Moving shine */}

            <motion.div
              animate={{
                x: ["-100%", "250%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                inset-y-0
                left-0
                w-12
                bg-gradient-to-r
                from-transparent
                via-white/50
                to-transparent
                skew-x-12
              "
            />

          </motion.div>

        </div>


        {/* Scale */}

        {title !== "Overall Status" && (

          <div
            className="
              mt-2
              flex
              justify-between
              text-[8px]
              uppercase
              tracking-wider
              text-slate-600
            "
          >

            <span>
              Low
            </span>

            <span>
              Moderate
            </span>

            <span>
              High
            </span>

          </div>

        )}

      </div>


      {/* BOTTOM STATUS */}

      <div className="
        relative
        z-10
        mt-5
        flex
        items-center
        justify-between
        border-t
        border-white/[0.06]
        pt-4
      ">

        <div className="
          flex
          items-center
          gap-2
        ">

          <motion.span
            animate={{
              scale: [1, 1.35, 1],
              opacity: [1, 0.55, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className={`
              h-2
              w-2
              rounded-full
              ${c.dot}
            `}
          />

          <span className={`
            text-[10px]
            font-medium
            ${c.text}
          `}>
            {level}
          </span>

        </div>


        <div className="
          flex
          items-center
          gap-1.5
          text-[9px]
          text-slate-600
        ">

          <Gauge className="h-3 w-3" />

          AI MONITORED

        </div>

      </div>


     {/* CORNER DECORATION */}

<div className="
  pointer-events-none
  absolute
  bottom-0
  right-0
  h-20
  w-20
  opacity-20
">

  <div className="
    absolute
    bottom-4
    right-4
    h-8
    w-8
    rounded-full
    border
    border-white/20
  " />

  <div
    className="
      absolute
      bottom-6
      right-6
      h-4
      w-4
      rounded-full
      border
      border-white/10
    "
  ></div>

</div>

</motion.div> 
  );
}

export default App;