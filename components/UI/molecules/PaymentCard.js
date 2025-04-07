import { FiberManualRecord, Today } from "@material-ui/icons";
import styled from "styled-components";
import { formatNumber, formatDate, checkIfItExpired } from "../../../utils";
import { Skeleton } from "@material-ui/lab";

export default function PaymentCard({ payment, fetching }) {
  const paymentStatusColor = (paymentStatus, expired) => {
    if (paymentStatus) {
      return <p className="green">Pagado</p>;
    } else if (expired == "-") {
      return <p className="yellow">No Pagado</p>;
    } else if (expired == "Expirado") {
      return <p className="red">No Pagado</p>;
    }
  };

  return (
    <ComponentStyle>
      {!payment ? (
        <div>
          <img src="/empty_table.svg" />
          <p>No hay datos</p>
        </div>
      ) : !fetching ? (
        payment?.map((item, index) => (
          <div key={index} style={{ padding: 5 }}>
            <div className="target_tracing">
              <div className="top">
                <div className="item">
                  {/* <FiberManualRecord className="icon" /> */}
                  <p className="num">{index + 1}</p>
                  <span className="span">Monto: {formatNumber(item.payment)}</span>
                </div>
                <div className="item">
                  <Today className="icon" />
                  <p className="date">{`Fecha limite: ${formatDate(item.date)}`}</p>
                </div>
              </div>
              <div className="top">
                <div>
                  <span className="span">Estado del vencimiento</span>
                  <p>{checkIfItExpired(item?.date)}</p>
                </div>
                <div>
                  <span className="span">Estado del pago</span>
                  <div>{paymentStatusColor(item.ispaid, checkIfItExpired(item.date))}</div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Skeleton variant="rect" height={100} />
      )}
    </ComponentStyle>
  );
}

const ComponentStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  overflow-x: auto;
  padding: 0px 10px;
  padding-bottom: 10px;
  /* max-height: 420px; */
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

  .target_tracing {
    padding: 10px;
    height: 100px;
    width: 100%;
    min-width: 320px;
    /* max-width: 350px; */
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

  img {
    height: 100px;
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
    font-size: 12px;
  }

  .red {
    color: #ff0000;
  }

  .green {
    color: #88c82d;
  }

  .yellow {
    color: #febc11;
  }
  .num {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3f51b5;
    color: #fff;
    border-radius: 10px;
    width: 18px;
    height: 18px;
    font-size: 12px;
    margin-right: 5px;
  }
`;
