import { Menu } from "@material-ui/core";
import styled, { css } from "styled-components";
import { colors } from "../global.styles";

export const TableComponentStyled = styled.div`
  width: 100%;
  max-height: 70vh;
  overflow-x: auto;
  transition: all 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
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

  ${props =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}
  ${props =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `}
    ${props =>
    props.isNew === true &&
    css`
      background-color: #e5efff;
    `}
    &:hover {
    background-color: #d8dbe6;
  }
  .content {
    padding: 5px 10px;

    &__flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__more {
      .txt-lastracking {
        font-size: 0.8em;
        color: #616161;
      }

      .txt-createdAt {
        font-size: 11px;
        color: #616161;
      }
      span {
        font-size: 0.8em;
      }
    }
    .name {
      color: #0d47a1;
      font-weight: bold;
      font-size: 1em;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .email {
      font-size: 0.8em;
    }

    .icon-bg {
      .openprospect {
        width: 15px;
        height: 15px;

        &:hover {
          cursor: pointer;

          color: #0d47a1;
        }
      }
    }
  }
  .ctr_load {
  }
`;

export const Table = styled.table`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

export const TableRowHead = styled.tr`
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  padding: 5px 10px;
  height: 40px;
`;

export const TableHeadIdColumn = styled.th`
  position: sticky;
  left: 0;
  padding-left: 10px;

  top: 0;
  background: #405189;
  color: #fff;
  min-width: 150px;
  text-transform: capitalize;
  transition: all 0.3s ease;
  text-align: left;
  @media (max-width: 600px) {
    position: relative;
  }
`;

export const TableHeadColumn = styled.th`
  min-width: 200px;
  text-align: left;
  padding-left: 10px;
  text-transform: capitalize;
`;

export const TableHeadSettingsColumn = styled.th`
  min-width: 50px;
  position: sticky;
  right: 0;
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  width: max-content;
  svg {
    cursor: pointer;
  }
`;
export const TableHeadSettingsColumnSmall = styled.th`
  position: sticky;
  right: 0;
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  svg {
    cursor: pointer;
  }
`;
export const TableDataSmall = styled.th`
  max-width: 10px;
`;
export const TableHead = styled.thead`
  /* position: sticky; */
  top: 0;
  z-index: 50;
`;

export const TableEmptyFake = styled.div`
  position: relative;
  width: 100%;
  padding: 40px;
  height: 250px;

  .message_ctr {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    p {
      text-align: center;
      color: #8a8a8a;
    }
  }
`;

export const TableBody = styled.tbody`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

export const TableRowBody = styled.tr`
  ${props =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}

  ${props =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `}

  ${props =>
    props.isNew === true &&
    css`
      background-color: #e5efff;
    `}
  &:hover {
    background-color: #d8dbe6;

    .column_id {
      background-color: #d8dbe6;
    }
  }

  .asdas {
    ${props =>
      props.isPar === true &&
      css`
        background-color: #f5f5f5;
      `}

    ${props =>
      props.isPar === false &&
      css`
        background-color: #fff;
      `}

  ${props =>
      props.isNew === true &&
      css`
        background-color: #e5efff;
      `}
  &:hover {
      background-color: #d8dbe6;
    }
  }
`;

export const TableDataId = styled.td`
  min-width: 250px;
  position: sticky;
  left: 0;
  /* cursor: pointer; */
  padding: 5px 10px;

  ${props =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}
  ${props =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `}
  ${props =>
    props.isNew === true &&
    css`
      background-color: #e5efff;
    `}
  &:hover {
    background-color: #d8dbe6;
  }
  .content {
    padding: 5px 10px;

    &__flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__more {
      .txt-lastracking {
        font-size: 0.8em;
        color: #616161;
      }
      span {
        font-size: 0.8em;
      }
    }
    .name {
      color: #0d47a1;
      font-weight: bold;
      font-size: 14px;
      /* &:hover {
      cursor: pointer;
      text-decoration: underline;
    } */
    }

    .icon-bg {
      .openprospect {
        width: 15px;
        height: 15px;

        &:hover {
          cursor: pointer;

          color: #0d47a1;
        }
      }
    }
  }
  @media (max-width: 600px) {
    position: relative;
  }
`;

export const TableDataSettingsColumn = styled.td`
  position: sticky;
  right: 0;
  transition: all 0.3s ease;
  min-height: 42px;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      position: relative;
      background-color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#f8bbd0")};
      cursor: pointer;
      color: #fff;
    }
  }
  @media (max-width: 600px) {
    position: relative;
  }
`;

export const TableData = styled.td`
  min-width: 150px;
  padding: 0px 10px;
  z-index: -1;
  width: inherit;

  .clickeable {
    cursor: pointer;
    &:hover {
      /* font-weight: bold; */
    }
  }
  .content {
    padding: 5px 10px;

    &__flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__more {
      .txt-lastracking {
        font-size: 0.8em;
        color: #616161;
      }

      .txt-createdAt {
        font-size: 0.8em;
        color: #616161;
      }
      span {
        font-size: 0.8em;
      }
    }
    .name {
      color: #0d47a1;
      font-weight: bold;
      font-size: 0.9em;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .email {
      color: gray;
      font-size: 0.7em;
    }

    .icon-bg {
      .openprospect {
        width: 15px;
        height: 15px;

        &:hover {
          cursor: pointer;

          color: #0d47a1;
        }
      }
    }
  }

  .capitalize {
    text-transform: capitalize;
  }

  .phase {
    text-transform: uppercase;
    border-radius: 4px;
    color: #fff;
    padding: 4px 4px;

    .phase-title {
      font-size: 0.8em;
      font-weight: normal;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
  }

  /* .phone {
  cursor: pointer;
} */

  .notasigned {
    color: #424242;
  }
`;

const StyledPopOver = styled.div`
  .popover {
    &__header {
      display: flex;
      align-items: center;

      .title {
        font-weight: 500;
        padding: 5px 5px 10px 10px;
      }

      .icon {
        margin-top: -4px;
        font-size: 15px;
        color: #103c82;
      }
    }

    &__item {
      display: flex;
      align-items: center;
      padding: 10px;
      transition: 0.3s;

      .icon {
        color: green;
        font-size: 17px;
        margin-right: 5px;
      }

      .title {
        font-weight: 500;
        font-size: 13px;
      }

      .icon-arrow {
        font-size: 25px;
        transition: 0.3s;
        margin-left: 5px;
        color: grey;
      }
      &:hover {
        cursor: pointer;
        background-color: rgb(220, 225, 246, 0.4);
        .icon-arrow {
          font-size: 25px;
          color: #103c82;
          transform: translateX(4px);
        }
      }
    }
  }
`;

// TODO  SETTINGS

export const StyledMenu = styled(Menu)`
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-elevation8 {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 9%), 0px 8px 10px 1px rgb(0 0 0 / 1%), 0px 3px 5px 2px rgb(0 0 0 / 5%);
  }

  .options {
    display: flex;
    flex-direction: column;

    &__option {
      padding: 5px 10px;
      display: flex;
      align-items: center;
      p {
        display: flex;
        color: #000;
        text-transform: capitalize;
        font-weight: 500;
      }

      svg {
        color: #f97faa;
        margin-right: 5px;
      }
      &:hover {
        transition: all 0.3s ease;
        background: #fae0e9;
        cursor: pointer;
      }
    }
  }
`;
