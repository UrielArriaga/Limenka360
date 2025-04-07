import React, { useEffect, useState } from "react";
import { URL_SPACE, api } from "../../../../../services/api";

import { formatNumber, formatNumberAbrv } from "../../../../../utils";
import { Button, Dialog, IconButton, Grid, Tip, LinearProgress, Tooltip } from "@material-ui/core";
import { Close, AspectRatio } from "@material-ui/icons";
import styled from "styled-components";
import useModal from "../../../../../hooks/useModal";
import { userSelector } from "../../../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
export default function ResumeExecutive({
  executiveSelected,
  funnelData,
  isFetchingFunnel,
  lastOportunities = {
    results: [],
    isFetching: 0,
  },
}) {
  const {
    prospects = 0,
    oportunities = 0,
    customers = 0,
    salesamount = 0,
    salesquotesamount = 0,
    percentajequote = 0,
    prospectswithouttracking = 0,
  } = funnelData;

  const { open, toggleModal } = useModal();

  const { open: openPreview, toggleModal: toggleModalPreview } = useModal();

  const rowItem = (icon, title, value) => (
    <div className="minicard">
      <div className="row_icon">
        <div className={`minicard__icon_text minicard__icon_${icon}`}>
          <p>{icon}</p>
        </div>
        <p className="minicard__title">{title}</p>
        <p className="minicard__value">{value}</p>
      </div>
    </div>
  );

  return (
    <ResumeExecutiveStyled>
      <div className="rowx">
        {executiveSelected && (
          <div className="infouserrow">
            <img
              src={URL_SPACE + executiveSelected.Foto}
              onError={e =>
                (e.target.src =
                  "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png")
              }
              alt=""
            />
            <h3>{executiveSelected?.Nombre}</h3>
          </div>
        )}

        <div className="actionschart">
          <div className="order"></div>

          <div className="config">{/* <Button onClick={toggleModal}>Configurar</Button> */}</div>
        </div>
      </div>
      <div className="bodyscroll">
        {isFetchingFunnel && (
          <div className="infoexecutiveloader">
            <p>Cargando</p>
          </div>
        )}

        {!isFetchingFunnel && (
          <div className="infoexecutive">
            <div className="centerdata">
              <div className="centerdata__item">
                <p className="titledata">Prospectos</p>
                <p className="valuedata">{prospects}</p>
              </div>

              <div className="centerdata__item">
                <p className="titledata">P. Sin Seguimiento</p>
                <p className="valuedata">{prospectswithouttracking}</p>
              </div>

              <div className="centerdata__item">
                <p className="titledata">Oportunidades</p>
                <p className="valuedata">{oportunities}</p>
              </div>

              <div className="centerdata__item">
                <p className="titledata">Clientes</p>
                <p className="valuedata">{customers}</p>
              </div>
            </div>

            {/* <div className="trackingsdata">
            <div className="trackingsdata__item">
              <p className="trackingsdata__titledata">Sin Seguimiento</p>
              <p className="trackingsdata__valuedata">{totalleads}</p>
            </div>
          </div> */}

            <div className="lineardata">
              <div className="lineardata__item">
                <div className="rowdata">
                  <p className="titledata">Monto Cotizado</p>
                  <p className="valuedata">{formatNumberAbrv(salesquotesamount)}</p>
                </div>
                <LinearProgress variant="determinate" value={100} />
              </div>

              <div className="lineardata__item">
                <div className="rowdata">
                  <p className="titledata">Monto Vendido</p>
                  <p className="valuedata">{formatNumberAbrv(salesamount)}</p>
                </div>
                <LinearProgress variant="determinate" color="primary" value={percentajequote} />
                <div className="percentaje">{/* <p>{percentajequote}%</p> */}</div>
              </div>
            </div>

            <div className="lastoportunities">
              <p className="titleQuotes">Cotizaciones Recientes</p>
              {lastOportunities?.results.map((item, index) => {
                return (
                  <div>
                    <Grid container className="itemcard">
                      <Grid item md={5} style={{ marginBottom: 10 }}>
                        <p className="title">{item.prospect.fullname}</p>
                        <p className="clienttype">{item?.prospect?.clienttype?.name}</p>

                        <div className="date">
                          <p>{dayjs(item.createdAt).fromNow()}</p>
                        </div>
                      </Grid>
                      <Grid item md={3}>
                        <p className="title amount">{formatNumber(item?.amount)}</p>
                        <p className=" subtitle progress">Monto Cotizado</p>
                      </Grid>

                      <Grid item md={2}>
                        {item?.certainty < 50 ? (
                          <div className="min">
                            <div className="bg">
                              <p className="title">{item?.certainty} %</p>
                            </div>
                            <p className=" subtitle progress">Certeza</p>
                          </div>
                        ) : (
                          <div className="max">
                            <div className="bg">
                              <p className="title">{item?.certainty} %</p>
                            </div>
                            <p className=" subtitle progress">Certeza</p>
                          </div>
                        )}
                      </Grid>
                      <Grid item md={2}>
                        <p className="title">+{item?.quantity}</p>
                        <p className="subtitle">Productos</p>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <ModalConfig open={open} toggleModal={toggleModal} />
      <ModalPreviewExecutive
        executiveSelected={executiveSelected}
        open={openPreview}
        toggleModal={toggleModalPreview}
      />
    </ResumeExecutiveStyled>
  );
}
const ResumeExecutiveStyled = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;

  height: 380px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  .bodyscroll {
    height: 85%;
    overflow-y: scroll;
    padding-right: 15px;
  }

  .titleQuotes {
    font-size: 15px;
    color: #495057;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .lastoportunities {
    .itemcard {
      position: relative;
      padding-top: 20px;
    }

    .title {
      color: #495057;
      font-weight: bold;
      font-size: 15px;
      text-transform: capitalize;
    }
    .clienttype {
      font-size: 13px;
      color: #7695fe;
    }

    .amount {
      color: #7695fe;
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

    .date {
      position: absolute;
      bottom: -10px;
      left: 0;
      p {
        color: #9e9e9e;
        font-size: 12px;
      }
    }

    .bg {
      padding: 2px 2px;
      border-radius: 8px;
      width: 70px;
    }
    .min {
      text-align: center;
      .bg {
        background-color: #ffabab;
        display: inline-block;
      }
    }
    .max {
      text-align: center;
      .bg {
        background-color: #8acf8a;
        display: inline-block;
      }
    }
  }
  .rowx {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: red; */
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }
  .infouserrow {
    display: flex;
    align-items: center;
  }

  .trackingsdata {
    display: flex;
    margin-top: 10px;
    &__item {
      display: flex;
    }
    &__titledata {
      margin-right: 20px;
      color: #495057;
    }

    &__valuedata {
      font-weight: bold;
    }
  }
  h3 {
    color: #495057;
    /* margin-bottom: 20px; */
    text-transform: capitalize;
  }

  .centerdata {
    display: flex;
    justify-content: space-between;

    &__item {
      width: 23%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 6px 4px;
      border-radius: 8px;
      background-color: rgba(242, 242, 242, 0.7);
      cursor: pointer;

      .titledata {
        font-size: 13px;
        color: #878a99;
        margin-bottom: 5px;
      }

      .valuedata {
        font-size: 20px;
        font-weight: bold;
        color: #000000;
      }
    }
  }

  .lineardata {
    margin-top: 10px;
    &__item {
      margin-bottom: 20px;
      .rowdata {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
      }
      .titledata {
        font-size: 13px;
        color: #878a99;
        margin-bottom: 5px;
      }

      .valuedata {
        font-size: 20px;
        font-weight: bold;
        color: #000000;
      }
    }
  }

  .percentaje {
    p {
      font-size: 10px;
      color: #878a99;
    }
  }
`;

const ModalConfigStyled = styled(Dialog)`
  .content {
    width: 600px;
    height: 400px;
  }

  .header {
    width: 100%;
    height: 40px;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px 10px 0px 0px;
    position: relatieve;
    p {
      font-size: 20px;
      font-weight: 600;
      color: #000000;
    }

    .close {
      position: absolute;
      right: 10px;
    }
  }
`;

const ModalPreviewExecutiveStyled = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    min-width: 800px;
    min-height: 500px;
    display: flex;
    flex-direction: row;
    border-radius: 8px;
  }
  .content {
    width: 100%;
    /* overflow: scroll; */
  }

  .itemcard {
    position: relative;
    padding-top: 20px;
  }

  .title {
    color: #495057;
    font-weight: bold;
    font-size: 15px;
  }

  .amount {
    color: #7695fe;
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

  .date {
    position: absolute;
    top: -10px;
    right: 0;
    p {
      color: #9e9e9e;
      font-size: 12px;
    }
  }

  .bg {
    padding: 2px 2px;
    border-radius: 8px;
    width: 70px;
  }
  .min {
    text-align: center;
    .bg {
      background-color: #ffabab;
      display: inline-block;
    }
  }
  .max {
    text-align: center;
    .bg {
      background-color: #8acf8a;
      display: inline-block;
    }
  }

  .body {
    height: calc(100% - 40px);
    padding: 10px;

    .statics {
      display: flex;
      padding-top: 20px;

      &__item {
        margin-right: 30px;
        width: 32%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .txtItem {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 10px;
        }

        .txtValue {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }

  .executiveinfo {
    .fullname {
      font-size: 16px;
      font-weight: 600;
      color: #000000;
    }
  }

  .header {
    width: 100%;
    height: 40px;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px 10px 0px 0px;
    position: relatieve;
    p {
      font-size: 20px;
      font-weight: 600;
      color: #000000;
    }
    .expand {
      position: absolute;
      right: 40px;
    }

    .close {
      position: absolute;
      right: 10px;
    }
  }

  .lastoportunities {
    height: 400px;
    overflow-y: scroll;
  }
`;

const ModalConfig = ({ open, toggleModal }) => {
  return (
    <ModalConfigStyled
      open={open}
      keepMounted
      onClose={toggleModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="content">
        <div className="header">
          <p>Configuracion de Resumen Ejecutivo</p>

          <div className="close">
            <IconButton>
              <Close />
            </IconButton>
          </div>
        </div>
      </div>
    </ModalConfigStyled>
  );
};

const useDataPreviewExecutive = (executiveId, isOpen) => {
  const [lastOportunities, setLastOportunities] = useState([]);
  const { groupId } = useSelector(userSelector);
  useEffect(() => {
    if (executiveId && isOpen) {
      console.log(executiveId);
      fetchLastOportunities();
    }
  }, [executiveId, isOpen]);

  const fetchLastOportunities = async () => {
    try {
      let queryGoals = {
        iscloseout: false,
        // updatedAt: {
        //   $gte: startDateGlobal,
        //   $lte: finishDateGlobal,
        // },
      };
      if (groupId) {
        queryGoals.prospect = {
          // ejecutive: {
          //   groupId: groupId,
          // },
          ejecutiveId: executiveId,
        };
      }

      let params = {
        count: 1,
        include: "prospect,prospect,prospect.clienttype",
        order: "-createdAt",
        limit: 5,
        where: JSON.stringify(queryGoals),
      };
      let res = await api.get("oportunities", {
        params: params,
      });

      console.log(res);

      setLastOportunities(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return { lastOportunities };
};

const ModalPreviewExecutive = ({ open, toggleModal, executiveSelected }) => {
  let fakeData = {
    id: 1,
    fullname: "Abigail Ojeda",
    email: "abi",
  };

  const { fullname, email } = fakeData;
  const [showFullScreen, setShowFullScreen] = useState(false);

  const { lastOportunities } = useDataPreviewExecutive(executiveSelected?.id, open);

  return (
    <ModalPreviewExecutiveStyled
      open={open}
      keepMounted
      fullScreen={showFullScreen}
      onClose={toggleModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="content">
        <div className="header">
          <p>Resumen de {fullname}</p>

          <div className="expand">
            <IconButton onClick={() => setShowFullScreen(!showFullScreen)}>
              <AspectRatio />
            </IconButton>
          </div>

          <div className="close">
            <IconButton onClick={() => toggleModal()}>
              <Close />
            </IconButton>
          </div>
        </div>

        <div className="body">
          <div className="statics">
            <div className="statics__item">
              <p className="txtItem">Prospectos</p>
              <p className="txtValue">{30}</p>
            </div>
            <div className="statics__item">
              <p className="txtItem">Oportunidades</p>
              <p className="txtValue">{30}</p>
            </div>
            <div className="statics__item">
              <p className="txtItem">Clientes</p>
              <p className="txtValue">{30}</p>
            </div>
          </div>

          <div className="statics">
            <div className="statics__item">
              <p className="txtItem">Cotizaciones</p>
              <p className="txtValue">{30}</p>
            </div>
            <div className="statics__item">
              <p className="txtItem">Oportunidades</p>
              <p className="txtValue">{30}</p>
            </div>
            <div className="statics__item">
              <p className="txtItem">Clientes</p>
              <p className="txtValue">{30}</p>
            </div>
          </div>

          <div className="lastoportunities">
            <h3>Oportunidades</h3>
            {lastOportunities.map((item, index) => {
              return (
                <div>
                  <Grid container className="itemcard">
                    <Grid item md={5} style={{ marginBottom: 10 }}>
                      <p>{item.prospect.fullname}</p>
                    </Grid>
                    <Grid item md={3}>
                      <p className="title amount">{formatNumber(item?.amount)}</p>
                      <p className=" subtitle progress">Monto Cotizado</p>
                    </Grid>

                    <Grid item md={2}>
                      {item?.certainty < 50 ? (
                        <div className="min">
                          <div className="bg">
                            <p className="title">{item?.certainty} %</p>
                          </div>
                          <p className=" subtitle progress">Certeza</p>
                        </div>
                      ) : (
                        <div className="max">
                          <div className="bg">
                            <p className="title">{item?.certainty} %</p>
                          </div>
                          <p className=" subtitle progress">Certeza</p>
                        </div>
                      )}
                    </Grid>
                    <Grid item md={2}>
                      <p className="title">+{item?.quantity}</p>
                      <p className="subtitle">Productos</p>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </div>
          {/* {JSON.stringify(lastOportunities, null, 2)} */}
        </div>
      </div>
    </ModalPreviewExecutiveStyled>
  );
};
