import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { sendMessage, getHistory, clearHistory } from './services/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load history on mount
  useEffect(() => {
    fetchHistory(true);
  }, []);

  const fetchHistory = async (isInitialLoad = false) => {
    try {
      const data = await getHistory();
      const historyData = data.history || [];
      setHistory(historyData);
      // Only overwrite active messages with history during initial load
      // This prevents the UI from "resetting" while waiting for an AI response
      if (isInitialLoad) {
        setMessages(historyData);
      }
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const messageText = input;
    const userMessage = { role: 'user', content: messageText };
    
    // Clear input and show user message immediately
    setInput('');
    // Use a function update to ensure we have the most recent messages state
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const data = await sendMessage(messageText);
      
      // The API should return the AI's response text
      if (data && data.response) {
        const aiMessage = { role: 'assistant', content: data.response };
        setMessages(prev => [...prev, aiMessage]);
        // Refresh sidebar history (it will now contain user + assistant)
        fetchHistory(false);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error connecting to the AI service. Please check your connection and try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
  };

  const handleClearHistory = async () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      try {
        await clearHistory();
        setMessages([]);
        setHistory([]);
      } catch (error) {
        console.error('Failed to clear history:', error);
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-chat-bg">
      <Sidebar 
        history={history} 
        onNewChat={handleNewChat} 
        onClearHistory={handleClearHistory} 
      />
      <ChatWindow 
        messages={messages} 
        input={input} 
        setInput={setInput} 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
