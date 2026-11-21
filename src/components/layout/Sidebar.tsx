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
  Sparkles,
  ExternalLink,
  Calendar
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
  const [logoError, setLogoError] = React.useState(false);

  const navItemClass = (isActive: boolean) => 
    `w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
      isActive
        ? 'bg-gradient-to-r from-[#00ff66]/15 to-[#0066ff]/15 text-[#00ff66] border border-[#00ff66]/30 font-semibold shadow-xs'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <aside className="w-64 bg-[#15151a] flex flex-col border-r border-white/10 shrink-0 select-none transition-colors">
      {/* Brand Header */}
      <div className="h-18 px-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#00ff66]/20 to-[#0066ff]/20 border border-[#00ff66]/40 flex items-center justify-center p-1.5 shadow-md shadow-emerald-500/10 shrink-0">
            {!logoError ? (
              <img 
                src="/aishnar_logo.png" 
                alt="AishNar Digital" 
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)} 
              />
            ) : (
              <span className="font-extrabold text-xs aishnar-gradient-text">AD</span>
            )}
          </div>
          <div className="leading-tight min-w-0">
            <div className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5 truncate">
              <span>AishNar</span>
              <span className="italic font-light aishnar-gradient-text">Digital</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]"></span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium truncate">
              Event & Wedding ERP
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {/* Event Operations */}
        <div>
          <div className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Wedding Operations
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setCurrentTab('today')}
              className={navItemClass(currentTab === 'today')}
            >
              <div className="flex items-center space-x-2.5">
                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                <span>Today Cockpit & SOPs</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('projects')}
              className={navItemClass(currentTab === 'projects')}
            >
              <div className="flex items-center space-x-2.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Weddings & Timelines</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('finance')}
              className={navItemClass(currentTab === 'finance')}
            >
              <div className="flex items-center space-x-2.5">
                <Receipt className="w-4 h-4 text-slate-400" />
                <span>Vendor Finance & GST</span>
              </div>
            </button>

            <button
              onClick={() => setCurrentTab('comms')}
              className={navItemClass(currentTab === 'comms')}
            >
              <div className="flex items-center space-x-2.5">
                <MessagesSquare className="w-4 h-4 text-slate-400" />
                <span>Team & WhatsApp API</span>
              </div>
            </button>
          </div>
        </div>

        {/* Commercial Sales Suite for AishNar Digital */}
        <div>
          <div className="px-3 text-[10px] font-semibold text-[#00ff66] uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>ERP Software Commercials</span>
            <span className="text-[9px] bg-[#00ff66]/10 text-[#00ff66] px-1.5 py-0.2 rounded font-mono">B2B CRM</span>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setCurrentTab('sales')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'sales'
                  ? 'bg-gradient-to-r from-[#00ff66]/15 to-[#0066ff]/15 text-[#00ff66] border border-[#00ff66]/30 font-semibold shadow-xs'
                  : isSalesAdmin
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'opacity-40 cursor-not-allowed text-slate-600'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <BadgePercent className="w-4 h-4 text-[#00ff66]" />
                <span>Software Sales & ARR</span>
              </div>
              {!isSalesAdmin && <Lock className="w-3 h-3 text-slate-500" />}
            </button>

            <button
              onClick={() => setCurrentTab('activation')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                currentTab === 'activation'
                  ? 'bg-gradient-to-r from-[#00ff66]/15 to-[#0066ff]/15 text-[#00ff66] border border-[#00ff66]/30 font-semibold shadow-xs'
                  : isSuperAdmin
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'opacity-40 cursor-not-allowed text-slate-600'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <UserCheck className="w-4 h-4 text-[#00ff66]" />
                <span>User & Tenant Activation</span>
              </div>
              {!isSuperAdmin && <Lock className="w-3 h-3 text-slate-500" />}
            </button>

            <button
              onClick={() => setCurrentTab('settings')}
              className={navItemClass(currentTab === 'settings')}
            >
              <div className="flex items-center space-x-2.5">
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Cloud & Supabase</span>
              </div>
            </button>

            <button
              onClick={onOpenTvBoard}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <div className="flex items-center space-x-2.5">
                <Tv className="w-4 h-4 text-slate-400" />
                <span>Backstage TV Display</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* User Card & Sign Out */}
      <div className="p-3 border-t border-white/10 space-y-2">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#00ff66] to-[#0066ff] text-slate-950 font-bold text-[11px] flex items-center justify-center shrink-0">
              {userName.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                {userName}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {userRoleName}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors shrink-0"
            title="Sign Out of Session"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
