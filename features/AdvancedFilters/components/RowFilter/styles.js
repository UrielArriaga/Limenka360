import { IconButton } from '@material-ui/core';
import { forwardRef } from 'react';
import styled from 'styled-components';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

export const RowFilterStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    &:not(:last-child) {
      border-bottom: 1px solid #ccc;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
  }
`;

export const SubFilterStyled = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const Label = styled.p`
  font-size: ${(props) => props.size || '13px'};
  text-transform: uppercase;
  font-weight: 600;
  color: #343a40;
  letter-spacing: 1px;
`;

export const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px 10px;
  border-radius: 3px;
  background-color: rgba(248, 249, 250, 0.5);
  border: solid 1px #e9ecef;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// styles Rows MAIN and SUBROW shared
export const IconButtonStyled = styled(IconButton)`
  justify-self: end;
`;

export const SpecialFilter = styled.div`
  justify-self: center;
  align-self: center;
  width: 100%;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledButton = styled.button`
  background-color: #d0ebff;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 8px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  text-transform: none;

  position: relative;

  svg {
    font-size: 16px;
    color: #1864ab;
  }
`;

export const BtnCalendary = forwardRef(({ onClick }, ref) => {
  return (
    <StyledButton onClick={onClick} ref={ref}>
      <CalendarTodayIcon />
    </StyledButton>
  );
});
