import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Plus, 
  FileText, 
  X,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExpenseClaim } from '../../types';
import { ERPStoreState } from '../../lib/store';

interface FinanceViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ state, onUpdateState }) => {
  const [activeTab, setActiveTab] = useState<'expenses' | 'invoices'>('expenses');
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  // New expense form
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseClaim['category']>('Cloud Infrastructure');

  // Handle 1-Click Approve Expense
  const handleApproveExpense = (expId: string) => {
    const updated = state.expenses.map(exp => {
      if (exp.id === expId) {
        confetti({ particleCount: 35, spread: 45, origin: { y: 0.6 } });
        return {
          ...exp,
          status: 'approved' as const,
          approvedBy: state.currentUser.name,
        };
      }
      return exp;
    });

    onUpdateState({
      ...state,
      expenses: updated,
    });
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newExp: ExpenseClaim = {
      id: `exp-${Date.now()}`,
      claimantName: state.currentUser.name,
      claimantRole: state.currentUser.department,
      title,
      amount: Number(amount) || 1000,
      category,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    onUpdateState({
      ...state,
      expenses: [newExp, ...state.expenses],
    });

    setShowAddExpenseModal(false);
    setTitle('');
    setAmount('');
  };

  const pendingExpensesTotal = state.expenses
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalInvoiced = state.invoices.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="apple-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <span>Finance & Commercials</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Operational expense vouchers, 1-click approvals, and client tax invoices
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 dark:bg-white hover:bg-slate-800 text-white dark:text-slate-950 font-medium rounded-full text-xs shadow-xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Claim Expense</span>
          </button>
        </div>
      </div>

      {/* Apple-style Segmented Tabs */}
      <div className="inline-flex items-center p-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl text-xs select-none">
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'expenses'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Expense Vouchers ({state.expenses.length})
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeTab === 'invoices'
              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Client Invoices ({state.invoices.length})
        </button>
      </div>

      {/* Tab 1: Expenses */}
      {activeTab === 'expenses' && (
        <div className="apple-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between bg-black/[0.02] dark:bg-white/[0.02]">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
              Employee Expense Claims
            </h3>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-mono font-medium">
              Pending: ₹{pendingExpensesTotal.toLocaleString('en-IN')}
            </span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-black/[0.02] dark:bg-white/[0.02] text-slate-400 border-b border-black/[0.04] dark:border-white/[0.06] font-semibold text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Expense Item</th>
                <th className="p-3.5">Claimant</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Amount (₹)</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {state.expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                  <td className="p-3.5 font-medium text-slate-900 dark:text-white">{exp.title}</td>
                  <td className="p-3.5 text-slate-500">{exp.claimantName}</td>
                  <td className="p-3.5 text-slate-500">{exp.category}</td>
                  <td className="p-3.5 font-mono font-semibold text-slate-900 dark:text-white">₹{exp.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                      exp.status === 'approved'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}>
                      {exp.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {exp.status === 'pending' ? (
                      <button
                        onClick={() => handleApproveExpense(exp.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">Approved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Invoices */}
      {activeTab === 'invoices' && (
        <div className="apple-card rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between bg-black/[0.02] dark:bg-white/[0.02]">
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
              Client Commercial Invoices
            </h3>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
              Invoiced: ₹{totalInvoiced.toLocaleString('en-IN')}
            </span>
          </div>

          <table className="w-full text-left text-xs">
            <thead className="bg-black/[0.02] dark:bg-white/[0.02] text-slate-400 border-b border-black/[0.04] dark:border-white/[0.06] font-semibold text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Client Organization</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {state.invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                  <td className="p-3.5 font-mono font-medium text-slate-900 dark:text-white">{inv.invoiceNumber}</td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">{inv.clientName}</td>
                  <td className="p-3.5 font-mono font-semibold text-slate-900 dark:text-white">₹{inv.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3.5">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => window.print()}
                      className="px-2.5 py-1 bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-medium"
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Claim Operational Expense
              </h3>
              <button onClick={() => setShowAddExpenseModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-500 mb-1 font-medium text-[11px]">Expense Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Cloud Infrastructure Billing"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1 font-medium text-[11px]">Amount (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 15000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1 font-medium text-[11px]">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseClaim['category'])}
                  className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  <option value="Travel & Client Meetings">Travel & Client Meetings</option>
                  <option value="Software Subscriptions">Software Subscriptions</option>
                  <option value="Team Refreshments">Team Refreshments</option>
                  <option value="Office Supplies">Office Supplies</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl font-medium shadow-xs"
                >
                  Submit Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
