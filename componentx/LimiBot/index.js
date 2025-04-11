import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  Send,
  Close,
  ChatBubbleOutline,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";
import { IconButton, TextField } from "@material-ui/core";
import Lottie from "lottie-react";

import animation from "../../assets/Limi/animationbubletwo.json";

const ChatBot = ({
  apiUrl,
  initialMessage = "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { text: initialMessage, sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Simular llamada a la API de IA (reemplazar con tu implementación real)
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      // Agregar respuesta del bot
      setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("Error al conectar con la IA:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Lo siento, hubo un error al procesar tu solicitud. Por favor intenta nuevamente.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainer>
      {isOpen && (
        <ChatWindow isMinimized={isMinimized}>
          <ChatHeader>
            <h3>Asistente Virtual</h3>
            <div>
              <IconButton size="small" onClick={toggleMinimize}>
                {isMinimized ? <ExpandMore /> : <ExpandLess />}
              </IconButton>
              <IconButton size="small" onClick={toggleChat}>
                <Close />
              </IconButton>
            </div>
          </ChatHeader>

          {!isMinimized && (
            <>
              <ChatMessages>
                {messages.map((message, index) => (
                  <Message key={index} sender={message.sender}>
                    {message.text}
                  </Message>
                ))}
                {isLoading && (
                  <Message sender="bot">
                    <TypingIndicator>Escribiendo...</TypingIndicator>
                  </Message>
                )}
                <div ref={messagesEndRef} />
              </ChatMessages>

              <ChatInput>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Escribe tu mensaje..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <SendButton
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send />
                </SendButton>
              </ChatInput>
            </>
          )}
        </ChatWindow>
      )}

      {!isOpen && (
        <Lottie
          onClick={toggleChat}
          className="lottie"
          animationData={animation}
          loop={true}
          style={{
            width: "100px",
            height: "100px",
            position: "absolute",
            bottom: "0",
            right: "0",
            zIndex: 1000,
          }}
        />
      )}
    </ChatContainer>
  );
};

// Estilos
const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  .lottie {
    &:hover {
      cursor: pointer;
      transform: scale(1.5);
      transition: transform 0.3s ease;
    }
  }
`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ isOpen }) => (isOpen ? "#ff3d00" : "#3f51b5")};
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  svg {
    font-size: 24px;
  }
`;

const ChatWindow = styled.div`
  width: 350px;
  height: ${({ isMinimized }) => (isMinimized ? "60px" : "500px")};
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: height 0.3s ease;
  margin-bottom: 15px;
`;

const ChatHeader = styled.div`
  background-color: #3f51b5;
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }

  button {
    color: white;
    padding: 4px;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f5f5f5;
`;

const Message = styled.div`
  max-width: 80%;
  margin-bottom: 12px;
  padding: 10px 14px;
  border-radius: 18px;
  word-wrap: break-word;
  line-height: 1.4;

  ${({ sender }) =>
    sender === "user"
      ? `
    background-color: #3f51b5;
    color: white;
    margin-left: auto;
    border-bottom-right-radius: 4px;
  `
      : `
    background-color: white;
    color: #333;
    margin-right: auto;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  `}
`;

const TypingIndicator = styled.div`
  &:after {
    content: "...";
    display: inline-block;
    animation: typing 1.5s infinite;
    width: 20px;
    overflow: hidden;
    vertical-align: bottom;
  }

  @keyframes typing {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`;

const ChatInput = styled.div`
  display: flex;
  padding: 12px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
  align-items: center;
  gap: 8px;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  color: #3f51b5;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(63, 81, 181, 0.1);
  }

  &:disabled {
    color: #b0bec5;
    cursor: not-allowed;
  }
`;

export default ChatBot;
