import React from "react";
import { ListOrdersStyled } from "./styles";
import { getColor } from "../../utils";
import { Pagination, Skeleton } from "@material-ui/lab";
import { getColorStatusOrder } from "../../../../utils/DirLog";
import { SupervisedUserCircle } from "@material-ui/icons";

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

export default function ListOrders({
  data = [],
  isSelectable = false,
  paginationData,
  rowsLoader = 10,
  isLoading = false,
}) {

  // console.log(data, " dataaaaaaaa");
  
  return (
    <ListOrdersStyled>
      <div className="titleTable">
        <h3>Pendientes por Realizar
          <SupervisedUserCircle className="CountOrdersIcon"/>
        </h3>
      </div>
      <div className="listitems">
        {isLoading && <CardLoader rowsLoader={rowsLoader} isSelectable={isSelectable} />}
        {!isLoading &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className={`card`}
                // onClick={() => onRowClick(item)}
              >
                {isSelectable && (
                  <div className="card__isselectable">
                    <input type="checkbox" />
                  </div>
                )}

                <div className="card__column">
                  <div className="card__column--name">  {item?.title}</div>
                  <div className="card__column--folio">
                    {/* <p>{item.folio}</p> */}

                    <p className="pendigsType">{item?.detailsPending?.pendingstype?.name}</p>
                  </div>
                </div>

                <div
                  className="card__status"
                >
                  <p
                    style={{
                      color:"black",
                    }}
                  >
                    {item?.detailsPending?.description != "" ? item?.detailsPending?.description:"Sin descripcion" }
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
            onChange={(e, value) => paginationData.handlePage(e,value)}
            page={paginationData.page}
            size="small"
            color="primary"
          />
        </div>
      )}
    </ListOrdersStyled>
  );
}
