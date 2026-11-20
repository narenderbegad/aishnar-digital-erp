import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  CreditCard, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  Settings, 
  Tv, 
  ChevronRight,
  Sparkles,
  Building2,
  Lock
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  userName: string;
  userRoleName: string;
  onOpenTvBoard: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  userName,
  userRoleName,
  onOpenTvBoard
}) => {
  const isSuperAdmin = userRole === 'super_admin';
  const isSalesAdmin = userRole === 'sales_admin' || isSuperAdmin;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-lg tracking-wider">
            AD
          </div>
          <div>
            <div className="text-white font-semibold text-base tracking-tight flex items-center gap-1.5">
              <span>Aishnar</span>
              <span className="text-emerald-400 font-bold">ERP</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Digital Platform v2.6
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Section 1: Executive Cockpit */}
        <div>
          <div className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Workspace
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setCurrentTab('today')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'today'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>Today Cockpit</span>
              </div>
              {currentTab === 'today' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
            </button>

            <button
              onClick={onOpenTvBoard}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <div className="flex items-center space-x-3">
                <Tv className="w-4 h-4 text-amber-400" />
                <span>Office TV Wallboard</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 border border-amber-500/20">LIVE</span>
            </button>
          </div>
        </div>

        {/* Section 2: Core Operations */}
        <div>
          <div className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Operations & Delivery
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setCurrentTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'projects'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Projects & SOPs</span>
              </div>
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">3</span>
            </button>

            <button
              onClick={() => setCurrentTab('finance')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'finance'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Money & Expenses</span>
              </div>
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">1 Due</span>
            </button>

            <button
              onClick={() => setCurrentTab('comms')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'comms'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Team & WhatsApp Comms</span>
              </div>
            </button>
          </div>
        </div>

        {/* Section 3: Admin Software Licensing & Sales */}
        <div>
          <div className="px-3 flex items-center justify-between text-[11px] font-semibold tracking-wider text-amber-400/90 uppercase mb-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              SaaS Administration
            </span>
            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 font-mono">
              EXCLUSIVE
            </span>
          </div>
          <div className="space-y-1">
            {/* Software Sales Management (Special Sir Request) */}
            <button
              onClick={() => setCurrentTab('sales')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'sales'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                  : isSalesAdmin
                  ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  : 'opacity-50 cursor-not-allowed text-slate-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Software Sales</span>
              </div>
              {isSalesAdmin ? (
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                  Pipeline
                </span>
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>

            {/* In-App User Activation Engine (Special Sir Request) */}
            <button
              onClick={() => setCurrentTab('activation')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'activation'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-semibold'
                  : isSuperAdmin
                  ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                  : 'opacity-50 cursor-not-allowed text-slate-500'
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>User & License Activation</span>
              </div>
              {isSuperAdmin ? (
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-mono">
                  1-Click
                </span>
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>

            <button
              onClick={() => setCurrentTab('settings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'settings'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Supabase & Hosting</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center space-x-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm ring-2 ring-emerald-500/30">
              {userName.slice(0, 2).toUpperCase()}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950"></span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">{userName}</div>
            <div className="text-[10px] text-emerald-400 font-medium truncate flex items-center gap-1">
              <Building2 className="w-2.5 h-2.5 inline" />
              {userRoleName}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
