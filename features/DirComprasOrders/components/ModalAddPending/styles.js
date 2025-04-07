import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 100%;
  max-width: 400px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #3f51b5;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  transition: border 0.3s ease;

  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

export const SelectWrapper = styled.div`
  .react-select__control {
    border-radius: 5px;
    padding: 2px;
    border: 1px solid #ccc;
    transition: border 0.3s ease;

    &:hover {
      border-color: #3f51b5;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const StyledButton = styled.button`
  width: 120px; 
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background: ${({ primary }) => (primary ? "#3f51b5" : "#bbb")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ primary }) => (primary ? "#2c3e90" : "#999")};
  }
`;
export const ErrorText = styled.label`
color: red;
`;