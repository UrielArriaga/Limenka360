import { Tooltip } from "@material-ui/core";
import { FiberManualRecord, Launch, Timeline, Today } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { formatDate, formatNumber } from "../../../../utils";
export default function QuotesClientsPage({ quotesClients, selected }) {
  const router = useRouter();
  const show_by_default = 20;
  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showAll ? quotesClients.length : show_by_default;
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleClickProspect = item => {
    router.push({ pathname: "/oportunidades/[oportunidad]", query: { oportunidad: item.prospect.id } });
  };
  return (
    <SalesPageStyled>
      {quotesClients.length === 0 && (
        <div className="emptymessage">
          <p>No hay cotizaciones por el momento</p>
        </div>
      )}

      {quotesClients.slice(0, visibleOptions).map((item, index) => (
        <div key={item.id} className="salesCard">
          <div className="top">
            <div className="item">
              <FiberManualRecord className="icon" />
              <p className="date capitalize">cotización #{index + 1}</p>
              <Tooltip title="Ver Cotización">
                <Launch className="redirec" onClick={() => handleClickProspect(item)} />
              </Tooltip>
            </div>
            <div className="item">
              <Today className="icon" />
              <p className="date">{formatDate(item?.createdAt)}</p>
            </div>
          </div>
          <div className="grid2">
            <div>
              <span className="span">Concepto:</span>
              <p> {item.concept}</p>
            </div>
            <div>
              <span className="span">Monto:</span>
              <p> {formatNumber(item.amount)}</p>
            </div>
          </div>
          <div className="products" style={{ width: "100%" }}>
            <p className="bold">Productos ({item.productsoportunities?.length}):</p>
            <div className="containerProducts">
              {item.productsoportunities &&
                item.productsoportunities.map(
                  (pro, i) =>
                    i < item.productsoportunities.length && (
                      <p className="products" key={pro.id}>
                        {i + 1 + ") "} {pro.product.name}
                      </p>
                    )
                )}
            </div>
          </div>
          <span className="span">Observación:</span>
          <br />
          {item.observations ? <p>{item.observations.slice(0, 80)}</p> : <p>N/A</p>}
        </div>
      ))}
      {quotesClients.length > show_by_default && (
        <div className="containerButtons">
          <button className="viewMore" onClick={toggleShowAll}>
            {!showAll ? `+${quotesClients.length - show_by_default} Ver Más` : "Ver Menos"}
          </button>
        </div>
      )}
    </SalesPageStyled>
  );
}

const SalesPageStyled = styled.div`
  padding: 10px 20px;

  .salesCard {
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
    margin-bottom: 15px;
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
        .redirec {
          width: 25px;
          height: 25px;
          padding: 5px;
          color: #103c82;
          border-radius: 50%;
          margin-left: 5px;
          &:hover {
            margin-left: 5px;
            width: 25px;
            height: 25px;
            padding: 5px;
            background: #dce1f6;
            color: #103c82;
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
    }
    .span {
      font-weight: bold;
      letter-spacing: 0.03em;
      font-size: 11px;
    }
  }
  .containerButtons {
    width: 100%;
    display: flex;
    justify-content: center;
    .viewMore {
      cursor: pointer;
      background-color: #103c82;
      border: none;
      color: white;
      padding: 10px 5px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 12px;
      border-radius: 6px;
    }
  }

  .emptymessage {
    p {
      color: #9e9e9e;
      text-align: center;
    }
  }
  .products {
    margin-bottom: 3px;
    margin-top: 6px;
    .containerProducts {
      height: 45px;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        width: 4px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
      }
      ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 20px #585858;
      }
    }
    p {
      letter-spacing: 0.03em;
      font-size: 11px;
    }

    .bold {
      font-weight: bold;
    }

    .icon {
      background-color: #3f51b5;
      color: #fff;
      border-radius: 8px;
    }
  }
`;
