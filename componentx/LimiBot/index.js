import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatContainer, ChatWindow } from "./styles";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInputArea from "./ChatInputArea";
import LottieButton from "./LottieButton";
import animation from "../../assets/Limi/bot.json";
import { chatWindowVariants, lottieVariants } from "./chatAnimations";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";

class LimiBotService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getInitialConversation(ejecutiveId) {
    try {
      let params = {
        where: {
          executiveId: ejecutiveId,
        },
      };

      return await api.get("chats", { params });
    } catch (error) {
      console.error("Error al conectar con la IA:", error);
      throw new Error("Error al conectar con la IA");
    }
  }

  async getMessagesFromChat(id_chat) {
    try {
      let params = {
        where: {
          chatId: id_chat,
        },
      };

      if (!id_chat) {
        throw new Error("No se ha proporcionado un ID de chat válido.");
      }

      return await api.get("chatmessages", { params });
    } catch (error) {
      console.error("Error al conectar con la IA:", error);
      throw new Error("Error al conectar con la IA");
    }
  }

  async postMessageToChat(id_chat, message) {
    try {
      let params = {
        chatId: id_chat,
        content: message,
        role: "user",
      };

      if (!id_chat || !message) {
        throw new Error(
          "No se ha proporcionado un ID de chat o mensaje válido."
        );
      }

      return await api.post("chatmessages", params);
    } catch (error) {
      console.error("Error al conectar con la IA:", error);
      throw new Error("Error al conectar con la IA");
    }
  }

  async askLimiBot(message) {
    return await api.post("playground/limibot", { message });
  }
}

const useLimiBot = () => {
  const service = new LimiBotService();
  const { id_user } = useSelector(userSelector);
  const [messages, setMessages] = useState([
    {
      content:
        "¡Hola! Soy limiBot tu asistente de ia. ¿En qué puedo ayudarte hoy?",
      role: "ia",
    },
  ]);
  useEffect(() => {
    const fetchInitialConversation = async () => {
      try {
        const response = await service.getInitialConversation(id_user);

        if (response.data?.results.length > 0) {
          console.log(response.data?.results[0].id);
          let responseMessages = await service.getMessagesFromChat(
            response?.data?.results[0].id
          );

          const initialMessages = responseMessages.data?.results.map(
            (message) => ({
              content: message.content,
              role: message.role,
            })
          );

          console.log(initialMessages);
          setMessages(initialMessages);
        }
      } catch (error) {
        console.error("Error al obtener la conversación inicial:", error);
      }
    };

    if (id_user) {
      fetchInitialConversation();
    }
  }, [id_user]);

  const handleSendMessage = async (message) => {
    if (!message) {
      console.error("No se ha proporcionado un mensaje válido.");
      return;
    }

    try {
      const response = await service.askLimiBot(message);

      const newMessage = {
        content: response.data.message,
        role: "ia",
      };

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return {
    messages,
    setMessages,
    actions: {
      handleSendMessage,
    },
  };
};

export default function LimiBot() {
  const { messages, setMessages, actions } = useLimiBot();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  // const [messages, setMessages] = useState([
  //   { text: initialMessage, sender: "bot" },
  // ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimationPopup, setShowAnimationPopup] = useState(false);

  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setIsMinimized(false);
  };

  const toggleMinimize = () => setIsMinimized((prev) => !prev);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage = { content: inputValue, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      actions.handleSendMessage(inputValue);
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            <ChatHeader
              isMinimized={isMinimized}
              onToggleMinimize={toggleMinimize}
              onClose={toggleChat}
            />

            {!isMinimized && (
              <>
                <ChatMessages
                  messages={messages}
                  isLoading={isLoading}
                  messagesEndRef={messagesEndRef}
                />
                <ChatInputArea
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  handleSendMessage={handleSendMessage}
                  handleKeyPress={handleKeyPress}
                  isLoading={isLoading}
                />
              </>
            )}
          </ChatWindow>
        ) : (
          <LottieButton
            toggleChat={toggleChat}
            animationData={animation}
            lottieVariants={lottieVariants}
            showPopup={showAnimationPopup}
            popupText="Tienes nuevas sugerencias"
          />
        )}
      </AnimatePresence>
    </ChatContainer>
  );
}

