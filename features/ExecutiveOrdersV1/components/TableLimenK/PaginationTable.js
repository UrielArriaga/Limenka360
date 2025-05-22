import { Pagination } from "@material-ui/lab";
import React from "react";

export default function PaginationTable({
  paginationData = {
    total: 0,
    limit: 20,
    page: 1,
    handlePage: () => {},
  },
}) {
  return (
    <div className="pagination">
      {paginationData && paginationData.total > 20 && (
        <Pagination
          variant="outlined"
          count={Math.ceil(paginationData.total / paginationData.limit)}
          onChange={(e, value) => paginationData.handlePage(value)}
          size="small"
          page={paginationData.page}
          color="primary"
        />
      )}
    </div>
  );
}
