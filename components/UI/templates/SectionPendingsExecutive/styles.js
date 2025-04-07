import { Paper } from "@material-ui/core";
import styled from "styled-components";

export const SectionPendingsLayout = styled.div`
  background-color: #eeeeee;
  padding: 10px;
  border-radius: 8px;
  height: 555px;
  .container_main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #ffff;
    .header_pendings {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
      background-color: #405189;
      color: #fff;

      border-radius: 5px 5px 0px 0px;
      .titlePendings {
        font-size: 15px;
        padding: 5px;
        font-weight: 500;
        overflow-wrap: break-word;
      }
    }
    .body_pendings {
      .title_nameEjecutive {
        font-weight: bold;
        text-transform: capitalize;
        padding: 10px;
        border-bottom: 1px solid #c0c0c0;
        margin-bottom: 5px;
      }
      .pendings {
        height: 400px;
        overflow-y: scroll;
        padding: 6px;
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
        .container_typePending {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          .buttonSeePending {
            height: 20px;
            border-radius: 5px;
            background-color: #405189;
            color: #fff;
            text-transform: capitalize;
            font-size: 12px;
            padding: 10px;
            font-weight: 500;
          }
        }
      }
      .spanPage {
        font-weight: bold;
      }
    }
    .pagination {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      border-radius: 0px 0px 5px 5px;
      box-shadow: 0 -5px 5px -5px rgba(115, 115, 115, 0.75);
      background-color: #fff;
      .paginationItem {
        margin-top: 10px;
      }
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10%;
    padding: 20px;

    &__img {
      width: 150px;
      animation: slide_img 3s infinite;
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
    @keyframes slide_img {
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
  .message_ctr {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    img {
      width: 40%;
      height: 40%;
      object-fit: contain;
    }
    p {
      text-align: center;
      color: #8a8a8a;
    }
  }
`;

export const PaperPending = styled(Paper)`
  padding: 5px;
  margin-bottom: 15px;
  .typePending {
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 12px;
    font-weight: bold;
  }
  .iconTitle {
    font-size: 15px;
    margin-right: 4px;
  }
  .visit {
    color: #03cd71;
  }
  .date {
    color: #fba92b;
  }
  .call {
    color: #9e9e9e;
  }
  .remember {
    color: #6682f2;
  }
  .task {
    color: #b247e3;
  }
  .description {
    font-size: 14px;
    overflow-wrap: break-word;
  }
  .executive {
    margin: 5px 0px;
  }
  .footerPending {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .date_from {
      font-size: 12px;
    }
    .date_to {
      font-size: 12px;
    }
    .span {
      margin-left: 2px;
      font-weight: bold;
    }
  }
  .capitalize {
    text-transform: capitalize;
  }
`;
