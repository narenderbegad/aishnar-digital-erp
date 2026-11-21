import React, { useState, useEffect } from 'react';
import { Search, Briefcase, Key, Users } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 p-4 select-none">
      <div className="apple-glass apple-card rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 border border-black/[0.06] dark:border-white/[0.08]">
        {/* Search Input */}
        <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.06] flex items-center space-x-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            autoFocus
            type="text"
            placeholder="Search projects, sales deals, client licenses, team..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-xs bg-transparent border-none text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
          />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <kbd className="text-[10px] font-mono bg-black/[0.03] dark:bg-white/[0.05] px-2 py-0.5 rounded-md border border-black/[0.04] dark:border-white/[0.06]">ESC</kbd>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Projects</div>
              <div className="space-y-1">
                {filteredProjects.map(p => (
                  <div
                    key={p.id}
                    onClick={() => { onNavigate('projects'); onClose(); }}
                    className="p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.04] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                      <span className="font-medium text-slate-900 dark:text-white">{p.name}</span>
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
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">ERP Software Deals</div>
              <div className="space-y-1">
                {filteredDeals.map(d => (
                  <div
                    key={d.id}
                    onClick={() => { onNavigate('sales'); onClose(); }}
                    className="p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.04] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Key className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-medium text-slate-900 dark:text-white">{d.companyName}</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-mono">₹{(d.dealValue / 100000).toFixed(1)}L</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users */}
          {filteredUsers.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Team & Directory</div>
              <div className="space-y-1">
                {filteredUsers.map(u => (
                  <div
                    key={u.id}
                    onClick={() => { onNavigate('activation'); onClose(); }}
                    className="p-2.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.04] cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-900 dark:text-white">{u.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{u.role}</span>
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
