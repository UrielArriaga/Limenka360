import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const List = styled.ul``;

export const SortableItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ index }) => (index % 2 == 0 ? "#f3f3f3" : "#ffff")};
  padding-right: 10px;
  .actions {
    .show {
      color: green;
    }
    .noshow {
      color: red;
    }
    &:hover {
      cursor: pointer;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const ContentItem = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 100000000000000 !important;
  .content {
  }
  .actions {
    /* width: 10%; */
  }

  &:hover {
    cursor: move;
    caret-color: ${colors.primaryColor};
  }
`;
