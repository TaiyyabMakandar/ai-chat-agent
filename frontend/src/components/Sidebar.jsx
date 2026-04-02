import React from 'react';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';

const Sidebar = ({ history, onNewChat, onClearHistory }) => {
  return (
    <div className="w-64 bg-chat-sidebar h-screen flex flex-col border-r border-gray-800 transition-all duration-300 ease-in-out overflow-hidden md:w-72 lg:w-80">
      <div className="p-4">
        <button 
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white bg-transparent border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">History</h3>
        {history.length === 0 ? (
          <p className="px-4 text-sm text-gray-500 italic">No history yet</p>
        ) : (
          <div className="space-y-1">
            {/* Grouping by date could be added here, but for now just show messages */}
            {history.filter(m => m.role === 'user').slice(-10).reverse().map((msg, idx) => (
              <div 
                key={idx}
                className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-300 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors overflow-hidden"
              >
                <MessageSquare size={16} className="flex-shrink-0" />
                <span className="truncate">{msg.content}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={onClearHistory}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 size={18} />
          Clear History
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
