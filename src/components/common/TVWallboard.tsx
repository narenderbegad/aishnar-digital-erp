import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  X, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  TrendingUp, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ERPStoreState } from '../../lib/store';

interface TVWallboardProps {
  isOpen: boolean;
  onClose: () => void;
  state: ERPStoreState;
}

export const TVWallboard: React.FC<TVWallboardProps> = ({ isOpen, onClose, state }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d12] text-white flex flex-col p-6 overflow-hidden select-none animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00ff66]/20 to-[#0066ff]/20 border border-[#00ff66]/40 flex items-center justify-center p-2 shadow-xl shadow-emerald-500/10">
            <img src="/aishnar_logo.png" alt="AishNar" className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
          </div>
          <div>
            <div className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
              <span>AishNar</span>
              <span className="italic font-light aishnar-gradient-text">Digital-ERP</span>
              <span className="text-xs bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/30 px-2 py-0.5 rounded-full font-mono uppercase">
                Backstage Command Wallboard
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping"></span>
              Live Destination Wedding Operations & VIP Hospitality Telemetry
            </div>
          </div>
        </div>

        {/* Live Clock & Date */}
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-3xl font-mono font-bold text-[#00ff66] tracking-wider">
              {formattedTime}
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
              {formattedDate}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 bg-[#1e1e24] hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-colors border border-white/10"
            title="Exit Fullscreen (Esc)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="flex-1 grid grid-cols-12 gap-6 pt-6 overflow-hidden">
        {/* Column 1: Daily Focus & Standing SOPs (4 cols) */}
        <div className="col-span-4 flex flex-col space-y-4">
          <div className="bg-[#15151a] border border-white/10 rounded-2xl p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00ff66]" />
                Event SOPs & Coordinator Duties
              </h3>
              <span className="text-xs bg-[#1e1e24] px-2 py-0.5 rounded font-mono text-[#00ff66]">
                {state.duties.filter(d => d.isCompleted).length} / {state.duties.length} Complete
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {state.duties.map((duty) => (
                <div 
                  key={duty.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    duty.isCompleted 
                      ? 'bg-emerald-950/20 border-emerald-500/30' 
                      : 'bg-[#1e1e24] border-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-semibold text-slate-200">
                      {duty.title}
                    </div>
                    {duty.isCompleted ? (
                      <span className="text-[10px] bg-[#00ff66]/20 text-[#00ff66] px-2 py-0.5 rounded font-bold">
                        VERIFIED
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{duty.description}</div>
                  <div className="text-[10px] text-slate-500 mt-2 font-mono flex items-center justify-between">
                    <span>Lead: {duty.assignedTo}</span>
                    <span className="text-[#00ff66] uppercase">{duty.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Active Projects & Delivery Countdown (5 cols) */}
        <div className="col-span-5 flex flex-col space-y-4">
          <div className="bg-[#15151a] border border-white/10 rounded-2xl p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Live Wedding Production Schedules
              </h3>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono">
                {state.projects.length} Weddings
              </span>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto">
              {state.projects.map((proj) => (
                <div key={proj.id} className="p-4 bg-[#1e1e24] border border-white/5 rounded-xl space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#00ff66] font-semibold">{proj.code}</span>
                        {proj.countdownDays && (
                          <span className="text-[10px] bg-emerald-500/15 text-[#00ff66] px-2 py-0.5 rounded-full font-mono font-bold">
                            T-{proj.countdownDays} DAYS
                          </span>
                        )}
                      </div>
                      <div className="text-base font-bold text-white mt-1">{proj.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Venue: <strong className="text-slate-300">{proj.venue || 'The City Palace, Udaipur'}</strong> · VIP Guests: <strong className="text-[#00ff66]">{proj.guestCount || 450}</strong>
                      </div>
                    </div>
                    <span className="text-xs bg-white/5 text-slate-300 px-2.5 py-1 rounded-lg border border-white/10 font-semibold">
                      {proj.status}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Production Milestones</span>
                      <span className="font-mono text-white font-bold">{proj.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-[#0d0d12] h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="bg-gradient-to-r from-[#00ff66] to-[#0066ff] h-full rounded-full transition-all duration-500"
                        style={{ width: `${proj.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/5">
                    <span>Target Date: <strong className="text-slate-200">{proj.targetDeliveryDate}</strong></span>
                    <span>Budget: <strong className="text-[#00ff66]">₹{(proj.budgetTotal / 10000000).toFixed(2)} Cr</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Team Radar & Productivity Score (3 cols) */}
        <div className="col-span-3 flex flex-col space-y-4">
          {/* Monthly Score Gauge */}
          <div className="bg-gradient-to-br from-[#00ff66]/10 to-[#0066ff]/10 border border-[#00ff66]/20 rounded-2xl p-5 text-center">
            <div className="text-xs uppercase tracking-wider text-[#00ff66] font-semibold mb-1">
              Production Execution SLA
            </div>
            <div className="text-5xl font-extrabold font-mono text-white tracking-tight my-2">
              {state.performanceScore} <span className="text-xl text-[#00ff66] font-normal">/ 100</span>
            </div>
            <div className="text-xs text-[#00ff66]/80 font-medium">
              Zero Vendor Delays · VIP Hospitality 100%
            </div>
          </div>

          {/* Today's Attendance Radar */}
          <div className="bg-[#15151a] border border-white/10 rounded-2xl p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00ff66]" />
                On-Ground Crew Deployment
              </h3>
              <span className="text-xs bg-[#00ff66]/20 text-[#00ff66] px-2 py-0.5 rounded font-mono">
                {state.attendance.length} Stationed
              </span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto">
              {state.attendance.map((rec) => (
                <div key={rec.id} className="p-2.5 bg-[#1e1e24] rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{rec.userName}</div>
                    <div className="text-[10px] text-slate-400">{rec.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-semibold text-[#00ff66]">{rec.punchInTime}</div>
                    <div className="text-[10px] text-slate-400">{rec.hoursWorked} hrs</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
