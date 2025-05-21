import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const BotMessageCard = ({ text }) => {
  return (
    <BotBubble>
      <ReactMarkdown>{text}</ReactMarkdown>
    </BotBubble>
  );
};

const BotBubble = styled.div`
  /* background-color: #f5f5f5; */
  color: #333;
  border-radius: 12px;
  /* padding: 16px; */
  margin: 8px 0;
  /* max-width: 80%; */
  line-height: 1.6;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); */
  /* white-space: pre-line; */

  p {
    margin: 0 0 0.5em 0;
  }

  strong {
    font-weight: 600;
  }

  ul {
    padding-left: 20px;
    margin: 0.5em 0;
  }

  li {
    margin-bottom: 4px;
  }
`;

const ChatMessages = ({ messages, isLoading, messagesEndRef }) => (
  <MessagesContainer>
    {/* <pre>{JSON.stringify(messages, null, 2)}</pre> */}
    {messages.map((msg, i) => (
      <Message
        key={i}
        sender={msg.role}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {msg.role === "user" && msg.content}

        {msg.role === "ia" && <BotMessageCard text={msg.content} />}
        {/* {} */}
      </Message>
    ))}
    {isLoading && (
      <Message sender="bot">
        <TypingIndicator>Escribiendo...</TypingIndicator>
      </Message>
    )}
    <div ref={messagesEndRef} />
  </MessagesContainer>
);

const MessagesContainer = styled.div`
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
      ? `background-color:rgb(178, 178, 178); color: white; margin-left: auto; border-bottom-right-radius: 4px;`
      : `background-color: white; color: #333; margin-right: auto; border-bottom-left-radius: 4px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);`}
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

export default ChatMessages;
