import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Plus, 
  Users, 
  Sparkles, 
  Building2, 
  DollarSign, 
  ArrowUpRight,
  Printer
} from 'lucide-react';
import { EnterpriseProject } from '../../types';
import { ERPStoreState } from '../../lib/store';

interface ProjectsViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ state, onUpdateState }) => {
  const [selectedProject, setSelectedProject] = useState<EnterpriseProject>(state.projects[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'checklists' | 'mom'>('overview');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-500" />
            Enterprise Projects & Delivery Pipelines
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Production milestone tracking, deliverables checklists & Minutes of Meeting (MOM)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {state.projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedProject.id === proj.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {proj.code}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Project Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        {/* Project Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800/40">
                {selectedProject.code}
              </span>
              <span className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">
                {selectedProject.status}
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              {selectedProject.name}
            </h3>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
              <span>Client: <strong className="text-slate-700 dark:text-slate-200">{selectedProject.clientOrganization}</strong></span>
              <span>·</span>
              <span>Contact: {selectedProject.clientContact}</span>
              <span>·</span>
              <span>Lead: <strong className="text-emerald-600 dark:text-emerald-400">{selectedProject.leadManager}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-400">Total Contract Value</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                ₹{(selectedProject.budgetTotal / 100000).toFixed(2)} Lakh
              </div>
              <div className="text-[11px] text-slate-400">Delivery: {selectedProject.targetDeliveryDate}</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1.5 font-semibold">
            <span>Overall Sprint Milestone Completion</span>
            <span className="font-mono text-slate-900 dark:text-white font-bold">{selectedProject.progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${selectedProject.progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Milestones & Tasks
          </button>
          <button
            onClick={() => setActiveTab('checklists')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'checklists'
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Engineering Checklists (200+ SOPs)
          </button>
          <button
            onClick={() => setActiveTab('mom')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'mom'
                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Minutes of Meeting (MOM)
          </button>
        </div>

        {/* Tab 1: Milestones & Tasks */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Key Milestone Deliverables
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">1. Cloud Infrastructure & VPC Architecture</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">DONE</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">2. Automated Failover & Disaster Recovery</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded">IN PROGRESS</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">3. SOC2 / ISO 27001 Security Audit Signoff</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded">UPCOMING</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Team Role Allocation
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span>Lead Architect:</span>
                  <strong className="text-slate-900 dark:text-white">Priyanka Sen</strong>
                </div>
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span>DevOps & Security:</span>
                  <strong className="text-slate-900 dark:text-white">Rohit Khandelwal</strong>
                </div>
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <span>Commercial & Delivery Sponsor:</span>
                  <strong className="text-slate-900 dark:text-white">Aishnar Admin</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Checklists */}
        {activeTab === 'checklists' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Standardized engineering compliance checkpoints for this project:
            </div>
            {[
              { title: 'Database connection pooling configured and tested for peak load', done: true },
              { title: 'Environment secrets rotated and stored in HashiCorp Vault / AWS KMS', done: true },
              { title: 'API rate limiting and DDoS mitigation verified', done: true },
              { title: 'Penetration testing remediations confirmed by QA team', done: false },
              { title: 'Client executive signoff on UAT test cases', done: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <CheckCircle2 className={`w-4 h-4 ${item.done ? 'text-emerald-500' : 'text-slate-400'}`} />
                <span className={`text-xs font-medium ${item.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: MOM (Minutes of Meeting) */}
        {activeTab === 'mom' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Official client meeting records with exportable minutes:
              </div>
              <button 
                onClick={() => window.print()}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export / Print MOM PDF</span>
              </button>
            </div>

            {state.meetings.map((mom) => (
              <div key={mom.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{mom.title}</h4>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{mom.date}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Attendees: {mom.attendees.join(', ')}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Key Decisions:</div>
                  <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    {mom.keyDecisions.map((dec, i) => (
                      <li key={i}>{dec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
