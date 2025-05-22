import { Grid, Icon, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { formatNumber } from "../../../../utils";
import { AttachMoney, Close, Info } from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { documentsFiles } from "../../../ExecutiveOrders/data";
// import { documentsFiles } from "../../data";

export default function InfoOrders({ oportunity, orderData, selectedTypeSale, typesale = "N/A" }) {
  // const orderData = order.order;

  const [showInfoSales, setShowInfoSales] = useState(
    JSON.parse(localStorage.getItem("showInfoSales")) === false ? false : true
  );

  // localStorage.getItem("showInfoSales") === "true" ? true : false

  const handleOnClose = () => {
    setShowInfoSales(false);
    localStorage.setItem("showInfoSales", false);
  };

  const handleOnClickShowInfo = () => {
    setShowInfoSales(true);
    localStorage.setItem("showInfoSales", true);
  };

  return (
    <InfoOrdersStyled container>
      <div className="sectionheader">
        <h1 className="title">Datos de la venta {orderData?.folio}</h1>

        {/* <AttachMoney className="icon_primary" /> */}
      </div>

      <Grid container className="info">
        <Grid item xs={12} md={3} className="typesale">
          <div className="items">
            <p className="label">Tipo de venta</p>
            <div className="ctr">
              <p className="paragraph">{typesale?.name || "N/A"}</p>
              <IconButton className="iconButton" onClick={handleOnClickShowInfo}>
                <Info className="icon_primary" />
              </IconButton>
              {showInfoSales && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="infotypesales">
                    <div className="arrow"></div>
                    <div className="headerinfo">
                      <p className="title">Documentos segun el tipo de venta</p>
                      <IconButton className="iconButtonClose" onClick={handleOnClose}>
                        <Close className="icon_primary" />
                      </IconButton>
                    </div>
                    <div className="list">
                      {documentsFiles.map((item, index) => {
                        return (
                          <div key={item.tipo}>
                            <p className={`tipo ${item.tipo === oportunity?.typesale?.name && "selected"}`}>
                              {item.tipo}
                            </p>
                            <ul>
                              {item.documentos.map((doc, i) => {
                                return <li key={i}>{doc}</li>;
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={3}>
          <div className="items">
            <p className="label">Monto total</p>
            <p className="paragraph">{formatNumber(oportunity?.amount)}</p>
          </div>
        </Grid>

        <Grid item xs={12} md={3}>
          <div className="items">
            <p className="label">Comisión total</p>
            <p className="paragraph">{formatNumber(oportunity?.comission)}</p>
          </div>
        </Grid>

        <Grid item xs={12} md={3}>
          <div className="items" style={{ position: "relative" }}>
            <p className="label">Envío</p>
            <p className="paragraph">{formatNumber(oportunity?.totalextracosts)}</p>
          </div>
        </Grid>
      </Grid>
    </InfoOrdersStyled>
  );
}

const InfoOrdersStyled = styled.div`
  .info {
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 8px;
    box-shadow: 0px 6px 15px rgb(64 79 104 / 5%);
    margin: 15px 0px 15px 0px;
  }

  .sectionheader {
    display: flex;
    align-items: center;
    margin: 15px 0px 15px 0px;

    .icon_primary {
      width: 30px;
      height: 30px;
      padding: 5px;

      background: #dce1f6;
      color: #103c82;
      border-radius: 50%;
    }
    p {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;

      color: rgb(86 86 86);
    }
    .title {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
      color: rgb(86 86 86);
    }
  }

  .ctr {
    position: relative;
    display: flex;
    align-items: center;

    .iconButton {
      padding: 0;
      margin-left: 10px;
    }
    /* display: inline-block; */
  }

  .infotypesales {
    position: absolute;
    top: 220%;
    left: 0;
    width: 150px;
    background-color: #fff;

    border-radius: 8px;

    font-size: 14px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    height: 400px;
    width: 700px;
    z-index: 3;
  }

  .infotypesales {
    .headerinfo {
      background-color: #f77132;
      /* padding: 10px; */
      padding-left: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .iconButtonClose {
        /* background-color: #dce1f6; */
        .icon_primary {
          color: #fff;
        }
      }
    }

    .title {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
      color: #fff;
    }
    .list {
      padding: 10px;
      margin-top: 10px;
      overflow-y: auto;
      max-height: 85%;
    }

    .tipo {
      font-size: 16px;
      font-weight: bold;
      color: #000;
      margin-top: 20px;
    }

    .selected {
      color: #f77132;
    }

    ul {
      padding-left: 20px;
    }
  }

  .arrow {
    position: absolute;
    top: -14px;
    left: 1px;
    width: 0;
    height: 0;
    z-index: -1;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 20px solid #f77132;
  }

  .ctr:hover .infotypesales {
    display: block;
  }

  .items {
    display: flex;
    align-content: center;
    flex-direction: column;
    font-size: 15px;
    width: auto;
    padding: 14px 14px 14px 10px;
    .label {
      margin-bottom: 2px;
      font-size: 14px;
      margin-top: 5px;
      margin-bottom: 10px;
      font-weight: 600;
      letter-spacing: 1px;
      color: rgb(86 86 86);
    }
    .paragraph {
      font-weight: 600;
    }
  }
`;
