import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Sparkles
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
        setErrorMessage('This account is currently deactivated. Please contact your Super Admin (Narender@aishnar.com) to reactivate your access.');
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
    }, 400);
  };

  const handleQuickFill = (fillEmail: string, fillPass: string) => {
    setEmail(fillEmail);
    setPassword(fillPass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950 p-4 select-none">
      <div className="w-full max-w-md space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold text-xl shadow-lg shadow-emerald-600/20 mb-2">
            AD
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Aishnar Digital-ERP
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enterprise Operations & SaaS License Management
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Secure Sign In
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              PROTECTED
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="Narender@aishnar.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 text-xs"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In to ERP'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="text-[11px] text-slate-400 font-medium text-center">
              Verified Enterprise Accounts:
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFill('Narender@aishnar.com', '#Narender0077')}
                className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100 text-left transition-colors"
              >
                <div className="font-bold flex items-center gap-1">
                  <span>👑 Super Admin</span>
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 truncate">Narender@aishnar.com</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('vikram@aishnar.com', 'Vikram@2026')}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 text-left transition-colors"
              >
                <div className="font-bold">💼 Sales Admin</div>
                <div className="text-[10px] text-slate-500 truncate">vikram@aishnar.com</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('rohit@aishnar.com', 'Rohit@2026')}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 text-left transition-colors"
              >
                <div className="font-bold">⚡ Staff Engineer</div>
                <div className="text-[10px] text-slate-500 truncate">rohit@aishnar.com</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('ananya@apexfinancial.com', 'Apex@2026')}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 text-left transition-colors"
              >
                <div className="font-bold">🏢 Client Portal</div>
                <div className="text-[10px] text-slate-500 truncate">ananya@apexfinancial.com</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-400">
          Aishnar Digital Technologies · Enterprise Cloud v2.6
        </div>
      </div>
    </div>
  );
};
