import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Award, 
  AlertCircle, 
  MapPin, 
  Calendar, 
  Tv, 
  ArrowRight, 
  Briefcase, 
  Plus, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StandingDuty, ProjectTask } from '../../types';
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
          confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
        }
        return { ...d, isCompleted: nextState };
      }
      return d;
    });

    // Dynamic Productivity Score Calculation
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
          confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
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
    <div className="space-y-6">
      {/* Top Hero Greetings */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono font-semibold">
                EXECUTIVE DAILY COCKPIT
              </span>
              <span className="text-xs text-slate-400">Jaipur Campus · Verified GPS</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">
              Namaste, {state.currentUser.name}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              You have <strong className="text-emerald-400">{state.duties.length - completedDutiesCount} standing duties</strong> and <strong className="text-amber-400">{pendingTasks.length} priority sprint tasks</strong> assigned for today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTvBoard}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
            >
              <Tv className="w-4 h-4 text-amber-400" />
              <span>Office TV Mode</span>
            </button>

            {/* Attendance Punch-in */}
            <button
              onClick={() => setIsPunchedIn(!isPunchedIn)}
              className={`flex items-center space-x-2 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md ${
                isPunchedIn
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{isPunchedIn ? 'Punched In (08:55 AM)' : 'Punch In Now'}</span>
            </button>
          </div>
        </div>

        {/* 4 Overview Mini-Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Monthly Score</span>
              <Award className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
              {state.performanceScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              -8 pts overdue · -5 pts moved
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Standing Duties</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {completedDutiesCount} / {state.duties.length}
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">
              {Math.round((completedDutiesCount / state.duties.length) * 100)}% Compliance
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Active Projects</span>
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {state.projects.length} Running
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Zero delivery delays
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Team in Campus</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {state.attendance.length} Logged In
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">
              On-time arrival 92%
            </div>
          </div>
        </div>
      </div>

      {/* 2 Column Layout: Standing Duties (Left) & Priority Tasks (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Standing Duties SOP Checklist (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Standing Duties & Operational SOPs
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Every working day recurring checklist · Feeds directly into your monthly score
              </p>
            </div>
            <span className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 px-2.5 py-1 rounded-lg font-mono font-bold">
              {completedDutiesCount} / {state.duties.length}
            </span>
          </div>

          <div className="space-y-3">
            {state.duties.map((duty) => (
              <div
                key={duty.id}
                onClick={() => handleToggleDuty(duty.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  duty.isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 shrink-0">
                    {duty.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 hover:text-emerald-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-bold ${
                        duty.isCompleted ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'
                      }`}>
                        {duty.title}
                      </span>
                      <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded font-mono uppercase">
                        {duty.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {duty.description}
                    </p>
                    <div className="text-[10px] text-slate-400 mt-2 font-mono flex items-center justify-between">
                      <span>Owner: <strong className="text-slate-700 dark:text-slate-300">{duty.assignedTo}</strong></span>
                      <span className="text-emerald-500">Every working day</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sprint Tasks (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Priority Sprint Tasks
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Target milestones & delivery items
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {pendingTasks.length} Open
            </span>
          </div>

          <div className="space-y-3">
            {state.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggleTask(task.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  task.status === 'completed'
                    ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                    : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start space-x-2.5">
                  <div className="mt-0.5 shrink-0">
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {task.title}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                      <span>Due: <strong className="font-mono text-slate-700 dark:text-slate-300">{task.dueDate}</strong></span>
                      <span className={`font-semibold uppercase px-1.5 py-0.5 rounded ${
                        task.priority === 'urgent'
                          ? 'bg-red-500/20 text-red-400'
                          : task.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
