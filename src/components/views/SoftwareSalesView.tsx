import React, { useState } from 'react';
import { 
  Plus, 
  Key, 
  Building2, 
  FileText, 
  Search, 
  ArrowRight, 
  Check, 
  Copy, 
  Printer, 
  Layers, 
  Kanban, 
  BarChart3, 
  ShieldCheck, 
  ArrowUpRight,
  ChevronDown,
  X,
  Mail,
  Phone,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SoftwareSalesDeal, SoftwareLicense, SalesFunnelStage, EnterpriseQuotation } from '../../types';
import { ERPStoreState, generateLicenseKey } from '../../lib/store';

interface SoftwareSalesViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
}

const FUNNEL_STAGES: { id: SalesFunnelStage; label: string; description: string; dotColor: string }[] = [
  { id: 'lead_inbound', label: 'Inbound Leads', description: 'Budget qualified inquiries', dotColor: 'bg-slate-400' },
  { id: 'discovery_demo', label: 'Discovery & Demo', description: 'Architecture walkthrough', dotColor: 'bg-blue-500' },
  { id: 'proposal_quote', label: 'Proposal & Quote', description: 'Formal commercial quote', dotColor: 'bg-amber-500' },
  { id: 'security_legal', label: 'Security & Legal', description: 'SOC2 & InfoSec review', dotColor: 'bg-purple-500' },
  { id: 'contract_negotiation', label: 'Negotiation', description: 'Procurement sign-off', dotColor: 'bg-teal-500' },
  { id: 'closed_won', label: 'Closed Won', description: 'Paid & provisioned', dotColor: 'bg-emerald-500' },
];

