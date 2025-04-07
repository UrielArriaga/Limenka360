import { Box } from "@material-ui/core";
import { FiberManualRecord, Today } from "@material-ui/icons";
import styled from "styled-components";
import { formatNumber, formatDate } from "../../../utils";

export default function Target({ products }) {
  return (
    <ComponentStyle>
      {!products ? (
        <div>
          <img src="/empty_table.svg" />
          <p>No hay datos</p>
        </div>
      ) : (
        products?.map((item, index) => (
          <div key={index} style={{ padding: 5 }}>
            <div className="target_tracing">
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
          </div>
        ))
      )}
    </ComponentStyle>
  );
}

const ComponentStyle = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;
  padding: 0px 10px;
  padding-bottom: 10px;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #0c203b;
  }

  img {
    height: 100px;
  }

  .target_tracing {
    padding: 10px;
    height: 210px;
    width: max-content;
    min-width: 320px;
    max-width: 350px;
    border-radius: 8px;
    position: relative;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }

  .target_tracing::before {
    top: 0;
    left: 0;
    width: 5px;
    bottom: 0;
    content: "";
    position: absolute;
    background: linear-gradient(
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

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

  .span {
    font-weight: bold;
    letter-spacing: 0.03em;
    font-size: 11px;
  }
`;