// import React, { useState, useRef, useEffect } from "react";
// import styled from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Send,
//   Close,
//   ChatBubbleOutline,
//   ExpandMore,
//   ExpandLess,
// } from "@material-ui/icons";
// import { IconButton, TextField } from "@material-ui/core";
// import dynamic from "next/dynamic";

// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
// import animation from "../../assets/Limi/bot.json";

// const ChatBot = ({
//   apiUrl,
//   initialMessage = "¡Hola! Soy limiBot tu asistente de ia. ¿En qué puedo ayudarte hoy?",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: initialMessage, sender: "bot" },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showAnimationPopup, setShowAnimationPopup] = useState(false);

//   const messagesEndRef = useRef(null);

//   const toggleChat = () => {
//     setIsOpen((prev) => !prev);
//     if (!isOpen) setIsMinimized(false);
//   };

//   const toggleMinimize = () => setIsMinimized((prev) => !prev);
//   const handleShowAnimationPopup = () => setShowAnimationPopup((prev) => !prev);

//   const handleSendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const userMessage = { text: inputValue, sender: "user" };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");
//     setIsLoading(true);

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: inputValue }),
//       });
//       const data = await response.json();
//       setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
//     } catch (error) {
//       console.error("Error al conectar con la IA:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           text: "Lo siento, hubo un error al procesar tu solicitud. Por favor intenta nuevamente.",
//           sender: "bot",
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const chatWindowVariants = {
//     open: {
//       height: 500,
//       opacity: 1,
//       transition: { type: "spring", damping: 25, stiffness: 300 },
//     },
//     minimized: {
//       height: 60,
//       opacity: 1,
//       transition: { type: "spring", damping: 25, stiffness: 300 },
//     },
//     closed: {
//       height: 0,
//       opacity: 0,
//       transition: { duration: 0.3, ease: "easeInOut" },
//     },
//   };

//   const lottieVariants = {
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: { type: "spring", stiffness: 200, damping: 10 },
//     },
//     hidden: { scale: 0.5, opacity: 0, transition: { duration: 0.2 } },
//     hover: {
//       scale: 1.2,
//       transition: { type: "spring", stiffness: 400, damping: 10 },
//     },
//   };

//   return (
//     <ChatContainer>
//       <AnimatePresence>
//         {isOpen ? (
//           <ChatWindow
//             key="chat-window"
//             variants={chatWindowVariants}
//             initial="closed"
//             animate={isMinimized ? "minimized" : "open"}
//             exit="closed"
//           >
//             <ChatHeader>
//               <h3>LimiBot</h3>
//               <div>
//                 <IconButton size="small" onClick={toggleMinimize}>
//                   {isMinimized ? <ExpandMore /> : <ExpandLess />}
//                 </IconButton>
//                 <IconButton size="small" onClick={toggleChat}>
//                   <Close />
//                 </IconButton>
//               </div>
//             </ChatHeader>

//             {!isMinimized && (
//               <>
//                 <ChatMessages>
//                   {messages.map((msg, i) => (
//                     <Message
//                       key={i}
//                       sender={msg.sender}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {msg.text}
//                     </Message>
//                   ))}
//                   {isLoading && (
//                     <Message sender="bot">
//                       <TypingIndicator>Escribiendo...</TypingIndicator>
//                     </Message>
//                   )}
//                   <div ref={messagesEndRef} />
//                 </ChatMessages>

//                 <ChatInput
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     size="small"
//                     placeholder="Escribe tu mensaje..."
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     disabled={isLoading}
//                   />
//                   <SendButton
//                     onClick={handleSendMessage}
//                     disabled={isLoading || !inputValue.trim()}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Send />
//                   </SendButton>
//                 </ChatInput>
//               </>
//             )}
//           </ChatWindow>
//         ) : (
//           <LottiContainer
//             key="lottie-button"
//             variants={lottieVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             whileHover="hover"
//             onClick={toggleChat}
//             style={{
//               position: "absolute",
//               bottom: 0,
//               right: 0,
//               zIndex: 1000,
//               cursor: "pointer",
//             }}
//           >
//             {showAnimationPopup && (
//               <PopupCloud
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 variants={{
//                   hidden: { opacity: 0, scale: 0.8 },
//                   visible: {
//                     opacity: 1,
//                     scale: 1,
//                     transition: { type: "spring", damping: 10, stiffness: 100 },
//                   },
//                   exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
//                 }}
//               >
//                 <p>Tienes nuevas sugerencias</p>
//               </PopupCloud>
//             )}

//             <Lottie
//               className="lottie"
//               animationData={animation}
//               loop={true}
//               style={{ width: "200px", height: "200px" }}
//             />
//           </LottiContainer>
//         )}
//       </AnimatePresence>
//     </ChatContainer>
//   );
// };

// // Estilos
// const ChatContainer = styled.div`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   z-index: 1000;
//   display: flex;
//   flex-direction: column-reverse;
//   align-items: flex-end;
// `;

// const ChatWindow = styled(motion.div)`
//   width: 450px;
//   background-color: white;
//   border-radius: 12px;
//   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
//   margin-bottom: 15px;
// `;

// const ChatHeader = styled.div`
//   background-color: #3f51b5;
//   color: white;
//   padding: 12px 16px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   h3 {
//     margin: 0;
//     font-size: 16px;
//     font-weight: 500;
//   }
// `;

// const ChatMessages = styled.div`
//   flex: 1;
//   padding: 16px;
//   overflow-y: auto;
//   background-color: #f5f5f5;
// `;

// const Message = styled(motion.div)`
//   max-width: 80%;
//   margin-bottom: 12px;
//   padding: 10px 14px;
//   border-radius: 18px;
//   word-wrap: break-word;
//   line-height: 1.4;
//   ${({ sender }) =>
//     sender === "user"
//       ? `background-color: #3f51b5; color: white; margin-left: auto; border-bottom-right-radius: 4px;`
//       : `background-color: white; color: #333; margin-right: auto; border-bottom-left-radius: 4px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);`}
// `;

// const TypingIndicator = styled.div`
//   &:after {
//     content: "...";
//     display: inline-block;
//     animation: typing 1.5s infinite;
//     width: 20px;
//     overflow: hidden;
//     vertical-align: bottom;
//   }
//   @keyframes typing {
//     0% {
//       content: ".";
//     }
//     33% {
//       content: "..";
//     }
//     66% {
//       content: "...";
//     }
//   }
// `;

// const ChatInput = styled(motion.div)`
//   display: flex;
//   padding: 12px;
//   background-color: white;
//   border-top: 1px solid #e0e0e0;
//   align-items: center;
//   gap: 8px;
// `;

// const SendButton = styled(motion.button)`
//   background: none;
//   border: none;
//   color: #3f51b5;
//   cursor: pointer;
//   padding: 8px;
//   border-radius: 50%;
//   transition: background-color 0.2s;
//   &:hover {
//     background-color: rgba(63, 81, 181, 0.1);
//   }
//   &:disabled {
//     color: #b0bec5;
//     cursor: not-allowed;
//   }
// `;

// const LottiContainer = styled(motion.div)``;

// const PopupCloud = styled(motion.div)`
//   position: absolute;
//   top: -80px;
//   left: -30px;
//   width: 150px;
//   height: 100px;
//   background-color: white;
//   border-radius: 50%;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 12px;
//   color: #333;
//   font-weight: bold;
//   padding: 10px;
// `;

// export default ChatBot;
