import styled from "styled-components";
import { Drawer } from "@material-ui/core";

export const DrawerDisountStyle = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 400px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

export const Main = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
  }
  .drawer_header {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    z-index: 50;
    top: 0;
    padding: 15px 8px;
    background-color: #dce1f6;
    margin-bottom: 15px;
    box-shadow: 0px 1px 2px #abb2b9;
    &__title {
      display: flex;
      align-items: center;
      &__icon {
        font-size: 20px;
        margin-right: 2px;
      }
      &__iconReload {
        margin-top: 5px;
        font-size: 20px;
        margin-left: 10px;
        transition: 0.3s;
        &:hover {
          color: green;
          cursor: pointer;
        }
      }
      &__iconFilter {
        margin-top: 5px;
        font-size: 18px;
        margin-left: 10px;
        transition: 0.3s;
        &:hover {
          color: green;
          cursor: pointer;
        }
      }
      &__iconOrder {
        margin-top: 5px;
        font-size: 20px;
        margin-left: 10px;
        transition: 0.3s;
        &:hover {
          color: green;
          cursor: pointer;
        }
      }
      &__active {
        color: #1b69b6;
        font-size: 20px;
      }
      &__Subtitle {
        font-size: 16px;
        font-weight: 500;
        margin-right: 2px;
        &__total {
          color: #fff;
          padding: 1px 4px;
          border-radius: 5px;
          background-color: #3f51b5;
          margin-top: -8px;
          font-size: 11px;
          font-weight: 600;
          margin-left: 2px;
        }
      }
    }
    &__button {
      width: 20px;
      height: 20px;
      color: red;
    }
    &__icon {
      font-size: 22px;
    }
  }
  .container_discounts {
    border-bottom: 1px solid #d5d8dc;
    padding: 9px 20px;
    display: flex;

    align-items: center;
    justify-content: space-between;
}
.ejecutive_name {
    background: white;
    font-size: 13px;

    p{
      font-weight:bold;
    }
    span{
      background-color:#1b69b6;
      color: #fff;
      border-radius: 5px:;
      padding:2px;
      font-size: 14px;
      font-weight:bold;
    }
}
.prospect_text {
    font-size: 14px;
    margin-top: 6px;

    span{
      font-weight: bold;
    }
}
.date {
    margin-top: 6px;
    font-size: 14px;

    .icon_date {
    color: #407aff;
    font-size: 16px;
}
span{
  font-weight: bold;
}
}
.container_buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;

    button.bts_aproved {
    margin-bottom: 17px;
    background: #88c82d;
    border: solid #fff;
    color: white;
    padding: 5px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer
}
.bts_denegate {
  margin-bottom: 17px;
    background: red;
    border: solid #fff;
    color: white;
    padding: 5px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer
}
}
.contenido__empty {
    display: flex;
    flex-direction: column;

    .contenido__empty__title {
    text-align: center;
    font-size: 21px;
    font-weight: 900;
}
}
.contenido__pagination {
    display: flex;
    justify-content: center;
}
  `;
