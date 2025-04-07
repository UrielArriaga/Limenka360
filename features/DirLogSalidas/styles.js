import styled from "styled-components";
import { colors, device, zIndexHeader } from "../../styles/global.styles";

export const DirLogSalidasStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    padding: 20px 10px;
    z-index: ${zIndexHeader};
    display: flex;

    &__leftside {
      display: flex;
      align-items: center;
      @media ${device.sm} {
        flex: 1;
      }
    }

    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;

      span {
        color: #616161;
      }
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
    }
    &__btn {
      /* margin-left: 55%; */
      background-color: #039be5;
      border-radius: 5%;
      .btnEntry {
        color: white;
        text-transform: capitalize;
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
    /* justify-content: flex-end; */
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
    height: 40px;
    /* background-color: red; */
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 20px;

    &__title {
      /* background-color: yellow; */
      display: flex;
      align-items: center;
      margin-right: 20px;
      p {
        font-size: 20px;
        font-weight: bold;
      }
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
      /* background-color: blue; */
      align-items: center;
      /* margin-bottom: 20px; */
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
`;
