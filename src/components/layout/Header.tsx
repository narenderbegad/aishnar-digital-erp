import React from 'react';
import {
  Search,
  Bell,
  Moon,
  Sun,
  Sparkles,
  ChevronDown,
  Globe
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
  today: { title: 'Today Cockpit & Live T-Minus', subtitle: 'On-ground coordinator standing duties & wedding countdown' },
  projects: { title: 'Destination Weddings & Timelines', subtitle: 'Royal wedding production schedules & 200+ SOP checkpoints' },
  finance: { title: 'Vendor Finance & Invoicing', subtitle: '50/30/20 milestone payouts & client GST tax invoices' },
  comms: { title: 'Team & Meta WhatsApp CRM', subtitle: 'Guest RSVP automation, digital room passes & crew broadcast' },
  sales: { title: 'AishNar ERP Software Sales & ARR', subtitle: 'B2B CRM for licensing this ERP to event agencies' },
  activation: { title: 'User & Tenant Activation', subtitle: 'Multi-tenant seat provisioning & role access control' },
  settings: { title: 'Cloud & Database Architecture', subtitle: 'PostgreSQL Supabase, Netlify & Render hosting sync' },
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
  const currentMeta = TAB_TITLES[currentTab] || { title: 'AishNar Digital-ERP', subtitle: 'Event Platform' };

  return (
    <header className="h-18 aishnar-glass border-b border-white/10 px-6 lg:px-8 flex items-center justify-between select-none sticky top-0 z-30 transition-colors">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-2">
          <span>{currentMeta.title}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]"></span>
        </h1>
        <p className="text-[11px] text-slate-400 font-normal hidden sm:block">
          {currentMeta.subtitle}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2.5">
        {/* Spotlight Quick Search */}
        <button
          onClick={onOpenSearch}
          className="flex items-center space-x-2 text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline text-[11px] font-normal">Search wedding, vendor...</span>
          <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-md font-mono text-slate-400 border border-white/10">
            ⌘K
          </kbd>
        </button>

        {/* Admin Sales & Playbook Guide */}
        <button
          onClick={onOpenAdminGuide}
          className="flex items-center space-x-1.5 text-xs font-semibold bg-[#00ff66]/10 hover:bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/30 px-3 py-1.5 rounded-full transition-all shadow-xs"
          title="Open Admin Guide & 5-Min Client Sales Pitch"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00ff66]" />
          <span className="hidden sm:inline">Sales Pitch & Demo</span>
        </button>

        {/* Role Pill Switcher */}
        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] mr-2 animate-pulse"></span>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="bg-transparent text-[11px] font-medium text-slate-300 pr-4 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="super_admin" className="bg-[#15151a] text-white">Super Admin (Founder)</option>
            <option value="sales_admin" className="bg-[#15151a] text-white">Software Sales Director</option>
            <option value="project_manager" className="bg-[#15151a] text-white">Lead Wedding Producer</option>
            <option value="team_member" className="bg-[#15151a] text-white">Event Operations Crew</option>
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
        </div>

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#00ff66] ring-2 ring-[#15151a]"></span>
          )}
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
