import React from 'react';
import { X, Bell, CheckCircle2, TrendingUp, AlertTriangle, Key } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'New ERP Sales Deal Closed!',
      desc: 'Kaveri Logistics purchased Professional License (₹1.80L/yr).',
      time: '15 mins ago',
      icon: TrendingUp,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      id: '2',
      title: 'User Activation Success',
      desc: 'Rohit Khandelwal activated under Aishnar Enterprise License.',
      time: '1 hour ago',
      icon: Key,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      id: '3',
      title: 'Expense Claim Pending Approval',
      desc: 'Priyanka Sen submitted client workshop travel claim (₹14,200).',
      time: '2 hours ago',
      icon: AlertTriangle,
      color: 'text-blue-500 bg-blue-500/10',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs select-none">
      <div className="absolute inset-y-0 right-0 max-w-sm w-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Activity Notifications</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${n.color} shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{n.desc}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">{n.time}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
