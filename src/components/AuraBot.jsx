import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import './AuraBot.css';

const GEN_Z_RESPONSES = [
  "Bet! Let's break this down, no cap. Think of it in 3 steps: input, process, output.",
  "You're literally cooking right now. Keep this streak going! 🔥",
  "W progress! The answer is lowkey right in front of you. Check the core theorem.",
  "That's valid. Honestly, think about it like this: memory and speed are always a tradeoff.",
  "Big brain energy! Let's conquer this topic before the timer ends.",
  "I gotchu bestie. Here's the tea: active practice beats passive reading every single time ☕",
  "It's giving straight A's! Keep focusing on the subtasks.",
];

const AuraBot = ({ isWidget = false, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey bestie ✨ I'm Aura, your AI study buddy. What are we grinding today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = GEN_Z_RESPONSES[Math.floor(Math.random() * GEN_Z_RESPONSES.length)];
      setMessages(prev => [...prev, { id: Date.now() + 1, text: randomResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className={`aura-container ${isWidget ? 'widget-mode' : ''}`}>
      <div className="aura-header">
        <div className="aura-avatar">
          <Sparkles size={20} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="text-lg font-bold">Aura Bot ✨</h2>
          <p className="text-xs opacity-70">Always serving knowledge</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="icon-btn"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
            aria-label="Close Aura Bot"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="messages-list">
        {messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.sender}`}>
            <div className="message-text">
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="message-bubble bot typing">
              <div className="message-text">... typing ...</div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSend}>
        <input 
          type="text" 
          placeholder="Spill the questions..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="primary send-btn">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default AuraBot;
