import React from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Tv, 
  UserCheck, 
  ShieldAlert, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps {
  currentTab: string;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenTvBoard: () => void;
  unreadCount: number;
}

const TAB_TITLES: Record<string, { title: string; subtitle: string }> = {
  today: { title: 'Today Cockpit', subtitle: 'Standing duties, productivity score & daily executive operations' },
  projects: { title: 'Projects & Work Delivery', subtitle: 'Milestones, sprint deliverables, task checklists & MOM logs' },
  finance: { title: 'Money & Commercials', subtitle: 'Expense approvals, accounts receivable & client billing invoices' },
  comms: { title: 'Unified Comms & WhatsApp CRM', subtitle: 'Team collaboration, client announcements & WhatsApp gateway' },
  sales: { title: 'Software Sales Management', subtitle: 'Direct sales pipeline, MRR/ARR growth & client license sales' },
  activation: { title: 'User & License Activation Engine', subtitle: '1-click user provisioning, cryptographic license keys & role security' },
  settings: { title: 'Supabase Database & Hosting', subtitle: 'Live cloud sync status, Netlify CI/CD & Render backend deployment' },
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  userRole,
  setUserRole,
  isDark,
  setIsDark,
  onOpenSearch,
  onOpenNotifications,
  onOpenTvBoard,
  unreadCount
}) => {
  const currentInfo = TAB_TITLES[currentTab] || { title: 'Aishnar Digital-ERP', subtitle: 'Enterprise Operations System' };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between transition-colors select-none">
      {/* Page Title & Breadcrumb */}
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          {currentInfo.title}
          {currentTab === 'sales' && (
            <span className="text-[10px] bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
              Admin Revenue Engine
            </span>
          )}
          {currentTab === 'activation' && (
            <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
              Direct In-App Activation
            </span>
          )}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Role Switcher Demo Control (Allows testing Super Admin vs Sales Admin vs Staff vs Client view) */}
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80">
          <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">View As:</span>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="super_admin" className="dark:bg-slate-900">Super Admin (Aishnar Sir)</option>
            <option value="sales_admin" className="dark:bg-slate-900">Sales Admin (Growth)</option>
            <option value="project_manager" className="dark:bg-slate-900">Project Manager</option>
            <option value="team_member" className="dark:bg-slate-900">Team Member (Staff)</option>
            <option value="client_viewer" className="dark:bg-slate-900">Client Portal User</option>
          </select>
        </div>

        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center space-x-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          title="Search anything (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline">Quick Search</span>
          <kbd className="hidden lg:inline text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 font-mono">
            Ctrl K
          </kbd>
        </button>

        {/* TV Wallboard Quick Button */}
        <button
          onClick={onOpenTvBoard}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          title="Launch Office TV Wallboard"
        >
          <Tv className="w-4 h-4 text-amber-500" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dark / Light Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          title="Toggle Light / Dark Mode"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};
