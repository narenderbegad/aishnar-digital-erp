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
    <aside className="w-60 bg-white dark:bg-slate-950 flex flex-col border-r border-slate-200/80 dark:border-slate-800/80 shrink-0 select-none">
      {/* Brand Header - Clean & Minimal */}
      <div className="h-16 px-5 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-xs">
            AD
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">
              Aishnar Digital
            </div>
            <div className="text-[11px] text-slate-400 font-normal">
              Enterprise ERP
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Spacious & Uncluttered */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        <div>
          <div className="px-3 text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Operations
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setCurrentTab('today')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentTab === 'today'
                  ? 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                <span>Today Cockpit</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('projects')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentTab === 'projects'
                  ? 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <FolderKanban className="w-4 h-4 text-slate-400" />
                <span>Projects & Tasks</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('finance')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentTab === 'finance'
                  ? 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Receipt className="w-4 h-4 text-slate-400" />
                <span>Expenses & Invoices</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('comms')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentTab === 'comms'
                  ? 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <MessagesSquare className="w-4 h-4 text-slate-400" />
                <span>Team & WhatsApp</span>
              </div>
            </button>
          </div>
        </div>

        {/* Administration Section */}
        <div>
          <div className="px-3 text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Admin Suite
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setCurrentTab('sales')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentTab === 'sales'
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : isSalesAdmin
                  ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/40'
                  : 'opacity-40 cursor-not-allowed text-slate-400'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <BadgePercent className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Software Sales</span>
              </div>
              {!isSalesAdmin && <Lock className="w-3 h-3 text-slate-400" />}
            </button>

            <button
              onClick={() => setCurrentTab('activation')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentTab === 'activation'
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : isSuperAdmin
                  ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/40'
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
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentTab === 'settings'
                  ? 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Cloud & Hosting</span>
              </div>
            </button>

            <button
              onClick={onOpenTvBoard}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                <Tv className="w-4 h-4 text-slate-400" />
                <span>Office TV Display</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center space-x-2.5 px-2 py-1.5 rounded-lg">
          <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-medium flex items-center justify-center text-xs">
            {userName.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-slate-900 dark:text-white truncate">{userName}</div>
            <div className="text-[10px] text-slate-400 truncate">{userRoleName}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
