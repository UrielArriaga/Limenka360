import { Avatar, Box } from "@material-ui/core";
import { CalendarToday, EmailOutlined, Person, PhoneOutlined, StarBorder, Timeline } from "@material-ui/icons";
import { Pagination, Skeleton } from "@material-ui/lab";
import dayjs from "dayjs";
import Head from "next/head";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { api } from "../../../../services/api";
import RequestExecutive from "../../../../services/request_Executive";
import { colors } from "../../../../styles/global.styles";
export default function ListLeadsDirector({
  startDate,
  finishDate,
  executive,
  handleSelectedProspect,
  periodDate,
  refetchData,
}) {
  const apiExecutive = new RequestExecutive(startDate, finishDate, true, executive, periodDate);
  const [prospects, setProspects] = useState({ count: 0, results: [], isLoading: false });
  const [paginationProspects, setPaginationProspects] = useState({ limit: 10, page: 1 });
  const [oportunities, setOportunities] = useState({ count: 0, results: [], isLoading: false });
  const [paginationOportunities, setPaginationOportunities] = useState({ limit: 10, page: 1 });
  const [clients, setClients] = useState({ count: 0, results: [], isLoading: false });
  const [paginationClients, setPaginationClients] = useState({ limit: 10, page: 1 });

  useEffect(() => {
    // getData();
    getProspectsInfo();
    getOportunitiesInfo();
    getClientsInfo();
  }, [startDate, periodDate, refetchData]);

  const getProspectsInfo = async page => {
    try {
      setProspects({ ...prospects, isLoading: true, results: [] });
      let responseProspects = await apiExecutive.getProspects({
        limit: paginationProspects.limit,
        page: page ? page : 1,
      });
      setProspects({
        ...prospects,
        count: responseProspects.data.count,
        results: responseProspects.data.results,
        isLoading: false,
      });
    } catch (error) {}
  };

  const getOportunitiesInfo = async page => {
    try {
      setOportunities({ ...oportunities, isLoading: true, results: [] });
      let responseOportunities = await apiExecutive.getOportunities({
        limit: paginationOportunities.limit,
        page: page ? page : 1,
      });

      setOportunities({
        ...oportunities,
        results: responseOportunities.data.results,
        count: responseOportunities.data.count,
      });
    } catch (error) {}
  };

  const getClientsInfo = async page => {
    try {
      setClients({ ...clients, isLoading: true });

      let responseClients = await apiExecutive.getClients({
        limit: paginationClients.limit,
        page: page ? page : 1,
      });

      setClients({ ...clients, results: responseClients.data.results, count: responseClients.data.count });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      setProspects({ ...prospects, isLoading: true, results: [] });
      setOportunities({ ...oportunities, isLoading: true, results: [] });
      let responseProspects = await apiExecutive.getProspects();
      let responseOportunities = await apiExecutive.getOportunities();
      // console.log(`%c  ${JSON.stringify(responseOportunities.data, null, 2)}`, "color: purple");

      let responseClients = await apiExecutive.getClients();

      setProspects({
        ...prospects,
        count: responseProspects.data.count,
        results: responseProspects.data.results,
        isLoading: false,
      });
      setOportunities({
        ...oportunities,
        results: responseOportunities.data.results,
        count: responseOportunities.data.count,
      });
      setClients({ ...clients, results: responseClients.data.results });
    } catch (error) {}
  };

  const test = () => {
    let query = {
      createdAt: {
        $gte: startDate,
        $lte: finishDate,
      },
      prospect: {
        ejecutiveId: executive.id,
      },
    };
    let params = {
      showproducts: 1,
      include: "prospect,prospect.ejecutive,prospect.category",
      where: JSON.stringify(query),
      count: 1,
    };

    api
      .get("oportunities", {
        params,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  const validNullData = value => (value ? value : "N/A");

  const cutNameProduct = name => (name ? name.slice(0, 10) : "");

  const handleChange = (event, value, type) => {
    console.log(type);
    console.log(value);
    if (type === 0) {
      setPaginationProspects({ ...paginationProspects, page: value });
      getProspectsInfo(value);
    }

    if (type === 1) {
      setPaginationOportunities({ ...paginationOportunities, page: value });
      getOportunitiesInfo(value);
    }
    if (type === 2) {
      setPaginationOportunities({ ...paginationClients, page: value });
      getClientsInfo(value);
    }
  };
  return (
    <ListLeadsExecutivePageStyled>
      {/* <button onClick={() => test()}>Test me</button> */}
      <div className="leads">
        <div className="leadbox prospects">
          <div className="title">
            <Person />
            <p className="txt">Prospectos</p>

            <div className="count">
              <p>{prospects.count}</p>
            </div>
          </div>

          {prospects.isLoading && (
            <div>
              <div className="cardprospect">
                <Skeleton height={200} />
                <Skeleton height={200} />
                <Skeleton height={200} />
              </div>
            </div>
          )}

          {prospects.results.length === 0 && (
            <Box pb={5}>
              <p style={{ textAlign: "center" }}>No hay prospectos para mostrar</p>
            </Box>
          )}
          {!prospects.isLoading &&
            prospects.results.map((item, index) => {
              return (
                <div className="cardprospect" key={index} onClick={() => handleSelectedProspect(0, item)}>
                  <div className="fullname">
                    <Avatar className="img" style={{ backgroundColor: generateRandomColorRgb(1)[0] }}>
                      {item.fullname.slice(0, 2)}
                    </Avatar>
                    <p className="name">
                      {item.fullname}
                      {!item.viewed && <span className="noviewed"> - No visualizado</span>}
                      {item.discarted && <span className="discarted"> - Descartado</span>}
                    </p>
                  </div>

                  <div className="line" />

                  <div className="info">
                    <div className="row">
                      <EmailOutlined className="icon" />
                      <p className="email">{item.email}</p>
                    </div>

                    <div className="row">
                      <PhoneOutlined className="icon" />
                      <p className="email">{validNullData(item?.phone)}</p>
                    </div>
                    <div className="lasttracking row">
                      <Timeline className="icon" />
                      <p>{item.lastTracking.observations}</p>
                    </div>
                    <div className="lasttracking row">
                      <CalendarToday className="icon" />
                      <p>Creado {dayjs(item.createdAt).fromNow()}</p>
                    </div>
                  </div>

                  <div className="products">
                    <div className="chip">
                      <p>{item?.category?.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="pagination">
            <Pagination
              count={Math.ceil(prospects.count / paginationProspects.limit)}
              page={paginationProspects.page}
              onChange={(event, value) => handleChange(event, value, 0)}
            />
          </div>
        </div>

        <div className="leadbox oportunidades">
          <div className="title">
            <StarBorder />
            <p>Oportunidades</p>

            <div className="count">
              <p>{oportunities.count}</p>
            </div>
            {/* <div className="counter">
              <p>3</p>
            </div> */}
          </div>
          {oportunities.results.length === 0 && (
            <Box pb={5}>
              <p style={{ textAlign: "center" }}>No hay oportunidades para mostrar</p>
            </Box>
          )}
          {oportunities.results.map((item, index) => {
            return (
              <div className="cardprospect" key={index} onClick={() => handleSelectedProspect(1, item)}>
                <div className="fullname">
                  <Avatar className="img" style={{ backgroundColor: generateRandomColorRgb(1)[0] }}>
                    {item?.prospect.fullname.slice(0, 2)}
                  </Avatar>
                  <p className="name">{item?.prospect?.fullname}</p>
                </div>
                <div className="line" />

                <div className="info">
                  <div className="row">
                    <EmailOutlined className="icon" />
                    <p className="email">{item?.prospect?.email}</p>
                  </div>

                  <div className="row">
                    <PhoneOutlined className="icon" />
                    <p className="email">{validNullData(item?.prospect?.phone)}</p>
                  </div>

                  <div className="lasttracking row">
                    <CalendarToday className="icon" />
                    <p>Creado {dayjs(item.createdAt).fromNow()}</p>
                  </div>
                </div>

                <div className="products">
                  {item.productsoportunities.map((item, index) => {
                    return (
                      <div className="chipproduct" key={index}>
                        <p>{cutNameProduct(item.product?.name)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="pagination">
            <Pagination
              count={Math.ceil(oportunities.count / paginationOportunities.limit)}
              page={paginationOportunities.page}
              onChange={(event, value) => handleChange(event, value, 1)}
            />
          </div>
        </div>

        <div className="leadbox clients">
          <div className="title">
            <StarBorder />
            <p>Clientes</p>
            {/* <div className="counter">
              <p>3</p>
            </div> */}
          </div>
          {clients.results.length === 0 && (
            <Box pb={5}>
              <p style={{ textAlign: "center" }}>No hay Clientes para mostrar</p>
            </Box>
          )}
          {clients.results.map((item, index) => {
            return (
              <div className="cardprospect" key={index} onClick={() => handleSelectedProspect(2, item)}>
                <div className="fullname">
                  <Avatar className="img" style={{ backgroundColor: generateRandomColorRgb(1)[0] }}>
                    {item.fullname.slice(0, 2)}
                  </Avatar>
                  <p className="name">{item.fullname}</p>
                </div>
                <div className="line" />

                <div className="info">
                  <div className="row">
                    <EmailOutlined className="icon" />
                    <p className="email">{validNullData(item.email)}</p>
                  </div>

                  <div className="row">
                    <PhoneOutlined className="icon" />
                    <p className="email">{validNullData(item.phone)}</p>
                  </div>
                </div>

                <div className="products">
                  <div className="chip">
                    <p>{item?.category?.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <Pagination
            count={Math.ceil(clients.count / paginationClients.limit)}
            page={paginationClients.page}
            onChange={(event, value) => handleChange(event, value, 2)}
          />
        </div>
      </div>
    </ListLeadsExecutivePageStyled>
  );
}

const ListLeadsExecutivePageStyled = styled.div`
  .leads {
    margin-top: 20px;
    /* border: 1px solid red; */
    justify-content: space-between;
    display: flex;
  }

  .leadbox {
    background-color: #ffff;
    border-radius: 8px;
    /* border: 1px solid green; */
    width: calc(100% / 3 - 40px);
    height: 80vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.bgDirector};
    }
    /* padding: 20px; */
  }

  .leadbox .title {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    svg {
      margin-right: 10px;
    }

    .txt {
      font-weight: bold;
      margin-right: 10px;
    }

    .counter {
      /* background-color: #bdbdbd; */
      border-radius: 50%;
      width: 20px;
      height: 20px;
      text-align: center;
    }
  }

  .cardprospect {
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border: 1px solid #bdbdbd;
    border-radius: 8px;
    margin-bottom: 12px;
    cursor: pointer;
    .fullname {
      padding: 10px;
      display: flex;
      align-items: center;
      .img {
        margin-right: 10px;
      }
      .name {
        text-transform: capitalize;
      }
      p {
        font-weight: bold;
      }

      .discarted {
        color: red;
        font-size: 12px;
        font-weight: bold;
        span {
        }
      }

      .noviewed {
        color: blue;
        font-size: 12px;
        font-weight: bold;
      }
    }

    .discarted {
      padding-left: 10px;
      display: inline-block;
      .chip {
        padding: 5px;
        border-radius: 10px;
        font-size: 11px;
        color: red;
      }
    }

    .info {
      padding: 4px 8px;
      color: #616161;
      .row {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
      }

      .icon {
        color: #757575;
        margin-right: 10px;
      }
    }

    .products {
      padding: 4px 8px;
      display: flex;

      overflow-x: scroll;
      .chip {
        background-color: ${colors.primaryColorDark};
        padding: 2px 12px;
        color: #fff;
        border-radius: 18px;
        text-transform: capitalize;
        font-size: 11px;
        display: inline-block;
      }

      .chipproduct {
        background-color: rgba(255, 109, 0, 0.5);
        padding: 2px 12px;
        /* color: #fff; */
        border-radius: 18px;
        text-transform: capitalize;
        font-size: 11px;
        width: auto;
        display: inline-block;
      }
    }

    .line {
      margin: 2px 0;
      background-color: #eeeeee;
      height: 2px;
      width: 100%;
    }
  }

  .lasttracking {
    /* padding: 0 20px; */
    p {
      font-size: 12px;
    }
  }

  .pagination {
    padding: 10px;
  }
`;

function generateRandomColorRgb(opacity, type) {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return [
    "rgb(" + red + ", " + green + ", " + blue + ")",
    "rgba(" + red + ", " + green + ", " + blue + "," + opacity / 10 + ")",
  ];
}
