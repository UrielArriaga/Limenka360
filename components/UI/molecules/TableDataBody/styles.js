import styled from "styled-components";

const TableComponentStyled = styled.div`
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
`;

const Table = styled.table`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

const TableHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 50;
`;

const TableRowHead = styled.tr`
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  padding: 5px 10px;
  height: 40px;
`;

const TableBody = styled.tbody`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

const TableRowBody = styled.tr`
  ${(props) =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}

  ${(props) =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `}

    ${(props) =>
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
    ${(props) =>
      props.isPar === true &&
      css`
        background-color: #f5f5f5;
      `}

    ${(props) =>
      props.isPar === false &&
      css`
        background-color: #fff;
      `}

    ${(props) =>
      props.isNew === true &&
      css`
        background-color: #e5efff;
      `}
    &:hover {
      background-color: #d8dbe6;
    }
  }
`;

const TableDataId = styled.td`
  min-width: 250px;
  position: sticky;
  left: 0;
  /* cursor: pointer; */
  padding: 5px 10px;

  ${(props) =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}
  ${(props) =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `}
    ${(props) =>
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
        font-size: 12px;
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

const TableData = styled.td`
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

export {
  TableComponentStyled,
  Table,
  TableHead,
  TableRowHead,
  TableDataId,
  TableData,
  TableBody,
  TableRowBody,
};
