import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";

const ChatInputArea = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  isLoading,
}) => (
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
);

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

export default ChatInputArea;
