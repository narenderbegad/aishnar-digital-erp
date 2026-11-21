import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Key, 
  Users, 
  UserCheck,
  LayoutDashboard, 
  Briefcase, 
  CreditCard, 
  Tv, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Download,
  Copy,
  Check,
  Award,
  Zap,
  DollarSign
} from 'lucide-react';

interface AdminVisualGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const AdminVisualGuideModal: React.FC<AdminVisualGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [activeSection, setActiveSection] = useState<'demo' | 'admin' | 'pricing' | 'pitch'>('demo');
  const [copiedScript, setCopiedScript] = useState(false);

  if (!isOpen) return null;

  const demoScript = `
"Namaste / Good morning! Welcome to Aishnar Digital-ERP — an all-in-one executive operations and business management platform.

Unlike old, bloated ERP systems that confuse your employees, Aishnar Digital-ERP is built with a calm, high-efficiency interface:
1. Every morning, your managers and staff open the 'Today Cockpit' where their recurring SOP duties, attendance, and monthly productivity score (100-pt system) are tracked automatically.
2. The 'Projects & SOPs' module ensures 100% on-time delivery with 200+ pre-built industry checklist checkpoints and instant exportable Minutes of Meeting (MOM).
3. The 'Finance' module lets employees claim expense vouchers with instant 1-click Admin approval and client tax invoice generation.
4. For your office, our 'TV Display Mode' turns any wall monitor into a live operational control center.
5. And as your organization grows, the Super Admin can provision new seats and activate users with 1 click directly inside the software."
  `.trim();

  const handleCopyScript = () => {
    navigator.clipboard.writeText(demoScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      <div className="apple-card rounded-3xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08]">
        {/* Modal Header */}
        <div className="p-5 border-b border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs">
              AD
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Super Admin & Sales Playbook</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                  Commercial Guide
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Walkthrough script, client demo playbook, and super admin operations manual
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center space-x-2 px-6 pt-2.5 border-b border-black/[0.04] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.01] text-xs">
          <button
            onClick={() => setActiveSection('demo')}
            className={`pb-2 px-3 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeSection === 'demo'
                ? 'border-slate-900 dark:border-white text-slate-950 dark:text-white font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>5-Min Client Demo</span>
          </button>

          <button
            onClick={() => setActiveSection('admin')}
            className={`pb-2 px-3 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeSection === 'admin'
                ? 'border-slate-900 dark:border-white text-slate-950 dark:text-white font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Admin Manual</span>
          </button>

          <button
            onClick={() => setActiveSection('pricing')}
            className={`pb-2 px-3 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeSection === 'pricing'
                ? 'border-slate-900 dark:border-white text-slate-950 dark:text-white font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Pricing & Packages</span>
          </button>

          <button
            onClick={() => setActiveSection('pitch')}
            className={`pb-2 px-3 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeSection === 'pitch'
                ? 'border-slate-900 dark:border-white text-slate-950 dark:text-white font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Sales Pitch & Script</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SECTION 1: 5-MINUTE CLIENT DEMO TOUR */}
          {activeSection === 'demo' && (
            <div className="space-y-6">
              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 rounded-xl p-4 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                    How to Present This ERP to a Client in 5 Minutes
                  </h4>
                  <p className="text-xs text-emerald-800/80 dark:text-emerald-400/80 mt-1">
                    Follow this exact sequence when presenting live. It highlights high-value operational benefits and immediately proves the software's commercial power.
                  </p>
                </div>
                <button
                  onClick={handleCopyScript}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedScript ? 'Copied Pitch Script!' : 'Copy Script'}</span>
                </button>
              </div>

              {/* 5 Walkthrough Steps */}
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Start at: Today Cockpit
                      </h5>
                      <button
                        onClick={() => { onNavigateTab('today'); onClose(); }}
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Jump to Today <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      <strong>What to say:</strong> "Every team member gets a focused daily cockpit. It eliminates chaos by showing their daily standing duties, active sprint tasks, and an automated 100-point monthly productivity score that rewards on-time delivery."
                    </p>
                    <div className="mt-2 text-[11px] bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg text-slate-500 font-mono">
                      Action: Check off a standing duty live to demonstrate the instant streak feedback and score calculation.
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Show: Projects & 200+ SOP Checklists
                      </h5>
                      <button
                        onClick={() => { onNavigateTab('projects'); onClose(); }}
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Jump to Projects <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      <strong>What to say:</strong> "Never drop a milestone again. The Projects workspace tracks progress percentages, deliverables, and pre-built engineering SOP checklists. You can also generate official Minutes of Meeting (MOM) PDFs with one tap."
                    </p>
                    <div className="mt-2 text-[11px] bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg text-slate-500 font-mono">
                      Action: Click on 'Checklists' and 'MOM' tabs to show the pre-loaded deliverables and print-ready minutes.
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Highlight: Software Sales & Revenue Dashboard (Admin Only)
                      </h5>
                      <button
                        onClick={() => { onNavigateTab('sales'); onClose(); }}
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Jump to Sales <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      <strong>What to say:</strong> "For company leadership, our built-in SaaS sales engine tracks your annual recurring revenue, deal stages from lead to won, and allows instant provisioning of client software licenses."
                    </p>
                    <div className="mt-2 text-[11px] bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg text-slate-500 font-mono">
                      Action: Show the ARR metric and click 'Provision Key' on a closed deal to demonstrate cryptographic license generation.
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        Prove: Direct In-App User Activation
                      </h5>
                      <button
                        onClick={() => { onNavigateTab('activation'); onClose(); }}
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Jump to Activation <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      <strong>What to say:</strong> "You have 100% control over your users. You don't need expensive IT consultants or complex consoles. The Super Admin can onboard new employees or toggle access off in 1 click."
                    </p>
                    <div className="mt-2 text-[11px] bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg text-slate-500 font-mono">
                      Action: Click '⚡ 1-Click Activate' on any user row to show the instant activation and status flip.
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        The 'Wow' Closer: Office TV Wallboard
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      <strong>What to say:</strong> "Finally, plug any TV in your office into this system. It gives your leadership a live command center displaying real-time clock, duties compliance, and attendance radar."
                    </p>
                    <div className="mt-2 text-[11px] bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg text-slate-500 font-mono">
                      Action: Press the TV icon in the header or sidebar to reveal the fullscreen wallboard.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: SUPER ADMIN OPERATIONS */}
          {activeSection === 'admin' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Super Admin Complete Capabilities & Master Controls
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  As the Super Admin, here is everything you can do and how each workflow operates:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Admin Capability 1 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Key className="w-4 h-4 text-emerald-600" />
                    <span>1. Issue & Manage Software Licenses</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Navigate to <strong>Software Sales → Issued Licenses</strong>. Every license uses the standard secure format: <code className="text-emerald-600 font-mono">AISH-[TIER]-[YEAR]-[KEY]</code>. You can inspect seat quotas, copy keys, and verify valid expiration dates.
                  </p>
                </div>

                {/* Admin Capability 2 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>2. Onboard & Activate Users</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    In <strong>User Activation</strong>, click <strong>"Activate New User"</strong>. Assign their role, organization, and license. If an employee leaves or a client subscription lapses, tap <strong>"Deactivate"</strong> to block access instantly.
                  </p>
                </div>

                {/* Admin Capability 3 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>3. Approve Employee Expense Vouchers</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    In <strong>Expenses & Invoices</strong>, inspect claims filed by your team (AWS bills, travel, licenses). Click <strong>"Approve"</strong> to record authorized disbursements with your Admin signature.
                  </p>
                </div>

                {/* Admin Capability 4 */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>4. Role-Based Permissions Switcher</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Use the <strong>"Role"</strong> dropdown in the top header to preview the ERP as a Project Manager, Staff Engineer, or Client Viewer to audit exactly what each permission tier can see.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: COMMERCIAL PRICING & TIERS */}
          {activeSection === 'pricing' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Ready-to-Sell Commercial Pricing Packages (Starting Tomorrow)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Recommended pricing model tailored for Indian and international agencies, firms, and enterprises:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tier 1 */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Starter Agency</div>
                  <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                    ₹60,000 <span className="text-xs font-normal text-slate-400">/ year</span>
                  </div>
                  <p className="text-xs text-slate-500">Perfect for boutique agencies up to 10 employees.</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <li>✓ Up to 10 Active User Seats</li>
                    <li>✓ Today Cockpit & Duties Checklist</li>
                    <li>✓ Task & Project Deliverables</li>
                    <li>✓ Standard Cloud Hosting</li>
                  </ul>
                </div>

                {/* Tier 2 */}
                <div className="p-5 rounded-xl border-2 border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/20 space-y-3 relative">
                  <span className="absolute -top-2.5 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Most Popular
                  </span>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Professional Enterprise</div>
                  <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                    ₹1,80,000 <span className="text-xs font-normal text-slate-400">/ year</span>
                  </div>
                  <p className="text-xs text-slate-500">Ideal for growing companies with 10 to 35 staff.</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-2 border-t border-emerald-200/50 dark:border-emerald-800/50">
                    <li>✓ Up to 35 Active User Seats</li>
                    <li>✓ 100-Point Productivity Scoring</li>
                    <li>✓ Office TV Display Mode</li>
                    <li>✓ WhatsApp Client CRM Gateway</li>
                    <li>✓ Supabase PostgreSQL Cloud Sync</li>
                  </ul>
                </div>

                {/* Tier 3 */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Custom White-Label</div>
                  <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                    ₹3,50,000+ <span className="text-xs font-normal text-slate-400">/ year</span>
                  </div>
                  <p className="text-xs text-slate-500">Full brand customization with dedicated domain & server.</p>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <li>✓ Unlimited User Seats & Tenants</li>
                    <li>✓ Custom Subdomain & Custom Logo</li>
                    <li>✓ Dedicated Render / VPS Server</li>
                    <li>✓ Priority SLA 24/7 Support</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: SALES PITCH & OBJECTIONS */}
          {activeSection === 'pitch' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Sales Objection Handlers (How to Win Every Deal)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Prepare your answers to the most common questions prospective clients will ask:
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Q: "We already use Excel / Google Sheets. Why should we pay for Aishnar ERP?"
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mt-1">
                    <strong>Answer:</strong> "Sheets have no accountability — anyone can delete cells, miss follow-ups, and there's no live productivity score. Aishnar Digital-ERP ensures your team follows standard operating procedures daily, automates milestone tracking, and displays live office TV telemetry."
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Q: "Is our business data secure?"
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mt-1">
                    <strong>Answer:</strong> "Yes. Aishnar Digital-ERP is backed by enterprise Supabase PostgreSQL clusters with cryptographic license keys, SSL/TLS encryption, and isolated tenant permissions."
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Q: "How quickly can our team go live?"
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mt-1">
                    <strong>Answer:</strong> "Within 15 minutes! Because it is pre-hosted on high-speed cloud infrastructure, your Super Admin simply generates user invites, assigns roles, and your team is ready to go."
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
