import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Award, 
  Plus, 
  Filter, 
  ArrowUpRight, 
  CheckCircle, 
  Clock, 
  FileText, 
  Building2, 
  Sparkles,
  Key,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SoftwareSalesDeal, SoftwareLicense } from '../../types';
import { ERPStoreState, generateLicenseKey } from '../../lib/store';

interface SoftwareSalesViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
}

export const SoftwareSalesView: React.FC<SoftwareSalesViewProps> = ({ state, onUpdateState }) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'licenses' | 'invoicing'>('pipeline');
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedDealForInvoice, setSelectedDealForInvoice] = useState<SoftwareSalesDeal | null>(null);

  // New deal form state
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [planTier, setPlanTier] = useState<SoftwareSalesDeal['planTier']>('Enterprise');
  const [dealValue, setDealValue] = useState('350000');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [notes, setNotes] = useState('');

  // Calculate SaaS KPIs
  const totalARR = state.salesDeals
    .filter(d => d.stage === 'Closed Won')
    .reduce((sum, d) => sum + d.dealValue, 0) + 1200000; // Includes active recurring customer base

  const pipelineValue = state.salesDeals
    .filter(d => d.stage !== 'Closed Won')
    .reduce((sum, d) => sum + d.dealValue, 0);

  const activeLicensesCount = state.licenses.filter(l => l.status === 'active').length;
  const winRate = Math.round(
    (state.salesDeals.filter(d => d.stage === 'Closed Won').length / (state.salesDeals.length || 1)) * 100
  );

  // Handle Create New Sales Deal
  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactEmail) return;

    const newDeal: SoftwareSalesDeal = {
      id: `deal-${Date.now()}`,
      companyName,
      contactName,
      contactEmail,
      contactPhone,
      planTier,
      dealValue: Number(dealValue) || 150000,
      billingCycle,
      stage: 'Proposal Submitted',
      probability: 70,
      createdDate: new Date().toISOString().split('T')[0],
      expectedCloseDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      assignedSalesRep: state.currentUser.name,
      notes,
    };

    onUpdateState({
      ...state,
      salesDeals: [newDeal, ...state.salesDeals],
    });

    setShowAddDealModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCompanyName('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setPlanTier('Enterprise');
    setDealValue('350000');
    setNotes('');
  };

  // 1-Click Update Stage
  const handleUpdateStage = (dealId: string, newStage: SoftwareSalesDeal['stage']) => {
    const updated = state.salesDeals.map(deal => {
      if (deal.id === dealId) {
        if (newStage === 'Closed Won') {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        }
        return {
          ...deal,
          stage: newStage,
          probability: newStage === 'Closed Won' ? 100 : deal.probability,
        };
      }
      return deal;
    });

    onUpdateState({
      ...state,
      salesDeals: updated,
    });
  };

  // Convert Closed Deal into an Active License Key directly
  const handleProvisionLicenseFromDeal = (deal: SoftwareSalesDeal) => {
    const newLicenseKey = generateLicenseKey(deal.planTier);
    const newLicense: SoftwareLicense = {
      id: `lic-${Date.now()}`,
      licenseKey: newLicenseKey,
      organizationName: deal.companyName,
      adminEmail: deal.contactEmail,
      tier: deal.planTier,
      seatLimit: deal.planTier === 'Enterprise' ? 50 : deal.planTier === 'Professional' ? 25 : 10,
      activeSeats: 1,
      status: 'active',
      issuedAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
      autoRenew: true,
      featuresAllowed: ['all_modules', 'team_attendance', 'projects_work', 'money_expenses', 'tv_wallboard'],
    };

    onUpdateState({
      ...state,
      licenses: [newLicense, ...state.licenses],
    });

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    setActiveTab('licenses');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-mono font-semibold">
                ADMIN REVENUE SUITE
              </span>
              <span className="text-xs text-slate-400">Exclusive Software Commercials</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">
              Aishnar Digital-ERP Software Sales
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Track software license proposals, annual recurring revenue (ARR), inbound buyer inquiries, and issue enterprise software license keys.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddDealModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 text-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New ERP Sales Deal</span>
            </button>
          </div>
        </div>

        {/* 4 Core Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Annual Run Rate (ARR)</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              ₹{(totalARR / 100000).toFixed(2)} Lakh
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              +28% YoY growth
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Active Pipeline Value</span>
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-black font-mono text-amber-300 mt-1">
              ₹{(pipelineValue / 100000).toFixed(2)} Lakh
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {state.salesDeals.filter(d => d.stage !== 'Closed Won').length} Active Proposals
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Active Client Licenses</span>
              <Key className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {activeLicensesCount} Organizations
            </div>
            <div className="text-[11px] text-blue-400 mt-1">
              Zero churn recorded
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Win Rate</span>
              <Award className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {winRate}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Demo to Contract signed
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'pipeline'
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Sales Deals Pipeline ({state.salesDeals.length})
        </button>

        <button
          onClick={() => setActiveTab('licenses')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'licenses'
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Issued Software Licenses ({state.licenses.length})
        </button>
      </div>

      {/* Tab 1: Pipeline Table */}
      {activeTab === 'pipeline' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              ERP Software Inquiries & Deals
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Live Commercial Pipeline
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Target Organization</th>
                  <th className="p-3.5">Plan Tier</th>
                  <th className="p-3.5">Deal Value</th>
                  <th className="p-3.5">Current Stage</th>
                  <th className="p-3.5">Close Date</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {state.salesDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {deal.companyName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {deal.contactName} · {deal.contactEmail}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
                        {deal.planTier}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">
                      ₹{deal.dealValue.toLocaleString('en-IN')}
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-normal">
                        /{deal.billingCycle}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={deal.stage}
                        onChange={(e) => handleUpdateStage(deal.id, e.target.value as SoftwareSalesDeal['stage'])}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          deal.stage === 'Closed Won'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                        }`}
                      >
                        <option value="Inbound Lead">Inbound Lead</option>
                        <option value="Demo Completed">Demo Completed</option>
                        <option value="Proposal Submitted">Proposal Submitted</option>
                        <option value="Contract Negotiation">Contract Negotiation</option>
                        <option value="Closed Won">Closed Won</option>
                      </select>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">
                      {deal.expectedCloseDate}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {deal.stage === 'Closed Won' ? (
                        <button
                          onClick={() => handleProvisionLicenseFromDeal(deal)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition-colors inline-flex items-center gap-1 shadow-sm"
                        >
                          <Key className="w-3 h-3" />
                          <span>Provision License</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateStage(deal.id, 'Closed Won')}
                          className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg text-[11px] transition-colors"
                        >
                          Mark Won
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Issued Software Licenses */}
      {activeTab === 'licenses' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-500" />
              Active Aishnar Digital-ERP Customer Licenses
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Cryptographic Tenant Keys
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {state.licenses.map((lic) => (
              <div key={lic.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {lic.organizationName}
                    </span>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase font-mono">
                      {lic.tier}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      lic.status === 'active' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {lic.status}
                    </span>
                  </div>

                  {/* License Key Pill */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">License Key:</span>
                    <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 font-bold select-all">
                      {lic.licenseKey}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(lic.licenseKey)}
                      className="text-[10px] text-slate-500 hover:text-slate-800 dark:hover:text-white underline cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Admin Contact: {lic.adminEmail} · Expires: <strong className="font-mono text-slate-700 dark:text-slate-300">{lic.expiresAt}</strong>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Seat Quota: <strong className="font-mono text-emerald-500">{lic.activeSeats}</strong> / {lic.seatLimit}
                  </div>
                  <div className="w-36 bg-slate-200 dark:bg-slate-800 h-2 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${Math.min(100, (lic.activeSeats / lic.seatLimit) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Log New Sales Inbound Deal */}
      {showAddDealModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-500" />
                Record New ERP Sales Opportunity
              </h3>
              <button onClick={() => setShowAddDealModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Solutions Pvt Ltd"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Kumar"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rajesh@apex.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Software Plan Tier
                  </label>
                  <select
                    value={planTier}
                    onChange={(e) => setPlanTier(e.target.value as SoftwareSalesDeal['planTier'])}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Starter">Starter (₹60,000 / yr)</option>
                    <option value="Professional">Professional (₹1,80,000 / yr)</option>
                    <option value="Enterprise">Enterprise (₹3,50,000 / yr)</option>
                    <option value="Custom White-Label">Custom White-Label (₹7,50,000 / yr)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Deal Contract Value (₹)
                  </label>
                  <input
                    type="number"
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sales Notes / Client Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="Need 40 employee seats with attendance GPS & project checklist modules..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddDealModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg shadow-md"
                >
                  Save ERP Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
