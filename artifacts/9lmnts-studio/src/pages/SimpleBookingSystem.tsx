import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Zap,
  Brain,
  Video,
  ChevronRight,
  User,
  Mail,
  Phone,
  FileText,
  Clock,
  Calendar,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  tag: string;
  category: string;
  highlights: string[];
  featured?: boolean;
}

const services: Service[] = [
  // EventOS (Priority 1)
  {
    id: "eventos-basic",
    name: "EventOS Basic",
    price: "$1,500",
    priceNum: 1500,
    description: "Single event license — get your event running on EventOS in 2 hours",
    icon: Zap,
    tag: "EventOS",
    category: "EventOS Platform",
    highlights: ["Single event license", "Real-time dashboard", "Guest check-in app", "Basic analytics"],
    featured: false,
  },
  {
    id: "eventos-premium",
    name: "EventOS Premium",
    price: "$5,000",
    priceNum: 5000,
    description: "White-label platform + AI assistant — your brand, our tech",
    icon: Star,
    tag: "Most Popular",
    category: "EventOS Platform",
    highlights: ["White-label branding", "AI assistant included", "Multi-event access", "VIP guest management", "24/7 priority support"],
    featured: true,
  },
  // AI Services (Priority 2)
  {
    id: "ai-brand-voice",
    name: "AI Brand Voice",
    price: "$2,500",
    priceNum: 2500,
    description: "Custom GPT trained on your brand — speaks exactly like you",
    icon: Brain,
    tag: "AI",
    category: "AI Services",
    highlights: ["Custom GPT model", "Trained on your content", "Unlimited queries", "Brand consistency"],
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    price: "$3,000",
    priceNum: 3000,
    description: "Complete workflow automation — eliminate repetitive tasks forever",
    icon: Zap,
    tag: "AI",
    category: "AI Services",
    highlights: ["Full workflow mapping", "AI task automation", "Integration setup", "Ongoing optimization"],
  },
  {
    id: "ai-multilingual",
    name: "AI Multilingual",
    price: "$3,500",
    priceNum: 3500,
    description: "Translation & adaptation for global audiences — go international",
    icon: Brain,
    tag: "AI",
    category: "AI Services",
    highlights: ["15+ languages", "Cultural adaptation", "Real-time translation", "Tone preservation"],
  },
  // Social Content (Priority 3)
  {
    id: "content-package",
    name: "Content Package",
    price: "$1,000",
    priceNum: 1000,
    description: "30 viral clips/month — consistent social presence on autopilot",
    icon: Video,
    tag: "Social",
    category: "Social Media Content",
    highlights: ["30 clips/month", "Trend-optimized", "Platform-ready", "Monthly delivery"],
  },
  {
    id: "full-automation",
    name: "Full Automation",
    price: "$3,000",
    priceNum: 3000,
    description: "Multi-platform AI posting — your content runs itself",
    icon: Video,
    tag: "Social",
    category: "Social Media Content",
    highlights: ["Multi-platform posting", "AI scheduling", "Analytics dashboard", "Content calendar"],
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  description: string;
}

interface SimpleBookingSystemProps {
  initialService?: string;
  onNavigate?: (page: string) => void;
}

export default function SimpleBookingSystem({ initialService, onNavigate }: SimpleBookingSystemProps) {
  const [step, setStep] = useState(initialService ? 2 : 1);
  const [selectedService, setSelectedService] = useState<Service | null>(
    initialService ? (services.find((s) => s.name === initialService) || services.find((s) => s.id === "eventos-premium") || null) : null
  );
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = Array.from(new Set(services.map((s) => s.category)));

  const handleSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setStep(3);
    setSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService(null);
    setForm({ name: "", email: "", phone: "", description: "" });
    setSubmitted(false);
  };

  const isFormValid = form.name.trim() && form.email.trim() && form.email.includes("@");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{ backgroundColor: "#0A0A0Aee", borderColor: "#FF7A0022" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate?.("demo")}
            className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Demo
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-black text-xs" style={{ backgroundColor: "#FF7A00" }}>
              9L
            </div>
            <span className="font-bold">9LMNTS Studio</span>
          </div>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Progress Steps */}
        {!submitted && (
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-10">
            {[
              { num: 1, label: "WANT", desc: "Pick a service" },
              { num: 2, label: "PICK", desc: "Your details" },
              { num: 3, label: "GET", desc: "Confirmation" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all"
                    style={{
                      backgroundColor: step >= s.num ? "#FF7A00" : "#1A1A1A",
                      color: step >= s.num ? "#000" : "#666",
                    }}
                  >
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <div className="mt-1 text-center">
                    <div className="text-xs font-bold" style={{ color: step >= s.num ? "#FF7A00" : "#666" }}>
                      {s.label}
                    </div>
                    <div className="text-xs opacity-40 hidden sm:block">{s.desc}</div>
                  </div>
                </div>
                {i < 2 && (
                  <div
                    className="h-0.5 w-16 sm:w-24 mx-2 mb-5 transition-all"
                    style={{ backgroundColor: step > s.num ? "#FF7A00" : "#333" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-black mb-2">What do you want?</h1>
                <p className="opacity-60">Choose a service to get started</p>
              </div>

              {categories.map((category) => (
                <div key={category} className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-lg font-bold opacity-80">{category}</h2>
                    <div className="flex-1 h-px" style={{ backgroundColor: "#FF7A0022" }} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {services.filter((s) => s.category === category).map((service) => (
                      <motion.button
                        key={service.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(service)}
                        className="text-left rounded-2xl p-6 border transition-all relative overflow-hidden"
                        style={{
                          backgroundColor: service.featured ? "#FF7A0010" : "#111111",
                          borderColor: service.featured ? "#FF7A0066" : "#222222",
                        }}
                      >
                        {service.featured && (
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold text-black" style={{ backgroundColor: "#FF7A00" }}>
                            {service.tag}
                          </span>
                        )}
                        {!service.featured && (
                          <span
                            className="inline-block px-2 py-0.5 rounded text-xs font-bold mb-3"
                            style={{
                              backgroundColor:
                                service.tag === "AI" ? "#6366F122" :
                                service.tag === "Social" ? "#10B98122" : "#FF7A0022",
                              color:
                                service.tag === "AI" ? "#818CF8" :
                                service.tag === "Social" ? "#34D399" : "#FF7A00",
                            }}
                          >
                            {service.tag}
                          </span>
                        )}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-black mb-1">{service.name}</h3>
                            <p className="text-sm opacity-60 leading-relaxed">{service.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="text-2xl font-black" style={{ color: service.featured ? "#FF7A00" : "#FFF" }}>
                              {service.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm font-bold" style={{ color: "#FF7A00" }}>
                            Select <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {service.highlights.slice(0, 3).map((h) => (
                            <span key={h} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "#FFFFFF0a", color: "#FFFFFF66" }}>
                              {h}
                            </span>
                          ))}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 2: Your Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl mx-auto"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-black mb-2">Let's get to know you</h1>
                <p className="opacity-60">Tell us a bit so we can prepare for you</p>
              </div>

              {/* Selected Service Summary */}
              {selectedService && (
                <div className="rounded-xl p-4 border mb-6 flex items-center gap-4" style={{ backgroundColor: "#FF7A0010", borderColor: "#FF7A0033" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF7A0022" }}>
                    <selectedService.icon className="w-5 h-5" style={{ color: "#FF7A00" }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{selectedService.name}</div>
                    <div className="text-sm opacity-60">{selectedService.price}</div>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                  >
                    Change
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {[
                  { field: "name" as const, label: "Your Name", placeholder: "John Smith", icon: User, type: "text", required: true },
                  { field: "email" as const, label: "Email Address", placeholder: "john@yourvenue.com", icon: Mail, type: "email", required: true },
                  { field: "phone" as const, label: "Phone Number", placeholder: "+1 (555) 000-0000", icon: Phone, type: "tel", required: false },
                ].map(({ field, label, placeholder, icon: Icon, type, required }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-2 opacity-70">
                      {label} {required && <span style={{ color: "#FF7A00" }}>*</span>}
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[field]}
                        onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none transition-all focus:ring-2"
                        style={{
                          backgroundColor: "#111111",
                          borderColor: "#333333",
                          color: "#FFFFFF",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#FF7A00";
                          e.target.style.boxShadow = "0 0 0 2px #FF7A0022";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#333333";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium mb-2 opacity-70">
                    Project Brief <span className="opacity-40">(optional)</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 w-4 h-4 opacity-40" />
                    <textarea
                      placeholder="Tell us about your event, venue, or what you're trying to achieve..."
                      value={form.description}
                      onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                      rows={4}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none transition-all resize-none"
                      style={{ backgroundColor: "#111111", borderColor: "#333333", color: "#FFFFFF" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#FF7A00";
                        e.target.style.boxShadow = "0 0 0 2px #FF7A0022";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#333333";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading}
                  className="w-full py-4 rounded-xl font-black text-lg text-black transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#FF7A00" }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit Request <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-xs text-center opacity-40">We respond within 24 hours, usually much faster.</p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "#FF7A0020" }}
              >
                <CheckCircle className="w-10 h-10" style={{ color: "#FF7A00" }} />
              </motion.div>

              <h1 className="text-3xl sm:text-4xl font-black mb-3">You're In.</h1>
              <p className="text-base sm:text-xl opacity-70 mb-8">
                Your request has been received. Here's what happens next:
              </p>

              <div className="rounded-2xl border text-left p-6 mb-6 space-y-4" style={{ backgroundColor: "#111111", borderColor: "#FF7A0033" }}>
                {[
                  {
                    icon: Clock,
                    title: "Within 2 hours",
                    desc: "Our team reviews your request and prepares your custom proposal",
                  },
                  {
                    icon: Mail,
                    title: "Personal outreach",
                    desc: `We'll reach out to ${form.email} to schedule your onboarding call`,
                  },
                  {
                    icon: Calendar,
                    title: "Onboarding call",
                    desc: "We walk you through everything and get you fully set up",
                  },
                  {
                    icon: Zap,
                    title: "Go live",
                    desc: "Your first event runs on EventOS — results from day one",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#FF7A0020" }}>
                      <item.icon className="w-4 h-4" style={{ color: "#FF7A00" }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{item.title}</div>
                      <div className="text-sm opacity-60">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {selectedService && (
                <div className="rounded-xl p-4 border mb-6" style={{ backgroundColor: "#FF7A0010", borderColor: "#FF7A0033" }}>
                  <div className="text-sm opacity-60 mb-1">Your selected service</div>
                  <div className="font-black text-xl" style={{ color: "#FF7A00" }}>{selectedService.name}</div>
                  <div className="text-sm opacity-60">{selectedService.price}</div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate?.("demo")}
                  className="flex-1 py-3 rounded-xl font-bold transition-all hover:opacity-80"
                  style={{ backgroundColor: "#1A1A1A", color: "#FFF" }}
                >
                  Explore EventOS Demo
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl font-bold text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: "#FF7A00" }}
                >
                  Add Another Service
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
