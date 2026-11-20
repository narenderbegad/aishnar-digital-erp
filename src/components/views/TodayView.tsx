import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  MapPin, 
  ArrowUpRight
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
          confetti({ particleCount: 40, spread: 45, origin: { y: 0.7 } });
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
          confetti({ particleCount: 40, spread: 45, origin: { y: 0.6 } });
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

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Clean Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Namaste, {state.currentUser.name}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Friday, 20 November · {completedDutiesCount} of {state.duties.length} standing duties fulfilled
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsPunchedIn(!isPunchedIn)}
            className={`flex items-center space-x-2 text-xs font-medium px-3.5 py-2 rounded-lg transition-colors border ${
              isPunchedIn
                ? 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                : 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            <span>{isPunchedIn ? 'Checked In · 08:55 AM' : 'Check In to Office'}</span>
          </button>
        </div>
      </div>

      {/* 3 Calm Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monthly Score</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1.5 font-mono">
            {state.performanceScore}<span className="text-sm font-normal text-slate-400">/100</span>
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" /> High SLA compliance
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Standing Duties</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1.5 font-mono">
            {completedDutiesCount} <span className="text-sm font-normal text-slate-400">/ {state.duties.length} done</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {state.duties.length - completedDutiesCount} remaining today
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Sprints</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1.5 font-mono">
            {state.projects.length} <span className="text-sm font-normal text-slate-400">projects</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {pendingTasks.length} pending sprint tasks
          </div>
        </div>
      </div>

      {/* Standing Duties (SOP Checklist) */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800/80 p-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60 mb-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Daily Standing Duties
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {completedDutiesCount} of {state.duties.length} completed
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {state.duties.map((duty) => (
            <div
              key={duty.id}
              onClick={() => handleToggleDuty(duty.id)}
              className="py-3.5 flex items-start space-x-3 cursor-pointer group"
            >
              <div className="mt-0.5 shrink-0">
                {duty.isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-medium ${duty.isCompleted ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
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

      {/* Priority Tasks */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800/80 p-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60 mb-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Current Sprint Deliverables
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {pendingTasks.length} open
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {state.tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id)}
              className="py-3.5 flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center space-x-3 min-w-0">
                {task.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-400 shrink-0" />
                )}
                <span className={`text-xs font-medium truncate ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {task.title}
                </span>
              </div>

              <div className="flex items-center space-x-4 shrink-0 text-xs text-slate-400">
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
