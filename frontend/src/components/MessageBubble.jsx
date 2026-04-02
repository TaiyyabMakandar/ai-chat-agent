import React from 'react';
import { User, Bot } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600 ml-3' : 'bg-emerald-600 mr-3'}`}>
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isUser ? 'bg-chat-user-bubble text-white rounded-tr-none' : 'bg-chat-ai-bubble border border-gray-700 text-gray-200 rounded-tl-none'}`}>
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
