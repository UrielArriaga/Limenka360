import styled from "styled-components";

export const DrawerContainer = styled.div`
  padding: 16px;
  width: 550px;

  p {
    font-size: 14px;
  }

  .indication {
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    color: #495057;
    display: block;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 10px 23px 9px 11px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  select {
    width: 100%;
    height: 42px;
    margin-top: 10px;
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    color: #495057;
    display: block;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 10px 23px 9px 11px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin-top: 10px;

  th,
  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
    font-size: 14px;
  }

  thead {
    background-color: #405189;
    color: #fff;
  }

  tr {
    border-bottom: 2px solid #e0e0e0;
  }
`;
