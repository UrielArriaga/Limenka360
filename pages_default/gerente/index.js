import { Button, Grid } from "@material-ui/core";
import { AttachMoney, BusinessCenter, MonetizationOn, Payment } from "@material-ui/icons";
import { KeyboardDatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../components/MainLayout";
import CardDashboard from "../../components/Manager/CardDashboard";
import GoalsExecutives from "../../components/UI/templates/ReportsManager/GoalsExecutives";
import ResumeExecutive from "../../components/UI/templates/ReportsManager/ResumeExecutive";
import TableExecutives from "../../components/UI/templates/ReportsManager/TableExecutives";
import SectionCalendar from "../../components/UI/templates/SectionCalendar";
import useDashboardAmounts from "../../hooks/gerente/useDashboardAmounts";
import useDashboardCards from "../../hooks/gerente/useDashboardCards";
import useGoalsGroup from "../../hooks/gerente/useGoalsGroup";
import useSummaryExecutive from "../../hooks/gerente/useSummaryExecutive";
import { userSelector } from "../../redux/slices/userSlice";
import { Divider, GerenteLayout } from "../../styles/Gerente";
import useDashboardCharts from "../../hooks/gerente/useDashboardCharts";
import SoldAndQuoteCategories from "../../components/UI/templates/ReportsManager/SoldAndQuoteCategories";
import SoldAndQuoteProducts from "../../components/UI/templates/ReportsManager/SoldAndQuoteProducts";
import SalesByEntitiesChart from "../../components/UI/templates/ReportsManager/SalesByEntitiesChart";
import SalesByEntitiesTable from "../../components/UI/templates/ReportsManager/SalesByEntitiesTable";
import { useRouter } from "next/router";
import LimiBot from "../../componentx/LimiBot";

export default function Gerente() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());

  const { totalSaleAmount, totalQuotesAmount, totalPaymentsPaid, totalPaymentsNoPaid } = useDashboardCards(
    startDate,
    finishDate
  );

  const { totalProspects, totalOportunities, totalCustomer, totoalPotencialOportunity, totalDiscartedProspect } =
    useDashboardAmounts(startDate, finishDate);

  const {
    ejecutiveGoalsData,
    isFetching,
    totalResults,
    orderBy,
    goalsNames,
    setTypeDataChart,
    typeDataChart,
    handleGetData,
    setOrderBy,
  } = useGoalsGroup(startDate, finishDate);

  const {
    executives,
    executiveSelected,
    executiveInfo,
    funnelData,
    handleSelectExecutive,
    isFetchingFunnel,
    lastOportunities,
  } = useSummaryExecutive(startDate, finishDate);

  const {
    dataProducts,
    dataCategories,
    dataEntities,
    dataSales,
    paginationEntites,
    getEntitiesAmounts,
    handleSwtichRequest,
    handleChangeViewEntities,
  } = useDashboardCharts(startDate, finishDate);

  const { groupId, userData } = useSelector(userSelector);
  const [ejecutivePendings, setEjecutivePendings] = useState({
    name: "Todos los Ejecutivos",
    lastname: "",
    id: "",
  });

  useEffect(() => {
    let startDateManager = localStorage.getItem("startDateManager");
    let endDateManager = localStorage.getItem("endDateManager");
    if (startDateManager) {
      setStartDate(startDateManager);
    }
    if (endDateManager) {
      setFinishDate(endDateManager);
    }
  }, []);

  const [date, setDate] = useState(new Date());
  const [viewOption, setViewOption] = useState("month");

  const handleClickNewGoal = () => {
    router.push("../herramientas/metas/nuevameta");
  };

  const handleOnChangeDate = (date, type) => {
    let newDate = dayjs(date).format();
    if (type === "start") {
      localStorage.setItem("startDateManager", newDate);
      setStartDate(newDate);
      return;
    }
    setFinishDate(newDate);
    localStorage.setItem("endDateManager", newDate);
  };

  return (
    <MainLayout>
      <Head>
        <title>CRM JOBS - Dashboard Gerente</title>
      </Head>

      <GerenteLayout>
        <Grid container>
          <Grid item={true} md={6} sm={12} xs={12}>
            <h3>Hola {userData?.fullname}</h3>
            <p>Bienvenid@ a limenka360 </p>
          </Grid>

          <Grid item={true} md={6} sm={12} xs={12}>
            <div className="datesection">
              <KeyboardDatePicker
                disableToolbar
                format="DD-MM-YYYY"
                views={["year", "month", "date"]}
                margin="normal"
                id="date-picker-inline"
                className="inputdate inputdate_lte"
                value={startDate}
                InputProps={{ disableUnderline: true, readOnly: true }}
                onChange={date => handleOnChangeDate(date, "start")}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

              <KeyboardDatePicker
                disableToolbar
                format="DD-MM-YYYY"
                views={["year", "month", "date"]}
                margin="normal"
                id="date-picker-inline"
                className="inputdate inputdate_lte"
                value={finishDate}
                InputProps={{ disableUnderline: true, readOnly: true }}
                onChange={date => handleOnChangeDate(date, "finish")}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

              <Button className="btn_addgoal" onClick={() => handleClickNewGoal()}>
                Agregar Nueva Meta
              </Button>
            </div>
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <div className="cardssection">
              <CardDashboard
                total={totalSaleAmount.total}
                isFetching={totalSaleAmount.isFetching}
                item={cardsInfo[0]}
                isMoney={true}
              />
              <CardDashboard
                total={totalQuotesAmount.total}
                isFetching={totalQuotesAmount.isFetching}
                item={cardsInfo[1]}
                isMoney={true}
              />
              <CardDashboard
                total={totalPaymentsNoPaid.total}
                isFetching={totalPaymentsNoPaid.isFetching}
                item={cardsInfo[2]}
              />
              <CardDashboard
                total={totalPaymentsPaid.total}
                isFetching={totalPaymentsPaid.isFetching}
                item={cardsInfo[3]}
              />
            </div>
          </Grid>

          <Grid item md={4} sm={12} xs={12}>
            <div className="summarysection">
              <h3>Vista General</h3>

              <div className="rowsummary">
                <div className="column leftsummary">
                  <p className="title_table">Total Leads</p>
                  <p className="value_table">
                    {totalOportunities + totalProspects + totalCustomer + totalDiscartedProspect}
                  </p>
                </div>

                <div className="column rightsummary">
                  <p className="title_table">Prospectos</p>
                  <p className="value_table">{totalProspects}</p>
                </div>
              </div>

              <div className="rowsummary">
                <div className="column leftsummary">
                  <p className="title_table">Oportunidades</p>
                  <p className="value_table">{totalOportunities}</p>
                </div>
                <div className="column rightsummary">
                  <p className="title_table">Cotizaciones 50%+ </p>
                  <p className="value_table">{totoalPotencialOportunity}</p>
                </div>
              </div>

              <div className="rowsummary">
                <div className="column leftsummarybotoom">
                  <p className="title_table">Clientes</p>
                  <p className="value_table">{totalCustomer}</p>
                </div>
                <div className="column rightsummary">
                  <p className="title_table">Descartados</p>
                  <p className="value_table">{totalDiscartedProspect}</p>
                </div>
              </div>
            </div>

            {/* <div className="summarysectionpercentajes">
              <h3>Vista General En Porcentajes</h3>

              <div className="rowsummary">
                <div className="column leftsummary">
                  <p className="title_table">Total Leads</p>
                  <p className={`value_table gte`}>100%</p>
                </div>

                <div className="column rightsummary">
                  <p className="title_table">Prospectos</p>
                  <p className="value_table gte">60%</p>
                </div>
              </div>

              <div className="rowsummary">
                <div className="column leftsummary">
                  <p className="title_table">Oportunidades</p>
                  <p className="value_table">10%</p>
                </div>
                <div className="column rightsummary">
                  <p className="title_table">Cotizaciones 50%+ </p>
                  <p className="value_table">{totoalPotencialOportunity}</p>
                </div>
              </div>

              <div className="rowsummary">
                <div className="column leftsummarybotoom">
                  <p className="title_table">Clientes</p>
                  <p className="value_table">{totalCustomer}</p>
                </div>
                <div className="column rightsummary">
                  <p className="title_table">Descartados</p>
                  <p className="value_table">{totalDiscartedProspect}</p>
                </div>
              </div>
            </div> */}
          </Grid>

          <Grid item md={8} sm={12} xs={12}>
            <GoalsExecutives
              isFetching={isFetching}
              goalsNames={goalsNames}
              orderBy={orderBy}
              ejecutiveGoalsData={ejecutiveGoalsData}
              setTypeDataChart={setTypeDataChart}
              typeDataChart={typeDataChart}
              handleGetData={handleGetData}
              totalResults={totalResults}
              setOrderBy={setOrderBy}
            />
          </Grid>

          <Grid item md={7} sm={12} xs={12}>
            <div className="executivessection">
              <div className="rowx">
                <h3>Ejecutivos</h3>
              </div>
              <TableExecutives data={executives} handleSelectExecutive={handleSelectExecutive} />
            </div>
          </Grid>

          <Grid item md={5} sm={12} xs={12}>
            <ResumeExecutive
              funnelData={funnelData}
              executiveSelected={executiveSelected}
              isFetchingFunnel={isFetchingFunnel}
              lastOportunities={lastOportunities}
            />
          </Grid>

          <Grid item md={5}>
            <SoldAndQuoteCategories dataCategories={dataCategories} handleSwtichRequest={handleSwtichRequest} />
          </Grid>

          <Grid item md={7}>
            <SoldAndQuoteProducts dataProducts={dataProducts} handleSwtichRequest={handleSwtichRequest} />
          </Grid>

          <Grid item md={7} sm={12} xs={12}>
            <SalesByEntitiesChart
              dataSales={dataSales}
              dataEntities={dataEntities}
              handleChangeViewEntities={handleChangeViewEntities}
            />
          </Grid>

          <Grid item md={5} sm={12} xs={12}>
            <SalesByEntitiesTable
              dataEntities={dataEntities}
              handleSwtichRequest={handleSwtichRequest}
              paginationEntites={paginationEntites}
            />
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <SectionCalendar
              groupId={groupId}
              startDate={startDate}
              finishDate={finishDate}
              ejecutive={ejecutivePendings}
              date={date}
              setDate={setDate}
              setEjecutive={setEjecutivePendings}
              viewOption={viewOption}
              setViewOption={setViewOption}
            />
          </Grid>
        </Grid>
      </GerenteLayout>

      {/* <LimiBot /> */}
    </MainLayout>
  );
}

