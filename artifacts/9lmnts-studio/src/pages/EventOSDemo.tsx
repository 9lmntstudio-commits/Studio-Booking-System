import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Zap,
  TrendingUp,
  Users,
  DollarSign,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  X,
  Crown,
  Sparkles,
  BarChart2,
  Globe,
  Cpu,
  Lock,
  MessageSquare,
  ShoppingBag,
  Check,
} from "lucide-react";
import {
  SOUND_CLASH_DATA,
  CORPORATE_CLASH_DATA,
  RECEPTION_OS_DATA,
  EventOSData,
} from "./EventOSData";

// ─── Theme registry ───────────────────────────────────────────────────────────
const THEMES: Record<string, EventOSData> = {
  nightlife: SOUND_CLASH_DATA,
  corporate: CORPORATE_CLASH_DATA,
  wedding: RECEPTION_OS_DATA,
};

// ─── Static chart data ────────────────────────────────────────────────────────
const revenueData = [
  { month: "Jan", manual: 12000, eventos: 28000 },
  { month: "Feb", manual: 15000, eventos: 35000 },
  { month: "Mar", manual: 11000, eventos: 42000 },
  { month: "Apr", manual: 18000, eventos: 56000 },
  { month: "May", manual: 14000, eventos: 71000 },
  { month: "Jun", manual: 20000, eventos: 95000 },
];

const ticketData = [
  { time: "8PM", sold: 45 },
  { time: "9PM", sold: 120 },
  { time: "10PM", sold: 280 },
  { time: "11PM", sold: 410 },
  { time: "12AM", sold: 520 },
  { time: "1AM", sold: 600 },
];

const satisfactionData = [
  { name: "Excellent", value: 68, color: "#FF7A00" },
  { name: "Good", value: 22, color: "#FF3D00" },
  { name: "Average", value: 8, color: "#333" },
  { name: "Poor", value: 2, color: "#222" },
];

const features = [
  { icon: Zap, title: "Real-time Analytics", desc: "Live event metrics and revenue tracking" },
  { icon: Users, title: "Guest Management", desc: "VIP lists, check-ins, capacity control" },
  { icon: DollarSign, title: "Smart Ticketing", desc: "Dynamic pricing with surge detection" },
  { icon: Shield, title: "Fraud Prevention", desc: "AI-powered ticket verification" },
  { icon: Globe, title: "Multi-venue", desc: "Manage all locations from one dashboard" },
  { icon: Cpu, title: "AI Predictions", desc: "Predict crowd flow and bar demand" },
];

const battleMetrics = [
  { label: "Revenue per Event", manual: "$12K", eventos: "$47K" },
  { label: "Setup Time", manual: "3 days", eventos: "2 hours" },
  { label: "No-show Rate", manual: "18%", eventos: "3%" },
  { label: "Staff Required", manual: "12 people", eventos: "4 people" },
  { label: "Ticket Fraud", manual: "High", eventos: "Near Zero" },
];

const plans = [
  {
    name: "EventOS Basic",
    price: "$1,500",
    period: "single event",
    features: ["Single event license", "Real-time dashboard", "Guest check-in app", "Basic analytics", "Email support"],
    highlight: false,
    badge: null,
  },
  {
    name: "EventOS Premium",
    price: "$5,000",
    period: "white-label",
    features: ["Everything in Basic", "White-label branding", "AI assistant included", "Multi-event access", "VIP guest management", "Priority 24/7 support", "Custom integrations"],
    highlight: true,
    badge: "Most Popular",
  },
];

const generateHypeData = () =>
  Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: 40 + Math.random() * 40 + (i > 15 ? 20 : 0),
  }));

// ─── Props ────────────────────────────────────────────────────────────────────
interface EventOSDemoProps {
  onNavigate?: (page: string, service?: string) => void;
}

// ─── Store Modal ──────────────────────────────────────────────────────────────
interface StorePanelProps {
  data: EventOSData;
  primary: string;
  gradient: string;
  cardBg: string;
  onClose: () => void;
  onBook: (plan: string) => void;
}

