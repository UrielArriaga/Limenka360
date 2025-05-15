import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export default function LimiBot() {
  const [isFocused, setIsFocused] = useState(false);
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
        prospectData: extractProspectEssentials(prospectSelected),
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
    <AddTrackingStyled isFocused={isFocused}>
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
    </AddTrackingStyled>
  );
}

const AddTrackingStyled = styled.div`
  background-color: #fff;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  /* padding: 10px; */
  border-radius: 8px;
  margin-bottom: 30px;

  .content {
    padding: 10px;
  }
  .titleSection {
    font-size: 0.9rem;
    font-weight: 600;
    color: #282455;

    margin-bottom: 10px;
  }

  .areaTracking {
    width: 100%;
    /* border: 1px solid ${colors.primaryColor}; */
    border-radius: 8px;
    padding: 10px;
    font-size: 0.9rem;
    color: #282455;
    margin-bottom: 10px;
    /* height: 30px; */

    border: ${(props) =>
      props.isFocused
        ? `1px solid ${colors.primaryColor}`
        : `1px solid #9e9e9e`};
    /* ${(props) =>
      props.isFocused
        ? "border: 1px solid #3aade6;"
        : "border: 1px solid red"} */

    /* ${(props) =>
      props.isFocused
        ? "border: 1px solid #3aade6;"
        : `border: 1px solid #fafafa`} */

    textarea {
      width: 100%;
      border: none;
      outline: none;
      height: 50px;
      /* height: 20px; */
      resize: none;
      font-size: 0.9rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }

    textarea::placeholder {
      font-size: 0.9rem;
      /* color: #282455; */
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }

    .txtArea {
      width: 100%;
      border: none;
      outline: none;
    }
  }

  .options {
    justify-content: flex-start;
    align-items: flex-start;
    align-items: flex-start;

    flex-direction: column;
    margin-bottom: 10px;

    ${(props) => (props.isFocused ? "display: flex;" : "display: none;")}
    .row {
      display: flex;
      align-items: center;
    }
    .icon_click {
      padding: 0;
      margin-right: 13px;
    }

    .mg {
      margin-bottom: 10px;
    }

    .icon_option {
      color: #6a737f;
      font-size: 1.5rem;
    }

    .highligth {
      background-color: #b0bec5;
    }

    .chip_date {
      background-color: #f1f4f6;
      color: #6a737f;
      padding: 2px 10px;
      border-radius: 5px;
      margin-left: 10px;

      p {
        margin: 0;
      }
    }
  }

  .actions {
    ${(props) => (props.isFocused ? "display: flex;" : "display: none;")}

    justify-content: flex-end;

    button {
      background-color: ${colors.primaryColor};
      color: #fff;
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 10px;

      &:hover {
        background-color: ${colors.primaryColorHover};
      }
    }
  }
`;

const Header = styled.div`
  background: #1e3a8a;
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px 8px 0 0;

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
  min-height: 300px;
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
