import styled from "styled-components";

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid #ddd;

  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const AvatarContainer = styled.div`
  flex: 1;
  font-size: 12px;

  .fullname {
    text-transform: capitalize;
  }
`;

export const Content = styled.div`
  width: 90%;
  font-size: 12px;

  .fullname {
    text-transform: capitalize;
    /* margin-bottom: 5px; */
  }

  .message-container {
    padding: 8px 10px;
    background: #f5f5f5;
    margin-top: 8px;
    margin-bottom: 5px;
    border-radius: 4px;
  }
`;

export const Indicator = styled.div`
  flex: 1;
  font-size: 12px;

  .indicator {
    font-size: 13px;
    color: #1877f2;
  }
`;

export const Button = styled.button`
  position: fixed;
  top: 10px;
  right: 20px;
  background: #1877f2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
`;
