import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

const ManagarNavbarLayout = styled.div`
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  /* background: ${colors.secondaryColor}; */
  right: 0;
  top: 0;
  width: ${({ sideBar }) => (sideBar ? "calc(100% - 250px)" : "100%")};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 6px -1px, rgba(0, 0, 0, 0.09) 0px 2px 4px -1px;
  justify-content: space-between;
  background-color: #fff;
  .search {
    height: 100%;
    width: 60%;
    padding: 0px 0px 0px 10px;
    .txt-group {
      font-weight: bold;
      color: #616161;
      margin-right: 10px;
    }
  }
  .container {
    width: 40%;
    background-color: #fff;
    border-radius: 60px 0 0 0;
    padding: 0 0 0 30px;
    height: 100%;
    display: flex;
  }

  .progress {
    width: 30%;
  }

  .container .items {
    margin-top: 5px;
    margin-bottom: 5px;
    color: #3aade6;
  }
  .container .items .item {
    display: flex;
    align-items: center;
    padding: 10px 10px;
    transition: all 0.3s ease;
    svg {
      font-size: 20px;
      margin-right: 5px;
    }
  }

  .divider {
  }

  .row-center {
    display: flex;
    align-items: center;
  }
`;

export { ManagarNavbarLayout };
