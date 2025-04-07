import { Paper } from "@material-ui/core";
import styled from "styled-components";

export const CardStyle = styled(Paper)`
  padding: 6px;
  border-bottom: 5px solid ${({ stylecolor }) => (stylecolor ? `${stylecolor}` : "#000")};
  .header {
    display: flex;
    margin-bottom: 10px;
    .title {
      text-transform: capitalize;
      font-weight: 500;
      color: ${({ stylecolor }) => (stylecolor ? `${stylecolor}` : "#000")};
    }
    svg {
      margin-right: 5px;
      color: ${({ stylecolor }) => (stylecolor ? `${stylecolor}` : "#000")};
    }
  }
  .count {
    font-weight: 500;
    font-size: 24px;
  }
`;
