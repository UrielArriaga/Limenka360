import React from "react";
import { ListOrdersStyled } from "./styles";
import { Pagination, Skeleton } from "@material-ui/lab";
import { getColor } from "../../../DirLogPedidos/utils";
import { Tooltip } from "@material-ui/core";
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

export default function ListInventory({
  orderSelected = null,
  data = [],
  isSelectable = false,
  onRowClick = null,
  paginationData,
  isFetchingData,
  rowsLoader = 20,
}) {
  const cutName = (name = "") => {
    if (name.length > 30) {
      return `${name.slice(0, 30)}...`;
    }
    return name;
  };
  return (
    <ListOrdersStyled>
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
                  <div className="card__column--name">
                    <Tooltip title={item.name}>
                      <p>{cutName(item.name)}</p>
                    </Tooltip>
                  </div>
                  <div className="card__column--folio">
                    <p>{item.serialnumber}</p>

                    <p>Entrada: {item?.entrydate}</p>
                  </div>
                </div>
                {item?.statusrepair === true && (
                  <div className="card__status">
                    <p>En Reparacion</p>
                  </div>
                )}
                {item?.isapart === true && (
                  <div className="card__statusApart">
                    <p>En Apartado</p>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {paginationData && (
        <Pagination
          count={Math.ceil(paginationData.total / paginationData.limit)}
          onChange={(e, value) => paginationData.handlePage(value)}
          page={paginationData.page}
          size="small"
          color="primary"
        />
      )}
    </ListOrdersStyled>
  );
}
