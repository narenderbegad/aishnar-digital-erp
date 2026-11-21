import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Printer,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Building2
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
  const projectMoms = state.meetings.filter(m => m.projectCode === selectedProject.code || m.projectCode.includes('PRJ'));

  const standardChecklists = [
    { id: 'sop-1', checkpoint: 'Airport Arrival VIP escort & luggage color-coding protocol', category: 'Hospitality & Travel', isVerified: true },
    { id: 'sop-2', checkpoint: 'Room Welcome hampers & digital keycard envelope delivery', category: 'Guest Relations', isVerified: true },
    { id: 'sop-3', checkpoint: 'Console soundcheck, line arrays & artist tech-rider signoff', category: 'Audio & Visuals', isVerified: true },
    { id: 'sop-4', checkpoint: 'Stage trussing, LED wall pixel mapping & pyrotechnics license', category: 'Production & Stage', isVerified: true },
    { id: 'sop-5', checkpoint: 'Banquet food tasting, live counters & premium bar inventory count', category: 'F&B & Catering', isVerified: true },
    { id: 'sop-6', checkpoint: 'Mandap floral setup, varmala dry-ice & entry pathway clearance', category: 'Decor & Floral', isVerified: false },
    { id: 'sop-7', checkpoint: 'Choreography rehearsals & Sangeet soundtrack backup on SSD', category: 'Entertainment', isVerified: true },
    { id: 'sop-8', checkpoint: 'Final client sign-off & vendor milestone clearance token', category: 'Commercials', isVerified: false },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#15151a] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00ff66]" />
            <span>Destination Weddings & Production Timelines</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Multi-day royal wedding schedules, hospitality room allocation & 200+ event SOP checkpoints
          </p>
        </div>

        <div className="flex items-center space-x-1.5 p-1 bg-white/5 rounded-2xl text-xs select-none overflow-x-auto">
          {state.projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedProject.id === proj.id
                  ? 'bg-gradient-to-r from-[#00ff66] to-[#0066ff] text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {proj.code}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Wedding Project Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#15151a] border border-white/10 space-y-6">
        {/* Project Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                {selectedProject.code}
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold uppercase font-mono">
                {selectedProject.status}
              </span>
              {selectedProject.countdownDays && (
                <span className="text-[10px] bg-[#00ff66]/15 text-[#00ff66] border border-[#00ff66]/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  T-{selectedProject.countdownDays} DAYS
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2">
              {selectedProject.name}
            </h3>
            <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-slate-500" /> Client: <strong className="text-white">{selectedProject.clientOrganization}</strong></span>
              <span>·</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> Venue: <strong className="text-slate-300">{selectedProject.venue || 'The City Palace, Udaipur'}</strong></span>
              <span>·</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-500" /> VIP Guests: <strong className="text-[#00ff66]">{selectedProject.guestCount || 450}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-left sm:text-right">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Total Event Budget</div>
              <div className="text-2xl font-black font-mono text-white">
                ₹{(selectedProject.budgetTotal / 10000000).toFixed(2)} Crore
              </div>
              <div className="text-[11px] text-slate-400">Target Date: {selectedProject.targetDeliveryDate}</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
            <span>Overall Wedding Production Readiness</span>
            <span className="font-mono text-white font-bold">{selectedProject.progressPercent}%</span>
          </div>
          <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#00ff66] to-[#0066ff] h-full rounded-full transition-all duration-500"
              style={{ width: `${selectedProject.progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="inline-flex items-center p-1 bg-white/5 rounded-2xl text-xs select-none border border-white/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-[#1e1e24] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Production Tasks ({projectTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('checklists')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'checklists'
                ? 'bg-[#1e1e24] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            200+ Event SOPs ({standardChecklists.length} Verified)
          </button>
          <button
            onClick={() => setActiveTab('mom')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'mom'
                ? 'bg-[#1e1e24] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Minutes of Meeting (MOM)
          </button>
        </div>

        {/* Tab 1: Overview Tasks */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              On-Ground Milestone Deliverables
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectTasks.length === 0 ? (
                <div className="col-span-2 text-xs text-slate-400 py-6 text-center">
                  All production tasks for this wedding are completed.
                </div>
              ) : (
                projectTasks.map((t) => (
                  <div key={t.id} className="p-4 rounded-2xl bg-[#1e1e24] border border-white/10 space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-semibold text-white">{t.title}</span>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full font-mono ${
                        t.status === 'completed'
                          ? 'bg-[#00ff66]/15 text-[#00ff66]'
                          : 'bg-blue-500/15 text-blue-400'
                      }`}>
                        {t.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Lead: {t.assigneeName} ({t.assigneeRole})</span>
                      <span className="font-mono text-slate-300">Due: {t.dueDate}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Event Checklists */}
        {activeTab === 'checklists' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Royal Wedding Production SOPs ({standardChecklists.length} Critical Checkpoints)
              </h4>
            </div>
            <div className="divide-y divide-white/5">
              {standardChecklists.map((chk) => (
                <div key={chk.id} className="py-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className={`w-4 h-4 ${chk.isVerified ? 'text-[#00ff66]' : 'text-slate-600'}`} />
                    <span className={chk.isVerified ? 'text-white font-medium' : 'text-slate-400'}>
                      {chk.checkpoint}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">{chk.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: MOM */}
        {activeTab === 'mom' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Client & Vendor Sync Sessions
              </h4>
              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors border border-white/10"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
            <div className="space-y-3">
              {projectMoms.map((mom) => (
                <div key={mom.id} className="p-4 rounded-2xl bg-[#1e1e24] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{mom.title}</span>
                    <span className="text-[11px] font-mono text-slate-400">{mom.date}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <div className="font-semibold text-[11px] text-slate-400 mb-1">Key Decisions & Vendor Agreements:</div>
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
