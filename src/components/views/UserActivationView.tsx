import React, { useState } from 'react';
import { 
  Plus, 
  X
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

  // New user form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('team_member');
  const [organizationName, setOrganizationName] = useState('Aishnar Digital Technologies');

  // 1-Click Toggle User Activation Status (In-App)
  const handleToggleActivation = (userId: string) => {
    const updatedUsers = state.users.map(user => {
      if (user.id === userId) {
        const nextStatus = !user.isActive;
        if (nextStatus) {
          confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
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
      email,
      role,
      department: 'Operations',
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

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    setShowAddUserModal(false);
    setName('');
    setEmail('');
  };

  const activeCount = state.users.filter(u => u.isActive).length;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            User & Tenant Activation Engine
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Activate new users directly from the software · {activeCount} of {state.users.length} users active
          </p>
        </div>

        <button
          onClick={() => setShowAddUserModal(true)}
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-3.5 py-2 rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Activate New User</span>
        </button>
      </div>

      {/* Clean User Directory Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-400 border-b border-slate-200 dark:border-slate-800 font-medium">
            <tr>
              <th className="p-3.5">User</th>
              <th className="p-3.5">Organization</th>
              <th className="p-3.5">Role</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">In-App Activation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {state.users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3.5">
                  <div className="font-semibold text-slate-900 dark:text-white">{user.name}</div>
                  <div className="text-[11px] text-slate-400">{user.email}</div>
                </td>
                <td className="p-3.5 text-slate-600 dark:text-slate-400">
                  {user.organizationName}
                </td>
                <td className="p-3.5 text-slate-600 dark:text-slate-400 capitalize">
                  {user.role.replace('_', ' ')}
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
                  <button
                    onClick={() => handleToggleActivation(user.id)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      user.isActive
                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {user.isActive ? 'Deactivate' : '⚡ 1-Click Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-md p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Activate New User</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleActivateNewUser} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tarun Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="tarun@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Organization</label>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="sales_admin">Sales Admin</option>
                  <option value="project_manager">Project Manager</option>
                  <option value="team_member">Team Member</option>
                  <option value="client_viewer">Client Portal User</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-3 py-1.5 text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium"
                >
                  Activate Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
