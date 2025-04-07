import React from "react";
import { ProductsStyle } from "./style";
import NumberFormat from "react-number-format";
import { FiberManualRecord, Today } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import { formatDate, formatNumber } from "../../utils";
export default function ProductsOportunity(props) {
  const { products } = props;
  return (
    <ProductsStyle>
      <div className="products_container">
        <div className="products_container__body">
          <div className="products">
            {products.map((item, index) => (
              <div key={index} className="target_tracing">
                <div className="top">
                  <div className="item">
                    <FiberManualRecord className="icon" />
                    <p className="date capitalize">{item?.name}</p>
                  </div>
                  <div className="item">
                    <Today className="icon" />
                    <p className="date">{formatDate(item.createdAt)}</p>
                  </div>
                </div>
                <span className="span">Producto</span>
                <p>{item.product?.name}</p>
                <span className="span">Monto</span>
                <p>{item.newprice === 0 ? formatNumber(item.product?.callamount) : formatNumber(item.newprice)}</p>
                <Box position="absolute" right={10} display="flex" alignItems="center">
                  <span className="span">Cantidad</span>
                  <p style={{ marginLeft: 8 }}>{item.quantity}</p>
                </Box>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProductsStyle>
  );
}
