import { Box, Grid } from "@material-ui/core";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CardsDirector from "../../components/UI/organism/CardsDirector";
import ChartGroups from "../../components/UI/organism/ChartGroups";
import { LayoutDirector } from "../../styles/Director";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { api } from "../../services/api";
import ModalDateDirector from "../../components/UI/organism/ModalDateDirector";
import ChartDirector from "../../components/UI/organism/ChartDirector";
import SellsByCategoryDirector from "../../components/UI/organism/SellsByCategoryDirector";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardDirectorSelector,
  setFinishDateGlobal,
  setStartDateGlobal,
  setTypeCalendarGlobal,
} from "../../redux/slices/dashboardDirector";
import TableExecutivesDirector from "../../components/UI/organism/TableExecutivesDirector";
import GoalsChartDirector from "../../components/UI/organism/GoalsChartDirector";
import SectionResumeDirector from "../../components/UI/organism/SectionResumeDirector";
import SellByProductBarChart from "../../components/UI/organism/SellByProductBarChart";
import PendingsDirector from "../../components/UI/organism/PendingsDirector";
import LastOportunitiesDirector from "../../components/UI/organism/LastOportunitiesDirector";
import DirectorLayout from "../../layouts/DirectorLayout";
import MapSells from "../../components/MapSells";
import ModalCompare from "../../components/ModalCompare";
import { initialEntitiesMap } from "../../BD/initialStates";
import SalesByEntitiesDirector from "../../components/UI/organism/SalesByEntitiesDirector";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Director() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [openCompare, setOpenCompare] = useState(false);

  const [idsExecutivesToCompare, setIdsExecutivesToCompare] = useState([undefined, undefined]);
  const [executivesToCompare, setExecutivesToCompare] = useState([undefined, undefined]);

  const [dataSales, setDataSales] = useState(initialEntitiesMap);

  const [isLoadingSellsEntity, setIsLoadingSellsEntity] = useState(false);

  const apiDirector = new RequestDirectorDashboard(startDate, finishDate);
  const [groups, setGroups] = useState([]);

  const { startDateGlobal, finishDateGlobal, typeCalendar } = useSelector(dashboardDirectorSelector);
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);

  useEffect(() => {
    getGroupsByCompany();
  }, [startDate, finishDate]);

  useEffect(() => {
    const getSellsByEntity = async () => {
      try {
        setIsLoadingSellsEntity(true);
        setDataSales(JSON.parse(JSON.stringify(initialEntitiesMap)));
        let query = {
          oportunity: {
            iscloseout: true,
            soldat: {
              $gte: startDateGlobal,
              $lte: finishDateGlobal,
            },
          },
        };
        let res = await api.get("dashboard/entitiesamount", {
          params: { limit: 40, where: JSON.stringify(query), join: "prospect,oportunity" },
        });
        if (res.data.results?.length === 0) {
          setDataSales([
            ["Baja California", "mx-bc", 0],
            ["Baja California Sur", "mx-bs", 0],
            ["Sonora", "mx-so", 0],
            ["Colima", "mx-cl", 0],
            ["Nayarit", "mx-na", 0],
            ["Campeche", "mx-cm", 0],
            ["Quintana Roo", "mx-qr", 0],
            ["Estado de México", "mx-mx", 0],
            ["Morelos", "mx-mo", 0],
            ["Ciudad de México", "mx-cd", 0],
            ["Querétaro", "mx-qt", 0],
            ["Tabasco", "mx-tb", 0],
            ["Chiapas", "mx-cs", 0],
            ["Nuevo León", "mx-nl", 0],
            ["Sinaloa", "mx-si", 0],
            ["Chihuahua", "mx-ch", 0],
            ["Veracruz", "mx-ve", 0],
            ["Zacatecas", "mx-za", 0],
            ["Aguascalientes", "mx-ag", 0],
            ["Jalisco", "mx-ja", 0],
            ["Michoacán", "mx-mi", 0],
            ["Oaxaca", "mx-oa", 0],
            ["Puebla", "mx-pu", 0],
            ["Guerrero", "mx-gr", 0],
            ["Tlaxcala", "mx-tl", 0],
            ["Tamaulipas", "mx-tm", 0],
            ["Coahuila", "mx-co", 0],
            ["Yucatán", "mx-yu", 0],
            ["Durango", "mx-dg", 0],
            ["Guanajuato", "mx-gj", 0],
            ["San Luis Potosí", "mx-sl", 0],
            ["Hidalgo", "mx-hg", 0],
          ]);
          console.log("dataSales", dataSales);
        } else {
          res.data.results.forEach(element => {
            updateEntity(element);
          });
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoadingSellsEntity(false);
    };

    getSellsByEntity();
  }, [startDateGlobal, finishDateGlobal]);

  const getGroupsByCompany = async () => {
    try {
      setIsLoadingGroups(true);
      let res;
      if (typeCalendar.value === "days" || typeCalendar.value === "weekends") {
        //regular get
        res = await apiDirector.getGroups();
        setGroups(res.data.results);
      } else {
        let global = dayjs(startDateGlobal);
        res = await apiDirector.getGroupsMonth(getMonthSpanish(global.month()));
        console.log(getMonthSpanish(global.month()));
        // Here format to get same structure
        let groupAux = res.data.results?.map(item => ({
          name: item.year.group.name,
          totalAmount: item.amountuncollected,
        }));

        setGroups(groupAux);
      }

      setIsLoadingGroups(false);
    } catch (error) {
      setIsLoadingGroups(false);
    }
  };

  const updateEntity = entityToUpdate => {
    let newState = dataSales;

    newState.forEach(element => {
      if (element[0] === entityToUpdate.name) {
        element[2] = Number(entityToUpdate.totalAmount);
      }
    });

    setDataSales(newState);
  };

  const handleOnChangeDate = (date, typeCalendar) => {
    dispatch(
      setTypeCalendarGlobal({
        typeCalendar: {
          value: typeCalendar,
          isActive: true,
        },
      })
    );

    if (typeCalendar === "weekends") {
      let weekendDayStart = date.days[0].start;
      let weekendDayFinish = date.days[6].start;

      localStorage.setItem(
        "DRDate",
        JSON.stringify({
          start: weekendDayStart,
          finish: weekendDayFinish,
          typeCalendar: {
            value: typeCalendar,
            isActive: true,
          },
        })
      );

      dispatch(setStartDateGlobal({ startDate: weekendDayStart }));
      dispatch(setFinishDateGlobal({ finishDate: weekendDayFinish }));
      localStorage.setItem("DRDateStart", weekendDayStart);
      localStorage.setItem("DRDateFinish", weekendDayFinish);
      setStartDate(weekendDayStart);
      setFinishDate(weekendDayFinish);
    } else {
      localStorage.setItem(
        "DRDate",
        JSON.stringify({
          start: date.start,
          finish: date.finish,
          typeCalendar: {
            value: typeCalendar,
            isActive: true,
          },
        })
      );

      dispatch(setStartDateGlobal({ startDate: date.start }));
      dispatch(setFinishDateGlobal({ finishDate: date.finish }));
      localStorage.setItem("DRDateStart", date.start);
      localStorage.setItem("DRDateFinish", date.finish);
      setStartDate(date.start);
      setFinishDate(date.finish);
    }

    setShowCustomDate(false);
  };

  function getMonthSpanish(numberMonth) {
    switch (numberMonth) {
      case 0:
        return "Enero";
      case 1:
        return "Febrero";
      case 2:
        return "Marzo";
      case 3:
        return "Abril";
      case 4:
        return "Mayo";
      case 5:
        return "Junio";
      case 6:
        return "Julio";
      case 7:
        return "Agosto";
      case 8:
        return "Septiembre";
      case 9:
        return "Octubre";
      case 10:
        return "Noviembre";
      case 11:
        return "Diciembre";
      default:
        return "";
    }
  }

  const getMessage = () => {
    let currentHour = Number(dayjs().format("HH"));

    switch (true) {
      case currentHour < 12:
        return "¡Buenos Dias!";
      case currentHour > 12:
        return "¡Buenas Tardes!";
      case currentHour > 18:
        return "¡Buenas Noches!";

      default:
        return "¡Que tal!";
    }
  };

  const handleOpenCompare = () => {
    if (
      idsExecutivesToCompare[0]?.id === undefined ||
      idsExecutivesToCompare[1]?.id === undefined ||
      idsExecutivesToCompare[0]?.id === idsExecutivesToCompare[1]?.id
    )
      return;
    let query1 = { id: idsExecutivesToCompare[0]?.id };
    let query2 = { id: idsExecutivesToCompare[1]?.id };

    Promise.all([
      api.get(`dashboard/ejecutivessappapp?where=${JSON.stringify(query1)}`).then(res1 => {
        setExecutivesToCompare(executivesToCompare => {
          return [...executivesToCompare.slice(0, 0), res1.data.results[0], ...executivesToCompare.slice(1)];
        });
      }),
      api.get(`dashboard/ejecutivessappapp?where=${JSON.stringify(query2)}`).then(res2 => {
        setExecutivesToCompare(executivesToCompare => {
          return [...executivesToCompare.slice(0, 1), res2.data.results[0], ...executivesToCompare.slice(2)];
        });
      }),
    ])
      .then(([]) => {
        setOpenCompare(true);
      })
      .catch(error => console.log("error", error));
  };

  function cleanData(arrayOfArrays) {
    let value = arrayOfArrays.map(subArray => subArray.slice(1));
    console.log(arrayOfArrays);
    console.log(value);
    return value;
  }

  return (
    <DirectorLayout>
      <LayoutDirector>
        <div className="main">
          <div className="date">
            <div className="greeting">
              <p className="day">{getMessage()}</p>
              <p>Esto es lo que está pasando con sus equipos hoy.</p>
            </div>
            <div className="right_side">
              {/* Here comes the dates */}
              <ModalDateDirector
                showCustomDate={showCustomDate}
                setShowCustomDate={setShowCustomDate}
                handleOnChangeDate={handleOnChangeDate}
              />
            </div>
          </div>
          <CardsDirector apiDirector={apiDirector} startDate={startDate} finishDate={finishDate} />
          <Box height={40} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8}>
              <ChartDirector groups={groups} isLoadingGroups={isLoadingGroups} />
            </Grid>

            <Box height={40} />

            <Grid item xs={12} sm={4} md={4}>
              <SectionResumeDirector startDate={startDate} finishDate={finishDate} groups={groups} />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <SellsByCategoryDirector />
            </Grid>
            <Grid item xs={12} md={8}>
              <SellByProductBarChart />
            </Grid>

            <Grid item xs={12} md={8}>
              <MapSells data={cleanData(dataSales)} isLoading={isLoadingSellsEntity} />
            </Grid>

            <Grid item xs={12} md={4}>
              <SalesByEntitiesDirector />
            </Grid>

            <Grid item xs={12} md={4}>
              <TableExecutivesDirector
                setOpenCompare={setOpenCompare}
                idsExecutivesToCompare={idsExecutivesToCompare}
                setIdsExecutivesToCompare={setIdsExecutivesToCompare}
                handleOpenCompare={handleOpenCompare}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <GoalsChartDirector />
            </Grid>

            <Box height={80} bgcolor="red" />

            <Grid item xs={12} md={6}>
              <LastOportunitiesDirector />
            </Grid>

            <Grid item xs={12} md={6}>
              <PendingsDirector />
            </Grid>
          </Grid>
          <ModalCompare
            open={openCompare}
            setOpen={setOpenCompare}
            toCompare={executivesToCompare}
            setOpenCompare={setOpenCompare}
            isExecutive
          />
        </div>
      </LayoutDirector>
    </DirectorLayout>
  );
}

