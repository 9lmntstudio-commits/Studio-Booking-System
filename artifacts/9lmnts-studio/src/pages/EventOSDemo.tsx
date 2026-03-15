import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ShoppingBag,
  Zap,
  ArrowRight,
  X,
  Shield,
  Check,
  Music,
  Crown,
  Star,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  SOUND_CLASH_DATA,
  CORPORATE_CLASH_DATA,
  RECEPTION_OS_DATA,
  EventOSData,
} from "./EventOSData";

interface EventOSDemoProps {
  onNavigate?: (page: string, service?: string) => void;
}

const THEMES: Record<string, EventOSData> = {
  nightlife: SOUND_CLASH_DATA,
  corporate: CORPORATE_CLASH_DATA,
  wedding: RECEPTION_OS_DATA,
};

const generateChartData = () =>
  Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: 40 + Math.random() * 40 + (i > 15 ? 20 : 0),
  }));

export default function EventOSDemo({ onNavigate }: EventOSDemoProps) {
  const [activeThemeId, setActiveThemeId] = useState<string>("nightlife");
  const activeData = THEMES[activeThemeId];
  const { theme, labels, contestants, liveStats, storeItems, requests, vipUsers } = activeData;

  const [votes, setVotes] = useState<Record<string, number>>({
    [contestants[0].id]: contestants[0].initialVotes,
    [contestants[1].id]: contestants[1].initialVotes,
  });
  const [hypeData, setHypeData] = useState(generateChartData());
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVotes({
      [contestants[0].id]: contestants[0].initialVotes,
      [contestants[1].id]: contestants[1].initialVotes,
    });
    setPurchasedItems({});
  }, [activeThemeId, contestants]);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) setChartWidth(entry.contentRect.width);
      }
    });
    ro.observe(chartContainerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVotes((prev) => {
        const id1 = contestants[0].id;
        const id2 = contestants[1].id;
        const change = Math.random() > 0.5 ? 0.2 : -0.2;
        return {
          ...prev,
          [id1]: Math.min(90, Math.max(10, (prev[id1] ?? 50) + change)),
          [id2]: Math.min(90, Math.max(10, (prev[id2] ?? 50) - change)),
        };
      });
      setHypeData((prev) => [
        ...prev.slice(1),
        { time: prev[prev.length - 1].time + 1, value: 50 + Math.random() * 40 },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, [contestants]);

  const handleAction = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePurchase = (itemId: string, itemName: string) => {
    setPurchasedItems((p) => ({ ...p, [itemId]: true }));
    handleAction(`✅ ${itemName} purchased!`);
    setTimeout(() => setShowStoreModal(false), 1200);
  };

  const handleGetStarted = (plan?: string) => {
    setShowStoreModal(false);
    if (onNavigate) onNavigate("booking", plan || "EventOS Premium");
  };

  return (
    <div
      className={`min-h-screen font-sans text-white overflow-x-hidden relative transition-colors duration-500 ${theme.background}`}
    >
      {/* Background */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen" />
      <div className={`fixed inset-0 bg-gradient-to-b ${theme.background} pointer-events-none`} />

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl bg-black/80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => onNavigate?.("demo")}
            className="flex items-center text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <ChevronLeft size={18} className="mr-1" />
            Exit
          </button>

          <div className="flex items-center gap-3">
            <span className="font-bold tracking-wider text-lg hidden sm:block">
              {labels.appName}{" "}
              <span style={{ color: theme.primary }}>{labels.appSubtitle}</span>
            </span>
            <div className="flex bg-white/10 rounded-lg p-1 ml-2">
              {(Object.keys(THEMES) as string[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveThemeId(key)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeThemeId === key
                      ? "bg-white text-black shadow-lg"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {THEMES[key].name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {labels.liveBadge}
            </div>
            <button
              onClick={() => setShowStoreModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border"
              style={{
                borderColor: `${theme.primary}33`,
                backgroundColor: `${theme.primary}1A`,
                color: theme.primary,
              }}
            >
              <ShoppingBag size={14} />
              <span className="hidden sm:inline">Store</span>
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate("booking", "EventOS Premium")}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-black transition-all hover:opacity-90"
                style={{ backgroundColor: theme.primary }}
              >
                Get EventOS <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Ticker */}
        <div className="border-y border-white/5 overflow-hidden py-2" style={{ backgroundColor: `${theme.primary}0D` }}>
          <div
            className="animate-marquee whitespace-nowrap flex gap-12 text-xs font-medium"
            style={{ color: `${theme.primary}CC`, animation: "marquee 30s linear infinite" }}
          >
            {[...labels.ticker, ...labels.ticker].map((item, i) => (
              <span key={i} className="mr-8">{item}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Bento Grid */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">

          {/* 1. Main Battle Stage */}
          <div
            className={`md:col-span-8 relative group rounded-3xl overflow-hidden border border-white/10 transition-colors duration-500 ${theme.cardBg}`}
          >
            <div
              className="absolute inset-0 opacity-50"
              style={{ background: `linear-gradient(135deg, ${theme.primary}1A, transparent)` }}
            />
            <div className="relative p-6 min-h-[420px] flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-sm font-bold tracking-widest uppercase mb-1" style={{ color: theme.primary }}>
                    {labels.battleSubtitle}
                  </h2>
                  <h1 className="text-3xl font-black italic">{labels.battleTitle}</h1>
                </div>
                <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
                  12:45 REMAINING
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4 sm:gap-8 items-end pb-8">
                {contestants.map((contestant, idx) => {
                  const pct = Math.round(votes[contestant.id] ?? 50);
                  return (
                    <div key={contestant.id} className="text-center relative">
                      <div
                        className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-4 rounded-full p-1 transition-all duration-500"
                        style={{ background: `linear-gradient(135deg, ${contestant.color}, transparent)` }}
                      >
                        <img
                          src={contestant.image}
                          alt={contestant.name}
                          className="w-full h-full rounded-full object-cover border-4 border-black/40"
                        />
                        <div
                          className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 ${theme.cardBg}`}
                        >
                          <span className="text-xs font-bold" style={{ color: contestant.color }}>#{idx + 1}</span>
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black uppercase mb-1">{contestant.name}</h3>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">{contestant.role}</p>

                      <div
                        className="relative h-12 bg-white/5 rounded-xl overflow-hidden mb-4 cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => handleAction(`Voted for ${contestant.name}! 🔥`)}
                      >
                        <motion.div
                          className="absolute inset-y-0 left-0 opacity-20"
                          style={{ background: contestant.color }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                        <div className="relative flex items-center justify-between px-4 h-full">
                          <span className="font-bold text-sm">{labels.voteButton || "VOTE"}</span>
                          <span className="font-mono font-bold" style={{ color: contestant.color }}>
                            {pct}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* VS */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-black italic text-white/5 pointer-events-none select-none">
                VS
              </div>
            </div>
          </div>

          {/* 2. Live Stats + Chart */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 backdrop-blur-xl p-5 transition-colors duration-500 ${theme.cardBg}`}>
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Live Activity</h3>
            <div ref={chartContainerRef} className="w-full h-32 mb-4 min-w-0 overflow-hidden">
              {chartWidth > 0 && (
                <AreaChart width={chartWidth} height={128} data={hypeData}>
                  <defs>
                    <linearGradient id="colorHype" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={theme.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={theme.primary}
                    fillOpacity={1}
                    fill="url(#colorHype)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <YAxis hide domain={["dataMin", "dataMax"]} />
                </AreaChart>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {liveStats.map((stat) => (
                <div key={stat.label} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}22` }}>
                    <stat.icon size={14} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-white/40">{stat.label}</div>
                    <div className="font-bold text-sm">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Requests */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 p-5 transition-colors duration-500 ${theme.cardBg}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">{labels.requestTitle}</h3>
              <MessageSquare size={14} className="text-white/30" />
            </div>
            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => handleAction(`Upvoted: ${req.song} 🎵`)}
                >
                  <div className="text-center min-w-8">
                    <div className="text-xs font-bold" style={{ color: theme.primary }}>{req.votes}</div>
                    <div className="text-[9px] text-white/30">votes</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate">{req.song}</div>
                    <div className="text-white/40 text-xs truncate">{req.artist} · {req.user}</div>
                  </div>
                  <TrendingUp size={12} className="text-white/20 flex-shrink-0" />
                </div>
              ))}
            </div>
            <button
              className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all"
              onClick={() => handleAction("Request submitted! 🎶")}
            >
              + Submit Request
            </button>
          </div>

          {/* 4. VIP Lounge */}
          <div className={`md:col-span-8 rounded-3xl border border-white/10 p-5 transition-colors duration-500 ${theme.cardBg}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                <Crown size={14} style={{ color: theme.primary }} />
                {labels.vipTitle}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: `${theme.primary}22`, color: theme.primary }}>
                {vipUsers.length} online
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {vipUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all cursor-pointer text-center"
                  onClick={() => handleAction(`Sent message to ${user.name}`)}
                >
                  <div className="relative mx-auto w-12 h-12 mb-2">
                    <img src={user.img} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-black" />
                  </div>
                  <div className="font-bold text-xs truncate">{user.name}</div>
                  <div className="text-white/40 text-[10px] truncate">{user.role}</div>
                  <div
                    className="mt-1.5 text-[9px] px-2 py-0.5 rounded-full font-bold mx-auto w-fit"
                    style={{ backgroundColor: `${theme.primary}22`, color: theme.primary }}
                  >
                    {user.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Store Preview */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 p-5 transition-colors duration-500 ${theme.cardBg}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">{labels.storeTitle}</h3>
              <Star size={14} className="text-white/30" />
            </div>
            <div className="space-y-2">
              {storeItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setShowStoreModal(true)}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}22` }}>
                    <item.icon size={14} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs truncate">{item.name}</span>
                      {item.popular && (
                        <span className="text-[9px] px-1.5 rounded font-bold" style={{ backgroundColor: `${theme.primary}33`, color: theme.primary }}>
                          HOT
                        </span>
                      )}
                    </div>
                    <div className="text-white/40 text-[10px]">{item.desc}</div>
                  </div>
                  <div className="font-bold text-sm" style={{ color: theme.primary }}>${item.price}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowStoreModal(true)}
              className="w-full mt-4 py-2.5 rounded-xl text-xs font-bold transition-all"
              style={{ backgroundColor: `${theme.primary}22`, color: theme.primary }}
            >
              View Full Store →
            </button>
          </div>

          {/* 6. CTA Banner */}
          <div
            className="md:col-span-8 rounded-3xl p-6 relative overflow-hidden border border-white/10"
            style={{ background: `linear-gradient(135deg, ${theme.primary}22, ${theme.secondary}11)` }}
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-1">
                Ready to run <span style={{ color: theme.primary }}>your own event</span> on EventOS?
              </h2>
              <p className="text-white/60 text-sm mb-4">Set up in 2 hours. First event free consultation.</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleGetStarted("EventOS Premium")}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-black text-sm transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: theme.primary }}
                >
                  Get EventOS <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => handleGetStarted()}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/10 transition-all"
                >
                  Book Free Demo
                </button>
              </div>
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-8xl opacity-10 font-black italic select-none hidden md:block">
              OS
            </div>
          </div>

        </div>
      </main>

      {/* Store Modal */}
      <AnimatePresence>
        {showStoreModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
            onClick={(e) => e.target === e.currentTarget && setShowStoreModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg rounded-3xl p-7 border border-white/10 ${theme.cardBg}`}
            >
              <button
                onClick={() => setShowStoreModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>

              <h2 className="text-2xl font-black mb-1">{labels.storeTitle}</h2>
              <p className="text-white/50 text-sm mb-6">Power up your experience</p>

              <div className="space-y-3 mb-6">
                {storeItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-2xl border transition-all"
                    style={{
                      backgroundColor: `${item.color}0a`,
                      borderColor: item.popular ? `${item.color}44` : "transparent",
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}22` }}>
                      <item.icon size={20} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{item.name}</span>
                        {item.popular && (
                          <span className="text-[10px] px-2 rounded font-bold" style={{ backgroundColor: theme.primary, color: "#000" }}>
                            POPULAR
                          </span>
                        )}
                      </div>
                      <div className="text-white/50 text-xs">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => handlePurchase(item.id, item.name)}
                      disabled={purchasedItems[item.id]}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all"
                      style={{
                        backgroundColor: purchasedItems[item.id] ? "#22C55E" : item.color,
                        color: purchasedItems[item.id] ? "#fff" : "#000",
                        opacity: purchasedItems[item.id] ? 0.8 : 1,
                      }}
                    >
                      {purchasedItems[item.id] ? <Check size={14} /> : null}
                      {purchasedItems[item.id] ? "Done" : `$${item.price}`}
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="text-white/40 text-xs text-center mb-4">
                  Want your own event on EventOS?
                </p>
                <button
                  onClick={() => handleGetStarted("EventOS Premium")}
                  className="w-full py-3.5 rounded-xl font-black text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: theme.primary }}
                >
                  Get EventOS for Your Venue →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-bold shadow-2xl border border-white/10"
            style={{ backgroundColor: theme.cardBg === "bg-[#111]" ? "#1a1a1a" : theme.cardBg === "bg-[#1a2236]" ? "#1a2236" : "#2a2a2a" }}
          >
            <span style={{ color: theme.primary }}>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: flex;
          width: max-content;
        }
      `}</style>
    </div>
  );
}
