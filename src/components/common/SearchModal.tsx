import React, { useState, useEffect } from 'react';
import { Search, X, Briefcase, Key, Users, TrendingUp } from 'lucide-react';
import { ERPStoreState } from '../../lib/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ERPStoreState;
  onNavigate: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, state, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle search modal
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = state.projects.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.clientOrganization.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDeals = state.salesDeals.filter(d => 
    d.companyName.toLowerCase().includes(query.toLowerCase()) ||
    d.planTier.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = state.users.filter(u => 
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            placeholder="Search projects, sales deals, client licenses, team..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none text-slate-900 dark:text-white focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <kbd className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">ESC</kbd>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Projects</div>
              <div className="space-y-1">
                {filteredProjects.map(p => (
                  <div
                    key={p.id}
                    onClick={() => { onNavigate('projects'); onClose(); }}
                    className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-slate-900 dark:text-white">{p.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{p.code}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sales Deals */}
          {filteredDeals.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">ERP Software Deals</div>
              <div className="space-y-1">
                {filteredDeals.map(d => (
                  <div
                    key={d.id}
                    onClick={() => { onNavigate('sales'); onClose(); }}
                    className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-amber-500" />
                      <span className="font-semibold text-slate-900 dark:text-white">{d.companyName}</span>
                    </div>
                    <span className="text-[10px] text-amber-500 font-mono">₹{d.dealValue.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users */}
          {filteredUsers.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Users Directory</div>
              <div className="space-y-1">
                {filteredUsers.map(u => (
                  <div
                    key={u.id}
                    onClick={() => { onNavigate('activation'); onClose(); }}
                    className="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-emerald-500" />
                      <span className="font-semibold text-slate-900 dark:text-white">{u.name}</span>
                    </div>
                    <span className={`text-[10px] font-bold ${u.isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {u.isActive ? 'Active' : 'Suspended'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
