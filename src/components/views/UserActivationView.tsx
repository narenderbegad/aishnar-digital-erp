import React, { useState } from 'react';
import { 
  Plus, 
  X,
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, UserRole } from '../../types';
import { ERPStoreState, generateLicenseKey } from '../../lib/store';

interface UserActivationViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
}

export const UserActivationView: React.FC<UserActivationViewProps> = ({ state, onUpdateState }) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [createdUserCredentials, setCreatedUserCredentials] = useState<{ email: string; pass: string; role: string } | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  // New user form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('User#2026');
  const [role, setRole] = useState<UserRole>('team_member');
  const [department, setDepartment] = useState('Operations & Delivery');
  const [organizationName, setOrganizationName] = useState('Aishnar Digital Technologies');

  // 1-Click Toggle User Activation Status (In-App)
  const handleToggleActivation = (userId: string) => {
    const updatedUsers = state.users.map(user => {
      if (user.id === userId) {
        const nextStatus = !user.isActive;
        if (nextStatus) {
          confetti({ particleCount: 40, spread: 45, origin: { y: 0.6 } });
        }
        return { ...user, isActive: nextStatus };
      }
      return user;
    });

    onUpdateState({
      ...state,
      users: updatedUsers,
    });
  };

  const handleActivateNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email: email.trim(),
      password: password || 'User#2026',
      role,
      department,
      organizationName,
      licenseKey: state.licenses[0]?.licenseKey || generateLicenseKey('ENT'),
      isActive: true,
      avatarUrl: '',
      joinedAt: new Date().toISOString().split('T')[0],
    };

    onUpdateState({
      ...state,
      users: [newUser, ...state.users],
    });

    confetti({ particleCount: 70, spread: 55, origin: { y: 0.5 } });
    setCreatedUserCredentials({ email: newUser.email, pass: newUser.password!, role: newUser.role });
    setShowAddUserModal(false);
    setName('');
    setEmail('');
    setPassword('User#2026');
  };

  const handleCopyCredentials = () => {
    if (!createdUserCredentials) return;
    const text = `Aishnar Digital-ERP Login Credentials:\nPortal: https://aishnar-digital-erp.netlify.app/\nEmail: ${createdUserCredentials.email}\nPassword: ${createdUserCredentials.pass}\nRole: ${createdUserCredentials.role.replace('_', ' ').toUpperCase()}`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const activeCount = state.users.filter(u => u.isActive).length;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>User & Tenant Activation</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono px-2 py-0.5 rounded-full font-semibold">
              Multi-Tenant
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Super Admin access directory · {activeCount} of {state.users.length} enterprise users active
          </p>
        </div>

        <button
          onClick={() => setShowAddUserModal(true)}
          className="flex items-center space-x-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 font-medium text-xs px-4 py-2 rounded-full transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Provision New User</span>
        </button>
      </div>

      {/* Clean User Directory Table */}
      <div className="apple-card rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-black/[0.02] dark:bg-white/[0.02] text-slate-400 border-b border-black/[0.04] dark:border-white/[0.06] font-semibold text-[10px] uppercase tracking-wider">
            <tr>
              <th className="p-3.5">User Identity</th>
              <th className="p-3.5">Organization</th>
              <th className="p-3.5">Role</th>
              <th className="p-3.5">Password Access</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Access Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {state.users.map((user) => {
              const isSuperAdminUser = user.email.toLowerCase() === 'narender@aishnar.com';
              const userPass = user.password || (isSuperAdminUser ? '#Narender0077' : 'Aishnar@2026');
              const isVisible = showPasswords[user.id];

              return (
                <tr key={user.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {isSuperAdminUser && (
                        <span className="text-[9px] bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold px-1.5 py-0.2 rounded font-mono">
                          MASTER ADMIN
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">{user.email}</div>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">
                    <div>{user.organizationName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{user.department}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium uppercase bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-slate-300">
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center space-x-1.5">
                      <code className="font-mono text-[11px] bg-black/[0.03] dark:bg-white/[0.05] px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300 select-all">
                        {isVisible ? userPass : '••••••••••••'}
                      </code>
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(user.id)}
                        className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-0.5"
                        title={isVisible ? 'Hide Password' : 'Show Password'}
                      >
                        {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="p-3.5">
                    {user.isActive ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    {isSuperAdminUser ? (
                      <span className="text-[10px] font-semibold text-slate-400 font-mono">PERMANENT</span>
                    ) : (
                      <div className="inline-flex items-center justify-end">
                        {/* Apple-style Toggle Switch */}
                        <button
                          type="button"
                          onClick={() => handleToggleActivation(user.id)}
                          className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                            user.isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                          title={user.isActive ? 'Click to Deactivate' : 'Click to Activate'}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform ${
                              user.isActive ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal: Add New User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Provision Enterprise User</span>
              </h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleActivateNewUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-500 mb-1 font-medium text-[11px]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1 font-medium text-[11px]">Work Email (Login Username) *</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1 font-medium text-[11px]">Initial Password *</label>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1 font-medium text-[11px]">Role & Access</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="sales_admin">Sales Admin</option>
                    <option value="project_manager">Project Manager</option>
                    <option value="team_member">Staff Engineer / Member</option>
                    <option value="client_viewer">Client Portal User</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-medium text-[11px]">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 mb-1 font-medium text-[11px]">Organization / Client Tenant</label>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-black/[0.04] dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl font-medium shadow-xs"
                >
                  Create & Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Credentials Delivery Confirmation */}
      {createdUserCredentials && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>User Successfully Provisioned</span>
            </div>

            <p className="text-xs text-slate-500">
              The user can now sign in immediately using these credentials:
            </p>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] font-mono text-xs space-y-1.5">
              <div><span className="text-slate-400">Portal:</span> <span className="text-slate-900 dark:text-white font-semibold">https://aishnar-digital-erp.netlify.app/</span></div>
              <div><span className="text-slate-400">Email:</span> <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{createdUserCredentials.email}</span></div>
              <div><span className="text-slate-400">Password:</span> <span className="text-slate-900 dark:text-white font-semibold">{createdUserCredentials.pass}</span></div>
              <div><span className="text-slate-400">Role:</span> <span className="text-slate-700 dark:text-slate-300 capitalize">{createdUserCredentials.role.replace('_', ' ')}</span></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleCopyCredentials}
                className="px-3.5 py-2 bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied Details' : 'Copy Login Details'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCreatedUserCredentials(null)}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold rounded-xl text-xs shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
