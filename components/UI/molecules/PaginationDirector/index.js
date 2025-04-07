import { IconButton } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
export default function PaginationDirector({ page, count, limit, handlePage }) {
  return (
    <PaginationDirectorStyled className="bottom">
      <div className="counter">
        <p className="total">{`Total de ejecutivos: ${count}`}</p>
      </div>
      <div className="pagination">
        <p className="totalPage">{`Paginas: ${page} - ${Math.ceil(count / limit)}`}</p>

        <IconButton
          color="primary"
          disabled={page <= 1 ? true : false}
          className="pagination__before"
          onClick={() => handlePage(page - 1)}
        >
          <NavigateBefore />
        </IconButton>

        <IconButton
          color="primary"
          disabled={page >= Math.ceil(count / limit) ? true : false}
          className="pagination__next"
          onClick={() => handlePage(page + 1)}
        >
          <NavigateNext />
        </IconButton>
      </div>
    </PaginationDirectorStyled>
  );
}

const PaginationDirectorStyled = styled.div`
  .pagination {
    display: flex;
    align-items: center;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
