import { Avatar, Box, Button, Grid } from "@material-ui/core";
import { ArrowBackIos, Close, Email, EmailOutlined, Person, PhoneOutlined } from "@material-ui/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LoaderViewExecutive from "../../components/UI/atoms/LoaderViewExecutive";
import PeriodRange from "../../components/UI/molecules/PeriodRange";
import CardByExecutivePage from "../../components/UI/molecules/CardByExecutivePage";
import CardsExecutive from "../../components/UI/organism/CardsPageExecutives";
import useFetch from "../../hooks/useFetch";
import RequestExecutive from "../../services/request_Executive";
import { ExecutiveStyled } from "../../styles/Ejecutivos/ejecutivo.styles";
import { dataCardExecutives, validateIncludes, validateJoins } from "../../utils";
import CardsByExecutivePage from "../../components/UI/organism/CardsByExecutivePage";
import CalendarExecutivePage from "../../components/UI/organism/CalendarExecutivePage";
import ResumeExecutivePage from "../../components/UI/organism/ResumeExecutivePage";
import ListLeadsExecutivePage from "../../components/UI/organism/ListLeadsExecutivePage";
import PreviewProspectDirector from "../../components/UI/organism/PreviewProspectDirector";
import useModal from "../../hooks/useModal";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import Head from "next/head";
import GoalsExecutivePage from "../../components/UI/organism/GoalsExecutivePage";
import TableGoalsExecutivePage from "../../components/UI/organism/TableGoalsExecutivePage";
import { api } from "../../services/api";

export default function Ejecutivo() {
  const router = useRouter();
  const { company } = useSelector(userSelector);
  const [refetchData, setRefetchData] = useState(false);
  const { open, toggleModal } = useModal();
  const { ejecutivo } = router.query;
  const [periodDate, setPëriodDate] = useState("month");
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());
  const { isFetching, data: executive } = useFetch({
    path: `ejecutives/${ejecutivo}`,
    param: {},
    condition: true,
    refetch: ejecutivo,
  });

  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (executive) {
      getGoalsByExecutive();
    }
  }, [executive]);

  const getGoalsByExecutive = async () => {
    try {
      let query = {};
      query.goal = {};
      query.initialperiodate = {
        $gte: startDate,
      };
      query.ejecutiveId = executive.id;
      let params = {
        include: validateIncludes("Individual"),
        join: validateJoins("Individual"),
        where: JSON.stringify(query),
        all: 1,
        count: "0",
        order: "-createdAt",
        skip: 1,
      };

      let responseGoals = await api.get("ejecutivesgoals", { params });
      setGoals(responseGoals.data.results);
      console.log(responseGoals);
    } catch (error) {
      console.log(error);
    }
  };

  const [prospectSelected, setProspectSelected] = useState({
    id: null,
    idOportunity: null,
    isOportunity: false,
    isClient: false,
  });

  const apiExecutive = new RequestExecutive(startDate, finishDate, executive, periodDate);

  useEffect(() => {
    if (periodDate === "month") {
      setStartDate(dayjs().startOf("month").format());
      setFinishDate(dayjs().endOf("month").format());
    }

    if (periodDate === "week") {
      setStartDate(dayjs().startOf("week").format());
      setFinishDate(dayjs().endOf("week").format());
    }

    if (periodDate === "today") {
      setStartDate(dayjs().startOf("day").format());
      setFinishDate(dayjs().endOf("day").format());
    }
  }, [periodDate]);

  useEffect(() => {
    getCurrenTime();
  }, []);

  const getCurrenTime = () => {
    let value = localStorage.getItem(`${company}-periodmyexecutive`);

    if (value) {
      setPëriodDate(value);
    }
  };

  const handleOnChangeDate = period => {
    localStorage.setItem(`${company}-periodmyexecutive`, period);
    setPëriodDate(period);
  };
  const normalizeDate = date => dayjs(date).format("D MMMM  YYYY");

  const handleSelectedProspect = (statusProspect, lead) => {
    console.log(lead);

    try {
      if (statusProspect === 0) {
        setProspectSelected({
          id: lead.id,
          isOportunity: false,
          isClient: false,
        });
        toggleModal();
      }
      if (statusProspect === 1) {
        setProspectSelected({
          id: lead.prospect.id,
          idOportunity: lead.id,
          isOportunity: true,
          isClient: false,
        });
        toggleModal();
      }
      if (statusProspect == 2) {
        setProspectSelected({
          id: lead.id,
          idOportunity: null,
          isOportunity: false,
          isClient: true,
        });
        toggleModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setProspectSelected({ id: null, isOportunity: false, isClient: false });
    toggleModal();
  };

  if (isFetching) return <LoaderViewExecutive />;

  return (
    <ExecutiveStyled>
      <Head>
        <title>Ejecutivo - {executive?.fullname}</title>
      </Head>
      <div className="header">
        <Box flexDirection={"row"} display="flex" alignItems={"center"}>
          <ArrowBackIos onClick={() => router.back()}>Test</ArrowBackIos>
          <p className="executivename">
            Ejecutivo: {executive.fullname} {executive.email}
          </p>
        </Box>
      </div>
      <div className="content">
        <div className="date_bar">
          <div className="current_date">
            <p className="date">
              {normalizeDate(startDate)} <span> - </span> {normalizeDate(finishDate)}
            </p>
          </div>
          <div className="dates">
            <PeriodRange
              handleOnChangeDate={handleOnChangeDate}
              periodDate={periodDate}
              setRefetchData={setRefetchData}
              refetchData={refetchData}
            />
          </div>
        </div>

        <CardsByExecutivePage
          startDate={startDate}
          finishDate={finishDate}
          executive={executive}
          periodDate={periodDate}
          apiExecutive={apiExecutive}
          refetchData={refetchData}
        />

        <Grid container spacing={2}>
          <Grid item md={8}>
            <CalendarExecutivePage
              apiExecutive={apiExecutive}
              startDate={startDate}
              finishDate={finishDate}
              executive={executive}
              refetchData={refetchData}
            />
          </Grid>
          <Grid item md={4}>
            <ResumeExecutivePage
              startDate={startDate}
              finishDate={finishDate}
              executive={executive}
              periodDate={periodDate}
              refetchData={refetchData}
            />
          </Grid>
          <Grid item md={6}>
            <GoalsExecutivePage
              startDate={startDate}
              finishDate={finishDate}
              executive={executive}
              periodDate={periodDate}
              refetchData={refetchData}
              goals={goals}
            />
          </Grid>

          <Grid item md={6}>
            <TableGoalsExecutivePage
              startDate={startDate}
              finishDate={finishDate}
              executive={executive}
              periodDate={periodDate}
              refetchData={refetchData}
              goals={goals}
            />
          </Grid>
        </Grid>

        <ListLeadsExecutivePage
          handleSelectedProspect={handleSelectedProspect}
          startDate={startDate}
          finishDate={finishDate}
          periodDate={periodDate}
          executive={executive}
          refetchData={refetchData}
        />
      </div>

      <PreviewProspectDirector
        prospectSelected={prospectSelected}
        open={open}
        toogle={closeModal}
        executive={executive}
      />
      <div className="date"></div>
      <div className="content"></div>
    </ExecutiveStyled>
  );
}
