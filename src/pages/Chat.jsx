import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, BookOpen, Brain, ListChecks } from 'lucide-react';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Alex! I am your Focus Flow AI Assistant. How can I help you study today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      let aiText = "I can certainly help you with that! Let's break it down into smaller, easy-to-understand parts.";
      
      if (userMsg.text.toLowerCase().includes('normalization')) {
        aiText = "Let's break normalization into three simple ideas:\n\n1. **1NF**: Eliminate repeating groups (atomicity).\n2. **2NF**: Eliminate partial dependencies (everything depends on the whole primary key).\n3. **3NF**: Eliminate transitive dependencies (no non-key attribute depends on another non-key attribute).";
      }

      setMessages(prev => [...prev, { id: Date.now(), sender: 'ai', text: aiText }]);
    }, 1000);
  };

  const handleQuickAction = (action) => {
    setInput(action);
    // document.querySelector('.chat-input').focus();
  };

  return (
    <div className="chat-container fade-in">
      <header className="mb-4">
        <h1 className="flex items-center gap-2">
          <Bot className="text-primary" size={32} /> AI Study Assistant
        </h1>
        <p className="text-muted">Get explanations, practice questions, and study plans.</p>
      </header>

      <div className="chat-layout">
        <div className="chat-main glass-panel">
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'ai' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className="message-content">
                  <span className="sender-name">{msg.sender === 'ai' ? 'Focus AI' : 'You'}</span>
                  <div className="text" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="quick-actions mb-3">
              <button onClick={() => handleQuickAction('Explain simply: ')} className="quick-btn">
                <Sparkles size={14} /> Explain Simply
              </button>
              <button onClick={() => handleQuickAction('Give me an example of: ')} className="quick-btn">
                <BookOpen size={14} /> Give Example
              </button>
              <button onClick={() => handleQuickAction('Create a practice quiz for: ')} className="quick-btn">
                <Brain size={14} /> Create Quiz
              </button>
              <button onClick={() => handleQuickAction('Make a study plan for: ')} className="quick-btn">
                <ListChecks size={14} /> Make Study Plan
              </button>
            </div>
            
            <form onSubmit={handleSend} className="input-form">
              <input
                type="text"
                className="chat-input"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="send-btn primary" disabled={!input.trim()}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
