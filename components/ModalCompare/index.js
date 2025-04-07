import React from "react";
import styled from "styled-components";
import { Avatar, Dialog, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { URL_SPACE } from "../../services/api";
import { formatNumberNoSymbol } from "../../utils";

// #region constants
const MAIN_COLOR = "rgba(58, 173, 230, 1)";
const MAIN_COLOR_GRADIENT = "rgba(58, 173, 230, 0.2)";

const rowsExecutives = [
  { value: "oportcount", name: "Oportunidades" },
  { value: "paymentsAmount", name: "Pagos" },
  { value: "totalPayments", name: "Total de pagos" },

  { value: "salesAmount", name: "Ventas" },
];

const rowsGroups = [
  { value: "totalAmount", name: "Total vendido" },
  { value: "totalProspects", name: "Total de prospectos" },
  { value: "totalClients", name: "Total clientes" },
  { value: "totalQuotes", name: "Cotizaciones activas" },
  { value: "totalOportunities", name: "Total oportunidades" },
  { value: "totalSales", name: "Total ventas" },
];

// #endregion

// #region styled-components
const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  max-height: 650px;
  max-width: 550px;

  display: flex;
  flex-direction: column;
  overflow: scroll;
  transition: all 0.6s ease;
  .headerDialog {
    padding: 0;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background: #0c203b;
    justify-content: space-between;

    &__title {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.05em;
    }
    &__loader {
      color: #fff;
    }
  }
  .btn {
    color: white;
  }
  .bodyDialog {
    padding: 20px;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  .item {
    width: 8em;
    height: 5em;
    &-side {
      .content {
        display: flex;
        justify-content: center;
      }
    }
    &-center {
      display: flex;
      justify-content: center;
      &-vs {
        line-height: 3.5em;
        text-align: center;
      }
    }
  }

  .header {
    display: flex;
    justify-content: center;
    &-username {
      font-size: small;
      color: gray;
    }
  }
`;

const BodyContainer = styled.div`
  width: 100%;
  .wrapper {
    overflow: scroll;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    order: 1px solid black;
    border-bottom: 1px solid #eee;
    background-color: ${props => (props.isPair ? "#efefef" : "#fffafa")};
  }

  .left {
    background: -moz-linear-gradient(left, ${MAIN_COLOR} 40%, ${MAIN_COLOR_GRADIENT} 60%);
    background: -webkit-linear-gradient(left, ${MAIN_COLOR} 40%, ${MAIN_COLOR_GRADIENT} 60%);
    background: linear-gradient(to right, ${MAIN_COLOR} 40%, ${MAIN_COLOR_GRADIENT} 60%);
  }

  .right {
    background: -moz-linear-gradient(left, ${MAIN_COLOR_GRADIENT} 40%, ${MAIN_COLOR} 60%);
    background: -webkit-linear-gradient(left, ${MAIN_COLOR_GRADIENT} 40%, ${MAIN_COLOR} 60%);
    background: linear-gradient(to right, ${MAIN_COLOR_GRADIENT} 40%, ${MAIN_COLOR} 60%);
  }

  color: #1a1a1a;

  .item {
    height: 4em;
    min-width: 33%;
    &-side {
      .content {
        display: flex;
        justify-content: center;
      }
    }
    &-center {
      display: flex;
      justify-content: center;
      &-vs {
        line-height: 4em;
        text-align: center;
      }
    }
  }

  .header {
    display: flex;
    justify-content: center;
    &-username {
      font-size: small;
      color: gray;
    }
  }
`;

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = { isExecutive: false };

/**
 *
 */
const ModalCompare = ({ open, setOpen, toCompare, isExecutive }) => {
  // #region Handlers

  // #endregion

  const handleClose = () => {
    setOpen(false);
  };

  const getValue = val => {
    if (!val) return 0;
    return Number(val);
  };

  function ArrayValues() {
    let currentsRows = isExecutive ? rowsExecutives : rowsGroups;
    const valueElements = currentsRows.map((value, index) => (
      <BodyCompare
        key={index}
        leftContent={getValue(toCompare[0][`${value.value}`])}
        rightContent={getValue(toCompare[1][`${value.value}`])}
        property={value.name}
        index={index}
      />
    ));
    return valueElements;
  }
  if (toCompare[0] === undefined || toCompare[1] === undefined) {
    return <></>;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">Comparar</p>
          <IconButton onClick={handleClose} className="btn">
            <Close />
          </IconButton>
        </div>
        <div className="bodyDialog">
          <HeaderCompare toCompare={toCompare} />
          {ArrayValues()}
        </div>
      </DialogContainer>
    </Dialog>
  );
};

ModalCompare.propTypes = propTypes;
ModalCompare.defaultProps = defaultProps;
// #endregion

export default ModalCompare;

const HeaderCompare = ({ toCompare }) => {
  return (
    <HeaderContainer>
      <div className="item item-side">
        <div className="content">
          <Avatar src={toCompare[0]?.photo ? URL_SPACE + toCompare[0]?.photo : ""} />
        </div>
        <div className="header">
          <p className="header-username">{toCompare[0]?.fullname ? toCompare[0]?.fullname : toCompare[0]?.name}</p>
        </div>
      </div>

      <div className="item item-center">
        <p className="item-center-vs">VS</p>
      </div>

      <div className="item item-side">
        <div className="content">
          <Avatar src={toCompare[1]?.photo ? URL_SPACE + toCompare[1]?.photo : ""} />
        </div>
        <div className="header">
          <p className="header-username">{toCompare[1]?.fullname ? toCompare[1]?.fullname : toCompare[1]?.name}</p>
        </div>
      </div>
    </HeaderContainer>
  );
};

function getDif(leftContent, rightContent) {
  if (+leftContent === +rightContent) return "";
  return +leftContent < +rightContent ? "right" : "left";
}

const BodyCompare = ({ leftContent, property, rightContent, index }) => {
  return (
    <BodyContainer isPair={index % 2 == 0}>
      <div className={`wrapper ${getDif(leftContent, rightContent)}`}>
        <div className="item item-center">
          <p className="item-center-vs">{formatNumberNoSymbol(+leftContent)}</p>
        </div>

        <div className="item item-center">{<p className="item-center-vs">{property}</p>}</div>

        <div className="item item-center">
          <p className="item-center-vs">{formatNumberNoSymbol(+rightContent)}</p>
        </div>
      </div>
    </BodyContainer>
  );
};
