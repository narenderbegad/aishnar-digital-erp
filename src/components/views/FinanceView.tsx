import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  FileText, 
  Clock, 
  Filter, 
  Download,
  Building2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExpenseClaim, ClientInvoice } from '../../types';
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
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
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
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-500" />
            Money & Commercials
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Operational expense vouchers, 1-click approvals & client tax invoices
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Claim Expense</span>
          </button>
        </div>
      </div>

      {/* 2 Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'expenses'
              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Expense Vouchers ({state.expenses.length})
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'invoices'
              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Client Invoices ({state.invoices.length})
        </button>
      </div>

      {/* Tab 1: Expenses */}
      {activeTab === 'expenses' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Employee Expense Claims
            </h3>
            <span className="text-xs text-amber-500 font-mono font-semibold">
              ₹{pendingExpensesTotal.toLocaleString('en-IN')} Pending Approval
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Expense Details</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Amount (₹)</th>
                  <th className="p-3.5">Claimed By</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Approval Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {state.expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{exp.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{exp.date}</div>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      {exp.category}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">
                      ₹{exp.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5 text-slate-700 dark:text-slate-300">
                      {exp.claimantName}
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        exp.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : exp.status === 'reimbursed'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {exp.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {exp.status === 'pending' ? (
                        <button
                          onClick={() => handleApproveExpense(exp.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors shadow-xs"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Verified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Client Invoices */}
      {activeTab === 'invoices' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Client Invoicing Ledger
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Total Invoiced: ₹{(totalInvoiced / 100000).toFixed(2)} Lakh
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Invoice #</th>
                  <th className="p-3.5">Client & Project</th>
                  <th className="p-3.5">Amount (₹)</th>
                  <th className="p-3.5">Due Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {state.invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {inv.invoiceNumber}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{inv.clientName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{inv.projectName}</div>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">
                      ₹{inv.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3.5 font-mono text-slate-500 dark:text-slate-400">
                      {inv.dueDate}
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        inv.status === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button 
                        onClick={() => window.print()}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold inline-flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Claim Expense */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Submit Expense Claim
              </h3>
              <button onClick={() => setShowAddExpenseModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Expense Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Production EC2 Reserved Instance"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseClaim['category'])}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  <option value="Software Licenses">Software Licenses</option>
                  <option value="Client Travel">Client Travel</option>
                  <option value="Office Operations">Office Operations</option>
                  <option value="Hardware">Hardware</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 15000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-md"
                >
                  Submit Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
