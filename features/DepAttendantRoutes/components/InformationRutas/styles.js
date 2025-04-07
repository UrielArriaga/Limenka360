import styled from "styled-components";

export const InformationRouteStyled = styled.div`
  padding: 30px 10px;
  display: flex;
  flex-wrap: wrap;
  .information {
    width: 50%;
    &__title {
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      p {
        font-size: 1.5rem;
        color: #000;
        margin-bottom: 10px;
      }
      .icon {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: rgb(220, 225, 246);
        color: rgb(12, 32, 59);
        border-radius: 50%;
      }
    }
    &__body {
      margin-left: 31px;
      .label {
        display: flex;
        align-items: baseline;
        line-height: 25px;
        .name {
          font-weight: bold;
          color: rgb(79, 79, 79);
          margin-bottom: 20px;
          margin-right: 7px;
          width: 200px;
        }
        .na {
          color: #9e9e9e;
        }
      }
    }
  }

  .order {
    width: 100%;

    &__title {
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      p {
        font-size: 1.5rem;
        color: #000;
        margin-bottom: 10px;
      }
      .icon {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: rgb(220, 225, 246);
        color: rgb(12, 32, 59);
        border-radius: 50%;
      }
    }
  }
`;
