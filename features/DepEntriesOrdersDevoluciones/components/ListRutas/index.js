import React from "react";
import { ListRouteStyled } from "./styles";
import { Pagination, Skeleton } from "@material-ui/lab";
function CardLoader({ rowsLoader = 20, isSelectable = false }) {
  return [...Array(rowsLoader).keys()].map((item, index) => {
    return (
      <div key={index} className={`card card-loader`}>
        {isSelectable && (
          <div className="card__isselectable">
            <input type="checkbox" />
          </div>
        )}

        <div className="card__column">
          <div className="card__column--name">
            <Skeleton style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="card__column--folio">
            <Skeleton style={{ width: "100%", height: "100%" }} />
          </div>
        </div>

        <div className="card__status">
          <Skeleton style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    );
  });
}

export default function ListRutas({
  orderSelected = null,
  data = [],
  isSelectable = false,
  onRowClick = null,
  paginationData,
  isFetchingData,
  rowsLoader = 20,
}) {
  return (
    <ListRouteStyled>
      <div className="listitems">
        {isFetchingData && <CardLoader rowsLoader={rowsLoader} isSelectable={isSelectable} />}
        {!isFetchingData &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className={`card ${orderSelected && orderSelected.folio === item.brand && "card-selected"} `}
                onClick={() => onRowClick(item)}
              >
                {isSelectable && (
                  <div className="card__isselectable">
                    <input type="checkbox" />
                  </div>
                )}

                <div className="card__column">
                  <div className="card__column--name">{item.createdAt}</div>
                  <div className="card__column--name">{item.warehouse}</div>
                </div>
              </div>
            );
          })}
      </div>

      {paginationData && (
        <div className="pagination">
          <Pagination
            count={Math.ceil(paginationData.total / paginationData.limit)}
            onChange={(e, value) => paginationData.handlePage(value)}
            page={paginationData.page}
            size="small"
            color="primary"
          />
        </div>
      )}
    </ListRouteStyled>
  );
}
