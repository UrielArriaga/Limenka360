import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";
export const SearchStyle = styled.div`
  .search {
    margin-bottom: 20px;
  }
  .inputicon {
    position: relative;
    .searchicon {
      position: absolute;
      top: 10px;
      left: 8px;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
      padding-left: 40px;

      &:focus {
        outline: 1px solid ${colors.primaryColor};
      }
    }
  }
`;
