import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Key, 
  Users, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Mail, 
  Lock, 
  RefreshCw, 
  Copy, 
  Check, 
  X,
  Sparkles,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, UserRole, SoftwareLicense } from '../../types';
import { ERPStoreState, generateLicenseKey } from '../../lib/store';

interface UserActivationViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
}

export const UserActivationView: React.FC<UserActivationViewProps> = ({ state, onUpdateState }) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // New user form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('team_member');
  const [department, setDepartment] = useState('Engineering & Cloud Ops');
  const [organizationName, setOrganizationName] = useState('Aishnar Digital Technologies');
  const [phone, setPhone] = useState('+91 ');
  const [selectedLicenseKey, setSelectedLicenseKey] = useState(state.licenses[0]?.licenseKey || '');
  const [isImmediatelyActive, setIsImmediatelyActive] = useState(true);

  // Stats
  const totalUsers = state.users.length;
  const activeUsers = state.users.filter(u => u.isActive).length;
  const pendingUsers = state.users.filter(u => !u.isActive).length;

  // 1-Click Toggle User Activation Status (In-App)
  const handleToggleActivation = (userId: string) => {
    const targetUser = state.users.find(u => u.id === userId);
    if (!targetUser) return;

    const nextStatus = !targetUser.isActive;

    const updatedUsers = state.users.map(user => {
      if (user.id === userId) {
        return { ...user, isActive: nextStatus };
      }
      return user;
    });

    onUpdateState({
      ...state,
      users: updatedUsers,
    });

    if (nextStatus) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  // Submit New User Activation
  const handleActivateNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      department,
      organizationName,
      phone,
      licenseKey: selectedLicenseKey || generateLicenseKey('ENT'),
      isActive: isImmediatelyActive,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      joinedAt: new Date().toISOString().split('T')[0],
    };

    onUpdateState({
      ...state,
      users: [newUser, ...state.users],
    });

    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    setShowAddUserModal(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole('team_member');
    setDepartment('Engineering & Cloud Ops');
    setPhone('+91 ');
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-500 dark:text-amber-300 border border-amber-500/30">SUPER ADMIN</span>;
      case 'sales_admin':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-500 dark:text-blue-300 border border-blue-500/30">SALES ADMIN</span>;
      case 'project_manager':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/30">PROJECT MANAGER</span>;
      case 'client_viewer':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">CLIENT PORTAL</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/20 text-slate-600 dark:text-slate-300 border border-slate-500/30">TEAM MEMBER</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono font-semibold">
                IN-APP ACTIVATION ENGINE
              </span>
              <span className="text-xs text-slate-400">Zero Console Needed</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">
              User & Tenant Activation Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Activate new users and clients directly from within the software. Manage cryptographic license seats, assign role privileges, and toggle active/suspended status in 1 click.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddUserModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 text-xs transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Activate New User</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Total Provisioned Accounts</span>
              <Users className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {totalUsers} Accounts
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Across all licensed tenants
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Active Verified Users</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
              {activeUsers} Active
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-1">
              Can sign in & punch attendance
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Pending / Suspended</span>
              <XCircle className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-black font-mono text-amber-400 mt-1">
              {pendingUsers} Blocked
            </div>
            <div className="text-[11px] text-amber-400/80 mt-1">
              Awaiting 1-click admin toggle
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Live Users & Tenant Directory
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Direct In-App Status Control
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">User Identity</th>
                <th className="p-3.5">System Role</th>
                <th className="p-3.5">Organization & License Key</th>
                <th className="p-3.5">Activation Status</th>
                <th className="p-3.5 text-right">In-App Activation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {state.users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs ring-1 ring-slate-600 shrink-0">
                        {user.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {user.name}
                          {user.id === state.currentUser.id && (
                            <span className="text-[9px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded font-mono">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {user.email} {user.phone && `· ${user.phone}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    {getRoleBadge(user.role)}
                    <div className="text-[10px] text-slate-400 mt-1">{user.department}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {user.organizationName}
                    </div>
                    {user.licenseKey && (
                      <div className="mt-1 flex items-center gap-1">
                        <code className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          {user.licenseKey}
                        </code>
                        <button
                          onClick={() => handleCopyKey(user.licenseKey!)}
                          className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-0.5"
                          title="Copy Key"
                        >
                          {copiedKey === user.licenseKey ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="p-3.5">
                    {user.isActive ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/40 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800/40 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        Suspended / Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleToggleActivation(user.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                        user.isActive
                          ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-300 border border-red-300 dark:border-red-800/40 hover:bg-red-100'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                      }`}
                    >
                      {user.isActive ? 'Deactivate User' : '⚡ 1-Click Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Activate New User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-500" />
                In-App User & Tenant Provisioning
              </h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleActivateNewUser} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tarun Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tarun@aishnardigital.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Organization / Tenant
                  </label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Role & Permissions
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="super_admin">Super Admin (Full Leadership)</option>
                    <option value="sales_admin">Sales Admin (SaaS Revenue)</option>
                    <option value="project_manager">Project Manager</option>
                    <option value="team_member">Team Member (Staff)</option>
                    <option value="client_viewer">Client Portal User</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Phone (Optional)
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned Software License
                </label>
                <select
                  value={selectedLicenseKey}
                  onChange={(e) => setSelectedLicenseKey(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
                >
                  {state.licenses.map(lic => (
                    <option key={lic.id} value={lic.licenseKey}>
                      {lic.organizationName} ({lic.licenseKey}) - {lic.tier}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Switch */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="immediateActive"
                  checked={isImmediatelyActive}
                  onChange={(e) => setIsImmediatelyActive(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <label htmlFor="immediateActive" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Activate user immediately (Generate login credentials)
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-md shadow-emerald-500/20"
                >
                  Activate User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
