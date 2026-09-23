import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import './AuraBot.css';

const GEN_Z_RESPONSES = [
  "Bet! Let's break this down, no cap.",
  "You're literally cooking right now. Keep going!",
  "W progress! The answer is lowkey right in front of you.",
  "That's valid. Honestly, think about it like this...",
  "Big brain energy! Let me explain...",
  "I gotchu bestie. Here's the tea on that topic ☕",
  "It's giving straight A's. Let's look at the formula again.",
];

const AuraBot = ({ isWidget = false }) => {
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
    }, 1500);
  };

  return (
    <div className={`aura-container ${isWidget ? 'widget-mode' : ''}`}>
      <div className="aura-header">
        <div className="aura-avatar">
          <Sparkles size={20} color="white" />
        </div>
        <div>
          <h2 className="text-lg font-bold">Aura Bot ✨</h2>
          <p className="text-xs opacity-70">Always serving knowledge</p>
        </div>
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