class RequestDirectorDashboard {
  constructor(startDate, finishDate) {
    this.startDate = startDate;
    this.finishDate = finishDate;
  }

  requestExecutives = async groupId => {
    try {
      let query = {};
      query.oportunity = {};
      query.oportunity.soldat = {
        $gte: startDate,
        $lte: finishDate,
      };
      query.oportunity.iscloseout = true;
      query.groupId = groupId;

      let params = {
        limit: 5,
        order: "-totalAmount",
        count: 1,
        skip: page,
        where: JSON.stringify(query),
      };
      return api.get("dashboard/ejecutivesamount", { params });
    } catch (error) {}
  };

  getCountProspectByCompany = (startDate, finishDate, ejecutiveSelected, queryParam) => {
    let query = { ...queryParam };
    query.prospect = {
      createdAt: {
        $gte: this.startDate,
        $lte: this.finishDate,
      },
    };
    let params = {
      where: JSON.stringify(query),
    };
    return api.get("dashboard/groupsprospect", { params });
  };

  getGroupsSalesByCompany = () => {
    return api("dashboard/groupsales");
  };

  getSales = (startDate, finishDate) => {
    let query = {
      oportunity: {
        soldat: {
          $gte: startDate,
          $lte: finishDate,
        },
      },
    };
    return api.get("dashboard/companysalesamount", { params: { where: JSON.stringify(query) } });
  };

