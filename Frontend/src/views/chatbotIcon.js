import React, { useState } from 'react';
import './chatbotIcon.css';
import ChatbotComponent from './chatbot';
import './chatbot.js';

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot-icon ${isOpen ? 'active' : ''}`} onClick={toggleChatbot}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9 9h6M9 12h.01M9 15h6"></path>
      </svg>
      {isOpen && <ChatbotComponent onClose={toggleChatbot} />}
    </div>
  );
};

export default ChatbotIcon;
