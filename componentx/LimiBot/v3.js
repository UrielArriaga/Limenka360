import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ChatComponent = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };
      setMessages([...messages, newMessage]);
      setInput("");

      try {
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, sender: "ai" },
        ]);
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContainer>
      <ChatButton onClick={toggleChat}>Chat con IA</ChatButton>

      {isOpen && (
        <ChatWindow>
          <ChatMessages ref={chatWindowRef}>
            {messages.map((message, index) => (
              <ChatMessage key={index} sender={message.sender}>
                {message.text}
              </ChatMessage>
            ))}
          </ChatMessages>

          <ChatInputContainer>
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
            <SendButton onClick={sendMessage}>Enviar</SendButton>
          </ChatInputContainer>
        </ChatWindow>
      )}
    </ChatContainer>
  );
};

// Estilos usando styled-components
const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const ChatButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ChatWindow = styled.div`
  width: 300px;
  height: 400px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
`;

const ChatMessage = styled.div`
  background-color: ${(props) =>
    props.sender === "user" ? "#e0f7fa" : "#f0f0f0"};
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 5px;
  align-self: ${(props) =>
    props.sender === "user" ? "flex-end" : "flex-start"};
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 5px;
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default ChatComponent;
