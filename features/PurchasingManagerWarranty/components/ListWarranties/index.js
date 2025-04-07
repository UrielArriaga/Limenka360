import React from "react";
import { ListOrdersStyled } from "./styles";
import { Pagination, Skeleton } from "@material-ui/lab";
import { getColorStatusOrder } from "../../../../utils/DirLog";

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

export default function ListWarranties({
  warrantySelected = null,
  data = [],
  isSelectable = false,
  onRowClick = null,
  paginationData,
  rowsLoader = 20,
  isLoading = false,
}) {
  return (
    <ListOrdersStyled>
      <div className="listitems">
        {isLoading && <CardLoader rowsLoader={rowsLoader} isSelectable={isSelectable} />}
        {!isLoading &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className={`card ${warrantySelected && warrantySelected?.folio === item?.folio && "card-selected"} `}
                onClick={() => onRowClick(item)}
              >
                {isSelectable && (
                  <div className="card__isselectable">
                    <input type="checkbox" />
                  </div>
                )}

                <div className="card__column">
                  <div className="card__column--name">{item?.name}</div>
                  <div className="card__column--folio">
                    <p>{item.folio}</p>

                    <p>{item?.approvedAt}</p>
                  </div>
                </div>

                <div
                  className="card__status"
                  style={{
                    backgroundColor: getColorStatusOrder(item?.exitstatus).bgColor,
                  }}
                >
                  <p
                    style={{
                      color: getColorStatusOrder(item?.exitstatus).color,
                    }}
                  >
                    {item?.exitstatus}
                  </p>
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
    </ListOrdersStyled>
  );
}
