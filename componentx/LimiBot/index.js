import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Close,
  ChatBubbleOutline,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";
import { IconButton, TextField } from "@material-ui/core";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false, // This line is important for Lottie since it often relies on browser APIs
});

import animation from "../../assets/Limi/bot.json";

const ChatBot = ({
  apiUrl,
  initialMessage = "¡Hola! Soy limiBot tu asistente de ia. ¿En qué puedo ayudarte hoy?",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { text: initialMessage, sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [showAnimationPopup, setshowAnimationPopup] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();
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

  const handleShowAnimationPopup = () => {
    setshowAnimationPopup(!showAnimationPopup);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Variantes de animación
  const chatWindowVariants = {
    open: {
      height: 500,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    minimized: {
      height: 60,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const lottieVariants = {
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    hidden: {
      scale: 0.5,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <ChatContainer>
      <AnimatePresence>
        {isOpen ? (
          <ChatWindow
            key="chat-window"
            variants={chatWindowVariants}
            initial="closed"
            animate={isMinimized ? "minimized" : "open"}
            exit="closed"
          >
            <ChatHeader>
              <h3>LimiBot</h3>
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
                    <Message
                      key={index}
                      sender={message.sender}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
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

                <ChatInput
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send />
                  </SendButton>
                </ChatInput>
              </>
            )}
          </ChatWindow>
        ) : (
          <LottiContainer
            key="lottie-button"
            variants={lottieVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            onClick={toggleChat}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              zIndex: 1000,
              cursor: "pointer",
            }}
          >
            {showAnimationPopup && (
              <PopupCloud
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      type: "spring",
                      damping: 10,
                      stiffness: 100,
                    },
                  },
                  exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
                }}
              >
                <p>Tienes nuevas sugerencias s</p>
              </PopupCloud>
            )}

            <Lottie
              className="lottie"
              animationData={animation}
              loop={true}
              style={{
                width: "200px",
                height: "200px",
              }}
            />
          </LottiContainer>
        )}
      </AnimatePresence>
      {/* 
      <button
        style={{
          marginTop: 1000,
        }}
        onClick={() => {
          handleShowAnimationPopup();
        }}
      >
        click me{" "}
      </button> */}
    </ChatContainer>
  );
};

// Estilos actualizados para trabajar con Framer Motion
const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
`;

const ChatWindow = styled(motion.div)`
  width: 450px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 15px;
  will-change: transform, height;
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

const Message = styled(motion.div)`
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

const ChatInput = styled(motion.div)`
  display: flex;
  padding: 12px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
  align-items: center;
  gap: 8px;
`;

const SendButton = styled(motion.button)`
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

const LottiContainer = styled(motion.div)`
  .cloudofthinking {
    position: absolute;
    top: -80px;

    left: -30px;
    height: 100px;
    width: 150px;

    background-color: white;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 12px;
  }
`;

const PopupCloud = styled(motion.div)`
  position: absolute;
  top: -80px;
  left: -30px;
  width: 150px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #333;
  font-weight: bold;
  padding: 10px;
`;

export default ChatBot;