function StorePanel({ data, primary, gradient, cardBg, onClose, onBook }: StorePanelProps) {
  const [purchased, setPurchased] = useState<Record<string, boolean>>({});

  const buy = (id: string) => setPurchased((p) => ({ ...p, [id]: true }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: "rgba(0,0,0,0.88)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 24 }}
        className="relative w-full max-w-4xl rounded-3xl p-8 border my-8"
        style={{ backgroundColor: cardBg === "bg-[#111]" ? "#111" : cardBg === "bg-[#1a2236]" ? "#1a2236" : cardBg === "bg-[#2a2a2a]" ? "#2a2a2a" : "#111", borderColor: primary + "33" }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-1">Get EventOS</h2>
          <p className="text-white/50">Choose the plan that transforms your events</p>
        </div>

        {/* Pricing plans */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl p-6 border relative"
              style={{
                backgroundColor: plan.highlight ? primary + "15" : "#ffffff08",
                borderColor: plan.highlight ? primary : "#333",
              }}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black text-black" style={{ backgroundColor: primary }}>
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-black text-white mb-1">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-black" style={{ color: plan.highlight ? primary : "#fff" }}>{plan.price}</span>
                <span className="text-sm ml-2 text-white/40">/{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: primary }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onBook(plan.name)}
                className="w-full py-3 rounded-xl font-black transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: plan.highlight ? primary : "#ffffff22", color: plan.highlight ? "#000" : "#fff" }}
              >
                Get Started →
              </button>
            </div>
          ))}
        </div>

        {/* Event-specific store items */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">{data.labels.storeTitle}</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {data.storeItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border flex flex-col gap-2"
                style={{ backgroundColor: `${item.color}0a`, borderColor: `${item.color}33` }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}22` }}>
                    <item.icon size={14} style={{ color: item.color }} />
                  </div>
                  <span className="font-bold text-sm text-white">{item.name}</span>
                </div>
                <p className="text-white/40 text-xs">{item.desc}</p>
                <button
                  onClick={() => buy(item.id)}
                  disabled={purchased[item.id]}
                  className="mt-auto py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1"
                  style={{ backgroundColor: purchased[item.id] ? "#22C55E" : item.color, color: "#000" }}
                >
                  {purchased[item.id] ? <><Check size={12} /> Done</> : `$${item.price}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EventOSDemo({ onNavigate }: EventOSDemoProps) {
  const [activeThemeId, setActiveThemeId] = useState<string>("nightlife");
  const activeData = THEMES[activeThemeId];
  const { theme: t, labels, contestants, liveStats, requests, vipUsers } = activeData;

  // Derive per-theme style helpers
  const primary = t.primary;
  const gradient = activeThemeId === "nightlife"
    ? "from-fuchsia-600 to-cyan-500"
    : activeThemeId === "corporate"
    ? "from-blue-600 to-emerald-500"
    : "from-yellow-600 to-orange-500";

  // Live numbers
  const [liveTickets, setLiveTickets] = useState(847);
  const [liveRevenue, setLiveRevenue] = useState(124560);

  // Battle votes
  const [votes, setVotes] = useState<Record<string, number>>({
    [contestants[0].id]: contestants[0].initialVotes,
    [contestants[1].id]: contestants[1].initialVotes,
  });

  // Hype chart
  const [hypeData, setHypeData] = useState(generateHypeData());
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  // Misc UI state
  const [showStore, setShowStore] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [battleStep, setBattleStep] = useState(0);

  // Reset votes on theme change
  useEffect(() => {
    setVotes({
      [contestants[0].id]: contestants[0].initialVotes,
      [contestants[1].id]: contestants[1].initialVotes,
    });
  }, [activeThemeId, contestants]);

  // Chart container sizing
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) if (e.contentRect.width > 0) setChartWidth(e.contentRect.width);
    });
    ro.observe(chartContainerRef.current);
    return () => ro.disconnect();
  }, []);

  // Live simulation
  useEffect(() => {
    const iv = setInterval(() => {
      setLiveTickets((p) => p + Math.floor(Math.random() * 3));
      setLiveRevenue((p) => p + Math.floor(Math.random() * 200));
      setVotes((prev) => {
        const id1 = contestants[0].id;
        const id2 = contestants[1].id;
        const d = Math.random() > 0.5 ? 0.2 : -0.2;
        return {
          ...prev,
          [id1]: Math.min(90, Math.max(10, (prev[id1] ?? 50) + d)),
          [id2]: Math.min(90, Math.max(10, (prev[id2] ?? 50) - d)),
        };
      });
      setHypeData((prev) => [
        ...prev.slice(1),
        { time: prev[prev.length - 1].time + 1, value: 50 + Math.random() * 40 },
      ]);
    }, 2000);
    return () => clearInterval(iv);
  }, [contestants]);

  // Battle step animation
  useEffect(() => {
    const t = setInterval(() => setBattleStep((p) => (p + 1) % (battleMetrics.length + 1)), 1600);
    return () => clearInterval(t);
  }, []);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBook = (plan?: string) => {
    setShowStore(false);
    onNavigate?.("booking", plan || "EventOS Premium");
  };

  return (
    <div className="min-h-screen font-sans text-white overflow-x-hidden" style={{ backgroundColor: "#0A0A0A" }}>

      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl bg-black/80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black text-sm" style={{ backgroundColor: primary }}>
              9L
            </div>
            <span className="font-bold hidden sm:block">
              9LMNTS <span style={{ color: primary }}>Studio</span>
            </span>
          </div>

          {/* Theme switcher */}
          <div className="flex bg-white/10 rounded-xl p-1">
            {(Object.keys(THEMES) as string[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveThemeId(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeThemeId === key ? "bg-white text-black shadow" : "text-white/40 hover:text-white"
                }`}
              >
                {THEMES[key].name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {labels.liveBadge}
            </div>
            <button
              onClick={() => setShowStore(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
              style={{ borderColor: `${primary}44`, backgroundColor: `${primary}15`, color: primary }}
            >
              <ShoppingBag size={13} /> Store
            </button>
            <button
              onClick={() => handleBook("EventOS Premium")}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black text-black transition-all hover:opacity-90"
              style={{ backgroundColor: primary }}
            >
              Get EventOS <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Ticker */}
        <div className="border-t border-white/5 overflow-hidden py-2" style={{ backgroundColor: `${primary}0D` }}>
          <div className="animate-marquee-scroll whitespace-nowrap flex gap-12 text-xs font-medium" style={{ color: `${primary}CC` }}>
            {[...labels.ticker, ...labels.ticker].map((item, i) => (
              <span key={i} className="mr-8">{item}</span>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section className="text-center py-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: `${primary}20`, color: primary }}
            >
              <Sparkles className="w-4 h-4" />
              Live Demo — {labels.appName} {labels.appSubtitle}
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              Your Events.{" "}
              <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                Supercharged.
              </span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-white/60">
              EventOS turns your venue into a revenue machine. Watch these numbers climb in real time.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowStore(true)}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-black text-lg text-black bg-gradient-to-r ${gradient} hover:opacity-90 transition-all active:scale-95`}
              >
                <Play className="w-5 h-5" /> Get EventOS Now
              </button>
              <button
                onClick={() => onNavigate?.("booking")}
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:bg-white/10 transition-all"
              >
                Book a Demo <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* ── Live Stats Cards ──────────────────────────────────────────────── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Live Tickets", value: liveTickets.toLocaleString(), icon: Users, pulse: false },
            { label: "Tonight's Revenue", value: "$" + (liveRevenue / 1000).toFixed(1) + "K", icon: DollarSign, pulse: true },
            { label: "Events This Month", value: "127", icon: BarChart2, pulse: false },
            { label: "Avg Rating", value: "4.9★", icon: Star, pulse: false },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl p-5 border relative overflow-hidden"
              style={{ backgroundColor: "#111", borderColor: `${primary}33` }}
              animate={stat.pulse ? { borderColor: [`${primary}33`, `${primary}99`, `${primary}33`] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 opacity-60" style={{ color: primary }} />
                {stat.pulse && (
                  <span className="text-xs font-black px-2 py-0.5 rounded animate-pulse text-black" style={{ backgroundColor: primary }}>
                    LIVE
                  </span>
                )}
              </div>
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </section>

        {/* ── Battle Bento ─────────────────────────────────────────────────── */}
        <section className="grid md:grid-cols-12 gap-6">

          {/* Main Battle Stage */}
          <div
            className="md:col-span-8 rounded-3xl border border-white/10 overflow-hidden relative"
            style={{ backgroundColor: "#111" }}
          >
            <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(135deg, ${primary}1A, transparent)` }} />
            <div className="relative p-6 min-h-80 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: primary }}>{labels.battleSubtitle}</div>
                  <h2 className="text-3xl font-black italic">{labels.battleTitle}</h2>
                </div>
                <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">12:45 LEFT</div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4 items-end pb-6">
                {contestants.map((c, idx) => {
                  const pct = Math.round(votes[c.id] ?? 50);
                  return (
                    <div key={c.id} className="text-center">
                      <div
                        className="relative mx-auto w-24 h-24 mb-3 rounded-full p-1"
                        style={{ background: `linear-gradient(135deg, ${c.color}, transparent)` }}
                      >
                        <img src={c.image} alt={c.name} className="w-full h-full rounded-full object-cover border-4 border-black/50" />
                        <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-xs font-black" style={{ color: c.color }}>
                          #{idx + 1}
                        </div>
                      </div>
                      <h3 className="text-lg font-black uppercase mb-0.5">{c.name}</h3>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-3">{c.role}</p>
                      <div
                        className="relative h-11 bg-white/5 rounded-xl overflow-hidden cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => notify(`Voted for ${c.name}! 🔥`)}
                      >
                        <motion.div
                          className="absolute inset-y-0 left-0 opacity-25"
                          style={{ background: c.color }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1 }}
                        />
                        <div className="relative flex items-center justify-between px-4 h-full">
                          <span className="font-bold text-sm">{labels.voteButton || "VOTE"}</span>
                          <span className="font-mono font-black text-sm" style={{ color: c.color }}>{pct}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-black italic text-white/5 pointer-events-none select-none">
                VS
              </div>
            </div>
          </div>

          {/* Live Activity Sidebar */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {/* Hype chart */}
            <div className="rounded-3xl border border-white/10 p-5 flex-1" style={{ backgroundColor: "#111" }}>
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">Live Activity</h3>
              <div ref={chartContainerRef} className="w-full h-28 min-w-0 overflow-hidden mb-4">
                {chartWidth > 0 && (
                  <AreaChart width={chartWidth} height={112} data={hypeData}>
                    <defs>
                      <linearGradient id={`hype-${activeThemeId}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={primary} stopOpacity={0.35} />
                        <stop offset="95%" stopColor={primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke={primary} strokeWidth={2} fill={`url(#hype-${activeThemeId})`} dot={false} />
                    <YAxis hide domain={["dataMin", "dataMax"]} />
                  </AreaChart>
                )}
              </div>
              <div className="space-y-2">
                {liveStats.map((s) => (
                  <div key={s.label} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}22` }}>
                      <s.icon size={13} style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-white/40">{s.label}</div>
                      <div className="font-bold text-sm">{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Request line */}
            <div className="rounded-3xl border border-white/10 p-5" style={{ backgroundColor: "#111" }}>
              <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MessageSquare size={12} /> {labels.requestTitle}
              </h3>
              <div className="space-y-2">
                {requests.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                    onClick={() => notify(`Upvoted: ${r.song} 🎵`)}
                  >
                    <div className="text-center min-w-7">
                      <div className="text-xs font-black" style={{ color: primary }}>{r.votes}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs truncate">{r.song}</div>
                      <div className="text-white/40 text-[10px]">{r.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Manual vs EventOS Comparison ─────────────────────────────────── */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black mb-2">EventOS vs. Doing It Manually</h2>
            <p className="text-white/50">The numbers don't lie</p>
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: "#111", borderColor: `${primary}33` }}>
            <div className="grid grid-cols-3 text-center py-4 border-b border-white/5">
              <div className="font-bold text-white/40">Manual</div>
              <div className="font-bold" style={{ color: primary }}>Metric</div>
              <div className="font-bold" style={{ color: primary }}>EventOS ⚡</div>
            </div>
            {battleMetrics.map((m, i) => (
              <motion.div
                key={m.label}
                className="grid grid-cols-3 text-center py-4 border-b border-white/5 last:border-0 items-center"
                animate={{ backgroundColor: i < battleStep ? `${primary}0a` : "transparent" }}
              >
                <div className="text-sm text-white/40 line-through">{m.manual}</div>
                <div className="text-xs font-medium text-white/60">{m.label}</div>
                <div className="text-sm font-bold flex items-center justify-center gap-1" style={{ color: primary }}>
                  {m.eventos}
                  {i < battleStep && <CheckCircle className="w-4 h-4" />}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Revenue & Ticket Charts ───────────────────────────────────────── */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#111", borderColor: `${primary}33` }}>
            <h3 className="font-bold mb-1">Revenue: Manual vs EventOS</h3>
            <p className="text-xs text-white/40 mb-4">Same events, 3.9× more revenue</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
                <XAxis dataKey="month" tick={{ fill: "#ffffff55", fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: "#ffffff55", fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#111", border: `1px solid ${primary}33`, borderRadius: 8 }} />
                <Area type="monotone" dataKey="manual" stroke="#ffffff22" fill="#ffffff08" name="Manual" />
                <Area type="monotone" dataKey="eventos" stroke={primary} fill={`${primary}33`} name="EventOS" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#111", borderColor: `${primary}33` }}>
            <h3 className="font-bold mb-1">Ticket Sales Velocity</h3>
            <p className="text-xs text-white/40 mb-4">Tonight's event — selling faster than ever</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ticketData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
                <XAxis dataKey="time" tick={{ fill: "#ffffff55", fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: "#ffffff55", fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#111", border: `1px solid ${primary}33`, borderRadius: 8 }} />
                <Bar dataKey="sold" fill={primary} name="Tickets Sold" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ── VIP Lounge ────────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-6 h-6" style={{ color: primary }} />
            <div>
              <h2 className="text-2xl font-black">{labels.vipTitle}</h2>
              <p className="text-sm text-white/40">Real-time guest management</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {vipUsers.map((u) => (
              <div
                key={u.id}
                className="rounded-2xl p-4 border border-white/10 text-center hover:border-white/20 cursor-pointer transition-all"
                style={{ backgroundColor: "#111" }}
                onClick={() => notify(`Sent message to ${u.name}`)}
              >
                <div className="relative mx-auto w-14 h-14 mb-3">
                  <img src={u.img} alt={u.name} className="w-14 h-14 rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#111]" />
                </div>
                <div className="font-black text-sm">{u.name}</div>
                <div className="text-white/40 text-xs mb-2">{u.role}</div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                  style={{ backgroundColor: `${primary}22`, color: primary }}
                >
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features Grid ─────────────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-2">Everything You Need</h2>
            <p className="text-white/50">One platform to run your entire event operation</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <motion.div
                key={f.title}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl p-6 border border-white/10 cursor-pointer"
                style={{ backgroundColor: "#111" }}
              >
                <f.icon className="w-8 h-8 mb-3" style={{ color: primary }} />
                <h3 className="font-black mb-1">{f.title}</h3>
                <p className="text-sm text-white/50">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Guest Satisfaction ────────────────────────────────────────────── */}
        <section className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl font-black mb-4">Guest Satisfaction</h2>
            <p className="text-white/50 mb-6">
              EventOS doesn't just manage your event — it makes your guests love it.
            </p>
            <div className="space-y-3">
              {satisfactionData.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-sm w-20 text-white/60">{item.name}</span>
                  <div className="flex-1 rounded-full h-2 bg-white/10">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <span className="text-sm font-black w-10 text-right">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#111", borderColor: `${primary}33` }}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={satisfactionData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
                  {satisfactionData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#111", border: `1px solid ${primary}33`, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-2">
              <div className="text-4xl font-black" style={{ color: primary }}>90%</div>
              <div className="text-sm text-white/40">Excellent + Good ratings</div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          className="rounded-3xl p-12 text-center border"
          style={{ backgroundColor: "#111", borderColor: `${primary}44` }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
            style={{ backgroundColor: `${primary}20`, color: primary }}
          >
            <Lock className="w-4 h-4" />
            Limited availability — serious venues only
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Ready to 4× Your{" "}
            <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              Event Revenue?
            </span>
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Join 200+ venues using EventOS. Get set up in 2 hours, not 2 days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setShowStore(true)}
              className={`flex items-center gap-2 px-10 py-4 rounded-xl font-black text-xl text-black bg-gradient-to-r ${gradient} hover:opacity-90 transition-all active:scale-95`}
            >
              Get EventOS <ArrowRight className="w-6 h-6" />
            </button>
            <button
              onClick={() => onNavigate?.("booking")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:bg-white/10 transition-all"
            >
              Book Free Consultation
            </button>
          </div>
          <p className="mt-4 text-sm text-white/30">No contracts. Cancel anytime. Results in first event.</p>
        </section>

      </div>

      {/* ── Store Modal ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showStore && (
          <StorePanel
            data={activeData}
            primary={primary}
            gradient={gradient}
            cardBg={t.cardBg}
            onClose={() => setShowStore(false)}
            onBook={handleBook}
          />
        )}
      </AnimatePresence>

      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 16, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 16, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-bold border border-white/10 shadow-2xl"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <span style={{ color: primary }}>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Ticker animation ───────────────────────────────────────────────── */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee-scroll 28s linear infinite;
        }
      `}</style>
    </div>
  );
}
