import { BusinessCenter, MonetizationOn, Payment, PeopleAlt } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import { validateIncludes, validateJoins } from "../../../../utils";
import CardGoalManager from "../../molecules/CardGoalManager";
import CardGoalManagerEmpty from "../../molecules/CardGoalManagerEmpty";
import CardExecutive from "../../molecules/CardExecutive";
import CardManager from "../../molecules/CardManager";
import CarouselComponent from "../Carousel";
import { CardsManagerLayout } from "./styles";
import CardPageExecutive from "../../molecules/CardPageExecutive";
import { Grid } from "@material-ui/core";

export default function CardsPageExecutives({ startDate, finishDate, id_executive, type }) {
  const [goals, setGoals] = useState([]);

  const { groupId, id_user } = useSelector(userSelector);

  const [prospects, setProspects] = useState({ isLoading: true, total: 0, totalbefore: 0 });
  const [leads, setLeads] = useState({
    isLoading: true,
    total: 0,
    totalbefore: 0,
  });
  const [oportunities, setOportunities] = useState({ isLoading: true, total: 0 });
  const [payments, setPayments] = useState({ isLoading: true, total: 0 });
  const [customers, setCustomers] = useState({ isLoading: true, total: 0 });
  const [totalPaid, setTotalPaid] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [totalAmountCollect, setTotalAmountCollect] = useState({
    isLoading: true,
    total: 0,
    totalbefore: 0,
    percentage: 0,
  });

  const [totalAmountPaid, setTotalAmountPaid] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });

  useEffect(() => {
    getGoalsRequest();
    getProspectRequest();
    getOportunitiesRequest();
    getPaymentsRequest();
    getCustomers();
    getTotalAmount();
    getTotalAmountPaid();
    getPendingPayments();
    getLeadsRequest();
  }, [startDate, finishDate, type, id_executive]);

  const getGoalsRequest = async () => {
    try {
      let query = {};
      query.goal = {};
      query.initialperiodate = {
        $gte: startDate,
      };
      query.or = [{ groupId: groupId }, { ejecutiveId: type === "ejecutive" ? id_user : id_executive }];
      let params = {
        include: validateIncludes({}),
        join: validateJoins({}),
        where: JSON.stringify(query),
        limit: 20,
        count: "0",
        order: "-createdAt",
        skip: 1,
      };
      let responseGoals = await api.get("ejecutivesgoals", { params });
      setGoals(responseGoals.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getProspectRequest = async () => {
    try {
      setProspects({ ...prospects, isLoading: true });
      let query = {};

      query.isclient = false;
      query.isoportunity = false;
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      query.ejecutiveId = type === "ejecutive" ? id_user : id_executive;

      let queryCustom = {
        ...query,

        createdAt: {
          $gte: dayjs(startDate).subtract(1, "month"),
          $lte: dayjs(finishDate).subtract(1, "month"),
        },
      };

      let params = {
        limit: 0,
        count: 1,
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryCustom),
        countcustomdate: 1,
      };
      let totalProspects = await api.get("prospects", { params });
      setProspects({
        ...prospects,
        total: totalProspects.data.count,
        totalbefore: totalProspects.data.countcustomdate,
        percentage: totalProspects.data.percentage,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getLeadsRequest = async () => {
    setLeads({ ...leads, isLoading: true });
    let query = {
      ejecutiveId: id_user,
      createdAt: {
        $gte: startDate,
        $lte: finishDate,
      },
    };

    let params = {
      limit: 0,
      count: 1,
      where: JSON.stringify(query),
    };

    try {
      let resp = await api.get("prospects", { params });
      setLeads({ ...leads, total: resp.data.count, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomers = async () => {
    try {
      setCustomers({ ...customers, isLoading: true });
      let query = { ejecutiveId: type === "ejecutive" ? id_user : id_executive };
      query.isclient = true;
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      let queryBefore = { ejecutiveId: type === "ejecutive" ? id_user : id_executive };
      queryBefore.createdAt = {
        $gte: dayjs(startDate).subtract(1, "month").format(),
        $lte: dayjs(finishDate).subtract(1, "month").format(),
      };

      let params = {
        limit: 0,
        count: 1,
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
        countcustomdate: 1,
      };
      let totalProspects = await api.get("prospects", { params });
      setCustomers({
        ...customers,
        total: totalProspects.data.count,
        totalbefore: totalProspects.data.countcustomdate,
        percentage: totalProspects.data.percentage,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOportunitiesRequest = async () => {
    try {
      setOportunities({ ...oportunities, isLoading: true });
      let query = {
        ejecutiveId: type === "ejecutive" ? id_user : id_executive,
        isoportunity: true,
        isclient: false,
      };
      let queryBefore = { ejecutiveId: type === "ejecutive" ? id_user : id_executive };
      query.oportunityAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      queryBefore.oportunityAt = {
        $gte: dayjs(startDate).subtract(1, "month").format(),
        $lte: dayjs(finishDate).subtract(1, "month").format(),
      };
      query.ejecutive = {
        groupId: groupId,
      };

      let params = {
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
        countcustomdate: 1,
        limit: 0,
        count: 1,
      };
      query.ejecutiveId = {
        groupId: groupId,
      };
      let totalOportunities = await api.get("prospects", { params });
      setOportunities({
        ...oportunities,
        total: totalOportunities.data.count,
        totalbefore: totalOportunities.data.countcustomdate,
        percentage: totalOportunities.data.percentage,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentsRequest = async () => {
    try {
      let query = {};
      query.ispaid = false;
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      query["oportunity"] = {
        prospect: {
          ejecutiveId: type === "ejecutive" ? id_user : id_executive,
        },
      };
      let params = {
        where: JSON.stringify(query),
        limit: 0,
        count: "1",
        order: "-createdAt",
        include: "oportunity,oportunity.prospect",
        join: "oportunity,oportunity.prospect,ejecutive",
        showejecutive: 1,
      };
      let responseOportunities = await api.get(`salespayments`, { params });
      setPayments({ ...payments, total: responseOportunities.data.count, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalAmountPaid = async () => {
    try {
      setTotalPaid({ ...totalPaid, isLoading: true });

      let query = {
        id: type === "ejecutive" ? id_user : id_executive,
        oportunity: {
          soldat: {
            $gte: startDate,
            $lte: finishDate,
          },
        },
      };

      let queryBefore = {
        id: type === "ejecutive" ? id_user : id_executive,
        salespayment: {
          soldat: {
            $gte: dayjs(startDate).subtract(1, "month").format(),
            $lte: dayjs(finishDate).subtract(1, "month").format(),
          },
        },
      };

      let params = {
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
      };
      let responseAmountSold = await api.get("dashboard/ejecutivesalesamount", { params: params });

      let resultsAmount = responseAmountSold?.data?.results[0];
      setTotalPaid({
        ...totalPaid,
        total: resultsAmount.totalAmount,
        isLoading: false,
        totalbefore: resultsAmount.totalCustomAmount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingPayments = async () => {
    try {
      setTotalAmountCollect({ ...totalAmountCollect, isLoading: true });
      let query = {
        id: type === "ejecutive" ? id_user : id_executive,
        salespayment: {
          date: {
            $gte: startDate,
            $lte: finishDate,
          },
        },
      };

      let queryBefore = {
        id: type === "ejecutive" ? id_user : id_executive,

        salespayment: {
          date: {
            $gte: dayjs(startDate).subtract(1, "month").format(),
            $lte: dayjs(finishDate).subtract(1, "month").format(),
          },
        },
      };

      let params = {
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
      };
      let responseAmountSold = await api.get("dashboard/ejecutivenopendingpaymentsamount", { params: params });
      let resultsAmount = responseAmountSold?.data?.results[0];

      setTotalAmountCollect({
        ...totalAmountCollect,
        total: resultsAmount.totalAmount,
        isLoading: false,
        totalbefore: resultsAmount.totalCustomAmount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalAmount = async () => {
    try {
      setTotalAmountPaid({ ...totalAmountPaid, isLoading: true });
      let query = {};
      let inQuery = {};
      query.salespayment = inQuery;
      inQuery.date = {
        $gte: startDate,
        $lte: finishDate,
      };
      let queryBefore = {};
      let inQueryBefore = {};
      queryBefore.salespayment = inQueryBefore;
      inQueryBefore.date = {
        $gte: dayjs(startDate).subtract(1, "month").format(),
        $lte: dayjs(finishDate).subtract(1, "month").format(),
      };

      let params = {
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
      };
      let responseAmountSold = await api.get("dashboard/ejecutivependingpaymentsamount", { params: params });
      let resultsAmount = responseAmountSold?.data?.results[0];

      setTotalAmountPaid({
        ...totalAmountPaid,
        total: resultsAmount.totalAmount,
        isLoading: false,
        totalbefore: resultsAmount.totalCustomAmount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardsManagerLayout>
      <Grid className="row" spacing={1} container={true}>
        <Grid className="goal-container" item={true} md={3}>
          <CarouselComponent renderChildren={true} time={5000}>
            {goals.length <= 0 && <CardGoalManagerEmpty />}
            {goals.map((item, index) => {
              return <CardGoalManager item={item} key={item.id} />;
            })}
          </CarouselComponent>
        </Grid>
        <Grid className="cards" item={true} md={9}>
          <CardPageExecutive item={{ ...data[0], ...prospects }} itemleads={leads} showLoading={prospects.isLoading} />
          <CardPageExecutive item={{ ...data[1], ...oportunities }} showLoading={oportunities.isLoading} />
          {/* <CardPageExecutive item={{ ...data[2], ...payments }} showLoading={payments.isLoading} /> */}
          <CardPageExecutive item={{ ...data[3], ...customers }} showLoading={customers.isLoading} />
          <CardPageExecutive isMoney item={{ ...data[4], ...totalPaid }} showLoading={totalPaid.isLoading} />
          <CardPageExecutive
            isMoney
            item={{ ...data[5], ...totalAmountCollect }}
            showLoading={totalAmountCollect.isLoading}
          />
          <CardPageExecutive
            isMoney
            item={{ ...data[6], ...totalAmountPaid }}
            showLoading={totalAmountPaid.isLoading}
          />
        </Grid>
      </Grid>
    </CardsManagerLayout>
  );
}

let data = [
  {
    index: 0,
    title: "Prospectos",
    colorbar: "#44cbe4",
    icon: <PeopleAlt className="icon icon_prospect" />,
  },
  {
    index: 1,
    title: "Oportunidades",
    colorbar: "#88c82d",
    icon: <MonetizationOn className="icon icon_oportunities" />,
  },
  {
    index: 2,
    title: "Cuentas por cobrar",
    colorbar: "#f77132",
    icon: <BusinessCenter className="icon icon_payments" />,
  },
  {
    index: 3,
    title: "Clientes",
    colorbar: "#6b34bc",
    icon: <Payment className="icon icon_discarted" />,
  },
  {
    index: 4,
    title: "Monto Vendido",
    colorbar: "rgb(97, 97, 97)",
    icon: <Payment className="icon icon_discarted" />,
  },
  {
    index: 5,
    title: "Monto a Cobrar",
    colorbar: "#f50057",
    icon: <Payment className="icon icon_discarted" />,
  },
  {
    index: 6,
    title: "Monto Pagado",
    colorbar: "#febc11",
    icon: <Payment className="icon icon_discarted" />,
  },
];