export const SoftwareSalesView: React.FC<SoftwareSalesViewProps> = ({ state, onUpdateState }) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'funnel' | 'table' | 'licenses'>('kanban');
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
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
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

    confetti({ particleCount: 90, spread: 65, origin: { y: 0.5 } });
    setViewMode('licenses');
  };

  // Generate Quotation
  const handleOpenQuotation = (deal: SoftwareSalesDeal) => {
    const baseAmount = deal.dealValue;
    const taxAmount = Math.round(baseAmount * 0.18); // 18% GST
    const quote: EnterpriseQuotation = {
      id: `qt-${Date.now()}`,
      quoteNumber: deal.quotationNumber || `AISH-QT-2026-${Math.floor(100 + Math.random() * 900)}`,
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
      quotationNumber: `AISH-QT-2026-${Math.floor(100 + Math.random() * 900)}`,
      notes,
    };

    onUpdateState({
      ...state,
      salesDeals: [newDeal, ...state.salesDeals],
    });

    confetti({ particleCount: 70, spread: 55, origin: { y: 0.5 } });
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
      {/* Top Header & Apple-style Telemetry */}
      <div className="apple-card rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                COMMERCIAL PIPELINE
              </span>
              <span className="text-[11px] text-slate-400 font-medium">SaaS License & ARR Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Software Sales & Revenue
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Track high-value enterprise proposals, conversion funnels, and cryptographic license provisioning.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddDealModal(true)}
              className="flex items-center space-x-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 font-semibold text-xs px-4 py-2.5 rounded-full shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Enterprise Opportunity</span>
            </button>
          </div>
        </div>

        {/* 5 Minimalist Executive KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Pipeline ACV</div>
            <div className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mt-1 font-mono">
              ₹{(totalPipelineValue / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{activePipelineDeals.length} active deals</div>
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Weighted Forecast</div>
            <div className="text-xl sm:text-2xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              ₹{(weightedPipelineValue / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Probability adjusted</div>
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Annual Run Rate (ARR)</div>
            <div className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mt-1 font-mono">
              ₹{(totalARR / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-0.5 font-medium">
              <ArrowUpRight className="w-3 h-3" /> +28% YoY
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Monthly MRR</div>
            <div className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mt-1 font-mono">
              ₹{totalMRR.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Recurring revenue</div>
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Win Rate</div>
            <div className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mt-1 font-mono">
              {winRate}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Avg: ₹{(averageDealSize / 100000).toFixed(1)}L</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Apple Segmented Switcher + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        {/* Apple Segmented Control */}
        <div className="inline-flex items-center p-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl text-xs select-none">
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'kanban'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban Pipeline</span>
          </button>

          <button
            onClick={() => setViewMode('funnel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'funnel'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Sales Funnel</span>
          </button>

          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'table'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Deals Ledger</span>
          </button>

          <button
            onClick={() => setViewMode('licenses')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'licenses'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-emerald-500" />
            <span>Licenses ({state.licenses.length})</span>
          </button>
        </div>

        {/* Search & Tier Filter */}
        <div className="flex items-center space-x-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Search companies, contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none text-xs w-48 sm:w-56"
            />
          </div>

          <select
            value={selectedTierFilter}
            onChange={(e) => setSelectedTierFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none text-xs cursor-pointer"
          >
            <option value="all">All Tiers</option>
            <option value="Starter">Starter</option>
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Custom White-Label">White-Label</option>
          </select>
        </div>
      </div>

      {/* VIEW 1: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
          {FUNNEL_STAGES.map((stageInfo) => {
            const stageDeals = filteredDeals.filter(d => d.stage === stageInfo.id);
            const stageValue = stageDeals.reduce((sum, d) => sum + d.dealValue, 0);

            return (
              <div 
                key={stageInfo.id}
                className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] rounded-2xl p-3 flex flex-col min-w-[210px]"
              >
                {/* Stage Header */}
                <div className="pb-2.5 border-b border-black/[0.04] dark:border-white/[0.06] mb-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${stageInfo.dotColor}`}></span>
                      <span>{stageInfo.label}</span>
                    </span>
                    <span className="text-[10px] font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded-md border border-black/[0.04] dark:border-white/[0.06] text-slate-500 font-semibold">
                      {stageDeals.length}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                    <span>Value:</span>
                    <strong className="text-slate-700 dark:text-slate-300">₹{(stageValue / 100000).toFixed(1)}L</strong>
                  </div>
                </div>

                {/* Deal Cards */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {stageDeals.length === 0 ? (
                    <div className="h-20 border border-dashed border-black/[0.06] dark:border-white/[0.08] rounded-xl flex items-center justify-center text-[10px] text-slate-400">
                      Empty
                    </div>
                  ) : (
                    stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        onClick={() => setSelectedDeal(deal)}
                        className="apple-card rounded-xl p-3 space-y-2 cursor-pointer group hover:scale-[1.01] transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 font-mono">
                            {deal.planTier}
                          </span>
                          <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                            {deal.probability}%
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {deal.companyName}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {deal.contactName}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-black/[0.04] dark:border-white/[0.06]">
                          <span className="font-semibold text-slate-900 dark:text-white">₹{deal.dealValue.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-slate-400">{deal.seatsCount} seats</span>
                        </div>

                        {/* Quick Actions */}
                        {deal.stage === 'closed_won' ? (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleProvisionLicense(deal); }}
                            className="w-full py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 shadow-2xs"
                          >
                            <Key className="w-3 h-3" />
                            <span>Provision Key</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleOpenQuotation(deal); }}
                            className="w-full py-1 bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-medium flex items-center justify-center gap-1 transition-colors"
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
        <div className="apple-card rounded-2xl p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
                <span>Sales Funnel & Stage Drop-off Velocity</span>
              </h3>
              <p className="text-xs text-slate-400">
                Visual conversion efficiency from inbound inquiry to activated enterprise tenant
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              Win Rate: {winRate}%
            </span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto py-2">
            {FUNNEL_STAGES.map((st, idx) => {
              const count = deals.filter(d => d.stage === st.id).length;
              const val = deals.filter(d => d.stage === st.id).reduce((s, d) => s + d.dealValue, 0);
              const percent = Math.max(12, Math.round((count / (deals.length || 1)) * 100));

              return (
                <div key={st.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${st.dotColor}`}></span>
                      <span className="font-semibold">{st.label}</span>
                      <span className="text-[11px] text-slate-400 font-normal">({st.description})</span>
                    </span>

                    <div className="flex items-center space-x-3 font-mono">
                      <span>{count} deals</span>
                      <strong className="text-slate-900 dark:text-white">₹{(val / 100000).toFixed(2)}L</strong>
                    </div>
                  </div>

                  {/* Funnel Progress Bar */}
                  <div className="w-full bg-black/[0.03] dark:bg-white/[0.04] h-5 rounded-full overflow-hidden flex items-center p-0.5">
                    <div
                      className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2 text-[9px] text-white font-mono font-semibold"
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

      {/* VIEW 3: DEALS LEDGER */}
      {viewMode === 'table' && (
        <div className="apple-card rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/[0.02] dark:bg-white/[0.02] text-slate-400 border-b border-black/[0.04] dark:border-white/[0.06] font-semibold uppercase tracking-wider text-[10px]">
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
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {filteredDeals.map((deal) => (
                <tr 
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
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
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-slate-300">
                      {deal.planTier}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-700 dark:text-slate-300">
                    {deal.seatsCount} seats
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-slate-900 dark:text-white">
                    ₹{deal.dealValue.toLocaleString('en-IN')}
                    <span className="text-[10px] text-slate-400 block font-normal">/{deal.billingCycle}</span>
                  </td>
                  <td className="p-3.5">
                    <select
                      value={deal.stage}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleMoveStage(deal.id, e.target.value as SalesFunnelStage)}
                      className="text-xs font-medium px-2 py-1 rounded-lg border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
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
                      className="px-2.5 py-1 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-medium"
                    >
                      Quote
                    </button>
                    {deal.stage === 'closed_won' && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleProvisionLicense(deal); }}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold"
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

      {/* VIEW 4: CUSTOMER LICENSES */}
      {viewMode === 'licenses' && (
        <div className="apple-card rounded-2xl overflow-hidden divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          <div className="p-4 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verified Cryptographic Software Licenses</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {state.licenses.length} Active Tenants
            </span>
          </div>

          {state.licenses.map((lic) => (
            <div key={lic.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{lic.organizationName}</h4>
                  <span className="text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                    {lic.tier}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 uppercase">
                    ● {lic.status}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">Cryptographic Key:</span>
                  <code className="text-xs font-mono font-semibold bg-black/[0.04] dark:bg-white/[0.06] text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md border border-black/[0.05] dark:border-white/[0.05] select-all">
                    {lic.licenseKey}
                  </code>
                  <button
                    onClick={() => handleCopy(lic.licenseKey)}
                    className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium flex items-center gap-1 ml-1"
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
                <div className="w-40 bg-black/[0.04] dark:bg-white/[0.06] h-1.5 rounded-full overflow-hidden ml-auto">
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-lg apple-glass border-l border-black/[0.06] dark:border-white/[0.08] h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200 space-y-6">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.04] dark:border-white/[0.06]">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  Deal Record · {selectedDeal.id}
                </span>
                <button onClick={() => setSelectedDeal(null)} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Deal Header */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {selectedDeal.planTier} Tier
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Close Prob: <strong>{selectedDeal.probability}%</strong>
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {selectedDeal.companyName}
                </h3>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  ₹{selectedDeal.dealValue.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-slate-400 ml-1">/{selectedDeal.billingCycle}</span>
                </div>
              </div>

              {/* Stakeholder Details */}
              <div className="mt-5 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-2 text-xs">
                <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
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
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Advance Funnel Stage
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {FUNNEL_STAGES.map(st => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => handleMoveStage(selectedDeal.id, st.id)}
                      className={`p-2.5 rounded-xl text-left font-medium border transition-all ${
                        selectedDeal.stage === st.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold'
                          : 'border-black/[0.06] dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:border-black/20'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-mono">{st.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes & Next Steps */}
              <div className="mt-5 space-y-2 text-xs">
                <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                  Next Immediate Action
                </div>
                <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] text-slate-700 dark:text-slate-300">
                  {selectedDeal.nextStep || 'Schedule executive product demonstration call with technical board.'}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.06] space-y-2">
              <button
                type="button"
                onClick={() => { handleOpenQuotation(selectedDeal); setSelectedDeal(null); }}
                className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs hover:opacity-95 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate Official Quotation</span>
              </button>

              {selectedDeal.stage === 'closed_won' ? (
                <button
                  type="button"
                  onClick={() => { handleProvisionLicense(selectedDeal); setSelectedDeal(null); }}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Provision Enterprise License Key</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleMoveStage(selectedDeal.id, 'closed_won')}
                  className="w-full py-2 bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] text-slate-800 dark:text-slate-200 font-medium rounded-xl text-xs transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-2xl w-full max-w-2xl p-7 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-black/[0.04] dark:border-white/[0.06]">
              <div>
                <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center text-xs mb-2">
                  AD
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Aishnar Digital Technologies
                </h3>
                <p className="text-[11px] text-slate-400">
                  Commercial Enterprise ERP License Quotation
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                  {activeQuotation.quoteNumber}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">Date: {activeQuotation.issuedAt}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Valid: 30 Days</span>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Prepared For</span>
                <div className="font-semibold text-slate-900 dark:text-white">{activeQuotation.clientCompany}</div>
                <div className="text-slate-500">{activeQuotation.clientContact}</div>
                <div className="text-slate-400 font-mono mt-0.5">{activeQuotation.clientEmail}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Commercial Terms</span>
                <div>Edition: <strong className="text-slate-900 dark:text-white">{activeQuotation.planTier}</strong></div>
                <div>Quota: <strong className="text-slate-900 dark:text-white">{activeQuotation.seats} User Licenses</strong></div>
                <div>Billing: <strong className="text-slate-900 dark:text-white">{activeQuotation.paymentTerms}</strong></div>
              </div>
            </div>

            {/* Quotation Line Items */}
            <div className="border border-black/[0.06] dark:border-white/[0.08] rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-black/[0.02] dark:bg-white/[0.02] font-semibold text-slate-500 border-b border-black/[0.04] dark:border-white/[0.06]">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                  <tr>
                    <td className="p-3">
                      <div className="font-semibold text-slate-900 dark:text-white">Aishnar Digital-ERP {activeQuotation.planTier} Annual License</div>
                      <div className="text-[11px] text-slate-400">Includes Today Cockpit, 200+ SOP Checklists, TV Display Mode, and Supabase Cloud Sync</div>
                    </td>
                    <td className="p-3 font-mono">{activeQuotation.seats} Seats</td>
                    <td className="p-3 text-right font-mono font-semibold">₹{activeQuotation.baseAmount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-500">Government GST Tax (18%)</td>
                    <td className="p-3 font-mono">18%</td>
                    <td className="p-3 text-right font-mono">₹{activeQuotation.taxAmount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-black/[0.02] dark:bg-white/[0.03] font-semibold text-xs">
                    <td colSpan={2} className="p-3 text-slate-900 dark:text-white">Total Commercial Value (INR)</td>
                    <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-400 text-sm">
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
                className="px-3.5 py-2 bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Quotation PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveQuotation(null)}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold rounded-xl text-xs shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD ENTERPRISE OPPORTUNITY WIZARD */}
      {showAddDealModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>New Sales Opportunity</span>
              </h3>
              <button onClick={() => setShowAddDealModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zenith Logistics Group"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Industry Vertical</label>
                  <input
                    type="text"
                    placeholder="e.g. Supply Chain / Healthcare"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Decision Maker Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Sharma"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Designation / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Chief Operating Officer"
                    value={contactRole}
                    onChange={(e) => setContactRole(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Phone Number</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Plan Edition</label>
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
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Starter">Starter (10 seats)</option>
                    <option value="Professional">Professional (25 seats)</option>
                    <option value="Enterprise">Enterprise (50 seats)</option>
                    <option value="Custom White-Label">White-Label (100+ seats)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Seat Quota</label>
                  <input
                    type="number"
                    value={seatsCount}
                    onChange={(e) => setSeatsCount(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Contract Value (₹)</label>
                  <input
                    type="number"
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Starting Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as SalesFunnelStage)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    {FUNNEL_STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-medium mb-1 text-[11px]">Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value as SoftwareSalesDeal['paymentTerms'])}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Annual Upfront">Annual Upfront (100%)</option>
                    <option value="Net 30">Net 30 Invoicing</option>
                    <option value="Net 15">Net 15 Invoicing</option>
                    <option value="Quarterly Advance">Quarterly Advance</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowAddDealModal(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold rounded-xl text-xs shadow-xs"
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
