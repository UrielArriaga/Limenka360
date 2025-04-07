import { FiberManualRecord, Today } from "@material-ui/icons";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import { formatNumber } from "../../../../utils";

export default function ProductsQuotesPage({ products }) {
  return (
    <ProductsQuotesPageStyled>
      {products.map((item, index) => {
        return (
          <div key={item.id} className="productCard">
            <div className="top">
              <div className="item">
                <FiberManualRecord className="icon" />
                <p className="date capitalize">{item?.name}</p>
              </div>
              <div className="item">
                <Today className="icon" />
                <p className="date">{dayjs(item.createdAt).format("")}</p>
              </div>
            </div>
            <span className="span">Producto</span>
            <p>{item.product?.name}</p>
            <span className="span">Monto</span>
            <p>{item.newprice === 0 ? formatNumber(item.product?.callamount) : formatNumber(item.newprice)}</p>
            <Box position="absolute" right={10} display="flex" alignItems="center" bottom={10}>
              <span className="span">Cantidad</span>
              <p style={{ marginLeft: 8 }}>{item.quantity}</p>
            </Box>
          </div>
        );
      })}
    </ProductsQuotesPageStyled>
  );
}

const ProductsQuotesPageStyled = styled.div`
  padding: 10px 20px;

  .productCard {
    box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
    background-color: #fff;
    padding: 10px;
    padding: 10px;
    /* height: 210px; */
    /* width: max-content; */
    /* min-width: 320px; */
    /* max-width: 350px; */
    border-radius: 8px;
    position: relative;
    box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
    &::before {
      top: 0px;
      left: 0px;
      width: 5px;
      bottom: 0px;
      content: "";
      position: absolute;
      background-image: linear-gradient(
        to right bottom,
        #3f51b5,
        #2d499e,
        #1e4086,
        #13376f,
        #0e2d58,
        #122d55,
        #142c51,
        #172c4e,
        #20355c,
        #2a3e6b,
        #35487a,
        #405189
      );
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      .item {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .icon {
          color: #3f51b5;
          font-size: 16px;
        }
        .date {
          font-size: 12px;
          font-weight: bold;
          color: #0c203b;
        }
        .capitalize {
          text-transform: capitalize;
        }
      }
    }
    .span {
      font-weight: bold;
      letter-spacing: 0.03em;
      font-size: 11px;
    }
  }
`;
// import React from "react";

// export default function ProductsQuotesPage() {
//   return <div>ProductsQuotesPage</div>;
// }
