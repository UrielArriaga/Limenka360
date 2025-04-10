import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { Send, AccountCircle, ChatBubble } from "@material-ui/icons";
import { CircularProgress, IconButton } from "@material-ui/core";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const simulateAIResponse = (userMessage) => {
    setLoading(true);
    setTimeout(() => {
      const aiResponse = `IA: Recibí tu mensaje: "${userMessage}". ¡Gracias!`;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, sender: "ai" },
      ]);
      setLoading(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      simulateAIResponse(input);
      setInput("");
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <FloatingButton onClick={toggleChat}>
        <ChatBubble />
      </FloatingButton>
      <ChatContainer isOpen={isChatOpen}>
        <MessagesContainer>
          {messages.map((message, index) => (
            <Message key={index} isUser={message.sender === "user"}>
              <Avatar isUser={message.sender === "user"}>
                <AccountCircle />
              </Avatar>
              <MessageText>{message.text}</MessageText>
            </Message>
          ))}
          {loading && <Loading>La IA está respondiendo...</Loading>}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        <InputContainer>
          <InputField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
          />
          <SendButton onClick={handleSendMessage} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : <Send />}
          </SendButton>
        </InputContainer>
        <CloseButton onClick={toggleChat}>Cerrar</CloseButton>
      </ChatContainer>
    </>
  );
};

export default AIChat;

// Estilos
const FloatingButton = styled(IconButton)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #2196f3;
  color: white;
  z-index: 1000;
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: #f4f4f8;
  border-radius: 8px;
  overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  z-index: 1000;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  background-color: ${({ isUser }) => (isUser ? "#dcf8c6" : "#ffffff")};
  padding: 8px;
  border-radius: 8px;
  max-width: 70%;
`;

const Avatar = styled.div`
  margin-right: 8px;
  color: ${({ isUser }) => (isUser ? "#4caf50" : "#2196f3")};
`;

const MessageText = styled.div`
  font-size: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
`;

const InputField = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-right: 8px;
`;

const SendButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: #90caf9;
    cursor: not-allowed;
  }
`;

const Loading = styled.div`
  font-style: italic;
  color: #777;
  text-align: center;
  margin-top: 8px;
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;
