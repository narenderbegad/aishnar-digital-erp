import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Users, 
  Tv, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  TrendingUp, 
  Clock, 
  Building2, 
  Zap, 
  Star,
  Check,
  Award,
  ChevronRight,
  Calculator,
  Lock
} from 'lucide-react';

interface LandingPageViewProps {
  onOpenLogin: () => void;
  onLaunchDemo: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onOpenLogin, onLaunchDemo }) => {
  const [weddingCount, setWeddingCount] = useState(8);
  const [avgBudgetLakhs, setAvgBudgetLakhs] = useState(75);
  const [logoError, setLogoError] = useState(false);

  // ROI Calculations for Wedding Planners
  const hoursSavedPerWedding = 140; // RSVP, vendor calls, checklists
  const totalHoursSaved = weddingCount * hoursSavedPerWedding;
  const vendorOverbillingPrevented = Math.round(weddingCount * avgBudgetLakhs * 0.04); // 4% leakage prevented

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white selection:bg-[#00ff66]/30 select-none">
      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-50 aishnar-glass border-b border-white/10 px-6 lg:px-12 h-18 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#00ff66]/20 to-[#0066ff]/20 border border-[#00ff66]/40 flex items-center justify-center p-1.5 shadow-lg shadow-emerald-500/10">
            {!logoError ? (
              <img 
                src="/aishnar_logo.png" 
                alt="AishNar Digital" 
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)} 
              />
            ) : (
              <span className="font-extrabold text-sm tracking-tight aishnar-gradient-text">AD</span>
            )}
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <span>AishNar</span>
              <span className="italic font-light aishnar-gradient-text">Digital-ERP</span>
              <span className="text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono px-1.5 py-0.2 rounded-full uppercase">
                EVENT SUITE
              </span>
            </div>
            <div className="text-[10px] text-slate-400">Jaipur HQ · Enterprise Platform</div>
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs text-slate-300 font-medium">
          <a href="#features" className="hover:text-white transition-colors">Core Event Engine</a>
          <a href="#sop" className="hover:text-white transition-colors">200+ SOP Checklists</a>
          <a href="#pricing" className="hover:text-white transition-colors">Commercial Packages</a>
          <a href="#calculator" className="hover:text-white transition-colors">Agency ROI</a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onLaunchDemo}
            className="hidden sm:flex items-center space-x-1.5 text-xs font-semibold bg-white/10 hover:bg-white/15 text-white px-3.5 py-2 rounded-full border border-white/15 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>Interactive Demo</span>
          </button>

          <button
            onClick={onOpenLogin}
            className="flex items-center space-x-1.5 text-xs font-bold bg-gradient-to-r from-[#00ff66] to-[#0066ff] hover:opacity-95 text-slate-950 px-4 py-2 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Lock className="w-3.5 h-3.5 text-slate-950" />
            <span>Sign In to Portal</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#00ff66]/10 to-[#0066ff]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse"></span>
            <span>BUILT EXCLUSIVELY FOR LUXURY WEDDING & EVENT PLANNERS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            Run <span className="aishnar-gradient-text">₹50 Lakh to ₹5 Crore</span> Destination Weddings With Flawless Execution.
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            The all-in-one ERP operating system created for elite wedding management teams. Coordinate multi-day royal wedding schedules, track 800+ guest flight arrivals and room allocations, enforce 200+ production SOP checklists, control vendor milestone payouts, and broadcast live backstage TV status.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onLaunchDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00ff66] to-[#0066ff] text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Live Event Cockpit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
              <span>Agency & Super Admin Login</span>
            </button>
          </div>

          {/* Social Proof Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-[#15151a] border border-white/10">
              <div className="text-2xl font-bold font-mono text-white">₹45 Cr+</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Wedding Budgets Handled</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#15151a] border border-white/10">
              <div className="text-2xl font-bold font-mono aishnar-gradient-text">200+</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Pre-built Event SOP Checklists</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#15151a] border border-white/10">
              <div className="text-2xl font-bold font-mono text-white">100%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">On-Time Stage & Sound Handover</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#15151a] border border-white/10">
              <div className="text-2xl font-bold font-mono text-white">&lt;120ms</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Real-Time On-Ground Cloud Sync</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 6 CORE PILLARS (WHY PLANNERS PAY LACS FOR THIS) */}
      <section id="features" className="py-20 px-6 lg:px-12 border-t border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#00ff66] uppercase tracking-wider">
              OPERATIONAL SUPERPOWERS
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Everything Your On-Ground Wedding Team Needs.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
              Eliminate disorganized WhatsApp groups, lost vendor receipts, and missing airport guests forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-3xl bg-[#15151a] border border-white/10 hover:border-[#00ff66]/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#00ff66]/10 text-[#00ff66] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Today Cockpit & Live T-Minus Countdown</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every event director and assistant coordinator opens a dedicated cockpit with a live countdown to Sangeet, Baarat, or Gala Day, daily standing duties, and automatic productivity scores.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-3xl bg-[#15151a] border border-white/10 hover:border-[#0066ff]/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">200+ Event Production SOP Checklists</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tested across Jaipur, Udaipur, Goa, and Dubai palaces. Pre-loaded checkpoints covering Stage Trussing, Audio-Visual Console checks, Artist Tech-Riders, F&B Tastings, and VIP Hospitality.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-3xl bg-[#15151a] border border-white/10 hover:border-[#00ff66]/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#00ff66]/10 text-[#00ff66] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">VIP Hospitality & Guest Room Allocations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Coordinate 300 to 800+ wedding guests with flight arrival escort tracking, welcome hamper delivery verification, and key handover status directly from airport to hotel suite.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-3xl bg-[#15151a] border border-white/10 hover:border-[#0066ff]/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center">
                <Tv className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Backstage Production TV Wallboard</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Turn any TV monitor in your backstage greenroom or hotel hospitality desk into an ultra-modern control room display with live countdown clocks and arrival feeds.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="p-6 rounded-3xl bg-[#15151a] border border-white/10 hover:border-[#00ff66]/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#00ff66]/10 text-[#00ff66] flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Vendor Milestones & 50/30/20 Settlement</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clear vendor advances (Catering, Decor, Sound, Flowers, Makeup, Photographers) with 1-click approvals and generate client tax invoices with 18% GST calculation.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="p-6 rounded-3xl bg-[#15151a] border border-white/10 hover:border-[#00ff66]/40 transition-all space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#00ff66]/10 text-[#00ff66] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Meta WhatsApp Cloud Automation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send personalized WhatsApp itineraries, hotel check-in QR passes, and Sangeet schedule reminders directly from the ERP using official Meta Cloud APIs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COMMERCIAL PRICING (FOR SELLING TO AGENCIES) */}
      <section id="pricing" className="py-20 px-6 lg:px-12 border-t border-white/10 bg-[#0d0d12]/60">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono font-bold text-[#00ff66] uppercase tracking-wider">
              TRANSPARENT AGENCY PACKAGES
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Invest Once. Deliver 10x Client Satisfaction.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Choose the license tier that fits your agency size. Every license includes encrypted tenant isolation and in-app seat provisioning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tier 1: Starter */}
            <div className="p-7 rounded-3xl bg-[#15151a] border border-white/10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">Starter Edition</div>
                <div className="space-y-1">
                  <div className="text-3xl font-black font-mono text-white">₹60,000</div>
                  <div className="text-xs text-slate-500">per agency / billed annually (+18% GST)</div>
                </div>
                <p className="text-xs text-slate-400">
                  Ideal for boutique planners handling 3 to 8 destination weddings or corporate events per year.
                </p>

                <div className="space-y-2.5 pt-4 text-xs border-t border-white/10">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Up to 10 Coordinator Seats</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>5 Simultaneous Weddings Pipeline</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Today Cockpit & Daily SOPs</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Standard 200+ Event Checkpoints</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Instant Minutes of Meeting (MOM)</span></div>
                </div>
              </div>

              <button
                onClick={onOpenLogin}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all"
              >
                Request Starter License
              </button>
            </div>

            {/* Tier 2: Professional (MOST POPULAR) */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#15151a] to-[#1e1e24] border-2 border-[#00ff66] space-y-6 relative shadow-2xl shadow-emerald-500/10 flex flex-col justify-between">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00ff66] text-slate-950 font-black text-[10px] uppercase font-mono px-3 py-0.5 rounded-full shadow-md">
                MOST POPULAR FOR LUXURY PLANNERS
              </div>

              <div className="space-y-4">
                <div className="text-xs font-mono font-bold text-[#00ff66] uppercase">Professional Edition</div>
                <div className="space-y-1">
                  <div className="text-3xl font-black font-mono text-white">₹1,80,000</div>
                  <div className="text-xs text-slate-400">per agency / billed annually (+18% GST)</div>
                </div>
                <p className="text-xs text-slate-300">
                  For established luxury wedding agencies delivering royal destination weddings across India & Dubai.
                </p>

                <div className="space-y-2.5 pt-4 text-xs border-t border-white/10">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span className="font-semibold text-white">Up to 25 Coordinator Seats</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span className="font-semibold text-white">Unlimited Destination Weddings</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Backstage Production TV Display Mode</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Vendor 50/30/20 Milestone Payouts</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Meta WhatsApp Cloud Integration</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Client Guest Portal Access</span></div>
                </div>
              </div>

              <button
                onClick={onOpenLogin}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00ff66] to-[#0066ff] hover:opacity-95 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-102"
              >
                Claim Professional License
              </button>
            </div>

            {/* Tier 3: White-Label Enterprise */}
            <div className="p-7 rounded-3xl bg-[#15151a] border border-white/10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">White-Label Enterprise</div>
                <div className="space-y-1">
                  <div className="text-3xl font-black font-mono text-white">₹3,50,000+</div>
                  <div className="text-xs text-slate-500">annual license with white-glove setup</div>
                </div>
                <p className="text-xs text-slate-400">
                  For premier international event enterprises needing custom branding, bespoke workflows & dedicated DB.
                </p>

                <div className="space-y-2.5 pt-4 text-xs border-t border-white/10">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>50 to 100+ Coordinator Seats</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Custom Domain (e.g. erp.youragency.com)</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Full Agency White-Label Branding</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>Dedicated Isolated Supabase Cluster</span></div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#00ff66]" /> <span>24/7 On-Ground Technical Event SLA</span></div>
                </div>
              </div>

              <button
                onClick={onOpenLogin}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all"
              >
                Inquire Enterprise Setup
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE ROI CALCULATOR */}
      <section id="calculator" className="py-20 px-6 lg:px-12 border-t border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#15151a] border border-white/10 p-8 sm:p-10 space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00ff66]/10 text-[#00ff66] flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Agency Season Savings & ROI Estimator</h3>
              <p className="text-xs text-slate-400">See how much time and money your agency protects with AishNar Digital-ERP</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Destination Weddings Per Season:</span>
                <span className="font-mono text-[#00ff66] font-bold text-sm">{weddingCount} Weddings</span>
              </label>
              <input
                type="range"
                min="2"
                max="30"
                value={weddingCount}
                onChange={(e) => setWeddingCount(Number(e.target.value))}
                className="w-full accent-[#00ff66] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Average Wedding Budget:</span>
                <span className="font-mono text-[#00ff66] font-bold text-sm">₹{avgBudgetLakhs} Lakhs</span>
              </label>
              <input
                type="range"
                min="25"
                max="300"
                step="5"
                value={avgBudgetLakhs}
                onChange={(e) => setAvgBudgetLakhs(Number(e.target.value))}
                className="w-full accent-[#00ff66] cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-[#1e1e24] border border-white/10 text-center sm:text-left">
              <div className="text-xs text-slate-400 uppercase font-mono">Coordinator Hours Saved</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">{totalHoursSaved} Hours</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Eliminates manual WhatsApp coordination</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1e1e24] border border-white/10 text-center sm:text-left">
              <div className="text-xs text-slate-400 uppercase font-mono">Vendor Overbilling Prevented</div>
              <div className="text-2xl font-bold font-mono text-[#00ff66] mt-1">₹{vendorOverbillingPrevented} Lakhs</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Through milestone settlement clearances</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 lg:px-12 border-t border-white/10 bg-[#0d0d12] text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white">AishNar Digital Technologies</span>
          <span>· Jaipur HQ · Global Delivery</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={onOpenLogin} className="hover:text-white transition-colors">Portal Login</button>
          <span>·</span>
          <button onClick={onLaunchDemo} className="hover:text-white transition-colors">Live Cockpit</button>
          <span>·</span>
          <a href="https://aishnardigital.vercel.app/" target="_blank" rel="noreferrer" className="text-[#00ff66] hover:underline">
            aishnardigital.vercel.app
          </a>
        </div>
      </footer>
    </div>
  );
};
