import styled from "styled-components";

export const TableStyle = styled.div`
  .pagination {
    margin-top: 10px;
    justify-content: space-between;
    display: flex;
    flex-direction: row-reverse;
  }
`;
export const LoaderTable = styled.div`
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10%;
    /* height: 400px; */
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
`;
