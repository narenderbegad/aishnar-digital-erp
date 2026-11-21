import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  MapPin, 
  ArrowUpRight,
  Clock,
  Check,
  Calendar,
  Sparkles,
  Users,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProjectTask } from '../../types';
import { ERPStoreState } from '../../lib/store';

interface TodayViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
  onOpenTvBoard: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({ state, onUpdateState, onOpenTvBoard }) => {
  const [isPunchedIn, setIsPunchedIn] = useState(true);

  // Toggle duty completion
  const handleToggleDuty = (dutyId: string) => {
    const updatedDuties = state.duties.map(d => {
      if (d.id === dutyId) {
        const nextState = !d.isCompleted;
        if (nextState) {
          confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
        }
        return { ...d, isCompleted: nextState };
      }
      return d;
    });

    const completedCount = updatedDuties.filter(d => d.isCompleted).length;
    const baseScore = 90 + Math.round((completedCount / updatedDuties.length) * 10);

    onUpdateState({
      ...state,
      duties: updatedDuties,
      performanceScore: Math.min(100, baseScore),
    });
  };

  // Toggle task status
  const handleToggleTask = (taskId: string) => {
    const updatedTasks: ProjectTask[] = state.tasks.map(t => {
      if (t.id === taskId) {
        const nextStatus: ProjectTask['status'] = t.status === 'completed' ? 'in_progress' : 'completed';
        if (nextStatus === 'completed') {
          confetti({ particleCount: 35, spread: 45, origin: { y: 0.6 } });
        }
        return { ...t, status: nextStatus };
      }
      return t;
    });

    onUpdateState({
      ...state,
      tasks: updatedTasks,
    });
  };

  const completedDutiesCount = state.duties.filter(d => d.isCompleted).length;
  const pendingTasks = state.tasks.filter(t => t.status !== 'completed');
  const activeWedding = state.projects[0];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Live T-Minus Wedding Countdown Banner */}
      {activeWedding && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#15151a] via-[#1e1e24] to-[#15151a] border border-[#00ff66]/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl shadow-emerald-500/5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-[#00ff66]/15 text-[#00ff66] border border-[#00ff66]/30 px-2 py-0.5 rounded-full uppercase">
                ACTIVE ON-GROUND EVENT
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeWedding.venue || 'The City Palace, Udaipur'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {activeWedding.name}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-3">
              <span>Client: <strong className="text-white">{activeWedding.clientOrganization}</strong></span>
              <span>·</span>
              <span>Guests: <strong className="text-emerald-400">{activeWedding.guestCount || 450} VIPs</strong></span>
              <span>·</span>
              <span>Producer: <strong className="text-slate-300">{activeWedding.leadManager}</strong></span>
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="p-3 px-5 rounded-2xl bg-black/40 border border-white/10 text-center">
              <div className="text-3xl font-black font-mono aishnar-gradient-text">
                {activeWedding.countdownDays || 4}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Days to Event</div>
            </div>

            <button
              onClick={onOpenTvBoard}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors flex items-center gap-1.5"
            >
              <span>Backstage TV</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Namaste, {state.currentUser.name}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            On-ground Event Operations · {completedDutiesCount} of {state.duties.length} standing duties fulfilled
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsPunchedIn(!isPunchedIn)}
            className={`flex items-center space-x-2 text-xs font-medium px-4 py-2 rounded-full transition-all border ${
              isPunchedIn
                ? 'bg-white/5 border-white/10 text-slate-300'
                : 'bg-[#00ff66] border-[#00ff66] text-slate-950 font-bold shadow-xs'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isPunchedIn ? 'bg-[#00ff66]' : 'bg-slate-500'}`}></span>
            <span>{isPunchedIn ? 'On-Ground Venue Check-In · 08:55 AM' : 'Check In to Venue'}</span>
          </button>
        </div>
      </div>

      {/* 3 Executive Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-5 rounded-3xl bg-[#15151a] border border-white/10">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider font-mono">Agency SLA Score</div>
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-1.5 font-mono">
            {state.performanceScore}<span className="text-sm font-normal text-slate-500">/100</span>
          </div>
          <div className="text-[11px] text-[#00ff66] mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> 100% On-Time Stage Clearance
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#15151a] border border-white/10">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider font-mono">Standing Duties</div>
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-1.5 font-mono">
            {completedDutiesCount} <span className="text-sm font-normal text-slate-500">/ {state.duties.length}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {state.duties.length - completedDutiesCount} remaining today
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#15151a] border border-white/10">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider font-mono">Active Events</div>
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-1.5 font-mono">
            {state.projects.length} <span className="text-sm font-normal text-slate-500">weddings</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {pendingTasks.length} pending milestone deliverables
          </div>
        </div>
      </div>

      {/* Standing Duties (SOP Checklist) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#15151a] border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-sm font-bold text-white">
              Daily On-Ground Event Standing Duties
            </h3>
            <p className="text-[11px] text-slate-400">Standard Operating Procedures & VIP guest protocols</p>
          </div>
          <span className="text-xs text-[#00ff66] font-mono">
            {completedDutiesCount} of {state.duties.length} completed
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {state.duties.map((duty) => (
            <div
              key={duty.id}
              onClick={() => handleToggleDuty(duty.id)}
              className="py-3.5 flex items-start space-x-3 cursor-pointer group hover:bg-white/[0.02] px-2 rounded-xl transition-all"
            >
              <div className="mt-0.5 shrink-0">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  duty.isCompleted
                    ? 'bg-[#00ff66] border-[#00ff66] text-slate-950 font-bold'
                    : 'border-slate-600 group-hover:border-slate-400'
                }`}>
                  {duty.isCompleted && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-semibold transition-colors ${duty.isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                  {duty.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {duty.description} · <span className="text-slate-300 font-medium">{duty.assignedTo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Sprint Deliverables */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#15151a] border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-sm font-bold text-white">
              Critical Event Production Deliverables
            </h3>
            <p className="text-[11px] text-slate-400">Milestone checklists due before event day handover</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {pendingTasks.length} open
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {state.tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id)}
              className="py-3 flex items-center justify-between cursor-pointer group hover:bg-white/[0.02] px-2 rounded-xl transition-all"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                  task.status === 'completed'
                    ? 'bg-[#00ff66] border-[#00ff66] text-slate-950'
                    : 'border-slate-600 group-hover:border-slate-400'
                }`}>
                  {task.status === 'completed' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span className={`text-xs font-medium truncate ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                  {task.title}
                </span>
              </div>

              <div className="flex items-center space-x-4 shrink-0 text-[11px] text-slate-400">
                <span>{task.assigneeName}</span>
                <span className="font-mono">{task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
