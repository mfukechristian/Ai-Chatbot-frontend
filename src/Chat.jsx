import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const apiUrl = "https://ai-chat-backend.onrender.com/api/chat";
      const result = await axios.post(apiUrl, { message: inputText });
      const newMessage = { text: inputText, response: result.data.response };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText(""); // Clear the input field
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to the bottom when a new response is received
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-container" id="chat-container">
      {/* Display Previous Messages */}
      {messages.map((message, index) => (
        <div key={index} className="message">
          <div className="user-message">{message.text}</div>
          <div className="response">{message.response}</div>
        </div>
      ))}

      {/* Input and Loading */}
      <div className="input-container">
        {loading && <div className="loader"></div>}
        <div className="input">
          <input
            type="text"
            value={inputText}
            placeholder="Enter a request"
            onChange={(e) => setInputText(e.target.value)}
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
