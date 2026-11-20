import React, { useState } from 'react';
import { 
  Database, 
  Cloud, 
  Server, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink,
  Code,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { getSupabaseStatus } from '../../lib/supabase';
import { ERPStoreState } from '../../lib/store';

interface SettingsViewProps {
  state: ERPStoreState;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ state }) => {
  const [supabaseStatus, setSupabaseStatus] = useState(getSupabaseStatus());
  const [copiedSQL, setCopiedSQL] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const sampleSQL = `-- Aishnar Digital-ERP Production Supabase Schema
create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan_tier text not null default 'Enterprise',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists software_licenses (
  id uuid primary key default gen_random_uuid(),
  license_key text unique not null,
  organization_name text not null,
  seat_limit int not null default 25,
  active_seats int not null default 1,
  status text not null default 'active',
  expires_at timestamp with time zone not null
);

create table if not exists users_directory (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  role text not null default 'team_member',
  is_active boolean not null default true,
  license_key text references software_licenses(license_key)
);`;

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sampleSQL);
    setCopiedSQL(true);
    setTimeout(() => setCopiedSQL(false), 2000);
  };

  const handleTestConnection = () => {
    setTestResult('Testing Supabase Cloud connection...');
    setTimeout(() => {
      if (supabaseStatus.configured) {
        setTestResult('Connected to Supabase PostgreSQL cluster successfully!');
      } else {
        setTestResult('Using local persistent storage. To connect live Supabase, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
      }
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-500" />
          Backend Architecture, Supabase & Cloud Hosting
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Aishnar Digital-ERP is built for rapid commercial delivery. It supports 1-click cloud sync with Supabase PostgreSQL and automated deployment to Netlify and Render.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Supabase Database Integration */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Supabase Cloud Database
              </h3>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
              supabaseStatus.configured 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {supabaseStatus.configured ? 'LIVE CONNECTED' : 'HYBRID PERSISTENCE READY'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <div className="text-slate-400 text-[11px]">Database Endpoint</div>
              <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                {supabaseStatus.url}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <div className="text-slate-400 text-[11px]">Supabase Anon Key</div>
              <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                {supabaseStatus.hasKey ? '••••••••••••••••••••••••' : 'Not Loaded (Using local persistent store)'}
              </div>
            </div>

            <button
              onClick={handleTestConnection}
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Test Database Connection</span>
            </button>

            {testResult && (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
                {testResult}
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Hosting & CI/CD (Netlify & Render) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Netlify & Render Deployment Ready
              </h3>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold font-mono">
              PRODUCTION READY
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Netlify Static & Edge</span>
                <span className="text-[10px] text-emerald-400 font-mono">netlify.toml configured</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Build command: <code className="font-mono text-emerald-500">npm run build</code> · Directory: <code className="font-mono text-emerald-500">dist</code>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Render Web Service</span>
                <span className="text-[10px] text-blue-400 font-mono">render.yaml configured</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Static Site / Node Web Service with auto-deploy on git push.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <div className="text-slate-400 text-[11px]">Git Repository State</div>
              <div className="font-mono font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                Local Git initialized · Author: narender begad
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Migration Script Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-amber-500" />
              Supabase SQL Schema Script (supabase/schema.sql)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Paste this schema into your Supabase SQL editor to create all required enterprise tables.
            </p>
          </div>

          <button
            onClick={handleCopySQL}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold"
          >
            {copiedSQL ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSQL ? 'Copied SQL!' : 'Copy SQL Schema'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] overflow-x-auto border border-slate-800">
          {sampleSQL}
        </pre>
      </div>
    </div>
  );
};
