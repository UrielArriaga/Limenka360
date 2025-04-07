import { Button, CircularProgress, Dialog, Grid, LinearProgress } from "@material-ui/core";
import { Cached, ChatBubble, Comment, LabelImportant, NavigateBefore, NavigateNext, TableChartOutlined, Today, TrendingUp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import TableCustom from "../TableCustom";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { capitalizeString, formatDate, formatHour } from "../../utils";
import RequestCommon from "../../services/request_Common";

const SectionQuotes = ({ oportunitiesTable, products, footer, prospect, handleAlert, setAlert, setFlag }) => {
  const router = useRouter();
  const commonApi = new RequestCommon();
  const [trackings, setTrackings] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalTracking, setTotalTracking] = useState(0);
  const [trackingsTable, settrackingsTable] = useState([]);
  const [phases, setPhases] = useState([]);
  const [phase, setphase] = useState(prospect?.phase?.id);
  const [showAdd, setshowAdd] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const handleCloseAdd = () => setshowAdd(!showAdd);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [trackingShow, setTrackingShow] = useState({});
  const [showTracking, setShowTracking] = useState(false);
  const handleCloseShow = () => setShowTracking(!showTracking);
  const heads = ["Concepto", "Cantidad", "Comision", "Precio Final", "Fecha estimada de cierre"];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
    }
    return () => (mounted = false);
  }, []);

  const resetForm = () => {
    setValue("observations", "");
    setValue("action", "");
    setValue("reason", "");
    setphase(prospect?.phase?.id);
  };

  const handleNextPage = () => {
    if (page < Math.ceil(totalTracking / limit)) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleAction = (item) => {
    console.log(item);
    // let tracking = trackings.filter((i) => i.id == item.id);
    // setTrackingShow(tracking[0]);
    // setShowTracking(!showTracking);
  };

  return (
    <TracingStyled>
      <div className="title_table">
        <TableChartOutlined className="icon_primary" />
        <p>Cotizaciones</p>
        {isLoading ? <CircularProgress size={20} className="load" /> : <Cached className="reload" onClick={() => setRefetch(!refetch)} />}
      </div>

      <TableCustom
        heads={heads}
        data={oportunitiesTable}
        identificador={"concepto"}
        custom={false}
        selectmultiple={false}
        hiddenActionPerItem={true}
        primaryColor={"#405189"}
        secondaryColor={"#dce1f6"}
        actionPerColum={{
          active: true,
          action: (item) => handleAction(item),
        }}
      />

      {/* <table className="table">
        <thead className="table__head">
          <tr className="table__head__row">
            {heads?.map((item, index) => (
              <th className={`table__head__row__th${index === 0 ? "--principal" : ""}`}>{item}</th>
            ))}
          </tr>
        </thead>

        <tbody className="table__body">
          {oportunitiesTable.map((oportunityRow, index) => {
            return (
              <tr className={`table__body__row${index % 2 == 0 ? "--impar" : ""}`}>
                <td className={`table__body__row__cell--principal`}>
                  <div className="table__body__row__cell__cajita">
                    <p>{oportunityRow.concepto}</p>
                  </div>
                </td>
                <td className={`table__body__row__cell`}>{oportunityRow.total}</td>
                <td className={`table__body__row__cell`}>{oportunityRow.total}</td>
                <td className={`table__body__row__cell`}>{oportunityRow.total}</td>
                <td className={`table__body__row__cell`}>{oportunityRow.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}

      {footer && (
        <div className="tfooter">
          <div className="tfooter__ctr_button">
            <Button
              variant="contained"
              color="primary"
              className="add_buton"
              onClick={() =>
                router.push({
                  pathname: `/oportunidades/nuevo/`,
                  query: { p: prospect.id },
                })
              }
            >
              Agregar Cotizacion
            </Button>
          </div>
          <div className="tfooter__ctr_pagination">
            <p className="">{`Total de contactos: ${totalTracking} Pagina: ${page}- ${Math.ceil(totalTracking / limit)}`}</p>
            <div className="tfooter__ctr_pagination__pagination">
              <button className="before" onClick={handlePreviousPage}>
                <NavigateBefore />
              </button>
              <button className="next" onClick={handleNextPage}>
                <NavigateNext />
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showTracking} keepMounted onClose={handleCloseShow} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        <DialogContainer>
          <p className="title">Vista del Seguimiento</p>
          <div className="ctr_tracking">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} className="ctr">
                <label>
                  <LabelImportant className="icon" />
                  Asunto
                </label>
                <p className="paraghap">{trackingShow?.reason}</p>
              </Grid>
              <Grid item xs={12} md={4}>
                <label>
                  <TrendingUp className="icon" />
                  Fase
                </label>
                <p className="paraghap capitalize">{trackingShow?.phase?.name}</p>
              </Grid>
              <Grid item xs={12} md={4}>
                <label>
                  <Today className="icon" />
                  Fecha de creación
                </label>
                <p className="paraghap capitalize">{formatDate(trackingShow?.createdAt)}</p>
              </Grid>
              <Grid item xs={12}>
                <label>
                  <Comment className="icon" />
                  Observación
                </label>
                <p className="paraghap">{trackingShow?.observations}</p>
              </Grid>
            </Grid>
          </div>
        </DialogContainer>
      </Dialog>
    </TracingStyled>
  );
};

export default SectionQuotes;

const TracingStyled = styled.div`
  .table {
    border-spacing: 0;
    margin: auto;
    width: inherit;
    width: 100%;
    max-height: 70vh;
    overflow-x: auto;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    &__head {
      position: sticky;
      top: 0;
      z-index: 50;
      &__row {
        background-color: #dce1f6;
        padding: 5px 10px;
        height: 40px;
        text-align: left;
        &__th {
          &--principal {
            background-color: #405189;
            color: #fff;
            width: max-content;
            min-width: 10px;
            outline: 1px solid red;
          }
        }
      }
    }

    &__body {
      &__row {
        background: #fff;
        font-weight: bold;
        color: #2c2c2c;
        transition: all 0.3s ease;
        min-height: 50px;
        &__cell {
          min-height: 42px;
          padding: 0 10px;
          font-weight: bold;
          font-size: 14px;

          &__cajita {
            display: flex;
            align-items: center;
            padding: 10px 0;
          }

          &--principal {
            outline: 1px solid red;
            width: 100px;
            min-width: 100px;
          }
        }

        &--impar {
          background: #f3f3f3;
        }
      }
    }
  }
  p {
    margin: 0;
  }
  .title_table {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .icon_primary {
      width: 30px;
      height: 30px;
      padding: 5px;
      margin-right: 5px;
      background: #dce1f6;
      color: #0c203b;
      border-radius: 50%;
    }
    p {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
      margin-right: 10px;
    }
    .load {
      color: #103c82;
    }
    .reload {
      color: #103c82;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
      .add_buton {
        text-transform: capitalize;
      }
    }
    &__ctr_pagination {
      display: flex;
      align-items: center;
      justify-content: space-around;
      &__pagination {
        display: flex;
        align-items: center;
        .before {
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
        }
        .next {
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
        }
      }
    }
  }
`;

const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .title {
    font-size: 18px;
    font-weight: bold;
    background: #0c203b;
    padding: 10px 20px;
    color: #fff;
    letter-spacing: 0.05em;
  }
  .ctr_inputs {
    padding: 20px;
    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      width: 100%;
      padding: 5px 0;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      resize: none;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    .capitalize {
      text-transform: capitalize;
    }
    .error {
      border-bottom: 1.5px solid #f50f;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f50;
      margin-top: 5px;
    }
  }
  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
    }
  }
  .ctr_tracking {
    padding: 20px;
    width: 100%;
    label {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      /* color: #eaeaea; */
      letter-spacing: 0.03em;
      .icon {
        font-size: 16px;
        margin-right: 5px;
        color: #405189;
      }
    }
    .paraghap {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }
    .capitalize {
      text-transform: capitalize;
    }
  }
`;
