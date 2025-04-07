import { ListProductsStyled } from "./styles";
import { Pagination, Skeleton } from "@material-ui/lab";
import { getColor } from "../../utils";
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
export default function ListProducts({
    productSelect = null,
  data = [],
  onRowClick = null,
  isSelectable = true,
  paginationData,
  rowsLoader = 20,
  isLoading = false,
}) {
  return (
    <ListProductsStyled>
      <div className="container">
        {isLoading && <CardLoader rowsLoader={rowsLoader} isSelectable={isSelectable} />}
      </div>
      {!isLoading &&
        data.map((item, index) => {
          return (
            <div
              key={index}
              className={`card ${productSelect && productSelect.product === item.prduct && "card-selected"} `}
              onClick={() => onRowClick(item)}
            >
              <div className="card__colum">
                <div className="folio">
                  <p className="number">{item.product}</p>
                </div>
              </div>
              <div className="status" style={{backgroundColor: getColor(item.statusrepair).bgColor,}}>
                <p style={{color: getColor(item.statusrepair).color,}}>{item.statusrepair
                }</p>
              </div>
            </div>
          )
        })}
   {paginationData && (
          <div className="pagintion">
          <Pagination 
          count={Math.ceil(paginationData.total / paginationData.limit)}
          onChange={(e, value) => paginationData.handlePage(value)}
          page={paginationData.page}
          size="small"
          color="primary"
          />
          </div>
        )}
    </ListProductsStyled>
  )
}