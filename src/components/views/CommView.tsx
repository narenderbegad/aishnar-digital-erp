import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Hash, 
  PhoneCall, 
  Users, 
  Sparkles, 
  CheckCheck, 
  Clock, 
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { ERPStoreState } from '../../lib/store';

interface CommViewProps {
  state: ERPStoreState;
  onUpdateState: (newState: ERPStoreState) => void;
}

export const CommView: React.FC<CommViewProps> = ({ state, onUpdateState }) => {
  const [activeChannel, setActiveChannel] = useState('general-announcements');
  const [messageInput, setMessageInput] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('+91 98200 44112');
  const [whatsappTemplate, setWhatsappTemplate] = useState('license_activated');
  const [whatsappStatus, setWhatsappStatus] = useState<string | null>(null);

  // Send internal chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: activeChannel,
      senderName: state.currentUser.name,
      senderRole: state.currentUser.department,
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onUpdateState({
      ...state,
      messages: [...state.messages, newMsg],
    });

    setMessageInput('');
  };

  // Simulate WhatsApp CRM Broadcast
  const handleSendWhatsAppNotification = (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsappStatus('Dispatching via Meta WhatsApp Business Cloud API...');
    setTimeout(() => {
      setWhatsappStatus(`Template [${whatsappTemplate}] successfully delivered to ${whatsappPhone} with double-tick.`);
      setTimeout(() => setWhatsappStatus(null), 4000);
    }, 1200);
  };

  const channelMessages = state.messages.filter(m => m.channelId === activeChannel);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Chat Window (8 cols) */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col h-[650px] shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
              <Hash className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                #{activeChannel}
              </h3>
              <p className="text-[11px] text-slate-400">
                Official team communication & delivery broadcasts
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {['general-announcements', 'engineering-ops', 'saas-growth'].map((ch) => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                  activeChannel === ch
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300'
                }`}
              >
                #{ch}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {channelMessages.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No messages in this channel yet. Send the first update!
            </div>
          ) : (
            channelMessages.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-slate-600">
                  {msg.senderName.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {msg.senderName}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      {msg.senderRole}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 inline-block max-w-xl">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center space-x-2">
          <input
            type="text"
            placeholder={`Message #${activeChannel}...`}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-md shadow-emerald-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Right: WhatsApp CRM Integration Desk (4 cols) */}
      <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              WhatsApp CRM & Client Gateway
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Meta Cloud API verified sender
          </p>
        </div>

        <form onSubmit={handleSendWhatsAppNotification} className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Client Mobile Number
            </label>
            <input
              type="text"
              value={whatsappPhone}
              onChange={(e) => setWhatsappPhone(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              HSM Notification Template
            </label>
            <select
              value={whatsappTemplate}
              onChange={(e) => setWhatsappTemplate(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="license_activated">Aishnar ERP License Activation Notification</option>
              <option value="sprint_milestone">Sprint Milestone Ready for Signoff</option>
              <option value="invoice_generated">Tax Invoice Available for Download</option>
              <option value="executive_briefing">Executive Daily Briefing Summary</option>
            </select>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-200 block mb-1">Preview Message:</strong>
            "Greetings from Aishnar Digital. Your enterprise ERP license has been successfully activated. License Key: AISH-ENT-2026-HQ01-8890. Tap below to access your portal."
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20"
          >
            Dispatch WhatsApp Notification
          </button>

          {whatsappStatus && (
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] flex items-center gap-1.5 font-medium animate-in fade-in">
              <CheckCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{whatsappStatus}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
