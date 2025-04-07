import { Pagination } from "@material-ui/lab";
import React from "react";

function PaginationtTable({paginationData,budgets}) {
  return (
    <div className="ctr_prospects__tfooter">
      <div className="ctr_prospects__tfooter__ctr_button"></div>
      <div className="ctr_prospects__tfooter__ctr_pagination">
        <p className="">{`Total de Prospectos: ${budgets?.total} Página: ${paginationData?.page} - ${Math.ceil(
          budgets?.total / paginationData?.limit
        )}`}</p>
        <div className="ctr_prospects__tfooter__ctr_pagination__pagination">
          <Pagination
            style={{ display: "flex", justifyContent: "center" }}
            page={paginationData?.page}
            defaultPage={1}
            onChange={paginationData?.handleOnChangePage}
            shape="rounded"
            count={Math.ceil(budgets?.total / paginationData?.limit)}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default PaginationtTable;
