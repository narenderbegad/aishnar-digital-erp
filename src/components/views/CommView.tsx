import React, { useState } from 'react';
import { 
  Send, 
  Hash, 
  PhoneCall, 
  CheckCheck, 
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
    }, 1000);
  };

  const channelMessages = state.messages.filter(m => m.channelId === activeChannel);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl">
      {/* Left Chat Window (8 cols) */}
      <div className="lg:col-span-8 apple-card rounded-2xl flex flex-col h-[620px] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Hash className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                #{activeChannel}
              </h3>
              <p className="text-[11px] text-slate-400">
                Team broadcast & delivery channel
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 p-1 bg-black/[0.03] dark:bg-white/[0.05] rounded-xl text-xs select-none">
            {['general-announcements', 'engineering-ops', 'saas-growth'].map((ch) => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all ${
                  activeChannel === ch
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
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
              No messages in this channel yet. Post an update!
            </div>
          ) : (
            channelMessages.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center text-[10px] shrink-0">
                  {msg.senderName.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      {msg.senderName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-700 dark:text-slate-300 bg-black/[0.02] dark:bg-white/[0.03] p-3 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] inline-block max-w-xl">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-black/[0.04] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.01] flex items-center space-x-2">
          <input
            type="text"
            placeholder={`Message #${activeChannel}...`}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 text-xs p-2.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
          />
          <button
            type="submit"
            className="p-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Right WhatsApp API Broadcaster (4 cols) */}
      <div className="lg:col-span-4 apple-card rounded-2xl p-5 space-y-4 h-fit">
        <div className="flex items-center space-x-2.5 pb-3 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
              WhatsApp Cloud CRM
            </h3>
            <p className="text-[11px] text-slate-400">Automated Meta notification dispatch</p>
          </div>
        </div>

        <form onSubmit={handleSendWhatsAppNotification} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-500 mb-1 font-medium text-[11px]">Client Phone (E.164)</label>
            <input
              type="text"
              value={whatsappPhone}
              onChange={(e) => setWhatsappPhone(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-1 font-medium text-[11px]">Approved Meta Template</label>
            <select
              value={whatsappTemplate}
              onChange={(e) => setWhatsappTemplate(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none"
            >
              <option value="license_activated">license_activated (Key + Portal URL)</option>
              <option value="daily_duty_reminder">daily_duty_reminder (SOP Checkpoints)</option>
              <option value="invoice_generated">invoice_generated (GST Tax Invoice)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Send WhatsApp Dispatch</span>
          </button>
        </form>

        {whatsappStatus && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[11px] animate-in fade-in">
            {whatsappStatus}
          </div>
        )}
      </div>
    </div>
  );
};
