import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  MapPin, 
  ArrowUpRight,
  Clock,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProjectTask } from '../../types';
import { ERPStoreState } from '../../lib/store';

interface TodayViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
  onOpenTvBoard: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({ state, onUpdateState }) => {
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
  const completionPercentage = Math.round((completedDutiesCount / (state.duties.length || 1)) * 100);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Clean Apple Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Good morning, {state.currentUser.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Today is on track · {completedDutiesCount} of {state.duties.length} standing duties fulfilled ({completionPercentage}%)
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsPunchedIn(!isPunchedIn)}
            className={`flex items-center space-x-2 text-xs font-medium px-4 py-2 rounded-full transition-all border ${
              isPunchedIn
                ? 'bg-black/[0.03] dark:bg-white/[0.05] border-black/[0.06] dark:border-white/[0.08] text-slate-700 dark:text-slate-300'
                : 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isPunchedIn ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
            <span>{isPunchedIn ? 'Office Check-In · 08:55 AM' : 'Check In to Office'}</span>
          </button>
        </div>
      </div>

      {/* 3 Apple-style Minimal Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="apple-card rounded-2xl p-5">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Productivity Score</div>
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mt-1.5 font-mono">
            {state.performanceScore}<span className="text-sm font-normal text-slate-400">/100</span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> High enterprise SLA
          </div>
        </div>

        <div className="apple-card rounded-2xl p-5">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Standing Duties</div>
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mt-1.5 font-mono">
            {completedDutiesCount} <span className="text-sm font-normal text-slate-400">/ {state.duties.length}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {state.duties.length - completedDutiesCount} remaining today
          </div>
        </div>

        <div className="apple-card rounded-2xl p-5">
          <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Sprint Deliverables</div>
          <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mt-1.5 font-mono">
            {state.projects.length} <span className="text-sm font-normal text-slate-400">projects</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {pendingTasks.length} pending sprint tasks
          </div>
        </div>
      </div>

      {/* Standing Duties (Apple Reminders Style) */}
      <div className="apple-card rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Daily Standing Duties
            </h3>
            <p className="text-[11px] text-slate-400">Standard Operating Procedures & daily checklists</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {completedDutiesCount} of {state.duties.length} completed
          </span>
        </div>

        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          {state.duties.map((duty) => (
            <div
              key={duty.id}
              onClick={() => handleToggleDuty(duty.id)}
              className="py-3 flex items-start space-x-3 cursor-pointer group hover:bg-black/[0.01] dark:hover:bg-white/[0.01] px-2 rounded-xl transition-all"
            >
              <div className="mt-0.5 shrink-0">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  duty.isCompleted
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400'
                }`}>
                  {duty.isCompleted && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-medium transition-colors ${duty.isCompleted ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {duty.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {duty.description} · <span className="text-slate-500">{duty.assignedTo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Sprint Tasks */}
      <div className="apple-card rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Current Sprint Deliverables
            </h3>
            <p className="text-[11px] text-slate-400">Milestone tasks due for current sprint cycle</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {pendingTasks.length} open
          </span>
        </div>

        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          {state.tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id)}
              className="py-3 flex items-center justify-between cursor-pointer group hover:bg-black/[0.01] dark:hover:bg-white/[0.01] px-2 rounded-xl transition-all"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                  task.status === 'completed'
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400'
                }`}>
                  {task.status === 'completed' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span className={`text-xs font-medium truncate ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
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
