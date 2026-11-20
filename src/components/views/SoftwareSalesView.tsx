import React, { useState } from 'react';
import { 
  TrendingUp, 
  Plus, 
  Key, 
  Building2, 
  Sparkles, 
  FileText, 
  Filter, 
  Search, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  DollarSign, 
  Users, 
  Percent, 
  Phone, 
  Mail, 
  Globe, 
  X, 
  Check, 
  Copy, 
  Printer, 
  Layers, 
  Kanban, 
  BarChart3, 
  ShieldCheck, 
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SoftwareSalesDeal, SoftwareLicense, SalesFunnelStage, EnterpriseQuotation } from '../../types';
import { ERPStoreState, generateLicenseKey } from '../../lib/store';

interface SoftwareSalesViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
}

const FUNNEL_STAGES: { id: SalesFunnelStage; label: string; description: string; color: string; bg: string }[] = [
  { id: 'lead_inbound', label: '1. Inbound Leads', description: 'Budget qualified inquiries', color: 'text-slate-600 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-slate-800' },
  { id: 'discovery_demo', label: '2. Discovery & Demo', description: 'Live architecture walkthrough', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40' },
  { id: 'proposal_quote', label: '3. Proposal & Quote', description: 'Commercial quote submitted', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  { id: 'security_legal', label: '4. Security & Legal', description: 'SOC2 / InfoSec review', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/40' },
  { id: 'contract_negotiation', label: '5. Negotiation', description: 'Procurement & sign-off', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/40' },
  { id: 'closed_won', label: '6. Closed Won', description: 'Payment received & provisioned', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
];

export const SoftwareSalesView: React.FC<SoftwareSalesViewProps> = ({ state, onUpdateState }) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'funnel' | 'table' | 'licenses' | 'quotes'>('kanban');
  const [selectedDeal, setSelectedDeal] = useState<SoftwareSalesDeal | null>(null);
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [activeQuotation, setActiveQuotation] = useState<EnterpriseQuotation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // New deal form state
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('Enterprise Technology');
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('VP Technology & Operations');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('+91 ');
  const [planTier, setPlanTier] = useState<SoftwareSalesDeal['planTier']>('Enterprise');
  const [seatsCount, setSeatsCount] = useState('50');
  const [dealValue, setDealValue] = useState('350000');
  const [paymentTerms, setPaymentTerms] = useState<SoftwareSalesDeal['paymentTerms']>('Annual Upfront');
  const [stage, setStage] = useState<SalesFunnelStage>('lead_inbound');
  const [notes, setNotes] = useState('');

  // Commercial Metrics
  const deals = state.salesDeals;
  const activePipelineDeals = deals.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost');
  const closedWonDeals = deals.filter(d => d.stage === 'closed_won');

  const totalPipelineValue = activePipelineDeals.reduce((sum, d) => sum + d.dealValue, 0);
  const weightedPipelineValue = activePipelineDeals.reduce((sum, d) => sum + (d.dealValue * (d.probability / 100)), 0);
  const totalARR = closedWonDeals.reduce((sum, d) => sum + d.dealValue, 0) + 1200000;
  const totalMRR = Math.round(totalARR / 12);
  const averageDealSize = Math.round(deals.reduce((sum, d) => sum + d.dealValue, 0) / (deals.length || 1));
  const winRate = Math.round((closedWonDeals.length / (deals.length || 1)) * 100);

  // Move stage handler
  const handleMoveStage = (dealId: string, nextStage: SalesFunnelStage) => {
    const updated = state.salesDeals.map(d => {
      if (d.id === dealId) {
        if (nextStage === 'closed_won') {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
        let newProb = 25;
        if (nextStage === 'discovery_demo') newProb = 45;
        if (nextStage === 'proposal_quote') newProb = 70;
        if (nextStage === 'security_legal') newProb = 80;
        if (nextStage === 'contract_negotiation') newProb = 90;
        if (nextStage === 'closed_won') newProb = 100;

        return { ...d, stage: nextStage, probability: newProb };
      }
      return d;
    });

    onUpdateState({ ...state, salesDeals: updated });
    if (selectedDeal && selectedDeal.id === dealId) {
      setSelectedDeal({ ...selectedDeal, stage: nextStage });
    }
  };

  // Convert deal into official license key
  const handleProvisionLicense = (deal: SoftwareSalesDeal) => {
    const newKey = generateLicenseKey(deal.planTier);
    const newLicense: SoftwareLicense = {
      id: `lic-${Date.now()}`,
      licenseKey: newKey,
      organizationName: deal.companyName,
      adminEmail: deal.contactEmail,
      tier: deal.planTier,
      seatLimit: deal.seatsCount || (deal.planTier === 'Enterprise' ? 50 : 25),
      activeSeats: 1,
      status: 'active',
      issuedAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
      autoRenew: true,
      featuresAllowed: ['all_modules', 'user_activation', 'tv_wallboard', 'api_access'],
    };

    onUpdateState({
      ...state,
      licenses: [newLicense, ...state.licenses],
    });

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    setViewMode('licenses');
  };

  // Generate Quotation
  const handleOpenQuotation = (deal: SoftwareSalesDeal) => {
    const baseAmount = deal.dealValue;
    const taxAmount = Math.round(baseAmount * 0.18); // 18% GST
    const quote: EnterpriseQuotation = {
      id: `qt-${Date.now()}`,
      quoteNumber: deal.quotationNumber || `QT-AISH-2026-${Math.floor(100 + Math.random() * 900)}`,
      dealId: deal.id,
      clientCompany: deal.companyName,
      clientContact: `${deal.contactName} (${deal.contactRole})`,
      clientEmail: deal.contactEmail,
      planTier: deal.planTier,
      seats: deal.seatsCount || 25,
      baseAmount,
      discountAmount: 0,
      taxAmount,
      totalAmount: baseAmount + taxAmount,
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      paymentTerms: deal.paymentTerms,
      issuedAt: new Date().toISOString().split('T')[0],
    };
    setActiveQuotation(quote);
  };

  // Create new deal
  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactEmail) return;

    const val = Number(dealValue) || 180000;
    const newDeal: SoftwareSalesDeal = {
      id: `deal-${Date.now()}`,
      companyName,
      website,
      industry,
      contactName,
      contactRole,
      contactEmail,
      contactPhone,
      planTier,
      seatsCount: Number(seatsCount) || 25,
      dealValue: val,
      mrr: Math.round(val / 12),
      billingCycle: 'annual',
      paymentTerms,
      stage,
      probability: stage === 'closed_won' ? 100 : stage === 'proposal_quote' ? 70 : 30,
      createdDate: new Date().toISOString().split('T')[0],
      expectedCloseDate: new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0],
      assignedSalesRep: state.currentUser.name,
      quotationNumber: `QT-AISH-2026-${Math.floor(100 + Math.random() * 900)}`,
      notes,
    };

    onUpdateState({
      ...state,
      salesDeals: [newDeal, ...state.salesDeals],
    });

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    setShowAddDealModal(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredDeals = state.salesDeals.filter(d => {
    const matchesSearch = d.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTierFilter === 'all' || d.planTier === selectedTierFilter;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Top Header & Master Telemetry */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                ENTERPRISE REVENUE & SALES CRM
              </span>
              <span className="text-xs text-slate-400">Direct Software Commercials</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Aishnar Digital-ERP Software Sales Engine
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Track enterprise client proposals, visual conversion funnel, license key provisioning, and revenue metrics.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddDealModal(true)}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Enterprise Opportunity</span>
            </button>
          </div>
        </div>

        {/* 5 Enterprise KPI Telemetry Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Pipeline ACV</div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
              ₹{(totalPipelineValue / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{activePipelineDeals.length} Active Deals</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Weighted Forecast</div>
            <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              ₹{(weightedPipelineValue / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-emerald-600/80 mt-0.5">Probability Adjusted</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Annual Run Rate (ARR)</div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
              ₹{(totalARR / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-emerald-600 mt-0.5 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +28% YoY Growth
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Monthly MRR</div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
              ₹{totalMRR.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Recurring Inflow</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Win Rate</div>
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
              {winRate}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Avg Deal: ₹{(averageDealSize / 100000).toFixed(1)}L</div>
          </div>
        </div>
      </div>

      {/* Control Bar: View Mode Switcher + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-3">
        {/* Segmented Control */}
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl text-xs">
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'kanban'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban Pipeline</span>
          </button>

          <button
            onClick={() => setViewMode('funnel')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'funnel'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Visual Funnel</span>
          </button>

          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'table'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Deals Ledger</span>
          </button>

          <button
            onClick={() => setViewMode('licenses')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'licenses'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-emerald-500" />
            <span>Customer Licenses ({state.licenses.length})</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center space-x-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Search companies, contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none text-xs w-48 sm:w-60"
            />
          </div>

          <select
            value={selectedTierFilter}
            onChange={(e) => setSelectedTierFilter(e.target.value)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none text-xs"
          >
            <option value="all">All Tiers</option>
            <option value="Starter">Starter</option>
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Custom White-Label">Custom White-Label</option>
          </select>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {FUNNEL_STAGES.map((stageInfo) => {
            const stageDeals = filteredDeals.filter(d => d.stage === stageInfo.id);
            const stageValue = stageDeals.reduce((sum, d) => sum + d.dealValue, 0);

            return (
              <div 
                key={stageInfo.id}
                className="bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-3 flex flex-col min-w-[220px]"
              >
                {/* Stage Header */}
                <div className="pb-3 border-b border-slate-200/60 dark:border-slate-800 mb-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${stageInfo.color}`}>
                      {stageInfo.label}
                    </span>
                    <span className="text-[10px] font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-500 font-bold">
                      {stageDeals.length}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                    <span>Value:</span>
                    <strong className="text-slate-700 dark:text-slate-300">₹{(stageValue / 100000).toFixed(1)}L</strong>
                  </div>
                </div>

                {/* Deal Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {stageDeals.length === 0 ? (
                    <div className="h-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-[11px] text-slate-400">
                      No deals here
                    </div>
                  ) : (
                    stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        onClick={() => setSelectedDeal(deal)}
                        className="p-3 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-md hover:border-emerald-500/50 transition-all cursor-pointer space-y-2 group"
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                            {deal.planTier}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {deal.probability}%
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {deal.companyName}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {deal.contactName} · {deal.contactRole}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-slate-100 dark:border-slate-700/60">
                          <span className="font-bold text-slate-900 dark:text-white">₹{deal.dealValue.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-slate-400">{deal.seatsCount} seats</span>
                        </div>

                        {/* Quick Action on Card */}
                        {deal.stage === 'closed_won' ? (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleProvisionLicense(deal); }}
                            className="w-full py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 shadow-xs"
                          >
                            <Key className="w-3 h-3" />
                            <span>Provision Key</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleOpenQuotation(deal); }}
                            className="w-full py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1"
                          >
                            <FileText className="w-3 h-3" />
                            <span>View Quote</span>
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: VISUAL SALES CONVERSION FUNNEL */}
      {viewMode === 'funnel' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
                Sales Funnel Conversion Velocity & Stage Drop-off
              </h3>
              <p className="text-xs text-slate-400">
                Visual conversion efficiency from initial inquiry to paid enterprise license delivery
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
              Overall Win Rate: {winRate}%
            </span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto py-2">
            {FUNNEL_STAGES.map((st, idx) => {
              const count = deals.filter(d => d.stage === st.id).length;
              const val = deals.filter(d => d.stage === st.id).reduce((s, d) => s + d.dealValue, 0);
              const percent = Math.max(15, Math.round((count / (deals.length || 1)) * 100));

              return (
                <div key={st.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] flex items-center justify-center font-bold font-mono">
                        {idx + 1}
                      </span>
                      <span>{st.label}</span>
                      <span className="text-[11px] text-slate-400 font-normal">({st.description})</span>
                    </span>
                    <div className="flex items-center space-x-4 font-mono">
                      <span>{count} Opportunities</span>
                      <strong className="text-slate-900 dark:text-white">₹{(val / 100000).toFixed(2)}L</strong>
                    </div>
                  </div>

                  {/* Funnel Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-6 rounded-xl overflow-hidden flex items-center p-1">
                    <div
                      className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-2 text-[10px] text-white font-bold font-mono"
                      style={{ width: `${percent}%` }}
                    >
                      {count > 0 && `${count}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: ADVANCED DEALS TABLE */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Company & Contact</th>
                <th className="p-3.5">Industry</th>
                <th className="p-3.5">Plan Tier</th>
                <th className="p-3.5">Seats</th>
                <th className="p-3.5">Contract Value</th>
                <th className="p-3.5">Funnel Stage</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredDeals.map((deal) => (
                <tr 
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {deal.companyName}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {deal.contactName} · {deal.contactEmail}
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">
                    {deal.industry}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {deal.planTier}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-700 dark:text-slate-300">
                    {deal.seatsCount} seats
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">
                    ₹{deal.dealValue.toLocaleString('en-IN')}
                    <span className="text-[10px] text-slate-400 block font-normal">/{deal.billingCycle}</span>
                  </td>
                  <td className="p-3.5">
                    <select
                      value={deal.stage}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleMoveStage(deal.id, e.target.value as SalesFunnelStage)}
                      className="text-xs font-semibold px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    >
                      {FUNNEL_STAGES.map(s => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleOpenQuotation(deal); }}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-md text-[11px] font-semibold"
                    >
                      Quote
                    </button>
                    {deal.stage === 'closed_won' && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleProvisionLicense(deal); }}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[11px] font-bold"
                      >
                        Provision Key
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 4: CUSTOMER LICENSES & ENCRYPTED KEYS */}
      {viewMode === 'licenses' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-slate-800">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-500" />
              Issued Cryptographic Software Licenses
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {state.licenses.length} Verified Tenants
            </span>
          </div>

          {state.licenses.map((lic) => (
            <div key={lic.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{lic.organizationName}</h4>
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {lic.tier}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    ● {lic.status}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">Cryptographic Key:</span>
                  <code className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 select-all">
                    {lic.licenseKey}
                  </code>
                  <button
                    onClick={() => handleCopy(lic.licenseKey)}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white font-semibold flex items-center gap-1 ml-1"
                  >
                    {copiedKey === lic.licenseKey ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === lic.licenseKey ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="text-xs text-slate-400">
                  Tenant Admin: {lic.adminEmail} · Valid Until: <strong className="font-mono text-slate-700 dark:text-slate-300">{lic.expiresAt}</strong>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  Seat Quota: <strong className="font-mono text-emerald-600 dark:text-emerald-400 text-sm">{lic.activeSeats}</strong> / {lic.seatLimit} seats active
                </div>
                <div className="w-40 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden ml-auto">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (lic.activeSeats / lic.seatLimit) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: SLIDE-OVER DEAL DETAIL DRAWER */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200 space-y-6">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Deal Record · {selectedDeal.id}
                </span>
                <button onClick={() => setSelectedDeal(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Deal Header */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {selectedDeal.planTier} Tier
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Close Prob: <strong>{selectedDeal.probability}%</strong>
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {selectedDeal.companyName}
                </h3>
                <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  ₹{selectedDeal.dealValue.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-slate-400 ml-1">/{selectedDeal.billingCycle}</span>
                </div>
              </div>

              {/* Stakeholder Details */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-2 text-xs">
                <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                  Client Decision Maker
                </div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{selectedDeal.contactName}</div>
                <div className="text-slate-500">{selectedDeal.contactRole}</div>
                <div className="pt-2 flex flex-col space-y-1 text-slate-600 dark:text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {selectedDeal.contactEmail}</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {selectedDeal.contactPhone || '+91 98200 44112'}</span>
                  {selectedDeal.website && <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-slate-400" /> {selectedDeal.website}</span>}
                </div>
              </div>

              {/* Funnel Stage Selector */}
              <div className="mt-5 space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Advance Funnel Stage
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {FUNNEL_STAGES.map(st => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => handleMoveStage(selectedDeal.id, st.id)}
                      className={`p-2 rounded-lg text-left font-semibold border transition-all ${
                        selectedDeal.stage === st.id
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-mono">{st.label.slice(0, 15)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes & Next Steps */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                  Next Immediate Action
                </div>
                <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-amber-900 dark:text-amber-300">
                  {selectedDeal.nextStep || 'Schedule executive product demonstration call with technical board.'}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                type="button"
                onClick={() => { handleOpenQuotation(selectedDeal); setSelectedDeal(null); }}
                className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Official Quotation</span>
              </button>

              {selectedDeal.stage === 'closed_won' ? (
                <button
                  type="button"
                  onClick={() => { handleProvisionLicense(selectedDeal); setSelectedDeal(null); }}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <Key className="w-4 h-4" />
                  <span>Provision Enterprise License Key</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleMoveStage(selectedDeal.id, 'closed_won')}
                  className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs"
                >
                  Mark as Closed Won
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: OFFICIAL ENTERPRISE QUOTATION VIEWER */}
      {activeQuotation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl p-7 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                  AD
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Aishnar Digital Technologies
                </h3>
                <p className="text-[11px] text-slate-400">
                  Commercial ERP Software License Quotation
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                  {activeQuotation.quoteNumber}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">Date: {activeQuotation.issuedAt}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Valid Until: {activeQuotation.validUntil}</span>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Prepared For</span>
                <div className="font-bold text-slate-900 dark:text-white">{activeQuotation.clientCompany}</div>
                <div className="text-slate-500">{activeQuotation.clientContact}</div>
                <div className="text-slate-400 font-mono mt-1">{activeQuotation.clientEmail}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Commercial Terms</span>
                <div>Plan: <strong className="text-slate-900 dark:text-white">{activeQuotation.planTier} Edition</strong></div>
                <div>Seats Quota: <strong className="text-slate-900 dark:text-white">{activeQuotation.seats} User Licenses</strong></div>
                <div>Terms: <strong className="text-slate-900 dark:text-white">{activeQuotation.paymentTerms}</strong></div>
              </div>
            </div>

            {/* Quotation Line Items */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-3">
                      <div className="font-bold text-slate-900 dark:text-white">Aishnar Digital-ERP {activeQuotation.planTier} Annual License</div>
                      <div className="text-[11px] text-slate-400">Includes Today Cockpit, 200+ SOP Checklists, TV Display Mode, and Supabase Cloud Sync</div>
                    </td>
                    <td className="p-3 font-mono">{activeQuotation.seats} Seats</td>
                    <td className="p-3 text-right font-mono font-bold">₹{activeQuotation.baseAmount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-500">Government GST Tax (18%)</td>
                    <td className="p-3 font-mono">18%</td>
                    <td className="p-3 text-right font-mono">₹{activeQuotation.taxAmount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/40 font-bold text-sm">
                    <td colSpan={2} className="p-3 text-slate-900 dark:text-white">Total Commercial Value (INR)</td>
                    <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      ₹{activeQuotation.totalAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Quotation PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveQuotation(null)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs"
              >
                Close Quote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD ENTERPRISE OPPORTUNITY WIZARD */}
      {showAddDealModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>New ERP Client Sales Opportunity</span>
              </h3>
              <button onClick={() => setShowAddDealModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reliance Logistics Group"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Industry Vertical</label>
                  <input
                    type="text"
                    placeholder="e.g. Supply Chain / Healthcare"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sanjeev Kapoor"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Designation / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Managing Director"
                    value={contactRole}
                    onChange={(e) => setContactRole(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="sanjeev@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Plan Edition</label>
                  <select
                    value={planTier}
                    onChange={(e) => {
                      const t = e.target.value as SoftwareSalesDeal['planTier'];
                      setPlanTier(t);
                      if (t === 'Starter') { setDealValue('60000'); setSeatsCount('10'); }
                      if (t === 'Professional') { setDealValue('180000'); setSeatsCount('25'); }
                      if (t === 'Enterprise') { setDealValue('350000'); setSeatsCount('50'); }
                      if (t === 'Custom White-Label') { setDealValue('750000'); setSeatsCount('100'); }
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Starter">Starter (10 seats)</option>
                    <option value="Professional">Professional (25 seats)</option>
                    <option value="Enterprise">Enterprise (50 seats)</option>
                    <option value="Custom White-Label">White-Label (100+ seats)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Seat Quota</label>
                  <input
                    type="number"
                    value={seatsCount}
                    onChange={(e) => setSeatsCount(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Contract Value (₹)</label>
                  <input
                    type="number"
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Starting Funnel Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as SalesFunnelStage)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    {FUNNEL_STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value as SoftwareSalesDeal['paymentTerms'])}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Annual Upfront">Annual Upfront (100%)</option>
                    <option value="Net 30">Net 30 Invoicing</option>
                    <option value="Net 15">Net 15 Invoicing</option>
                    <option value="Quarterly Advance">Quarterly Advance</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddDealModal(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