let cardsInfo = [
  {
    index: 0,
    title: "Monto de Ventas",
    colorbar: "#44cbe4",
    colorrbga: "rgba(68, 203, 228,0.2)",
    total: 49310.44,
    icon: <AttachMoney className="icon icon_prospect" />,
  },
  {
    index: 1,
    title: "Monto Cotizado",
    colorbar: "#88c82d",
    colorrbga: "rgba(136, 200, 45,0.2)",
    total: 2000,
    icon: <MonetizationOn className="icon icon_oportunities" />,
  },
  {
    index: 2,
    title: "Monto por cobrar",
    colorbar: "#f77132",
    colorrbga: "rgba(247, 113, 50,0.2)",
    total: 2000,
    icon: <BusinessCenter className="icon icon_payments" />,
  },
  {
    index: 3,
    title: "Monto Cobrado",
    colorbar: "#6b34bc",
    colorrbga: "rgba(107, 52, 188,0.2)",
    total: 2000,
    icon: <Payment className="icon icon_discarted" />,
  },

  {
    index: 4,
    title: "Monto Vendido",
    colorbar: "#616161",
    colorrbga: "rgba(68, 203, 228,0.3)",
    total: 2000,
    icon: <Payment className="icon icon_discarted" />,
  },

  {
    index: 5,
    title: "Monto a cobrar",
    colorbar: "#f50057",
    colorrbga: "rgba(68, 203, 228,0.3)",
    icon: <Payment className="icon icon_discarted" />,
  },
  {
    index: 6,
    title: "Monto Pagado",
    colorbar: "#febc11",
    colorrbga: "rgba(68, 203, 228,0.3)",
    icon: <Payment className="icon icon_discarted" />,
  },
];

{
  /* 
  * Guide Tour
  <Walktour
        closeLabel="Cerrar"
        nextLabel="Siguiente"
        prevLabel="Anterior"
        steps={[
          {
            selector: "#step-one",
            title: "Grafica de datos",
            description: "Para visualizarlo en la seccion derecha",
          },
          {
            selector: "#step-two",
            title: "Selecciona los datos deseen mostrar",
            description: "Manten el mouse sobre la seccion o la carta",
          },
          {
            selector: "#step-three",
            title: "Selecciona los datos deseen mostrar",
            description: "Manten el mouse sobre la seccion o la carta",
          },

          {
            selector: "#step-four",
            title: "Selecciona la opcion",
            description: "Manten el mouse sobre la seccion o la carta",
          },
        ]}
      /> */
}
