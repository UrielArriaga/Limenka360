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
import CardManager from "../../molecules/CardManager";
import CarouselComponent from "../Carousel";
import { CardsManagerLayout } from "./styles";
import { Grid } from "@material-ui/core";

export default function CardsManager({ startDate, finishDate }) {
  const [goals, setGoals] = useState([]);
  const { id_user, groupId } = useSelector(userSelector);
  const [prospects, setProspects] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [oportunities, setOportunities] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [payments, setPayments] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [customers, setCustomers] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });

  const [totalPaid, setTotalPaid] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [totalToCharge, setTotalToCharge] = useState({ isLoading: false, total: 0, totalbefore: 0, percentage: 0 });
  const [totalAmountPaid, setTotalAmountPaid] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });

  useEffect(() => {
    getGoalsRequest();
    getProspectRequest();
    getOportunitiesRequest();
    getPaymentsRequest();
    getCustomers();
    getTotalAmountPaid();
    getTotalAmount();
    getAmountPaid();
  }, [startDate, finishDate]);

  const getGoalsRequest = async () => {
    try {
      let query = {};
      query.goal = {};
      query.initialperiodate = {
        $gte: startDate,
        $lte: finishDate,
      };
      query.or = [{ groupId: groupId }, { ejecutiveId: id_user }];
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
      let query = {
        isclient: false,
        isoportunity: false,
      };
      let queryBefore = {};
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };

      queryBefore.createdAt = {
        $gte: dayjs(startDate).subtract(1, "month").format(),
        $lte: dayjs(finishDate).subtract(1, "month").format(),
      };

      query.ejecutive = {
        groupId: groupId,
      };
      let params = {
        limit: 0,
        count: 1,
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
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

  const getCustomers = async () => {
    try {
      setCustomers({ ...customers, isLoading: true });
      let query = {
        isclient: true,
      };
      let queryBefore = {};
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      queryBefore.createdAt = {
        $gte: dayjs(startDate).subtract(1, "month").format(),
        $lte: dayjs(finishDate).subtract(1, "month").format(),
      };
      query.ejecutive = {
        groupId: groupId,
      };
      query.isclient = true;
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
        isoportunity: true,
        isclient: false,
      };
      let queryBefore = {};
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
      // query.ejecutiveId = {
      //   groupId: groupId,
      // };
      let totalOportunities = await api.get("prospects", { params });
      // let totalOportunities = await api.get(`prospects?where={"ejecutiveId":"${id_user}"}&limit=0&count=1`);
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
      let queryBefore = {};

      query.ispaid = false;
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };

      queryBefore.createdAt = {
        $gte: dayjs(startDate).subtract(1, "month").format(),
        $lte: dayjs(finishDate).subtract(1, "month").format(),
      };

      query["oportunity"] = {
        prospect: {
          ejecutive: {
            groupId: groupId,
          },
          // ejecutiveId: payload.id,
        },
      };
      let params = {
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
        countcustomdate: 1,
        limit: 0,
        count: "1",
        order: "-createdAt",
        include: "oportunity,oportunity.prospect",
        join: "oportunity,oportunity.prospect,ejecutive",
        showejecutive: 1,
      };
      let responseOportunities = await api.get(`salespayments`, { params });
      setPayments({
        ...payments,
        total: responseOportunities.data.count,
        isLoading: false,
        totalbefore: responseOportunities.data.countcustomdate,
        percentage: responseOportunities.data.percentage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const getTotalAmountPaid = async () => {
  //   try {
  //     setTotalPaid({ ...totalPaid, isLoading: true });

  //     let query = {
  //       createdAt: {
  //         $gte: startDate,
  //         $lte: finishDate,
  //       },
  //       // oportunity: {
  //       //   soldat: {
  //       //     $gte: startDate,
  //       //     $lte: finishDate,
  //       //   },
  //       // },
  //     };
  //     let queryBefore = {};

  //     // query.ispaid = false;

  //     queryBefore.createdAt = {
  //       $gte: dayjs(startDate).subtract(1, "month").format(),
  //       $lte: dayjs(finishDate).subtract(1, "month").format(),
  //     };

  //     let params = {
  //       where: JSON.stringify(query),
  //       wherecustom: JSON.stringify(queryBefore),
  //       countcustomdate: 1,
  //       // limit: 0,
  //       // count: 1,
  //       // order: "-createdAt",
  //       // include: "oportunity,oportunity.prospect",
  //       // join: "oportunity,oportunity.prospect,ejecutive",
  //       // showejecutive: 1,
  //     };
  //     let responseProspects = await api.get("dashboard/totalmonthsalesamount", { params: params });

  //     // setTotalPaid({
  //     //   ...totalPaid,
  //     //   total: responseProspects.data.totalAmount,
  //     //   isLoading: false,
  //     //   totalbefore: responseProspects.data.totalAmountCustom,
  //     // });
  //     // console.log("------------------------------");
  //     // console.log("results", responseProspects);

  //     // console.log("------------------------------");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getTotalAmountPaid = async () => {
    try {
      setTotalPaid({ ...totalPaid, isLoading: true });

      let query = {
        oportunity: {
          soldat: {
            $gte: startDate,
            $lte: finishDate,
          },
        },
      };

      let queryBefore = {
        oportunity: {
          soldat: {
            $gte: dayjs(startDate).subtract(1, "month").format(),
            $lte: dayjs(finishDate).subtract(1, "month").format(),
          },
        },
      };

      let params = {
        where: JSON.stringify(query),
      };
      let paramsBefore = {
        where: JSON.stringify(queryBefore),
      };
      let responseAmountSold = await api.get("dashboard/groupsalesamount", { params: params });

      let responseAmountSoldBefore = await api.get("dashboard/groupsalesamount", { params: paramsBefore });

      let resultsAmount = responseAmountSold?.data?.results[0];
      let resultsAmountBefore = responseAmountSoldBefore?.data?.results[0];
      setTotalPaid({
        ...totalPaid,
        total: resultsAmount.totalAmount,
        isLoading: false,
        totalbefore: resultsAmountBefore.totalAmount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalAmount = async () => {
    try {
      setTotalToCharge({ ...totalToCharge, isLoading: true });

      let query = {
        salespayment: {
          createdAt: {
            $gte: startDate,
            $lte: finishDate,
          },
        },
      };

      let queryBefore = {
        salespayment: {
          createdAt: {
            $gte: dayjs(startDate).subtract(1, "month").format(),
            $lte: dayjs(finishDate).subtract(1, "month").format(),
          },
        },
      };

      let params = {
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
      };
      let responseAmountSold = await api.get("dashboard/groupnopendingpaymentsamount", { params: params });
      let resultsAmount = responseAmountSold?.data?.results[0];
      setTotalToCharge({
        ...totalToCharge,
        total: resultsAmount.totalAmount,
        isLoading: false,
        totalbefore: resultsAmount.totalCustomAmount,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getAmountPaid = async () => {
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
      let responseAmountSold = await api.get("dashboard/grouppendingpaymentsamount", { params: params });
      let resultsAmount = responseAmountSold?.data?.results[0];
      if (responseAmountSold.status === 200) {
        setTotalAmountPaid({
          ...totalAmountPaid,
          total: resultsAmount.totalAmount,
          isLoading: false,
          totalbefore: resultsAmount.totalCustomAmount,
        });
      }
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
          <CardManager item={{ ...data[0], ...prospects }} showLoading={prospects.isLoading} />
          <CardManager item={{ ...data[1], ...oportunities }} showLoading={oportunities.isLoading} />
          {/* <CardManager item={{ ...data[2], ...payments }} showLoading={payments.isLoading} /> */}
          <CardManager item={{ ...data[3], ...customers }} showLoading={customers.isLoading} />
          <CardManager isMoney item={{ ...data[4], ...totalPaid }} showLoading={totalPaid.isLoading} />
          <CardManager isMoney item={{ ...data[5], ...totalToCharge }} showLoading={totalToCharge.isLoading} />
          <CardManager isMoney item={{ ...data[6], ...totalAmountPaid }} showLoading={totalAmountPaid.isLoading} />
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
    colorbar: "#616161",
    icon: <Payment className="icon icon_discarted" />,
  },

  {
    index: 5,
    title: "Monto a cobrar",
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
