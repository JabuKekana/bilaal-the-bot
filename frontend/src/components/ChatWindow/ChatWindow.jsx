import React, { useState, useEffect } from 'react';
import defaultIcon from "../../assets/images/chatbot-msg-icon.png";
import * as PDFJS from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "../ChatWindow/chat-window.css";

PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldAutoSend, setShouldAutoSend] = useState(false);
  

  useEffect(() => {
    if (shouldAutoSend && inputText) {
      sendMessage();
      setShouldAutoSend(false); 
    }
  }, [inputText, shouldAutoSend]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const convertPdfToText = async (file) => {
    try {
      setIsLoading(true); 
      setShouldAutoSend(true); 
  
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
  
      let text = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const pageText = await page.getTextContent();
        text += pageText.items.map(item => item.str).join(' ');
      }
  
      
      setInputText(text + "\n\n.SUMMARIZE THE ABOVE TEXT FOR ME");
  

      setSelectedFile(null);
    } catch (error) {
      console.error("Error converting PDF:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  
  
  const handleFileSubmit = () => {
    if (selectedFile) {
      convertPdfToText(selectedFile);
      setSelectedFile(null); 
    } else {
      console.log("No file selected.");
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === "") {
      return;
    }

    const newMessage = {
      text: inputText,
      isUser: true,
    };

    try {
      setIsLoading(true); 
      console.log("Sending request...");
      const response = await fetch("http://localhost:7070/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      if (!response.ok) {
        console.log("Request failed:", response);
        throw new Error("Request failed");
      }

      const data = await response.json();

      const replyMessage = {
        text: data.reply,
        isUser: false,
      };
      setMessages([...messages, newMessage, replyMessage]);
      setInputText("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <div className="container">
        <div className="chatContainer">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`messageBubble ${message.isUser ? "user" : "server"}`}
            >
              {message.isUser ? (
                <p>{message.text}</p>
              ) : (
                <div className="serverMessage">
                  <img src={defaultIcon} alt="Server Icon" className="icon" />
                  <p>{message.text}</p>
                </div>
              )}
            </div>
          ))}
          {/* Only show loading message when isLoading is true */}
          {isLoading && (
            <div className="loadingMessage">
              <p>
                <img src={defaultIcon} alt="loading" className="loadingIcon" />
                Ummh... okay, just give me a moment...
              </p>
            </div>
          )}
        </div>
        <div className="inputContainer">
          <input
            className="textInput"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="sendButton" onClick={sendMessage}>
            Ask
          </button>
        </div>
      </div>
      <div className="footer">
        <label htmlFor="pdfUpload" className="uploadLabel">
          Upload PDF:
        </label>
        <input
          type="file"
          id="pdfUpload"
          accept=".pdf"
          onChange={handleFileChange}
        />
        {selectedFile && (
          <div>
            <p>Selected file: {selectedFile.name}</p>
            <button className="submitButton" onClick={handleFileSubmit}>
              Convert and Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
