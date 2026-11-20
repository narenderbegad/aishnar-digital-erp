import React, { useState } from 'react';
import { 
  Plus, 
  Key, 
  ArrowUpRight,
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
  const [activeTab, setActiveTab] = useState<'pipeline' | 'licenses'>('pipeline');
  const [showAddDealModal, setShowAddDealModal] = useState(false);

  // Form state
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [planTier, setPlanTier] = useState<SoftwareSalesDeal['planTier']>('Enterprise');
  const [dealValue, setDealValue] = useState('350000');

  const totalARR = state.salesDeals
    .filter(d => d.stage === 'Closed Won')
    .reduce((sum, d) => sum + d.dealValue, 0) + 1200000;

  const pipelineValue = state.salesDeals
    .filter(d => d.stage !== 'Closed Won')
    .reduce((sum, d) => sum + d.dealValue, 0);

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactEmail) return;

    const newDeal: SoftwareSalesDeal = {
      id: `deal-${Date.now()}`,
      companyName,
      contactName,
      contactEmail,
      contactPhone: '',
      planTier,
      dealValue: Number(dealValue) || 150000,
      billingCycle: 'annual',
      stage: 'Proposal Submitted',
      probability: 70,
      createdDate: new Date().toISOString().split('T')[0],
      expectedCloseDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      assignedSalesRep: state.currentUser.name,
    };

    onUpdateState({
      ...state,
      salesDeals: [newDeal, ...state.salesDeals],
    });

    setShowAddDealModal(false);
    setCompanyName('');
    setContactEmail('');
  };

  const handleUpdateStage = (dealId: string, newStage: SoftwareSalesDeal['stage']) => {
    const updated = state.salesDeals.map(deal => {
      if (deal.id === dealId) {
        if (newStage === 'Closed Won') {
          confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
        }
        return { ...deal, stage: newStage };
      }
      return deal;
    });

    onUpdateState({
      ...state,
      salesDeals: updated,
    });
  };

  const handleProvisionLicense = (deal: SoftwareSalesDeal) => {
    const newLicense: SoftwareLicense = {
      id: `lic-${Date.now()}`,
      licenseKey: generateLicenseKey(deal.planTier),
      organizationName: deal.companyName,
      adminEmail: deal.contactEmail,
      tier: deal.planTier,
      seatLimit: 50,
      activeSeats: 1,
      status: 'active',
      issuedAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
      autoRenew: true,
      featuresAllowed: ['all_modules'],
    };

    onUpdateState({
      ...state,
      licenses: [newLicense, ...state.licenses],
    });

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    setActiveTab('licenses');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Software Sales Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage licensing, customer sales pipeline, and recurring subscriptions for Aishnar Digital-ERP
          </p>
        </div>

        <button
          onClick={() => setShowAddDealModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-3.5 py-2 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add ERP Sales Deal</span>
        </button>
      </div>

      {/* 3 Clean Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Software Annual Run Rate (ARR)</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            ₹{(totalARR / 100000).toFixed(2)} Lakh
          </div>
          <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> +28% YoY Growth
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Pipeline Value</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            ₹{(pipelineValue / 100000).toFixed(2)} Lakh
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {state.salesDeals.filter(d => d.stage !== 'Closed Won').length} proposals active
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Customer Organizations</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {state.licenses.length} Licensed
          </div>
          <div className="text-xs text-slate-400 mt-1">
            100% active retention
          </div>
        </div>
      </div>

      {/* Switcher */}
      <div className="flex items-center space-x-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-2">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'pipeline'
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Sales Deals ({state.salesDeals.length})
        </button>
        <button
          onClick={() => setActiveTab('licenses')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'licenses'
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Customer Licenses ({state.licenses.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'pipeline' ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-400 border-b border-slate-200 dark:border-slate-800 font-medium">
              <tr>
                <th className="p-3.5">Organization</th>
                <th className="p-3.5">Tier</th>
                <th className="p-3.5">Value (₹)</th>
                <th className="p-3.5">Stage</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {state.salesDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-900 dark:text-white">{deal.companyName}</div>
                    <div className="text-[11px] text-slate-400">{deal.contactEmail}</div>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">{deal.planTier}</td>
                  <td className="p-3.5 font-mono font-medium text-slate-900 dark:text-white">
                    ₹{deal.dealValue.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5">
                    <select
                      value={deal.stage}
                      onChange={(e) => handleUpdateStage(deal.id, e.target.value as SoftwareSalesDeal['stage'])}
                      className="bg-transparent text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 focus:outline-none"
                    >
                      <option value="Inbound Lead">Inbound Lead</option>
                      <option value="Demo Completed">Demo Completed</option>
                      <option value="Proposal Submitted">Proposal Submitted</option>
                      <option value="Contract Negotiation">Contract Negotiation</option>
                      <option value="Closed Won">Closed Won</option>
                    </select>
                  </td>
                  <td className="p-3.5 text-right">
                    {deal.stage === 'Closed Won' ? (
                      <button
                        onClick={() => handleProvisionLicense(deal)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded text-[11px]"
                      >
                        Provision Key
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStage(deal.id, 'Closed Won')}
                        className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium"
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
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/60">
          {state.licenses.map((lic) => (
            <div key={lic.id} className="p-4 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">{lic.organizationName}</div>
                <div className="mt-1 flex items-center gap-2">
                  <code className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded select-all">
                    {lic.licenseKey}
                  </code>
                  <span className="text-slate-400">· {lic.tier} Tier</span>
                </div>
              </div>
              <div className="text-right text-slate-400">
                <div>Quota: <strong className="text-slate-900 dark:text-white font-mono">{lic.activeSeats}</strong> / {lic.seatLimit} seats</div>
                <div className="text-[11px]">Valid until: {lic.expiresAt}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Deal Modal */}
      {showAddDealModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-md p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">New ERP Sales Lead</h3>
              <button onClick={() => setShowAddDealModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="Apex Global Solutions"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Contact Email</label>
                <input
                  type="email"
                  required
                  placeholder="contact@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Plan Tier</label>
                  <select
                    value={planTier}
                    onChange={(e) => setPlanTier(e.target.value as SoftwareSalesDeal['planTier'])}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Starter">Starter (₹60k)</option>
                    <option value="Professional">Professional (₹1.8L)</option>
                    <option value="Enterprise">Enterprise (₹3.5L)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Deal Value (₹)</label>
                  <input
                    type="number"
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddDealModal(false)}
                  className="px-3 py-1.5 text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium"
                >
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
