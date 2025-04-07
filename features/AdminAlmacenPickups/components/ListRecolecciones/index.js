import React from "react";
import { ListRecolecionStyled } from "./styles";
import { Pagination, Skeleton } from "@material-ui/lab";
import dayjs from "dayjs";
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

export default function ListRecolecion({
  orderSelected = null,
  data = [],
  isSelectable = false,
  onRowClick = null,
  paginationData,
  isFetchingData,
  rowsLoader = 20,
}) {
  return (
    <ListRecolecionStyled>
      <div className="listitems">
        {isFetchingData && <CardLoader rowsLoader={rowsLoader} isSelectable={isSelectable} />}
        {!isFetchingData &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className={`card ${orderSelected && orderSelected.folio === item.folio && "card-selected"} `}
                onClick={() => onRowClick(item)}
              >
                {isSelectable && (
                  <div className="card__isselectable">
                    <input type="checkbox" />
                  </div>
                )}

                <div className="card__column">
                  {/* <div className="card__column--name">{item.description}</div> */}
                  <div className="card__column--name">{item.folio}</div>
                  <div className="card__column--name" onClick={() => console.log("--", item)}>
                    {item.createdAt}
                  </div>
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
    </ListRecolecionStyled>
  );
}
