import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  width: 100%;
`;

export const Card = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-bottom: 4px solid ${props => props.borderColor || "#000"};

  .icono {
    margin-right: 20px;
    margin-top: 5px;
  }
  .skeleton {
    width: 100%;
  }
  .title {
    font-weight: 500;
    color: #6e6e6f;
  }
`;
