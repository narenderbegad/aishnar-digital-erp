import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Receipt, 
  MessagesSquare, 
  BadgePercent, 
  UserCheck, 
  Settings, 
  Tv, 
  Lock,
  LogOut,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  userName: string;
  userRoleName: string;
  onOpenTvBoard: () => void;
  onOpenAdminGuide: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  userName,
  userRoleName,
  onOpenTvBoard,
  onOpenAdminGuide,
  onLogout
}) => {
  const isSuperAdmin = userRole === 'super_admin';
  const isSalesAdmin = userRole === 'sales_admin' || isSuperAdmin;

  const navItemClass = (isActive: boolean) => 
    `w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
      isActive
        ? 'bg-black/[0.06] dark:bg-white/[0.08] text-slate-950 dark:text-white font-semibold shadow-2xs'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
    }`;

  return (
    <aside className="w-64 bg-white/70 dark:bg-slate-950/70 apple-glass flex flex-col border-r border-black/[0.06] dark:border-white/[0.08] shrink-0 select-none transition-colors">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 flex items-center justify-center text-white dark:text-slate-950 font-bold text-xs tracking-tight shadow-sm ring-1 ring-black/5 dark:ring-white/10">
            AD
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <span>Aishnar Digital</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              Enterprise ERP v2.4
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {/* Operations */}
        <div>
          <div className="px-3 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Operations
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => setCurrentTab('today')}
              className={navItemClass(currentTab === 'today')}
            >
              <div className="flex items-center space-x-2.5">
                <LayoutDashboard className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>Today Cockpit</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('projects')}
              className={navItemClass(currentTab === 'projects')}
            >
              <div className="flex items-center space-x-2.5">
                <FolderKanban className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>Projects & Tasks</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('finance')}
              className={navItemClass(currentTab === 'finance')}
            >
              <div className="flex items-center space-x-2.5">
                <Receipt className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>Finance & Invoicing</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('comms')}
              className={navItemClass(currentTab === 'comms')}
            >
              <div className="flex items-center space-x-2.5">
                <MessagesSquare className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>Team & WhatsApp</span>
              </div>
            </button>
          </div>
        </div>

        {/* Commercial & Super Admin */}
        <div>
          <div className="px-3 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Commercial & Admin
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => setCurrentTab('sales')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'sales'
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : isSalesAdmin
                    ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                    : 'opacity-40 cursor-not-allowed text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <BadgePercent className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Software Sales & ARR</span>
              </div>
              {!isSalesAdmin && <Lock className="w-3 h-3 text-slate-400" />}
            </button>

            <button
              onClick={() => setCurrentTab('activation')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'activation'
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : isSuperAdmin
                    ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                    : 'opacity-40 cursor-not-allowed text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>User Activation</span>
              </div>
              {!isSuperAdmin && <Lock className="w-3 h-3 text-slate-400" />}
            </button>

            <button
              onClick={() => setCurrentTab('settings')}
              className={navItemClass(currentTab === 'settings')}
            >
              <div className="flex items-center space-x-2.5">
                <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>Cloud & Hosting</span>
              </div>
            </button>

            <button
              onClick={onOpenTvBoard}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-center space-x-2.5">
                <Tv className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>Office TV Display</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* User Card & Sign Out */}
      <div className="p-3 border-t border-black/[0.04] dark:border-white/[0.06]">
        <div className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-[11px] flex items-center justify-center shrink-0">
              {userName.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {userName}
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                {userRoleName}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors shrink-0"
            title="Sign Out of Session"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
