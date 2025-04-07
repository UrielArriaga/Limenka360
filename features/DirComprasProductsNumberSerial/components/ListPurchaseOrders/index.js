import React from "react";

import { Pagination, Skeleton } from "@material-ui/lab";
import { ListPurchaseOrdersStyled } from "./styled";
import { getColorStatusSHOPPINGORDER } from "../../../../utils/DirLog";
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

export default function ListPurchaseOrders({
  orderSelected = null,
  data = [],
  isSelectable = false,
  onRowClick = null,
  paginationData,
  rowsLoader = 20,
  isLoading = false,
}) {
  return (
    <ListPurchaseOrdersStyled>
      <div className="listitems">
        {isLoading && <CardLoader rowsLoader={rowsLoader} isSelectable={isSelectable} />}
        {!isLoading &&
          data?.map((item, index) => { 
            return (
              <div
                key={index}
                className={`card ${orderSelected && orderSelected.id === item.id && "card-selected"} `}
                onClick={() => onRowClick(item)}
              >
                {isSelectable && (
                  <div className="card__isselectable">
                    <input type="checkbox" />
                  </div>
                )}
                <div className="card__column">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      // marginBottom: 20,
                    }}
                  >
                    <div className="card__column--name">
                      <p>{item.folio}</p>
                      {item?.item?.draft && <span className="badge">Borrador</span>}
                    </div>

                    {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}

                    {/* <div>{item?.statuspoo}</div> */}

                    <div
                      className="TableName"
                      style={{
                        display: "inline-block",
                        padding: "2px 10px",
                        borderRadius: 15,
                        background: getColorStatusSHOPPINGORDER(item.statuspoo).bgColor,
                      }}
                    >
                      <p
                        className="name"
                        style={{
                          color: getColorStatusSHOPPINGORDER(item.statuspoo).color,
                        }}
                      >
                        {item.statuspoo}
                      </p>
                    </div>
                  </div>

                  <div className="card__column--name">
                    <div>Serial: {item?.serial}</div>
                    <div className="card__column--folio">
                      <p>{dayjs(item.data.createdAt).format("DD/MM/YYYY") }</p>
                    </div>
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
    </ListPurchaseOrdersStyled>
  );
}
