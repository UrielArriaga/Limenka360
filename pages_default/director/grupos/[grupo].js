import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DirectorLayout from "../../../layouts/DirectorLayout";
import { colors } from "../../../styles/global.styles";
import { api } from "../../../services/api";
import dayjs from "dayjs";
import { CardGroup } from "../../../components/UI/molecules/CardGroup";

import { Box, Grid } from "@material-ui/core";
import PendingsDirector from "../../../components/UI/organism/PendingsDirector";
import LastOportunitiesDirector from "../../../components/UI/organism/LastOportunitiesDirector";
import ChartSellsExecutives from "../../../components/UI/organism/ChartSellsExecutives";
import TableLimenka from "../../../components/UI/organism/TableLimenka";
import ModalDateDirector from "../../../components/UI/organism/ModalDateDirector";
import { normalizeTableDataGroupsSells } from "../../../utils/normalizeData";
import { Pagination } from "@material-ui/lab";
import { setFinishDateGlobal, setStartDateGlobal } from "../../../redux/slices/dashboardDirector";
import { useDispatch } from "react-redux";

export const headsSells = ["id", "ejecutivo", "monto total", "total de ventas", "prospecto"];
export default function Grupo() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [refetch, setRefetch] = useState(false);
  const [groupInfo, setGroupInfo] = useState([]);
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [isFetchingGroup, setIsFetchingGroup] = useState(false);

  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());
  const [lastSales, setLastSales] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);

  const [isFetchingGroupSalles, setIsFetchingGroupSalles] = useState(false);

  const now = dayjs();

  const [customStartDate, setCustomStartDate] = useState(
    dayjs()
      .startOf(now.month() - 9)
      .format()
  );

  const [customFinishDate, setCustomFinishDate] = useState(
    dayjs()
      .endOf(now.month() - 2)
      .format()
  );

  const { grupo } = router.query;

  useEffect(() => {
    if (grupo === "grupo") {
      router.push("/director/grupos");
    }
    const getGroups = async () => {
      setIsFetchingGroup(true);
      let query = { id: grupo };
      let customQuery = {};

      query.oportunity = {};
      customQuery.oportunity = {};

      query.oportunity.soldat = {
        $gte: startDate.startDate,
        $lte: finishDate.finishDate,
      };

      customQuery.oportunity.soldat = {
        $gte: startDate.startDate,
        $lte: finishDate.finishDate,
      };

      try {
        let params = {
          order: "-totalAmount",
          limit: 1,
          where: JSON.stringify(query),
          wherecustom: JSON.stringify(customQuery),
        };

        let responseGroups = await api.get("dashboard/groupssacpq", { params: params });
        setGroupInfo(responseGroups.data.results[0]);
        setIsFetchingGroup(false);
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();
  }, [refetch, router, startDate, finishDate]);

  useEffect(() => {
    const getLastSells = async () => {
      setIsFetchingGroupSalles(true);
      let query = {};
      query.prospect = { ejecutive: { groupId: grupo } };

      query.updatedAt = {
        $gte: startDate.startDate,
        $lte: finishDate.finishDate,
      };

      try {
        let params = {
          order: "-amount",
          count: 1,
          limit: limit,
          skip: page,
          include: "prospect,prospect.ejecutive",
          where: JSON.stringify(query),
        };

        let responseGroups = await api.get("oportunities", {
          params: params,
        });
        setTotalPages(Math.ceil(responseGroups.data.count / limit));

        let newSells = responseGroups.data.results.map(item => normalizeTableDataGroupsSells(item));

        setLastSales(newSells);
        setIsFetchingGroupSalles(false);
      } catch (error) {
        console.log(error);
      }
    };
    getLastSells();
  }, [startDate, finishDate, router, page]);

  const handleOnChangeDate = (date, typeCalendar) => {
    if (typeCalendar === "weekends") {
      let weekendDayStart = date.days[0].start;
      let weekendDayFinish = date.days[6].start;
      setStartDate({ startDate: weekendDayStart });
      setFinishDate({ finishDate: weekendDayFinish });
      dispatch(setStartDateGlobal({ startDate: weekendDayStart }));
      dispatch(setFinishDateGlobal({ finishDate: weekendDayFinish }));
    } else if (typeCalendar === "months") {
      let weekendDayStart = date.start;
      let weekendDayFinish = date.finish;
      setStartDate({ startDate: weekendDayStart });
      setFinishDate({ finishDate: weekendDayFinish });
      dispatch(setStartDateGlobal({ startDate: weekendDayStart }));
      dispatch(setFinishDateGlobal({ finishDate: weekendDayFinish }));
    } else if (typeCalendar === "days") {
      let weekendDayStart = date.start;
      let weekendDayFinish = date.start;
      setStartDate({ startDate: weekendDayStart });
      setFinishDate({ finishDate: weekendDayFinish });
    }
  };

  const handlePagination = (event, page) => {
    setPage(page);
  };

  return (
    <DirectorLayout>
      <ProspectosStyled>
        <div className="main">
          <div className="container">
            <h1>{groupInfo.name}</h1>
            <ModalDateDirector
              showCustomDate={showCustomDate}
              setShowCustomDate={setShowCustomDate}
              handleOnChangeDate={handleOnChangeDate}
            />
          </div>
          <CardsLayoutMod>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={3}>
                <CardGroup title={"Total Vendido"} total={groupInfo.totalAmount} totalBefore={0} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <CardGroup title={"Total Clientes"} total={groupInfo.totalClients} totalBefore={0} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <CardGroup title={"Total Prospectos"} total={groupInfo.totalProspects} totalBefore={0} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <CardGroup title={"Total Cotizado"} total={groupInfo.totalQuotes} totalBefore={0} />
              </Grid>
            </Grid>
          </CardsLayoutMod>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ChartSellsExecutives
                groupID={grupo}
                chartName={"Ventas por ejecutivo"}
                startDate={startDate.startDate}
                finishDate={finishDate.finishDate}
              />
            </Grid>

            <Box height={80} bgcolor="red" />

            <Grid item xs={12} md={6}>
              <LastOportunitiesDirector groupId={grupo} />
            </Grid>

            <Grid item xs={12} md={6}>
              <PendingsDirector groupId={grupo} startDate={startDate.startDate} finishDate={finishDate.finishDate} />
            </Grid>

            <Grid item xs={12}>
              <TableLimenka
                data={lastSales}
                primaryColor="#776ceb"
                secondaryColor="#dce1f6"
                heads={headsSells}
                id="tablelastsells"
                isFetching={isFetchingGroupSalles}
              />
              {lastSales.length > 0 && (
                <div className="table__pagination">
                  <Pagination
                    shape="rounded"
                    color="primary"
                    count={totalPages}
                    defaultPage={1}
                    page={page}
                    onChange={handlePagination}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </ProspectosStyled>
    </DirectorLayout>
  );
}

export const ProspectosStyled = styled.div`
  overflow: auto;
  height: 100%;
  background-color: #f1f1f1;
  padding: 1em;

  .main {
    height: 100%;
  }

  .main h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .container {
    /* width: calc(100% - 40px); */
    margin: auto;
    margin-bottom: 20px;
    padding: 25px 20px;
    background: #fff;
    /* border-radius: 10px; */
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    display: flex;
    justify-content: space-between;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .head .totalrows {
    display: flex;
  }

  .head .btnadd {
    text-transform: capitalize;
    color: #fff;
    background-color: #405189;
  }
  // ** Start Search
  .search {
    margin-bottom: 20px;
  }

  .inputicon {
    position: relative;

    .searchicon {
      position: absolute;
      top: 10px;
      left: 8px;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
      padding-left: 40px;

      &:focus {
        outline: 1px solid ${colors.primaryColor};
      }
    }
  }
  // ** Finish Search

  // ** Start Filter Section

  .filters {
    display: inline-block;
    background-color: #dad8db;
    select {
      height: 30px;
      border: none;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
    }
  }
  .currentfilters {
    .chip {
      background-color: #fff;
      color: ${colors.primaryColor};
      border: 1px solid ${colors.primaryColor};

      svg {
        color: ${colors.primaryColor};
      }
    }
  }
  // ** Finish Filter Section
`;

export const Container = styled.div`
  display: flex;
`;

const CardsLayoutMod = styled.div`
  display: flex;
  gap: 10px;
  min-height: 120px;
  width: 100%;

  .card {
    padding: 10px;
    border-radius: 4px;
    /* width: 33%; */
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    /* gap: 1em; */
    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      /* font-weight: bold; */
      .namecard {
        color: #878aa6;
        font-size: 20px;
      }

      .percentage {
        cursor: default;
        &:hover {
          .tooltip {
            position: fixed;
            display: block;
          }
        }
        .tooltip {
          display: flex;
          flex-direction: column;
          transition: 0.2s;
          display: none;
          background-color: #fff;
          border: 1px solid ${colors.bgDirector};
          padding: 5px;
          color: ${colors.bgDirector};
          font-size: 12px;
          border-radius: 0px 8px 8px 8px;
          .total {
            display: flex;
            flex-direction: row;
            font-weight: 500;
          }
          .totalDiference {
            display: flex;
            flex-direction: row;
            font-weight: 500;
            .negative {
              color: red;
              font-weight: 500;
            }
            .positive {
              color: #87c52e;
              font-weight: 500;
            }
          }
        }
      }

      .negativePercentage {
        color: red;
      }
      .positivePercentage {
        color: #6ada7d;
      }
    }

    &__centercontent {
      margin-bottom: 20px;
      .total {
        font-weight: bold;
        color: #495057;
        font-size: 22px;
      }
    }
    &__icon {
      display: flex;
      justify-content: space-between;

      .showall {
        p {
          color: #878a99;
        }
      }
    }
  }

  .card .card_title {
    display: flex;
    color: #878aa6;
    font-size: 20px;
  }

  .card .card_total {
    font-weight: bold;
  }

  .card .icon {
    margin-right: 10px;
  }
`;
