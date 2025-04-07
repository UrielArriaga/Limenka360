import { Menu } from "@material-ui/core";
import styled, { css } from "styled-components";
import { device } from "../../../../styles/global.styles";

export const TableComponentStyled = styled.div`
  width: 100%;

  overflow-x: ${({ showLoader }) => (showLoader ? "hidden" : "auto")};
  transition: all 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  max-height: 55vh;
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

  #ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    &__img {
      width: 200px;
      animation: slide 3s infinite;
      @media ${device.sm} {
        width: 300px;
      }
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
  left: ${({ hasChecked }) => (hasChecked ? "4em" : "0")};

  /* left: 4em; */
  padding-left: 10px;

  top: 0;
  background: ${props => (props.isSelected ? "secondaryColor" : "#405189")};
  color: ${props => (props.isSelected ? "black" : "#fff")};

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

export const TableHeadSelectColumn = styled.th`
  position: sticky;
  left: 0;
  padding-left: 10px;

  top: 0;
  background-color: transparent;

  width: 4em;
  text-transform: capitalize;
  transition: all 0.3s ease;
  text-align: left;
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
    .disable {
      background-color: lightgray;
      cursor: default;
    }
  }

  @media (max-width: 600px) {
    position: relative;
  }
  @media (max-width: 600px) {
    position: relative;
  }
`;

export const TableSelectColumn = styled.th`
  position: sticky;
  left: 0;
  padding-left: 10px;

  top: 0;
  background-color: #dce1f6;
  background-color: ${props => (props.colors ? " #dce1f6" : "transparent")};

  /* background: ${props => (props.isSelected ? "secondaryColor" : "#405189")};
  color: ${props => (props.isSelected ? "black" : "#fff")}; */

  width: 4em;
  text-transform: capitalize;
  transition: all 0.3s ease;
  text-align: left;
  @media (max-width: 600px) {
    position: relative;
  }
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
export const TableHead = styled.thead`
  position: sticky;
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

export const TableDataSelect = styled.td`
  /* min-width: 250px; */
  min-width: 2em;
  width: 2em;

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

  @media (max-width: 600px) {
    position: relative;
  }
`;
export const TableDataId = styled.td`
  min-width: 250px;
  position: sticky;
  /* cursor: pointer; */
  padding: 5px 10px;
  left: ${({ hasChecked }) => (hasChecked ? "4em" : "0")};

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

  .txt-labelssa {
    .index {
      display: contents;
    }
    .chipView {
      height: 18px;
      background: #d8dbe6;
      padding: 2px;
      text-decoration: underline;
      &:hover {
        border: 1px solid #407aff54;
        cursor: pointer;
      }
    }
    .MuiChip-root.chip {
      height: 18px;
      background: #d8dbe6;
      padding: 2px;
      margin-right: 2px;
    }
    .MuiChip-label {
      overflow: hidden;
      white-space: nowrap;
      padding-left: 9px;
      padding-right: 0px;
      text-overflow: ellipsis;
      color: #0d47a1;
      font-weight: 600;
      font-size: 11px;
    }
    .MuiChip-root .MuiChip-avatar {
      margin-left: 1px;
      margin-right: -6px;
    }
    .fire {
      font-size: 11px;
      padding: -5px;
      height: 10px;
      background: white;
      border-radius: 50%;
      width: 10px;
      height: 10px;
    }
  }

  .txt-label {
    display: flex;
    align-items: baseline;
    .spans {
      font-weight: bold;
      font-size: 12px;
      color: #495057;
      margin-right: 8px;
    }
  }
  .content {
    padding: 5px 10px;

    &__flex {
      display: flex;
      align-items: center;
      /* justify-content: space-between; */
    }
    &__flexlabels {
      display: flex;
      flex-wrap: wrap;
      text-align: justify;
      justify-content: initial;
      align-items: baseline;
      .spans {
        font-weight: bold;
        font-size: 12px;
        color: #495057;
        margin-right: 8px;
      }
    }
    &__flexlabelsss {
      display: flex;
      flex-wrap: wrap;
      text-align: justify;
      justify-content: initial;
      align-items: baseline;
      .spans {
        font-weight: bold;
        font-size: 12px;
        color: #495057;
        margin-right: 8px;
      }
    }

    &__more {
      .txt-labels {
        font-size: 12px;
        color: #616161;
        font-weight: bold;
      }
      .txt-lastracking {
        font-size: 12px;
        color: #616161;
      }

      .txt-createdAt {
        font-size: 11px;
        color: #616161;
      }
      .txt-group {
        font-size: 11px;
        color: #616161;
      }
      span {
        font-size: 12px;
      }
    }
    .name {
      color: #0d47a1;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
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
  /* @media (max-width: 600px) {
    position: relative;
  } */
`;

export const TableData = styled.td`
  min-width: 150px;
  padding: 0px 10px;
  z-index: -1;
  width: inherit;

  .content {
    display: flex;
    align-items: center;
    svg {
      margin-right: 4px;
    }

    .icon_phone {
      color: #4caf50;
      width: 20px;
      height: 15px;
    }

    p {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .phase {
    text-transform: uppercase;
    border-radius: 4px;
    color: #fff;
    padding: 4px 4px;

    .phase-title {
      font-size: 12px;
      font-weight: normal;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
  }

  .phone {
    cursor: pointer;
  }

  .notasigned {
    color: #424242;
  }
`;

export const StyledPopOver = styled.div`
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
export const StyledPopOverView = styled.div`
  .popover {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 500;
        padding: 5px 5px 10px 10px;
      }

      .icon {
        margin-top: -4px;
        font-size: 19px;
        color: #103c82;
        margin-right: 9px;
        &:hover {
          cursor: pointer;
        }
      }
    }

    &__item {
      display: flex;
      align-items: center;
      padding: 3px;

      .label {
        display: flex;
        width: 231px;
      }
      .icon {
        color: #103c82;
        font-size: 22px;
        margin-right: -5px;
      }

      .title {
        font-weight: 500;
        font-size: 13px;
        height: 105px;
        overflow: auto;
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #585858;
        }
      }

      .icon-arrow {
        font-size: 25px;
        transition: 0.3s;
        margin-left: 5px;
        color: grey;
      }
    }
  }
`;
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
    .disable {
      &:hover {
        background: none;
        cursor: not-allowed;
      }
    }
  }
`;
