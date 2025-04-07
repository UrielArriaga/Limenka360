import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const DirLogAlmacenesStyled = styled.div`
  /* padding: 20px; */
  /* background-color: red; */

  /* background-color: #eeeeee; */
  /* padding: 20px; */

  /* background-color: red; */
  height: calc(100vh - 50px);
  /* overflow: hidden; */
  .main {
    /* padding: 20px; */
    width: 90%;
    /* height: calc(100vh - 60px); */
    margin: auto;
    border-radius: 10px;

    /* height: 50%; */
    /* height: 600px; */
    /* overflow: hidden; */
    /* overflow: ; */
    /* height: calc(100vh - 60px); */

    /* background-color: red; */

    /* background-color: #fff; */
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
    /* background-color: blue; */
  }

  .header {
    /* display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px; */
    /* background-color: yellow; */
  }

  .header {
    display: flex;
    align-items: center;
    padding: 20px 10px;

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
