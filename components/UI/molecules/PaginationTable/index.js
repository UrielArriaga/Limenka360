import { IconButton } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import React from "react";
import styled from "styled-components";
export default function PaginationDirector({ page, count, limit, handlePage, typeOfTitle = "datos", handleRefetch }) {
  return (
    <PaginationDirectorStyled className="bottom">
      <div className="counter">
        <p className="total">{`Total de ${typeOfTitle}: ${count}`}</p>
      </div>
      <div className="pagination">
        <Pagination
          count={Math.ceil(count / limit)}
          page={page}
          onChange={(event, value) => {
            handlePage(value);
            if (handleRefetch) {
              handleRefetch();
            }
          }}
        />
      </div>
    </PaginationDirectorStyled>
  );
}

const PaginationDirectorStyled = styled.div`
  padding: 3px 0;
  .total {
    margin-right: 5px;
    font-size: 14px;
    color: #616161;
    font-weight: 500;
  }
  .pagination {
    display: flex;
    align-items: center;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
