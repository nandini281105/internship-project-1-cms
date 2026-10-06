import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, Clock, Reply, Inbox, Eye } from 'lucide-react';
import {
  getMessagesApi,
  markMessageReadApi,
  deleteMessageApi,
} from '../lib/api/adminApi';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await getMessagesApi();
      setMessages(res.data || []);
      if (res.data?.length > 0 && !selectedMessage) {
        setSelectedMessage(res.data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSelect = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      try {
        await markMessageReadApi(msg.id, true);
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleRead = async (msg, e) => {
    e.stopPropagation();
    try {
      const nextRead = !msg.read;
      await markMessageReadApi(msg.id, nextRead);
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: nextRead } : m))
      );
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage((prev) => ({ ...prev, read: nextRead }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this message?')) {
      try {
        await deleteMessageApi(id);
        const filtered = messages.filter((m) => m.id !== id);
        setMessages(filtered);
        if (selectedMessage?.id === id) {
          setSelectedMessage(filtered[0] || null);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to delete message');
      }
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Contact Form Inquiries</h2>
          <p className="text-xs text-slate-400">View and respond to client messages submitted from your portfolio</p>
        </div>
      </div>

      {loading ? (
        <div className="text-slate-400 py-8">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-slate-900 border border-slate-800">
          <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No inquiries yet</h3>
          <p className="text-xs text-slate-400 mt-1">
            When visitors send messages via the portfolio contact form, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden min-h-[600px]">
          {/* Message List */}
          <div className="lg:col-span-5 border-r border-slate-800 divide-y divide-slate-800/80 overflow-y-auto max-h-[650px]">
            {messages.map((m) => (
              <div
                key={m.id}
                onClick={() => handleSelect(m)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedMessage?.id === m.id
                    ? 'bg-slate-800/80 border-l-4 border-indigo-500'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={`text-sm font-semibold truncate ${
                      !m.read ? 'text-white font-bold' : 'text-slate-300'
                    }`}
                  >
                    {m.name}
                  </span>
                  <span className="text-[10px] text-slate-500 shrink-0">
                    {new Date(m.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-xs truncate ${
                      !m.read ? 'text-indigo-400 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {m.subject || 'No Subject'}
                  </p>
                  {!m.read && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                  )}
                </div>

                <p className="text-xs text-slate-500 truncate mt-1">{m.message}</p>
              </div>
            ))}
          </div>

          {/* Message Reader */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            {selectedMessage ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {selectedMessage.subject || 'New Contact Inquiry'}
                    </h3>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="font-semibold text-slate-200">
                        From: {selectedMessage.name}
                      </span>
                      <span>&lt;{selectedMessage.email}&gt;</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                        selectedMessage.subject || 'Portfolio Inquiry'
                      )}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </a>
                    <button
                      onClick={(e) => handleToggleRead(selectedMessage, e)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                    >
                      {selectedMessage.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={(e) => handleDelete(selectedMessage.id, e)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
            ) : (
              <div className="text-center py-24 text-slate-500 text-sm">
                Select an inquiry from the left to read its full message.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
