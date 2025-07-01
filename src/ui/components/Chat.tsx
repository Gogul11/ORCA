import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";

interface Message {
  id: string;
  sender: string;
  content: string;
  isSelf: boolean;
}

interface ChatSidebarProps {
  username: string;
  messages: Message[];
  onSend: (message: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ username, messages, onSend }) => {
  const [input, setInput] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-sidebar">
      <div className="chat-header">💬 Chat</div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.isSelf ? "self" : "other"}`}
          >
            {!msg.isSelf && <div className="sender">{msg.sender}</div>}
            <div className="content">{msg.content}</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
};

export default ChatSidebar;
