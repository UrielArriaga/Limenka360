import { IconButton } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import React from "react";
import styled from "styled-components";

export default function PaginationTableHome({ title, page, count, limit, handlePage }) {
  return (
    <PaginationTableHomeStyled className="bottom">
      <div className="counter">
        <p className="total">{`Total de ${title}: ${count}`}</p>
      </div>
      <div className="pagination">
        <p className="totalPage">{`Paginas: ${page} - ${Math.ceil(count / limit)}`}</p>

        <IconButton
          color="primary"
          disabled={page <= 1 ? true : false}
          className="btn pagination__before"
          onClick={() => {
            handlePage(page - 1);
          }}
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          color="primary"
          disabled={page >= Math.ceil(count / limit) ? true : false}
          className="btn pagination__next"
          onClick={() => {
            handlePage(page + 1);
          }}
        >
          <NavigateNext />
        </IconButton>
      </div>
    </PaginationTableHomeStyled>
  );
}

const PaginationTableHomeStyled = styled.div`
  padding-bottom: 10px;
  padding-top: 10px;
  font-size: 14px;
  color: #585858;
  font-weight: 500;
  .pagination {
    display: flex;
    align-items: center;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    padding: 0;
    background: #f3f3f3;
    width: 30px;
    height: 30px;
    background: #f3f3f3;
    border-radius: 8px;
    margin-right: 5px;
    margin-left: 10px;
  }
`;
