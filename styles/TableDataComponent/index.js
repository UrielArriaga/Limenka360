import styled, { css } from "styled-components";
import { Dialog, Menu } from "@material-ui/core";
import { SortableElement } from "react-sortable-hoc";
import { colors } from "../../styles/global.styles";

export const TableComponentStyled = styled.div`
  width: 100%;
  max-height: 59vh;
  min-height: 35vh;
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
  @media (max-width: 1400px) {
    max-height: 45vh;
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

export const TableDataId = styled.td`
  min-width: 250px;
  position: sticky;
  left: 0;
  padding: 5px 10px;
  z-index: 1;

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
  @media (max-width: 600px) {
    position: relative;
  }
`;

export const TableData = styled.td`
  min-width: 150px;
  padding: 0px 10px;
  width: inherit;

  .content {
    display: flex;
    align-items: center;

    .css-1s2u09g-control {
      border: 0px;
      font-weight: bold;
      font-size: 14px;
    }

    .help-text {
      p {
        font-weight: 200;
        font-size: 12px;
        color: #616161;
        margin-bottom: 5px;
      }
    }

    .input-table-blue {
      background-color: #b2dfdb;
      height: 40px;
      border-radius: 4px;
      padding-left: 6px;
      border: 0px solid #bdbdbd;
      font-weight: bold;
      font-size: 14px;
    }

    .input-table {
      height: 40px;
      border-radius: 4px;
      padding-left: 6px;
      border: 1px solid transparent;
      font-weight: bold;
      font-size: 14px;
      background: transparent;
      outline: none;
      transition: 0.1s;
      &:hover {
        border: 1px solid grey;
        background: #fff;
      }
      &:focus-visible {
        border: 1px solid grey;
        background: #fff;
      }
    }

    .select {
      width: 100%;
      &:hover {
        background-color: #fff;
      }
      &:focus-visible {
        .css-tlfecz-indicatorContainer {
          color: grey;
          span.css-1okebmr-indicatorSeparator {
            background-color: grey;
          }
        }
      }
    }
    .css-tlfecz-indicatorContainer {
      color: transparent;
    }
    span.css-1okebmr-indicatorSeparator {
      background-color: transparent;
    }

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

const ContentItem = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 100000000000000 !important;
  .content {
  }
  .actions {
    /* width: 10%; */
  }
  &:hover {
    cursor: move;
    caret-color: ${colors.primaryColor};
  }
`;

export const SortableItem = SortableElement(({ value, position }) => (
  <ContentItem index={position}>
    <div className="content">
      <p>{value}</p>
    </div>
  </ContentItem>
));

export const SortableItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ index }) => (index % 2 == 0 ? "#f3f3f3" : "#ffff")};
  padding-right: 10px;
  .actions {
    .show {
      color: green;
    }
    .noshow {
      color: red;
    }
    &:hover {
      cursor: pointer;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const DialogCustom = styled(Dialog)`
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    width: 100%;
    max-width: 600px;
    overflow: show;
    overflow: hidden;
  }

  .dialog {
    position: relative;

    &__close {
      display: flex;
      align-items: center;
      background: #405189;
      color: #fff;
    }
    &__title {
      width: 100%;
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
  }

  .dialog-list {
    height: 250px;
    overflow-y: scroll;
    position: relative;
  }

  // ! TO DELETE AFTER 1 WEEK
  .tutorial {
    padding: 10px 10px;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      h3 {
        text-align: center;
      }

      svg {
        color: green;
      }
    }
    .description {
      margin-bottom: 10px;
    }

    .image {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
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
