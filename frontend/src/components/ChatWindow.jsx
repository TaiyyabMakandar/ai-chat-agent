import React, { useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import MessageBubble from './MessageBubble';

const ChatWindow = ({ messages, input, setInput, onSendMessage, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log("ChatWindow Rendering:", { messagesCount: messages.length, isLoading });
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-chat-bg relative overflow-hidden transition-all duration-300 ease-in-out">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center px-6 sticky top-0 bg-chat-bg/80 backdrop-blur-md z-10">
        <h2 className="text-lg font-semibold text-white">AI Chat Assistant</h2>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-20 lg:px-44 py-8">
        {messages.length === 0 && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 select-none">
            <h1 className="text-4xl font-bold mb-4">How can I help you today?</h1>
            <p className="max-w-md text-sm">Ask me anything, I'm here to assist you with your queries and tasks.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}

        {isLoading && (
            <div className="flex justify-start mb-6">
                <div className="flex bg-chat-ai-bubble border border-gray-700 px-4 py-3 rounded-2xl rounded-tl-none items-center gap-2">
                    <Loader2 size={18} className="animate-spin text-emerald-500" />
                    <span className="text-sm text-gray-400">Thinking...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:px-20 lg:px-44 bg-gradient-to-t from-chat-bg via-chat-bg to-transparent">
        <form 
          onSubmit={handleSubmit}
          className="relative max-w-4xl mx-auto"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI Chat Agent..."
            className="w-full bg-chat-user-bubble text-white text-sm rounded-2xl px-6 py-4 pr-16 focus:outline-none ring-1 ring-gray-700 focus:ring-emerald-500 transition-all shadow-xl"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
              !input.trim() || isLoading 
                ? 'text-gray-600 bg-transparent' 
                : 'text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg'
            }`}
          >
            <Send size={20} />
          </button>
        </form>
        <p className="text-[10px] text-gray-500 text-center mt-3 select-none">
          AI Agent may provide inaccurate information. Check important info.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
