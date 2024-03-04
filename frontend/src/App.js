import React, { useState } from "react";
import Header from "./components/Header/Header";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import ChatWindowHeader from "./components/ChatWindowHeader/ChatWindowHeader";

function App() {
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [pdfText, setPdfText] = useState('');

  const handleTalkButtonClick = () => {
    setShowChatWindow(true);
  };

  const handleFileUpload = (content) => {
    setPdfText(content);
    setShowChatWindow(true);
  };

  return (
    <div>
      <Header onFileUpload={handleFileUpload} />
      {showChatWindow ? <ChatWindow initialMessage={pdfText} /> : <ChatWindowHeader onTalkButtonClick={handleTalkButtonClick} />}
    </div>
  );
}

export default App;