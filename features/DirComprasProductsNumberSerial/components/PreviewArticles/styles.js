import styled, { keyframes } from "styled-components";
import Select from 'react-select';
export const ContainerStyledSerial = styled.div`

width: 100%;
  height: 100vh;
  overflow-y: hidden;

  .headerpreview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 6px;
    background: white;
    .concept {
      font-weight: bold;
      text-transform: capitalize;
    }
    .button_edit {
      text-transform: capitalize;
      color: white;
      padding: 7px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      border: 1px solid #407aff;
      cursor: pointer;
      color: #407aff;
      background: white;
    }

    .headerpreview__listactions {
      display: flex;
      align-items: center;

      &--item {
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        color: #616161;

        .icon {
          font-size: 15px;
        }

        .text {
          margin-left: 5px;
          font-size: 13px;
        }

        .button {
          background-color: #f9f9fb;
          color: #616161;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    }
  }

  .pagos {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .actions {
    display: flex;

    height: 50px;
    background-color: #f9f9fb;

    &__item {
      display: flex;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
      color: #616161;

      &--icon {
        font-size: 15px;
      }

      &--text {
        margin-left: 5px;
        font-size: 13px;
      }
    }
  }

  .contentpreview {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 313px);
    overflow: auto;
    margin-top: 13px;

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
    .title {
      font-weight: bold;

      letter-spacing: 0.03em;
      cursor: pointer;
      margin-top: 12px;
      margin-bottom: 14px;
      display: flex;

      align-items: center;
      margin-bottom: 13px;
      margin-top: 21px;
      .icon {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: rgb(220, 225, 246);
        color: rgb(12, 32, 59);
        border-radius: 50%;
      }
      .na {
        color: #757575;
        font-weight: 700;
        font-size: 12px;
      }
    }

    .headers {
      font-size: 13px;
      font-weight: bold;
      color: rgb(79, 79, 79);
    }
  }

  .contentpreview {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    max-height: calc(100vh - 268px);
    overflow: auto;
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

    .headerinstructions {
      border: 1px solid #ccc;
      padding: 20px 10px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      .icon {
        font-size: 20px;
        margin-right: 10px;
        color: #039be5;
      }

      .guide {
        font-size: 14px;
        font-weight: bold;
      }

      .guidedescription {
        font-size: 12px;
        color: #757575;
        margin-left: 10px;
      }
    }

    .rowprev {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
    }

    .rowprevalig {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__customer {
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      &--item {
        display: flex;
        color: #757575;
        margin-bottom: 4px;
        font-size: 13px;

        .hightligth {
          margin-left: 10px;
        }
      }
    }

    &__address {
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      &--item {
        display: flex;
        color: #757575;
        margin-bottom: 4px;
        font-size: 13px;

        .hightligth {
          margin-left: 10px;
        }
      }
    }

    &__containerTable {
      overflow: auto;
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
      border-radius: 9px;
      max-height: 70vh;
      margin-top: 29px;
    }

    &__products {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;

        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: #405189;

          tr {
            th {
              color: white;
              padding: 10px;
              text-align: left;
              font-weight: bold;
            }
          }
        }

        tbody {
          tr {
            border-bottom: 2px solid #e0e0e0;
            td {
              padding: 4px 0px 0px 9px;
              text-align: left;
              color: #616161;
              font-weight: bold;
              height: 60px;
            }
          }
        }

        .load {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;

          &__img {
            width: 150px;
            animation: slide 3s infinite;

            img {
              width: 100%;
              object-fit: contain;
            }
          }
        }
      }

      .icnButton {
        background-color: #405189;
        padding: 2px;

        .icon {
          color: #fff;
        }
      }
    }

    &__amounts {
      padding: 10px;
      margin-top: 50px;
      display: flex;
      justify-content: flex-end;

      .row {
        display: flex;
        margin-bottom: 10px;

        p {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

  .totalAmount {
    display: flex;
    justify-content: end;
    margin-top: 15px;
    p {
      font-weight: bold;
    }
  }

  .rowprev {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .contentpreview {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    max-height: calc(100vh - 268px);
    overflow: auto;
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

    &__render {
      overflow: auto;
      height: 552px;
    }

    .rowprev {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
    }

    .rowprevalig {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__customer {
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      &--item {
        display: flex;
        color: #757575;
        margin-bottom: 4px;
        font-size: 13px;

        .hightligth {
          margin-left: 10px;
        }
      }
    }

    &__address {
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      &--item {
        display: flex;
        color: #757575;
        margin-bottom: 4px;
        font-size: 13px;

        .hightligth {
          margin-left: 10px;
        }
      }
    }

    &__containerTable {
      overflow: auto;
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
      border-radius: 9px;
      max-height: 70vh;
      margin-top: 29px;
    }

    &__products {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;

        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: #405189;

          tr {
            th {
              color: white;
              padding: 10px;
              text-align: left;
              font-weight: bold;
            }
          }
        }

        tbody {
          tr {
            td {
              padding: 4px 0px 0px 9px;
              text-align: left;
              color: #616161;
              font-weight: bold;
            }
          }
        }

        .load {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;

          &__img {
            width: 150px;
            animation: slide 3s infinite;

            img {
              width: 100%;
              object-fit: contain;
            }
          }
        }
      }
    }

    &__amounts {
      padding: 10px;
      margin-top: 50px;
      display: flex;
      justify-content: flex-end;

      .row {
        display: flex;
        margin-bottom: 10px;

        p {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
    .inputdate {
    border: none;
    color: #616161;
    font-weight: bold;
    text-align: center;
}

.contentpreview {
    min-height: 630px;
    margin-top: 12px;
    background: white;
    border-radius: 6px;
    padding: 6px;

    &__tabs {
      /* background-color: red; */
      padding: 10px 10px 0px 10px;
      margin: 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      &__content{
        width: 50%;
        display: flex;
        &--tab {
          /* background-color: blue; */
          font-size: 12px;
          margin-right: 20px;
          padding-bottom: 6px;
          border-bottom: 2px solid transparent;
          :hover {
            cursor: pointer;
            border-bottom: 2px solid #1e88e5;
          }
        }
      }

      &--tabStatus{
        font-size: 12px;
        margin-right: 20px;
        padding-bottom: 6px;
        border-bottom: 2px solid transparent;
        p{
          background-color: #1e88e5;
          padding: 6px;
          border-radius: 15px;
          color: white;
        }
      }

      .active {
        /* background-color: #f9f9fb; */
        /* border-radius: 5px; */
        font-weight: bold;
        padding-bottom: 6px;
        border-bottom: 2px solid #1e88e5;
      }
    }
    &__render {
      overflow: auto;
      height: 552px;
    }
    .rowprev {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
    }

    .rowprevalig {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
      align-items: center;
    }

    &__customer {
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .hightligth {
        color: #1e88e5;
      }
    }

    &__address {
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      &--item {
        display: flex;
        color: #757575;
        margin-bottom: 4px;
        font-size: 13px;

        .hightligth {
          margin-left: 10px;
        }
      }
    }

    &__products {
      margin-top: 50px;
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: #405189;
          tr {
            th {
              padding: 10px;
              text-align: left;
              color: #ffffff;
              font-weight: bold;
            }
          }
        }
        tbody {
          tr {
            td {
              padding: 10px;
              text-align: left;
              color: #616161;
              font-weight: bold;
            }
          }
        }
      }
    }

    &__amounts {
      margin-top: 50px;
      display: flex;
      justify-content: flex-end;
      .row {
        display: flex;

        margin-bottom: 10px;
        p {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

`;

export const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;

  border: 1px solid #ccc;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #333;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;


export const StyledSelect = styled(Select).attrs({

  styles: {
    control: (base) => ({
      ...base,
      border: "none",              
      boxShadow: "none",           
      backgroundColor: "transparent", 
    }),
    singleValue: (base) => ({
      ...base,
      color: "#616161",               
    }),
    placeholder: (base) => ({
      ...base,
      color: "#888",              
    }),
    menu: (base) => ({
      ...base,
      boxShadow: "none",          
    }),
  },
})`
  width: 100%;                    
  font-size: 14px;                
`;