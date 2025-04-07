import styled from "styled-components";
import { colors, zIndexHeader } from "../../styles/global.styles";

export const DirLogDashboardStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  .headerTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .add {
      text-transform: capitalize;
      background: rgb(25 51 100);
      color: rgb(255, 255, 255);
      font-size: 13px;
      border-radius: 10px;
    }
  }
  .header {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: ${zIndexHeader};
    display: flex;
    align-items: center;
    padding: 20px 10px;
    width: 100%;
    justify-content: space-between;
    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;

      span {
        color: #616161;
      }
    }
    &__headTitle {
      display: flex;
      align-items: center;
    }
    &__filters {
      display: flex;
      align-items: center;

      .inputContainer {
        width: 300px;
        position: relative;
        margin-right: 10px;
        &__icon {
          position: absolute;
          font-size: 16px;
          top: 8px;
          left: 10px;
          color: #ccc;
        }

        &__input {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
          height: 34px;
          margin-right: 20px;
          padding-left: 30px;
        }

        &__clean {
          position: absolute;
          font-size: 16px;
          top: 6px;
          right: 5px;
          color: #ccc;
          padding: 0;
          margin: 0;
          color: #059be5;
        }
      }

      .refetchdata {
        .icon {
          padding: 0;
          margin: 0;
          padding: 6px;
        }
        display: flex;
        align-items: center;
        border-radius: 9px;
        padding-right: 20px;
        padding: 8px;
        background-color: rgba(83, 109, 254, 0.2);

        p {
          font-size: 12px;
          font-weight: bold;
        }
      }

      .refetchdata {
        .icon {
          padding: 0;
          margin: 0;
          padding: 6px;
        }
        display: flex;
        align-items: center;
        border-radius: 9px;
        padding-right: 20px;
        background-color: rgba(83, 109, 254, 0.2);

        p {
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }

  .main {
    flex: 1;
    overflow-y: auto;
    display: flex;

    /* background-color: #103c82; */
  }

  .containertable {
    height: calc(100vh - 180px);
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
  }
  .search {
    display: flex;

    margin-bottom: 20px;
    background-color: yellow;

    &__inputcontainer {
      width: 100%;
      position: relative;
      &--icon {
        margin-right: 10px;
        position: absolute;
        top: 7px;
        left: 8px;
        color: #ccc;
      }

      &--icondelete {
        position: absolute;
        top: 4px;
        right: 8px;
        color: #fff;
        background-color: #034d6f;
        cursor: pointer;
        padding: 0px;
        margin: 0;
      }

      &--input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
        padding-left: 35px;
      }
    }
  }

  .filters {
    background-color: #f0f0f0;
    height: 50px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .filtersection {
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
    margin-bottom: 20px;

    &__title {
      display: flex;
      align-items: center;
      margin-right: 20px;
      p {
        font-size: 20px;
        font-weight: bold;
      }
    }
    &__head {
      display: flex;
      align-items: center;
    }

    &__options {
      .btShowFilters {
        background-color: ${colors.primaryColor};
        color: #fff;
        height: 30px;
        border-radius: 7px;
        margin-right: 5px;
        .icon {
          font-size: 18px;
        }
      }
    }

    &__order {
      display: flex;
      justify-content: flex-end;

      align-items: center;

      p {
        margin-right: 10px;
      }

      select {
        margin-right: 5px;
        padding: 4px;
        border: 1.6px solid #103c82;
        border-radius: 8px;
        outline: none;
      }
    }
  }

  .fr {
    padding: 0 10px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .title {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;
    }

    span {
      color: #034d6f;
    }

    .inputContainer {
      position: relative;

      &__icon {
        position: absolute;
        font-size: 16px;
        top: 8px;
        left: 10px;
        color: #ccc;
      }

      &__clean {
        position: absolute;
        font-size: 16px;
        top: 4px;
        right: 25px;
        color: #ccc;
        padding: 0;
        margin: 0;

        color: #059be5;
      }
    }

    input {
      width: 300px;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      outline: none;
      height: 34px;
      margin-right: 20px;
      padding-left: 30px;
    }
  }
  .preview {
    background: #f5f7fa;
  }
`;
