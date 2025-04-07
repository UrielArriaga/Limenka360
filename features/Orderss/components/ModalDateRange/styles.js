import styled from "styled-components";
import { Box, Button } from "@material-ui/core";

export const StyledModalBox = styled(Box)`
  position: absolute;
  top: 20%;
  transform: translate(206%, 60%);
  width: 460px;
  background-color: #fff;
  box-shadow: 24px;
  padding: .6rem;
  border-radius: 10px;
`;
export const HeaderContainer = styled.div`
  align-items: center;
  background: #3f51b5;
  border-radius: 8px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin-bottom: 46px;
  padding: 8px;
`;
export const DateContainer = styled.div`
  padding:4px;
`;
export const StyledButton = styled(Button)`
  text-transform: capitalize;
  color: ${ ( { color }) => ( color === 'secondary' ? 'red' : '')};
`;
export const DatePickerStyled = styled.div`
  margin-bottom: ${({ marginBottom }) => marginBottom || '0' };
  margin-top: ${({ marginTop }) => marginTop || '0'};
`;
export const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 43px;
  margin-bottom: 6px;
`;