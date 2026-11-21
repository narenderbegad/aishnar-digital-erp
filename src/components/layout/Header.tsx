import React from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Sparkles,
  ChevronDown
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
  onOpenAdminGuide: () => void;
  unreadCount: number;
}

const TAB_TITLES: Record<string, { title: string; subtitle: string }> = {
  today: { title: 'Today Cockpit', subtitle: 'Operational rhythm & standing duties' },
  projects: { title: 'Projects & Pipelines', subtitle: 'Client milestones & engineering checkpoints' },
  finance: { title: 'Finance & Invoicing', subtitle: 'Expense vouchers & client tax invoices' },
  comms: { title: 'Team Communications', subtitle: 'Real-time internal chat & WhatsApp API' },
  sales: { title: 'Software Sales Engine', subtitle: 'ARR, visual funnel & license provisioning' },
  activation: { title: 'User & License Activation', subtitle: 'Multi-tenant seat allocation & access control' },
  settings: { title: 'Cloud & Database', subtitle: 'Supabase PostgreSQL, Netlify & Render hosting' },
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  userRole,
  setUserRole,
  isDark,
  setIsDark,
  onOpenSearch,
  onOpenNotifications,
  onOpenAdminGuide,
  unreadCount
}) => {
  const currentMeta = TAB_TITLES[currentTab] || { title: 'Enterprise Portal', subtitle: 'Aishnar Digital' };

  return (
    <header className="h-16 apple-glass border-b border-black/[0.06] dark:border-white/[0.08] px-6 lg:px-8 flex items-center justify-between select-none sticky top-0 z-30 transition-colors">
      {/* Title & Micro Subtitle */}
      <div className="flex items-center space-x-3">
        <div>
          <h1 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
            {currentMeta.title}
          </h1>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal hidden sm:block">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls - Apple Minimalist Bar */}
      <div className="flex items-center space-x-2.5">
        {/* Spotlight Quick Search */}
        <button
          onClick={onOpenSearch}
          className="flex items-center space-x-2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] px-3 py-1.5 rounded-full border border-black/[0.04] dark:border-white/[0.06] transition-all"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline text-[11px] font-normal">Search anything...</span>
          <kbd className="text-[10px] bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded-md shadow-2xs font-mono text-slate-500 border border-black/[0.05] dark:border-white/[0.05]">
            ⌘K
          </kbd>
        </button>

        {/* Admin Sales & Playbook Guide */}
        <button
          onClick={onOpenAdminGuide}
          className="flex items-center space-x-1.5 text-xs font-medium bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full border border-black/[0.04] dark:border-white/[0.06] transition-all shadow-2xs"
          title="Open Admin Guide, Demo Tour & Sales Pitch"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span className="hidden sm:inline">Demo & Guide</span>
        </button>

        {/* Role Pill Switcher */}
        <div className="relative flex items-center bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06] rounded-full px-2.5 py-1 text-xs transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="bg-transparent text-[11px] font-medium text-slate-700 dark:text-slate-300 pr-4 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="super_admin" className="dark:bg-slate-900 text-slate-900 dark:text-white">Super Admin</option>
            <option value="sales_admin" className="dark:bg-slate-900 text-slate-900 dark:text-white">Sales Admin</option>
            <option value="project_manager" className="dark:bg-slate-900 text-slate-900 dark:text-white">Project Manager</option>
            <option value="team_member" className="dark:bg-slate-900 text-slate-900 dark:text-white">Staff Member</option>
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
        </div>

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950"></span>
          )}
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
          title="Toggle Light/Dark Appearance"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
