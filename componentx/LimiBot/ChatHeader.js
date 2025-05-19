import React from "react";
import { IconButton } from "@material-ui/core";
import { ExpandMore, ExpandLess, Close } from "@material-ui/icons";
import styled from "styled-components";

const ChatHeader = ({ isMinimized, onToggleMinimize, onClose }) => (
  <Header>
    <h3>LimiBot</h3>
    <div>
      <IconButton size="small" onClick={onToggleMinimize}>
        {isMinimized ? <ExpandMore /> : <ExpandLess />}
      </IconButton>
      <IconButton size="small" onClick={onClose}>
        <Close />
      </IconButton>
    </div>
  </Header>
);

const Header = styled.div`
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
`;

export default ChatHeader;
