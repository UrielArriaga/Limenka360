import { BusinessCenter, MonetizationOn, Payment, PeopleAlt } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import { formatNumber, validateIncludes, validateJoins } from "../../../../utils";
import CardGoalManager from "../../molecules/CardGoalManager";
import CardGoalManagerEmpty from "../../molecules/CardGoalManagerEmpty";
import CardExecutive from "../../molecules/CardExecutive";
import CardManager from "../../molecules/CardManager";
import CarouselComponent from "../Carousel";
import { CardsManagerLayout } from "./styles";
import CardPageExecutive from "../../molecules/CardPageExecutive";
import styled from "styled-components";
import { Box } from "@material-ui/core";

export default function CardsExecutive({ startDate, finishDate, type }) {
  const [goals, setGoals] = useState([]);
  const { id_user, groupId } = useSelector(userSelector);

  const [prospects, setProspects] = useState({ isLoading: false, total: 0, totalbefore: 0 });
  const [oportunities, setOportunities] = useState({ isLoading: false, total: 0 });
  const [payments, setPayments] = useState({ isLoading: false, total: 0 });
  const [customers, setCustomers] = useState({ isLoading: false, total: 0 });
  const [totalSalesAmount, setTotalSalesAmount] = useState({ isLoading: false, total: 0 });

  useEffect(() => {
    requestTotalAmountByGroup();
    // getGoalsRequest();
    getProspectRequest();
    getOportunitiesRequest();
    getPaymentsRequest();
    getCustomers();
  }, [startDate, finishDate]);

  const requestTotalAmountByGroup = async () => {
    try {
      let query = {
        oportunity: {
          soldat: {
            $gte: startDate,
            $lte: finishDate,
          },
        },
      };
      let params = {
        where: JSON.stringify(query),
      };
      let response = await api.get("dashboard/groupsalesamount", { params: params });
      setTotalSalesAmount({ ...totalSalesAmount, total: response.data.results[0].totalAmount });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getGoalsRequest = async () => {
    try {
      let query = {};
      query.goal = {};
      query.initialperiodate = {
        $gte: startDate,
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
      console.log(responseGoals);
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
      console.log(params);
      let totalProspects = await api.get("prospects", { params });
      console.log(totalProspects);
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
      console.log(params);
      let totalProspects = await api.get("prospects", { params });
      console.log(totalProspects);
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
      query.ispaid = false;
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      query["oportunity"] = {
        prospect: {
          ejecutiveId: id_user,

          // ejecutiveId: payload.id,
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
      console.log(responseOportunities);
      setPayments({ ...payments, total: responseOportunities.data.count, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CardsManagerLayout>
      <div className="row">
        <div className="cards">
          <div className="cardbig">
            <h3 className="title">Monto Vendido</h3>
            <p className="totalAmount">{formatNumber(totalSalesAmount.total)}</p>
          </div>
          <CardPageExecutive item={{ ...data[0], ...prospects }} showLoading={prospects.isLoading} />
          <CardPageExecutive item={{ ...data[1], ...oportunities }} showLoading={oportunities.isLoading} />
          <CardPageExecutive item={{ ...data[2], ...payments }} showLoading={payments.isLoading} />
          <CardPageExecutive item={{ ...data[3], ...customers }} showLoading={customers.isLoading} />
        </div>
      </div>
      <Box display="flex" justifyContent="space-between">
        <CustomProgressBar bg="#a298d6"></CustomProgressBar>
        <CustomProgressBar bg="#097b68"></CustomProgressBar>
        <CustomProgressBar bg="#f59639"></CustomProgressBar>
      </Box>
    </CardsManagerLayout>
  );
}

const CustomProgressBar = styled.div`
  height: 10px;
  width: 33%;
  background-color: ${({ bg }) => (bg ? bg : "red")};
  border-radius: 8px;
`;

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
];
