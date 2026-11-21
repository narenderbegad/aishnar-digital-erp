import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Printer,
  Calendar,
  Clock
} from 'lucide-react';
import { EnterpriseProject } from '../../types';
import { ERPStoreState } from '../../lib/store';

interface ProjectsViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ state }) => {
  const [selectedProject, setSelectedProject] = useState<EnterpriseProject>(state.projects[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'checklists' | 'mom'>('overview');

  const projectTasks = state.tasks.filter(t => t.projectId === selectedProject.id);
  const projectMoms = state.meetings.filter(m => m.projectCode === selectedProject.code || m.projectCode === 'AISH-PRJ-2026-01');

  const standardChecklists = [
    { id: 'sop-1', checkpoint: 'Git Branch protection & PR peer review mandatory', category: 'Code Quality', isVerified: true },
    { id: 'sop-2', checkpoint: 'Automated CI/CD build & test pipeline on Netlify & Render', category: 'DevOps', isVerified: true },
    { id: 'sop-3', checkpoint: 'PostgreSQL Supabase SSL & connection pooling verified', category: 'Database', isVerified: true },
    { id: 'sop-4', checkpoint: 'OWASP Top 10 security audit & role-based access control (RBAC)', category: 'Security', isVerified: true },
    { id: 'sop-5', checkpoint: 'SLA Telemetry & latency benchmarked (<120ms p95)', category: 'Infrastructure', isVerified: true },
    { id: 'sop-6', checkpoint: 'End-to-end client sign-off & milestone handover', category: 'Delivery', isVerified: false },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="apple-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span>Projects & Pipelines</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Production milestones, engineering checklists, and exportable Minutes of Meeting
          </p>
        </div>

        <div className="flex items-center space-x-1.5 p-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl text-xs select-none">
          {state.projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedProject.id === proj.id
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {proj.code}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Project Card */}
      <div className="apple-card rounded-2xl p-6 sm:p-7 space-y-6">
        {/* Project Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300 bg-black/[0.04] dark:bg-white/[0.06] px-2 py-0.5 rounded-full">
                {selectedProject.code}
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-semibold uppercase">
                {selectedProject.status}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
              {selectedProject.name}
            </h3>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
              <span>Client: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{selectedProject.clientOrganization}</strong></span>
              <span>·</span>
              <span>Lead: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{selectedProject.leadManager}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-left sm:text-right">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Contract Value</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                ₹{(selectedProject.budgetTotal / 100000).toFixed(2)} Lakh
              </div>
              <div className="text-[11px] text-slate-400">Target: {selectedProject.targetDeliveryDate}</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
            <span>Overall Milestone Completion</span>
            <span className="font-mono text-slate-900 dark:text-white font-semibold">{selectedProject.progressPercent}%</span>
          </div>
          <div className="w-full bg-black/[0.03] dark:bg-white/[0.04] h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${selectedProject.progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="inline-flex items-center p-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl text-xs select-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Milestones & Tasks ({projectTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('checklists')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'checklists'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Engineering Checklists ({standardChecklists.length} Checkpoints)
          </button>
          <button
            onClick={() => setActiveTab('mom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'mom'
                ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Minutes of Meeting (MOM)
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Sprint Tasks & Deliverables
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectTasks.length === 0 ? (
                <div className="col-span-2 text-xs text-slate-400 py-6 text-center">
                  All sprint tasks for this project are up to date.
                </div>
              ) : (
                projectTasks.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{t.title}</span>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        t.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}>
                        {t.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Owner: {t.assigneeName}</span>
                      <span className="font-mono">Due: {t.dueDate}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Checklists */}
        {activeTab === 'checklists' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Production Checklist ({standardChecklists.length} Verified Checkpoints)
              </h4>
            </div>
            <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {standardChecklists.map((chk) => (
                <div key={chk.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className={`w-4 h-4 ${chk.isVerified ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`} />
                    <span className={chk.isVerified ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}>
                      {chk.checkpoint}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{chk.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: MOM */}
        {activeTab === 'mom' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Minutes of Meeting Sessions
              </h4>
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
            <div className="space-y-3">
              {projectMoms.map((mom) => (
                <div key={mom.id} className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white">{mom.title}</span>
                    <span className="text-[11px] font-mono text-slate-400">{mom.date}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <div className="font-medium text-[11px] text-slate-400 mb-1">Key Decisions:</div>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {mom.keyDecisions.map((dec, i) => (
                        <li key={i}>{dec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
