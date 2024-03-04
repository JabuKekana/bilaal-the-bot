import React from 'react';
import heroImg from '../../assets/images/chatbot 1-01.png';
import '../ChatWindowHeader/chat-window-header.css';

const ChatWindowHeader = ({ onTalkButtonClick }) => {
  return (
    <div className="header-container">
      <img src={heroImg} className="hero-picture" alt='hero picture'/>
      <button className="talk-button" onClick={onTalkButtonClick}>Talk to me</button>
    </div>
  );
}

export default ChatWindowHeader;
