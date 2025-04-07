import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const SearcherStyled = styled.div`
  max-width: 350px;
  min-height: 60px;

  position: absolute;
  top: 0px;
  left: 0px;
  background-color: white;
  border-radius: 3px;
  padding: 1em 1em 0 1em;
  font-size: 0.9em;
  .collapse {
    max-height: 300px;
    overflow: auto;
  }

  .header {
    :hover {
      cursor: pointer;
    }
    position: sticky;
    display: flex;
    justify-content: space-between;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 1em 0;

    :not(:last-child) {
      margin: 1em 0 0 0;
    }

    .title {
      display: flex;
      justify-content: center;
      &-text {
        padding-left: 1em;
      }
      &-image-groups {
        background-color: #112a46;
        .icon {
          color: #acc8e5;
        }
      }
      &-image-executives {
        background-color: #ffe66b;
        .icon {
          color: #222222;
        }
      }
      &-image-prospects {
        background-color: #13ae4b;
        .icon {
          color: #fff;
        }
      }

      max-width: 280px;
    }
  }

  .body {
    padding: 0.5em 2em;
    display: flex;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    &-dummy {
      :hover {
        cursor: wait;
      }
    }
    &-data {
      :hover {
        cursor: pointer;
        background-color: #776ceb;
        color: #fff;
      }
    }
    .info {
      margin-left: 1em;
      text-align: center;
      &-detail {
        font-size: 0.8em;
        display: flex;
      }
      &-icon {
        width: 0.8em;
        height: 0.8em;
        margin-right: 0.2em;
      }
    }
  }

  #input {
    display: flex;
    min-width: 300px;
    position: relative;

    .text {
      width: 100%;
      height: 40px;
      input {
        width: 100%;
      }
    }

    .icon {
      width: 30px;
      height: 30px;
      padding: 5px;
      color: #8a8a8a;
      transition: all 0.4s ease;
      position: absolute;
      right: 0px;
    }
    .close {
      cursor: pointer;
    }
  }
`;
