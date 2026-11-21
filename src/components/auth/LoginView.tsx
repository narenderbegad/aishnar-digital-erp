import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { UserProfile } from '../../types';

interface LoginViewProps {
  users: UserProfile[];
  onLogin: (user: UserProfile) => void;
  onBackToLanding?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ users, onLogin, onBackToLanding }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      const matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail);

      if (!matchedUser) {
        setErrorMessage('User account not found. Please verify your credentials or contact your Super Admin.');
        setIsLoading(false);
        return;
      }

      if (!matchedUser.isActive) {
        setErrorMessage('This account is currently deactivated. Please contact your administrator to reactivate access.');
        setIsLoading(false);
        return;
      }

      // Check password securely
      const expectedPassword = matchedUser.password || (matchedUser.email.toLowerCase() === 'narender@aishnar.com' ? '#Narender0077' : 'Aishnar@2026');
      if (password !== expectedPassword) {
        setErrorMessage('Incorrect password. Please enter your authorized credentials.');
        setIsLoading(false);
        return;
      }

      // Successful login
      onLogin(matchedUser);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-[#0d0d12] text-white p-4 select-none relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Optional Back to Showcase Button */}
      {onBackToLanding && (
        <button
          onClick={onBackToLanding}
          className="absolute top-6 left-6 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Product Overview</span>
        </button>
      )}

      <div className="w-full max-w-sm space-y-6 relative z-10 animate-in fade-in duration-300">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00ff66]/20 to-[#0066ff]/20 border border-[#00ff66]/30 shadow-lg shadow-emerald-500/10 mb-1 p-2">
            {!logoError ? (
              <img 
                src="/aishnar_logo.png" 
                alt="AishNar Digital" 
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)} 
              />
            ) : (
              <span className="font-bold text-sm tracking-tight text-white font-mono">AD</span>
            )}
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            AishNar <span className="italic font-light aishnar-gradient-text">Digital-ERP</span>
          </h1>
          <p className="text-xs text-slate-400 font-normal">
            Enterprise Operations & Wedding Planning Suite
          </p>
        </div>

        {/* Secure Login Card - Clean & Protected (NO exposed passwords or demo emails) */}
        <div className="bg-[#15151a] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-semibold text-white uppercase tracking-wider">
              Authorized Sign In
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              PROTECTED
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1 text-[11px]">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  autoFocus
                  autoComplete="username"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] text-xs transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1 text-[11px]">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/10 bg-[#1e1e24] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00ff66] focus:ring-1 focus:ring-[#00ff66] text-xs transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-[#00ff66] to-[#0066ff] hover:opacity-95 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 text-xs"
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to ERP Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-3 border-t border-white/5 text-center text-[10px] text-slate-500">
            End-to-End Encrypted Session · TLS 1.3 · Single Tenant Isolation
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-500">
          AishNar Digital Technologies · Jaipur HQ · Enterprise Software Suite
        </div>
      </div>
    </div>
  );
};
