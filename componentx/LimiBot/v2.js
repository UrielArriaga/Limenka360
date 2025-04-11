import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton, TextField } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";

const FloatingButton = styled(IconButton)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #3f51b5;
  color: white;
  z-index: 1000;
  &:hover {
    background-color: #303f9f;
  }
`;

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  height: 420px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background: #3f51b5;
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  background: #f5f5f5;
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 8px;
  border-top: 1px solid #ddd;
`;

const MessageBubble = styled.div`
  max-width: 75%;
  margin-bottom: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  background-color: ${({ from }) => (from === "user" ? "#e3f2fd" : "#eeeeee")};
  align-self: ${({ from }) => (from === "user" ? "flex-end" : "flex-start")};
`;

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "¡Hola! ¿En qué puedo ayudarte?" },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simula respuesta IA (aquí va tu integración real)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Estoy procesando tu solicitud..." },
      ]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>
              <span>Asistente IA</span>
              <IconButton
                onClick={() => setIsOpen(false)}
                style={{ color: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </ChatHeader>

            <ChatMessages>
              {messages.map((msg, index) => (
                <MessageBubble key={index} from={msg.from}>
                  {msg.text}
                </MessageBubble>
              ))}
            </ChatMessages>

            <ChatInputContainer>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <IconButton onClick={handleSend} color="primary">
                <SendIcon />
              </IconButton>
            </ChatInputContainer>
          </ChatContainer>
        )}
      </AnimatePresence>

      {!isOpen && (
        <FloatingButton onClick={() => setIsOpen(true)}>
          <ChatIcon />
        </FloatingButton>
      )}
    </>
  );
}
