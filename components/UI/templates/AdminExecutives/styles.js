import styled from "styled-components";
import { Drawer } from "@material-ui/core";

export const ExecutivesStyled = styled.div`
  margin: 0;

  .buttonexport {
    background-color: #405189;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 10px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
      background-color: #3a4d7d;
    }
  }
  .chip + .chip {
    margin-left: 0.5em;
  }
  .ctr_filter {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    &__ctr_input {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: relative;
      margin-bottom: 10px;
      .inputText {
        width: 100%;
        height: 40px;
        input {
          padding-left: 40px;
          padding-right: 70px;
        }
      }
      .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
        border-radius: 10px;
      }
      .search {
        width: 30px;
        height: 30px;
        padding: 5px;
        color: #8a8a8a;
        transition: all 0.4s ease;
        position: absolute;
        left: 10px;
      }
      .ctr_filters {
        display: flex;
        align-items: center;
        position: absolute;
        right: 10px;
        color: #8a8a8a;
        cursor: pointer;
        .filters {
          width: 30px;
          height: 30px;
          padding: 5px;
          transition: all 0.4s ease;
        }
        .text {
          font-size: 12px;
        }
        &:hover .filters {
          padding: 3px;
        }
      }
    }
  }
  .container_executives {
    padding: 5px;

    .rowheader {
      display: flex;
      justify-content: space-between;
    }
    .filter {
      display: flex;
      justify-content: end;
      margin-bottom: 9px;
      flex-wrap: wrap-reverse;
      &__range {
        display: flex;
        flex-wrap: wrap;
        @media (max-width: 550px) {
          flex-direction: row-reverse;
        }
      }
      &__date {
        margin-right: 5px;
        font-size: 11px;

        label {
          margin-right: 5px;
        }
      }
      &__period {
        padding: 4px;
        border: 1.6px solid #103c82;
        border-radius: 8px;
        outline: none;
      }
    }
    .filters {
      display: flex;
      margin: 0 10px 0 10px;
    }
    .filters_manager {
      display: flex;

      svg {
        color: rgb(138, 138, 138);
      }
      p {
        color: rgb(138, 138, 138);
      }
    }
  }
  .pagination_ex {
    display: flex;
    justify-content: end;
    margin-top: 8px;

    &__total {
      font-weight: bold;
    }
  }
  .titletactities {
    margin-bottom: 15px;
  }
  .inputdate {
    height: 30px;
    width: 200px;
    background-color: #ffff;
    border-radius: 2px;
    padding-left: 10px;
    margin-right: 4px;
    margin-bottom: 8px;
    margin-top: 0px;
    background-color: #ffff;
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    &__img {
      width: 300px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;

export const DrawerContainer = styled(Drawer)`

  p {
    margin: 0;
  }

  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 30%;
    padding: 20px;
    border-top-left-radius: 20px;
    border-left: 5px solid #405189;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
      background-color: none;
    }

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
  }
  .ctr_drawer {
    padding-bottom: 60px;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .close_icon {
        color: #8a8a88;
        font-size: 20px;
        &:hover {
          cursor: pointer;
          color: #f50;
        }
    }
`;
