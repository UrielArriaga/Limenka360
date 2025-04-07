import React, { useEffect } from "react";
import styled from "styled-components";
import { formatDate } from "../../utils";
import NumberFormat from "react-number-format";
import { LinearProgress, Tooltip } from "@mui/material";
import { toUpperCaseChart } from "../../utils";
import { Delete } from "@material-ui/icons";
export default function TableGoals(data) {
  const validateName = (ejecutive, group, company) => {
    if (ejecutive !== null) return `${toUpperCaseChart(ejecutive?.name)} ${toUpperCaseChart(ejecutive?.lastname)} (${ejecutive?.email})`;
    if (group !== null) return toUpperCaseChart(group?.name);
    if (company !== null) return toUpperCaseChart(company?.company);
  };
  const checkrow = (number) => {
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };
  const calculateProgress = (progress, finalgoal, goal) => {
    let total = (progress * 100) / finalgoal;
    return (
      <div className="footerProgress">
        <p>{goal?.alias === undefined ? "Sin Nombre" : goal?.alias}</p>
        {progress > finalgoal ? <LinearProgress color="secondary" variant="determinate" value={100} /> : <LinearProgress variant="determinate" value={total} />}

        <div className="footerProgress__barInfo">
          <p className="footerProgress__barInfo__title">{goal?.goalname?.name === undefined ? "Sin Nombre" : goal?.goalname?.name}</p>
          <p className="footerProgress__barInfo__porcent">
            <NumberFormat value={total.toFixed(0)} displayType="text" thousandSeparator={true} />%
          </p>
        </div>
      </div>
    );
  };
  return (
    <TableGoalsStyle>
      <div className="table">
        {data.isLoadingTable === true ? (
          <>
            <table className="ctr_table">
              <thead className="ctr_table__head">
                <tr className="ctr_table__head__tr">
                  <th className="title checkbox">
                    <div className="ctr_title">
                      <p>Responsable</p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p>Avance / Meta</p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p>Periodo</p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p>Metas</p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p>Opciones</p>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
            <div className="ctr_load">
              <div className="ctr_load__img">
                <img src="/load.png" />
              </div>
              <div className="ctr_load__load">
                <p>Cargando</p>
                <LinearProgress color="primary" />
              </div>
            </div>
          </>
        ) : (
          <>
            <table className="ctr_table">
              <thead className="ctr_table__head">
                <tr className="ctr_table__head__tr">
                  <th className="title checkbox">
                    <div className="ctr_title">
                      <p>Responsable</p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p>Avance / Meta</p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p>Periodo</p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p>Metas</p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p>Opciones</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="ctr_table__body">
                {data.dataGoals?.map((item, index) => (
                  <tr key={index} className={checkrow(index) ? "row" : "inpar row"}>
                    <td className="data fixed">
                      <p className="ctr_td">{validateName(item.ejecutive, item.group, item.company)}</p>
                    </td>
                    <td className="data">
                      <p className={`ctr_td`}>
                        <NumberFormat value={item.progress} displayType="text" thousandSeparator={true} /> /{" "}
                        <NumberFormat value={item.finalgoal} displayType="text" thousandSeparator={true} />
                      </p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{formatDate(item.initialperiodate)}</p>
                      <p className="ctr_td">{formatDate(item.finalperiodate)}</p>
                    </td>
                    <td className="data">{calculateProgress(item.progress, item.finalgoal, item.goal)}</td>
                    <td className="data">
                      <p className="ctr_td">
                        <Tooltip title="Eliminar" arrow>
                          <Delete className="iconDelete" onClick={() => data.handleDeleteGoal(item)} />
                        </Tooltip>
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.totalGoals <= 0 && (
              <div className="body_empty">
                <div className="message_ctr">
                  <img src="/empty_table.svg" />
                  <p>Aun no hay datos</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </TableGoalsStyle>
  );
}

const TableGoalsStyle = styled.div`
  .table {
    width: 100%;
    max-height: 55vh;
    overflow-x: auto;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
    .ctr_table {
      border-spacing: 0;
      margin: auto;
      width: inherit;

      &__head {
        position: sticky;
        top: 0;
        z-index: 50;
        &__tr {
          background-color: #dce1f6;
          padding: 5px 10px;
          height: 40px;
          .checkbox {
            position: sticky;
            left: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 3px 5px;
            background-color: #405189;
            color: #fff;
            min-width: 250px;
            height: inherit;
            .MuiFormControlLabel-root {
              margin-right: 5px;
            }
            @media (max-width: 600px) {
              min-width: 100px;
              position: relative;
            }
          }
          .title {
            text-transform: capitalize;
            padding: 0 10px;
            .ctr_title {
              display: flex;
              align-items: center;
              width: max-content;
              /* min-width: 150px; */
            }
          }
        }
      }
      &__body {
        .row {
          background: #fff;
          font-weight: bold;
          color: #2c2c2c;
          transition: all 0.3s ease;
          min-height: 50px;

          .fixed {
            position: sticky;
            left: 0;
            background: #fff;
            transition: all 0.3s ease;
            @media (max-width: 600px) {
              position: relative;
            }
          }
          .data {
            font-size: 14px;
            padding: 0 10px;
            .ctr_td {
              display: flex;
              align-items: center;
              min-height: 42px;
              .span {
                width: 100%;
                cursor: pointer;
              }
              .iconDelete {
                &:hover {
                  cursor: pointer;
                }
              }
            }
            .capitalize {
              text-transform: capitalize;
            }
            .select {
              cursor: pointer;
            }
            .ejecutive {
              display: flex;
              align-items: center;
              min-height: 42px;
              text-transform: capitalize;
              cursor: pointer;
              justify-content: center;
            }
            .ctr_icon_complete {
              justify-content: center;
              svg {
                cursor: pointer;
                width: 25px;
                height: 25px;
                padding: 5px;
                background: #103c82;
                color: #fff;
                border-radius: 50%;
              }
            }
            .ctr_icon_incomplete {
              justify-content: center;
              svg {
                cursor: pointer;
                width: 25px;
                height: 25px;
                padding: 5px;
                background: #8a8a8a;
                color: #fff;
                border-radius: 50%;
              }
            }
            .footerProgress {
              &__barInfo {
                display: flex;
                justify-content: space-between;
                &__title {
                  font-weight: 500;
                }
                &__porcent {
                  font-weight: 500;
                }
              }
            }
          }
          &:hover {
            background: #d8dbe6;
            opacity: 0.8;
            color: #000;
            .fixed {
              background: #d8dbe6;
            }
          }
        }
        .inpar {
          background: #f3f3f3;
          .fixed {
            background: #f3f3f3;
          }
          .options-td {
            background: #f3f3f3;
          }
        }
      }
    }
    .body_empty {
      position: relative;
      width: 100%;
      padding: 40px;
      height: 250px;
      .message_ctr {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        p {
          text-align: center;
          color: #8a8a8a;
        }
      }
    }
    .ctr_load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 50px;
      &__img {
        width: 150px;
        animation: slide_img 3s infinite;
        img {
          width: 100%;
          object-fit: contain;
        }
      }
      &__load {
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 30px;
        width: 200px;
        p {
          text-align: center;
          font-weight: bold;
        }
      }
      @keyframes slide_img {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(10px);
        }
        100% {
          transform: translateY(0px);
        }
      }
    }
  }
  .css-17282r-MuiLinearProgress-bar1 {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    transition: transform 0.4s linear;
    transform-origin: left;
    background-color: #1bb603;
  }
`;
