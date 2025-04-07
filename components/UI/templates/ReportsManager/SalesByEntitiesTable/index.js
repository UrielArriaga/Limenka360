import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Switch, Tooltip as TooltipMaterial, Grid, Button } from "@material-ui/core";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { FiberManualRecord } from "@material-ui/icons";
import { formatNumber } from "../../../../../utils";
import PaginationTableHome from "../../../molecules/PaginationTableHome";
import { colors } from "../../../../../styles/global.styles";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SalesByEntitiesTable({ dataEntities, paginationEntites, handleSwtichRequest }) {
  const { values, count, isFetching } = dataEntities;

  const { page, limit, handlePage } = paginationEntites;

  const classes = useStyles();

  if (isFetching) {
    return (
      <ResumeExecutiveStyled>
        <p>cargando</p>
      </ResumeExecutiveStyled>
    );
  }

  return (
    <ResumeExecutiveStyled>
      <div className="top">
        <div className="row">
          <h3>Ventas Por Estado</h3>
          <div className="actionsrow">
            <p>Cotizado</p>
            <Switch
              onChange={e => handleSwtichRequest("ens_t", e.target.checked)}
              className={classes.switchBase}
              checked={dataEntities.showSold}
            />
          </div>
        </div>
      </div>

      <div className="containerResults">
        {values.map((item, index) => {
          return (
            <div key={index}>
              <Grid container className="" key={index}>
                <Grid item md={6} style={{ marginBottom: 10 }}>
                  <p className="titlegroup">{item.name}</p>
                </Grid>
                <Grid item md={6} style={{ marginBottom: 10 }}>
                  <p className="titlegroup">{formatNumber(item?.totalAmount)}</p>
                </Grid>
              </Grid>
              <div className="divider"></div>
            </div>
          );
        })}

        {count === 0 && (
          <div className="overlay_emptydata">
            <div className="message">
              <p>No hay datos para mostrar</p>
            </div>
          </div>
        )}
      </div>

      <PaginationTableHome title="Estados" page={page} count={count} limit={limit} handlePage={handlePage} />
    </ResumeExecutiveStyled>
  );
}

const useStyles = makeStyles(theme => ({
  switchRoot: {
    width: 10,
    height: 26,
  },
  switchBase: {
    color: "#3f51b5",
    "&$checked": {
      color: "#009688",
    },
    "&$checked + $track": {
      backgroundColor: "#009688",
    },
  },
  checked: {},
  track: {},
}));

const CustomizedSwitch = withStyles({
  switchBase: {
    "&$checked": {
      color: "#009688",
    },
    "&$checked + $track": {
      backgroundColor: "#009688",
    },
  },
  checked: {},
  track: {},
})(props => <Switch {...props} />);

const NumberCard = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
  .icon {
    font-size: 12px;
    margin-right: 5px;

    color: ${props => props.bg};
  }
  .title {
    font-size: 12px;
    color: #878a99;
  }
  .total {
    color: #495057;
    font-weight: bold;
    font-size: 12px;
  }
`;

const ResumeExecutiveStyled = styled.div`
  width: 95%;
  min-height: 490px;
  padding: 10px;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  .top {
    display: flex;
    margin-bottom: 20px;
  }
  h3 {
    text-transform: capitalize;
  }
  h3 {
    /* margin-bottom: 20px; */
    color: #495057;
  }
  .divider {
    height: 2px;
    background-color: rgba(73, 80, 87, 0.1);
    margin-bottom: 20px;
  }

  .row {
    /* border: 1px solid red; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .graph {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pie {
    height: 200px;
    width: 100%;
  }

  .values {
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .actionsrow {
    display: flex;
    align-items: center;
  }
  .containerResults {
    min-height: 300px;
    overflow: auto;
    position: relative;
    /* background: red; */
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #9e9e9e;
    }

    .overlay_emptydata {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 210px;
      width: 100%;
      top: 60px;
      position: absolute;
      opacity: 0.8;
      z-index: 1000;

      .message {
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.4);
        width: 80%;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        p {
          margin-bottom: 10px;
        }
        button {
          background-color: ${colors.primaryColor};
        }
      }
    }
  }
  .titlegroup {
    font-weight: bold;
    color: #495057;
    text-transform: capitalize;
  }
  .title {
    color: #495057;
    font-weight: bold;
    font-size: 15px;
  }
  .subtitle {
    font-size: 12px;
    color: #878a99;
  }

  .percentage {
    text-align: right;
    font-size: 12px;
    color: #512da8;
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    .ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .ctr_pagination {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      .total {
        font-weight: 500;
        color: #585858;
        font-size: 14px;
      }
      .pagination {
        display: flex;
        align-items: center;
        .totalPage {
          font-weight: 500;
          color: #585858;
          font-size: 13px;
        }

        &__before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
          svg {
            color: #103c82;
          }
        }
        &__next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
          svg {
            color: #103c82;
          }
        }
      }
    }
  }
`;
