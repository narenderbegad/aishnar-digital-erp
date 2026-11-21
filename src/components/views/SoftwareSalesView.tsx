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
  Globe,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SoftwareSalesDeal, SoftwareLicense, SalesFunnelStage, EnterpriseQuotation } from '../../types';
import { ERPStoreState, generateLicenseKey } from '../../lib/store';

interface SoftwareSalesViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
}

const FUNNEL_STAGES: { id: SalesFunnelStage; label: string; description: string; dotColor: string }[] = [
  { id: 'lead_inbound', label: 'Inbound Inquiries', description: 'Budget qualified event agencies', dotColor: 'bg-slate-400' },
  { id: 'discovery_demo', label: 'Live Demo & Pitch', description: 'Event ERP architecture walkthrough', dotColor: 'bg-blue-500' },
  { id: 'proposal_quote', label: 'Commercial Quote', description: 'Formal seat & SLA quote sent', dotColor: 'bg-amber-500' },
  { id: 'security_legal', label: 'Security & Contract', description: 'SLA terms & agency NDA', dotColor: 'bg-purple-500' },
  { id: 'contract_negotiation', label: 'Payment Terms', description: 'Procurement sign-off', dotColor: 'bg-teal-500' },
  { id: 'closed_won', label: 'Closed & Provisioned', description: 'License key issued', dotColor: 'bg-[#00ff66]' },
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
  const [industry, setIndustry] = useState('Luxury Wedding & Event Management');
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('Managing Director / Founder');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('+91 ');
  const [planTier, setPlanTier] = useState<SoftwareSalesDeal['planTier']>('Professional');
  const [seatsCount, setSeatsCount] = useState('25');
  const [dealValue, setDealValue] = useState('180000');
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
      featuresAllowed: ['all_modules', 'user_activation', 'tv_wallboard', 'api_access', 'whatsapp_crm'],
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
      {/* Top Header & Telemetry */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#15151a] border border-white/10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-[#00ff66] bg-[#00ff66]/15 border border-[#00ff66]/30 px-2.5 py-0.5 rounded-full uppercase">
                AISHNAR DIGITAL COMMERCIAL ENGINE
              </span>
              <span className="text-xs text-slate-400">Direct B2B Software Sales & Licensing</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              AishNar Digital-ERP Software Sales CRM
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Track event planning agencies purchasing this ERP, manage license provisioning, and monitor recurring ARR.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddDealModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#00ff66] to-[#0066ff] hover:opacity-95 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Agency Opportunity</span>
            </button>
          </div>
        </div>

        {/* 5 Executive KPI Telemetry Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          <div className="p-4 rounded-2xl bg-[#1e1e24] border border-white/10">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">Pipeline ACV</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
              ₹{(totalPipelineValue / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{activePipelineDeals.length} active agency proposals</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#1e1e24] border border-white/10">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">Weighted Forecast</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#00ff66] mt-1">
              ₹{(weightedPipelineValue / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Probability adjusted</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#1e1e24] border border-white/10">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">Annual Run Rate (ARR)</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
              ₹{(totalARR / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-[#00ff66] mt-0.5 flex items-center gap-0.5 font-medium">
              <ArrowUpRight className="w-3 h-3" /> +28% YoY Growth
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#1e1e24] border border-white/10">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">Monthly MRR</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
              ₹{totalMRR.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Recurring SaaS inflow</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#1e1e24] border border-white/10">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">Win Rate</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
              {winRate}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Avg Deal: ₹{(averageDealSize / 100000).toFixed(1)}L</div>
          </div>
        </div>
      </div>

      {/* Control Bar: View Mode Switcher + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        {/* Segmented Switcher */}
        <div className="inline-flex items-center p-1 bg-[#15151a] border border-white/10 rounded-2xl text-xs select-none">
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'kanban'
                ? 'bg-[#1e1e24] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban Pipeline</span>
          </button>

          <button
            onClick={() => setViewMode('funnel')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'funnel'
                ? 'bg-[#1e1e24] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Sales Funnel</span>
          </button>

          <button
            onClick={() => setViewMode('table')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'table'
                ? 'bg-[#1e1e24] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Deals Ledger</span>
          </button>

          <button
            onClick={() => setViewMode('licenses')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'licenses'
                ? 'bg-[#1e1e24] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>Active Licenses ({state.licenses.length})</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center space-x-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Search event agencies, founders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-full border border-white/10 bg-[#15151a] text-white placeholder:text-slate-500 focus:outline-none text-xs w-48 sm:w-60"
            />
          </div>

          <select
            value={selectedTierFilter}
            onChange={(e) => setSelectedTierFilter(e.target.value)}
            className="px-3 py-1.5 rounded-full border border-white/10 bg-[#15151a] text-slate-300 focus:outline-none text-xs cursor-pointer"
          >
            <option value="all">All Packages</option>
            <option value="Starter">Starter (₹60k)</option>
            <option value="Professional">Professional (₹1.8L)</option>
            <option value="Enterprise">Enterprise (₹3.5L)</option>
            <option value="Custom White-Label">White-Label (₹7.5L)</option>
          </select>
        </div>
      </div>

      {/* VIEW 1: KANBAN PIPELINE BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
          {FUNNEL_STAGES.map((stageInfo) => {
            const stageDeals = filteredDeals.filter(d => d.stage === stageInfo.id);
            const stageValue = stageDeals.reduce((sum, d) => sum + d.dealValue, 0);

            return (
              <div 
                key={stageInfo.id}
                className="bg-[#15151a] border border-white/10 rounded-3xl p-3 flex flex-col min-w-[215px]"
              >
                {/* Stage Header */}
                <div className="pb-2.5 border-b border-white/10 mb-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${stageInfo.dotColor}`}></span>
                      <span>{stageInfo.label}</span>
                    </span>
                    <span className="text-[10px] font-mono bg-white/5 px-1.5 py-0.5 rounded-md border border-white/10 text-slate-400 font-bold">
                      {stageDeals.length}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                    <span>Value:</span>
                    <strong className="text-slate-200">₹{(stageValue / 100000).toFixed(1)}L</strong>
                  </div>
                </div>

                {/* Deal Cards */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {stageDeals.length === 0 ? (
                    <div className="h-20 border border-dashed border-white/10 rounded-2xl flex items-center justify-center text-[10px] text-slate-500">
                      Empty stage
                    </div>
                  ) : (
                    stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        onClick={() => setSelectedDeal(deal)}
                        className="p-3 bg-[#1e1e24] hover:bg-[#24242c] rounded-2xl border border-white/10 hover:border-[#00ff66]/40 shadow-xs cursor-pointer group transition-all space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                            {deal.planTier}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-[#00ff66]">
                            {deal.probability}%
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-[#00ff66] transition-colors">
                            {deal.companyName}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {deal.contactName} · {deal.contactRole}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-white/10">
                          <span className="font-bold text-white">₹{deal.dealValue.toLocaleString('en-IN')}</span>
                          <span className="text-[10px] text-slate-400">{deal.seatsCount} seats</span>
                        </div>

                        {/* Quick Action */}
                        {deal.stage === 'closed_won' ? (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleProvisionLicense(deal); }}
                            className="w-full py-1 bg-gradient-to-r from-[#00ff66] to-[#0066ff] text-slate-950 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1 shadow-xs"
                          >
                            <Key className="w-3 h-3" />
                            <span>Issue License Key</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleOpenQuotation(deal); }}
                            className="w-full py-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-[10px] font-medium flex items-center justify-center gap-1 transition-colors border border-white/10"
                          >
                            <FileText className="w-3 h-3 text-[#00ff66]" />
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

      {/* VIEW 2: VISUAL FUNNEL */}
      {viewMode === 'funnel' && (
        <div className="p-6 sm:p-7 rounded-3xl bg-[#15151a] border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#00ff66]" />
                <span>Event Agency Conversion Funnel & Stage Drop-off</span>
              </h3>
              <p className="text-xs text-slate-400">
                Conversion velocity from agency inquiry to paid software license deployment
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#00ff66] bg-[#00ff66]/10 border border-[#00ff66]/30 px-3 py-1 rounded-full">
              Overall Win Rate: {winRate}%
            </span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto py-2">
            {FUNNEL_STAGES.map((st, idx) => {
              const count = deals.filter(d => d.stage === st.id).length;
              const val = deals.filter(d => d.stage === st.id).reduce((s, d) => s + d.dealValue, 0);
              const percent = Math.max(12, Math.round((count / (deals.length || 1)) * 100));

              return (
                <div key={st.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${st.dotColor}`}></span>
                      <span className="font-bold text-white">{st.label}</span>
                      <span className="text-[11px] text-slate-400 font-normal">({st.description})</span>
                    </span>

                    <div className="flex items-center space-x-3 font-mono">
                      <span>{count} agencies</span>
                      <strong className="text-white">₹{(val / 100000).toFixed(2)}L</strong>
                    </div>
                  </div>

                  <div className="w-full bg-[#1e1e24] h-5 rounded-full overflow-hidden flex items-center p-0.5 border border-white/5">
                    <div
                      className="bg-gradient-to-r from-[#00ff66] to-[#0066ff] h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2 text-[9px] text-slate-950 font-mono font-black"
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
        <div className="rounded-3xl bg-[#15151a] border border-white/10 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1e1e24] text-slate-400 border-b border-white/10 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">Agency & Contact</th>
                <th className="p-3.5">Vertical</th>
                <th className="p-3.5">Package</th>
                <th className="p-3.5">Seats</th>
                <th className="p-3.5">Value</th>
                <th className="p-3.5">Stage</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDeals.map((deal) => (
                <tr 
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="p-3.5">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {deal.companyName}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {deal.contactName} · {deal.contactEmail}
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-400">
                    {deal.industry}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/5 text-slate-300 border border-white/10">
                      {deal.planTier}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">
                    {deal.seatsCount} seats
                  </td>
                  <td className="p-3.5 font-mono font-bold text-white">
                    ₹{deal.dealValue.toLocaleString('en-IN')}
                    <span className="text-[10px] text-slate-500 block font-normal">/{deal.billingCycle}</span>
                  </td>
                  <td className="p-3.5">
                    <select
                      value={deal.stage}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleMoveStage(deal.id, e.target.value as SalesFunnelStage)}
                      className="text-xs font-semibold px-2 py-1 rounded-xl border border-white/10 bg-[#1e1e24] text-white focus:outline-none"
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
                      className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-[11px] font-semibold border border-white/10"
                    >
                      Quote
                    </button>
                    {deal.stage === 'closed_won' && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleProvisionLicense(deal); }}
                        className="px-2.5 py-1 bg-gradient-to-r from-[#00ff66] to-[#0066ff] text-slate-950 font-bold rounded-lg text-[11px]"
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

      {/* VIEW 4: ACTIVE LICENSES */}
      {viewMode === 'licenses' && (
        <div className="rounded-3xl bg-[#15151a] border border-white/10 overflow-hidden divide-y divide-white/10">
          <div className="p-4 bg-[#1e1e24] flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>Verified Cryptographic Software Licenses</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {state.licenses.length} Verified Agencies
            </span>
          </div>

          {state.licenses.map((lic) => (
            <div key={lic.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{lic.organizationName}</h4>
                  <span className="text-[10px] font-mono font-bold bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/20 px-2 py-0.5 rounded-full">
                    {lic.tier}
                  </span>
                  <span className="text-[10px] font-bold text-[#00ff66] uppercase">
                    ● {lic.status}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">Cryptographic Key:</span>
                  <code className="text-xs font-mono font-bold bg-[#1e1e24] text-[#00ff66] px-2 py-0.5 rounded-md border border-white/10 select-all">
                    {lic.licenseKey}
                  </code>
                  <button
                    onClick={() => handleCopy(lic.licenseKey)}
                    className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1 ml-1"
                  >
                    {copiedKey === lic.licenseKey ? <Check className="w-3.5 h-3.5 text-[#00ff66]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === lic.licenseKey ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="text-xs text-slate-400">
                  Tenant Admin: {lic.adminEmail} · Valid Until: <strong className="font-mono text-slate-200">{lic.expiresAt}</strong>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-xs text-slate-300 font-medium">
                  Seat Quota: <strong className="font-mono text-[#00ff66] text-sm">{lic.activeSeats}</strong> / {lic.seatLimit} seats active
                </div>
                <div className="w-40 bg-white/5 h-1.5 rounded-full overflow-hidden ml-auto">
                  <div
                    className="bg-[#00ff66] h-full rounded-full"
                    style={{ width: `${Math.min(100, (lic.activeSeats / lic.seatLimit) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SLIDE-OVER DEAL DETAIL DRAWER */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#15151a] border-l border-white/10 h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200 space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Deal Record · {selectedDeal.id}
                </span>
                <button onClick={() => setSelectedDeal(null)} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/5">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30">
                    {selectedDeal.planTier} Tier
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Close Prob: <strong>{selectedDeal.probability}%</strong>
                  </span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {selectedDeal.companyName}
                </h3>
                <div className="text-2xl font-bold font-mono text-[#00ff66]">
                  ₹{selectedDeal.dealValue.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-slate-400 ml-1">/{selectedDeal.billingCycle}</span>
                </div>
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-[#1e1e24] border border-white/10 space-y-2 text-xs">
                <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] font-mono">
                  Agency Decision Maker
                </div>
                <div className="font-bold text-white text-sm">{selectedDeal.contactName}</div>
                <div className="text-slate-400">{selectedDeal.contactRole}</div>
                <div className="pt-2 flex flex-col space-y-1 text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-500" /> {selectedDeal.contactEmail}</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-500" /> {selectedDeal.contactPhone || '+91 98200 44112'}</span>
                  {selectedDeal.website && <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-slate-500" /> {selectedDeal.website}</span>}
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
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
                          ? 'border-[#00ff66] bg-[#00ff66]/15 text-[#00ff66] font-bold'
                          : 'border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-mono">{st.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-2 text-xs">
                <div className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] font-mono">
                  Next Scheduled Action
                </div>
                <div className="p-3 rounded-xl bg-[#1e1e24] border border-white/10 text-slate-300">
                  {selectedDeal.nextStep || 'Present live wedding ERP walkthrough call to agency founder.'}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={() => { handleOpenQuotation(selectedDeal); setSelectedDeal(null); }}
                className="w-full py-2.5 bg-white text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate Official Quotation</span>
              </button>

              {selectedDeal.stage === 'closed_won' ? (
                <button
                  type="button"
                  onClick={() => { handleProvisionLicense(selectedDeal); setSelectedDeal(null); }}
                  className="w-full py-2.5 bg-gradient-to-r from-[#00ff66] to-[#0066ff] text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Provision Software License Key</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleMoveStage(selectedDeal.id, 'closed_won')}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl text-xs transition-colors border border-white/10"
                >
                  Mark as Closed Won
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL ENTERPRISE QUOTATION MODAL */}
      {activeQuotation && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#15151a] border border-white/15 rounded-3xl w-full max-w-2xl p-7 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#00ff66] to-[#0066ff] text-slate-950 font-extrabold flex items-center justify-center text-xs mb-2">
                  AD
                </div>
                <h3 className="text-base font-bold text-white">
                  AishNar Digital Technologies
                </h3>
                <p className="text-[11px] text-slate-400">
                  Event & Wedding ERP Software License Quotation
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-white block">
                  {activeQuotation.quoteNumber}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">Date: {activeQuotation.issuedAt}</span>
                <span className="text-[10px] text-[#00ff66] font-mono">Valid: 30 Days</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#1e1e24] border border-white/10">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 font-mono">Prepared For</span>
                <div className="font-bold text-white">{activeQuotation.clientCompany}</div>
                <div className="text-slate-400">{activeQuotation.clientContact}</div>
                <div className="text-slate-400 font-mono mt-0.5">{activeQuotation.clientEmail}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1e1e24] border border-white/10">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1 font-mono">Commercial Terms</span>
                <div>Edition: <strong className="text-white">{activeQuotation.planTier}</strong></div>
                <div>Quota: <strong className="text-white">{activeQuotation.seats} User Licenses</strong></div>
                <div>Billing: <strong className="text-white">{activeQuotation.paymentTerms}</strong></div>
              </div>
            </div>

            <div className="border border-white/10 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#1e1e24] font-semibold text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3">
                      <div className="font-semibold text-white">AishNar Digital-ERP {activeQuotation.planTier} Annual License</div>
                      <div className="text-[11px] text-slate-400">Includes Today Cockpit, 200+ SOP Checklists, Backstage TV Display & Meta WhatsApp CRM</div>
                    </td>
                    <td className="p-3 font-mono">{activeQuotation.seats} Seats</td>
                    <td className="p-3 text-right font-mono font-bold text-white">₹{activeQuotation.baseAmount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-400">Government GST Tax (18%)</td>
                    <td className="p-3 font-mono">18%</td>
                    <td className="p-3 text-right font-mono">₹{activeQuotation.taxAmount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-[#1e1e24] font-bold text-xs">
                    <td colSpan={2} className="p-3 text-white">Total Commercial Value (INR)</td>
                    <td className="p-3 text-right font-mono text-[#00ff66] text-sm">
                      ₹{activeQuotation.totalAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official PDF Quote</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveQuotation(null)}
                className="px-5 py-2 bg-gradient-to-r from-[#00ff66] to-[#0066ff] text-slate-950 font-bold rounded-xl text-xs shadow-xs"
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
          <div className="bg-[#15151a] border border-white/15 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#00ff66]" />
                <span>New Event Agency Sales Opportunity</span>
              </h3>
              <button onClick={() => setShowAddDealModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1 text-[11px]">Event Agency Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shaadi Squad Luxury Weddings"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white focus:outline-none focus:border-[#00ff66]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1 text-[11px]">Agency Vertical</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1 text-[11px]">Founder / Decision Maker</label>
                  <input
                    type="text"
                    placeholder="e.g. Tina Tharwani"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1 text-[11px]">Designation / Role</label>
                  <input
                    type="text"
                    value={contactRole}
                    onChange={(e) => setContactRole(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1 text-[11px]">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="tina@shaadisquad.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white focus:outline-none focus:border-[#00ff66]"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1 text-[11px]">Phone Number</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1 text-[11px]">Plan Edition</label>
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
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white focus:outline-none"
                  >
                    <option value="Starter">Starter (₹60k / 10 seats)</option>
                    <option value="Professional">Professional (₹1.8L / 25 seats)</option>
                    <option value="Enterprise">Enterprise (₹3.5L / 50 seats)</option>
                    <option value="Custom White-Label">White-Label (₹7.5L / 100+ seats)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1 text-[11px]">Staff Seats</label>
                  <input
                    type="number"
                    value={seatsCount}
                    onChange={(e) => setSeatsCount(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1 text-[11px]">Contract Value (₹)</label>
                  <input
                    type="number"
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddDealModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#00ff66] to-[#0066ff] text-slate-950 font-bold rounded-xl text-xs shadow-xs"
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
