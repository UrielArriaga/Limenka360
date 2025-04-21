import Link from "next/link";
import styled from "styled-components";

export const PendingStyled = styled.form`
  width: 400px;
  background-color: rgb(38, 42, 46);
  padding: 20px 20px;
  border-radius: 3px;
  position: relative;

  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  /* justify-content: center; */
  /* justify-items: start; */
  grid-template-columns: 1fr 1fr;
`;

export const PendingGroup = styled.div`
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || "none"};
  align-items: ${({ $alignItems }) => $alignItems || "none"};
  flex-direction: ${({ $type }) => ($type === "horizontal" ? "row" : "column")};
  justify-self: ${({ $justifySelf }) => $justifySelf || "none"};
  gap: 4px;
  ${({ $span }) => ($span === "full" ? "grid-column: 1 / -1;" : $span || "")}
`;

export const PendingTitle = styled.h3`
  grid-column: 1 / -1;
`;

export const PendingFieldstyled = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #adb5bd;

  & svg {
    width: 15px;
    height: 15px;
  }

  span {
    /* color: #fff; */
  }
`;

export const PendingField = ({ Icon = null, children }) => {
  return (
    <PendingFieldstyled>
      {Icon && <Icon />}
      <span>{children}</span>
    </PendingFieldstyled>
  );
};

export const PendingValue = styled.span`
  white-space: normal;
  overflow-wrap: anywhere;
  word-wrap: break-word;
  word-break: break-word;
  display: block;
`;

export const GoTo = styled(Link)`
  color: red;
  background-color: red;
  /* color: red !important; */

  & span {
    color: red;
  }

  &:hover {
    background-color: red;
  }
`;

export const PendingSelect = styled.select`
  background-color: #212529;
  padding: 10px 20px;
  resize: none;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: inherit;
  font-size: 14px;
`;

export const PendingTextArea = styled.textarea`
  background-color: #212529;
  padding: 10px 20px;
  resize: none;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-family: inherit;
  font-weight: 400;
`;

export const BtnClosePending = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;

  & svg {
    font-size: 20px;
  }

  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99999;
`;

export const BtnPending = styled.button`
  background-color: ${({ $bgColor }) => $bgColor || "transparent"};
  color: ${({ $color }) => $color || "transparent"};
  padding: 10px 20px;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 11px;
  font-weight: 800;
  border: none;
  border-radius: 3px;
`;
