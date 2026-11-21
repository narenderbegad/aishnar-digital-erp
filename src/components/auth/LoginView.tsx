import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../../types';

interface LoginViewProps {
  users: UserProfile[];
  onLogin: (user: UserProfile) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ users, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail);

      if (!matchedUser) {
        setErrorMessage('User account not found. Please contact your Super Admin.');
        setIsLoading(false);
        return;
      }

      if (!matchedUser.isActive) {
        setErrorMessage('This account is currently deactivated. Please contact Super Admin (Narender@aishnar.com) to reactivate access.');
        setIsLoading(false);
        return;
      }

      // Check password
      const expectedPassword = matchedUser.password || (matchedUser.email.toLowerCase() === 'narender@aishnar.com' ? '#Narender0077' : 'Aishnar@2026');
      if (password !== expectedPassword) {
        setErrorMessage('Invalid password. Please check your credentials.');
        setIsLoading(false);
        return;
      }

      // Successful login
      onLogin(matchedUser);
      setIsLoading(false);
    }, 300);
  };

  const handleQuickFill = (fillEmail: string, fillPass: string) => {
    setEmail(fillEmail);
    setPassword(fillPass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-[#f5f5f7] dark:bg-[#000000] p-4 select-none transition-colors">
      <div className="w-full max-w-sm space-y-6 animate-in fade-in duration-300">
        {/* Brand Header - Apple Minimalist */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 text-white dark:text-slate-950 font-bold text-sm tracking-tight shadow-md ring-1 ring-black/5 dark:ring-white/10 mb-1">
            AD
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Aishnar Digital-ERP
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
            Enterprise Operations & License Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="apple-glass apple-card rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              Sign In
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              SECURE
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-500 font-medium mb-1 text-[11px]">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="Narender@aishnar.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none text-xs transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-medium mb-1 text-[11px]">
                Password
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none text-xs transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 disabled:opacity-50 text-white dark:text-slate-950 font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 text-xs hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] space-y-2">
            <div className="text-[10px] text-slate-400 font-medium text-center uppercase tracking-wider">
              1-Click Demo Accounts
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFill('Narender@aishnar.com', '#Narender0077')}
                className="p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] text-left transition-colors border border-black/[0.04] dark:border-white/[0.06]"
              >
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>Super Admin</span>
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 truncate">Narender@aishnar.com</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('vikram@aishnar.com', 'Vikram@2026')}
                className="p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] text-left transition-colors border border-black/[0.04] dark:border-white/[0.06]"
              >
                <div className="font-semibold text-slate-900 dark:text-white">Sales Admin</div>
                <div className="text-[10px] text-slate-400 truncate">vikram@aishnar.com</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('rohit@aishnar.com', 'Rohit@2026')}
                className="p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] text-left transition-colors border border-black/[0.04] dark:border-white/[0.06]"
              >
                <div className="font-semibold text-slate-900 dark:text-white">Staff Engineer</div>
                <div className="text-[10px] text-slate-400 truncate">rohit@aishnar.com</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('ananya@apexfinancial.com', 'Apex@2026')}
                className="p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] text-left transition-colors border border-black/[0.04] dark:border-white/[0.06]"
              >
                <div className="font-semibold text-slate-900 dark:text-white">Client Portal</div>
                <div className="text-[10px] text-slate-400 truncate">ananya@apexfinancial.com</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-slate-400">
          Aishnar Digital Technologies · Enterprise Platform
        </div>
      </div>
    </div>
  );
};