  getGroupsMonth = monthName => {
    let query = { historicperiod: { name: monthName } };
    return api.get("dashboard/groupshistorics", {
      params: { limit: 8, where: JSON.stringify(query), order: "" },
    });
  };

  getGroups = () => {
    let query = {
      oportunity: {
        soldat: {
          $gte: this.startDate,
          $lte: this.finishDate,
        },
      },
    };
    return api.get("dashboard/groupsalesamount", {
      params: { limit: 8, where: JSON.stringify(query), order: "-totalAmount" },
    });
  };

  getProspectsCategory = () => {
    let query = {
      oportunity: {
        soldat: {
          $gte: this.startDate,
          $lte: this.finishDate,
        },
      },
    };
    return api.get("dashboard/groupscategories", {
      params: {
        limit: 100,
      },
      // params: { limit: 8, where: JSON.stringify(query), order: "-totalAmount" },
    });
  };

  getProspectsGroupByProduct = () => {
    let query = {
      oportunity: {
        soldat: {
          $gte: this.startDate,
          $lte: this.finishDate,
        },
      },
    };
    return api.get("dashboard/groupsproducts", {
      params: {
        limit: 1000,
      },
      // params: { limit: 8, where: JSON.stringify(query), order: "-totalAmount" },
    });
  };

  getEntitysales = (startDate, finishDate) => {
    let query = {
      oportunity: {
        soldat: {
          $gte: startDate,
          $lte: finishDate,
        },
      },
    };
    return api.get("dashboard/entitysales", {
      params: { limit: 35, where: JSON.stringify(query) },
    });
  };
}
