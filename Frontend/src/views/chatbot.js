import React, { useState, useEffect } from 'react';
import './chatbot.css';

const ChatbotComponent = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user') {
      setTimeout(() => {
        const botMessage = {
          sender: 'bot',
          text: getBotResponse(lastMessage.text),
        };
        setMessages([...messages, botMessage]);
      }, 1000);
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        sender: 'user',
        text: inputText.trim(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const getBotResponse = (userMessage) => {
    switch (userMessage.toLowerCase()) {
      case 'hello':
        return 'Hi there!';
      case 'how are you?':
        return 'I am just a bot, but thanks for asking!';
      case 'what is the purpose of this webapp?':
        return 'The purpose of this webapp is to provide an anonymous platform for reporting crimes to the Indian police force.';
      case 'how does the anonymous reporting feature work?':
        return 'The anonymous reporting feature allows users to submit crime reports without revealing their identity. The webapp ensures that all personal information is kept confidential.';
      case 'who can use this webapp?':
        return 'This webapp is designed for the Indian police force and can be used by authorized personnel for receiving and managing crime reports.';
      case 'is it mandatory to provide personal information while reporting a crime?':
        return 'No, it is not mandatory to provide personal information while reporting a crime. Users have the option to remain anonymous.';
      case 'can i attach evidence or files along with my crime report?':
        return 'Yes, you can attach evidence or files while submitting your crime report. This can help provide additional information to the police for investigation purposes.';
      default:
        return 'I did not understand that. Can you please rephrase?';
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbot-message ${message.sender === 'bot' ? 'bot' : 'user'}`}
          >
            <span className="message-text">{message.text}</span>
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ChatbotComponent;
