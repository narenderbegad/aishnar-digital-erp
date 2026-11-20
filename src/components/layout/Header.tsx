import React from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  UserCheck 
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

const TAB_TITLES: Record<string, string> = {
  today: 'Today Cockpit',
  projects: 'Projects & Work',
  finance: 'Expenses & Invoices',
  comms: 'Team Communications',
  sales: 'Software Sales Management',
  activation: 'User & License Activation',
  settings: 'Database & Hosting',
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  userRole,
  setUserRole,
  isDark,
  setIsDark,
  onOpenSearch,
  onOpenNotifications,
  unreadCount
}) => {
  const title = TAB_TITLES[currentTab] || 'Dashboard';

  return (
    <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 px-6 flex items-center justify-between select-none">
      <div>
        <h1 className="text-base font-semibold text-slate-900 dark:text-white">
          {title}
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        {/* Role Switcher */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
          <UserCheck className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] font-medium text-slate-400">Role:</span>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="bg-transparent text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="super_admin" className="dark:bg-slate-900">Super Admin</option>
            <option value="sales_admin" className="dark:bg-slate-900">Sales Admin</option>
            <option value="project_manager" className="dark:bg-slate-900">Project Manager</option>
            <option value="team_member" className="dark:bg-slate-900">Staff Member</option>
          </select>
        </div>

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex items-center space-x-2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="text-[10px] bg-slate-200 dark:bg-slate-800 px-1 py-0.2 rounded font-mono text-slate-500">
            Ctrl K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
          title="Toggle Light/Dark Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
