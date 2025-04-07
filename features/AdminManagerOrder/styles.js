import styled from "styled-components";

export const AdminManagerOrderStyled = styled.div`
  /* NavBarRoutes */

  .navbarroutes {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    border-bottom: 1px solid #bdbdbd;
  }
  .routes {
    display: flex;
  }

  .routes .itemroute {
    display: flex;
    align-items: center;

    padding: 10px;
    color: #757575;
  }

  .routes .separation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-left: 10px;
  }
  .routes .separation .itemrouteIconArrow {
    font-size: 18px;
    color: #9e9e9e;
  }
  .routes .itemroute .itemrouteIcon {
    font-size: 18px;
    color: #9e9e9e;
  }

  .actions {
    display: flex;

    button {
      border: 1px solid #757575;
      color: #757575;
      font-size: 12px;
    }
  }

  /* NavBarRoutes */
`;
