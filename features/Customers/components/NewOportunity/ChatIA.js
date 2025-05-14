import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../../../services/api";

export default function ChatIA({ prospectSelected }) {
  console.log(prospectSelected);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "¡Hola! Soy tu asistente de Limenka360  ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const fakeAIResponse = async (userMessage) => {
    try {
      let resp = await api.post("test", {
        message: userMessage,
        prospectData: prospectSelected,
      });
      return resp.data.message;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const response = await fakeAIResponse(input);

    setMessages((prev) => [...prev, { role: "ai", content: response }]);
    setIsTyping(false);
  };

  return (
    <ChatIAStyled>
      <Header>
        <img
          style={{ width: 20, height: 20 }}
          src="/LOGOLIMENKA360_NAVBAR_COLOR_small.png"
        />
        <h2>Limenka AI Assistant</h2>
      </Header>

      <Messages>
        {messages.map((msg, index) => {
          if (msg.role === "ai") {
            // Estilos para respuestas de la IA
            if (msg.content.includes("\n")) {
              // Si hay saltos de línea, renderizar párrafos
              return (
                <AIMessage key={index} $isUser={false}>
                  {msg.content.split("\n").map((paragraph, pIndex) => (
                    <Paragraph key={pIndex}>{paragraph}</Paragraph>
                  ))}
                </AIMessage>
              );
            } else if (msg.content.includes("*")) {
              // Si hay asteriscos, renderizar lista
              return (
                <AIMessage key={index} $isUser={false}>
                  <List>
                    {msg.content.split("*").map((item, iIndex) => {
                      if (item.trim() !== "") {
                        return <ListItem key={iIndex}>{item.trim()}</ListItem>;
                      }
                      return null;
                    })}
                  </List>
                </AIMessage>
              );
            } else {
              // Estilo por defecto para mensajes de la IA
              return (
                <AIMessage key={index} $isUser={false}>
                  {msg.content}
                </AIMessage>
              );
            }
          } else {
            // Estilo para mensajes del usuario
            return (
              <Message key={index} $isUser={true}>
                {msg.content}
              </Message>
            );
          }
        })}

        {isTyping && <TypingIndicator>Escribiendo...</TypingIndicator>}
      </Messages>

      <InputBox>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </InputBox>
    </ChatIAStyled>
  );
}

const ChatIAStyled = styled.div`
  width: 100%;
  height: 550px;
  background-color: #fff;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: "Segoe UI", sans-serif;
`;

const Header = styled.div`
  background: #1e3a8a;
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 40px;
    height: auto;
  }

  h2 {
    font-size: 1rem;
    margin: 0;
  }
`;

const Messages = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #f9fafb;
`;

const Message = styled.div`
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.$isUser ? "#2563eb" : "#e5e7eb")};
  color: ${(props) => (props.$isUser ? "#fff" : "#111827")};
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 80%;
  white-space: pre-wrap;
`;

const AIMessage = styled(Message)`
  background-color: #f0f0f0; // Un gris claro para mensajes de la IA
`;

const Paragraph = styled.p`
  margin-bottom: 8px;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 4px;
`;

const TypingIndicator = styled.div`
  align-self: flex-start;
  font-size: 0.85rem;
  color: #6b7280;
  padding-left: 4px;
`;

const InputBox = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #e5e7eb;
  background-color: #fff;

  input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    font-size: 0.95rem;
  }

  button {
    margin-left: 8px;
    background-color: #1e3a8a;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;

    &:hover {
      background-color: #2563eb;
    }
  }
`;
