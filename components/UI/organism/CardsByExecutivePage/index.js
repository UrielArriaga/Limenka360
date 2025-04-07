import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import RequestExecutive from "../../../../services/request_Executive";
import { dataCardExecutives } from "../../../../utils";
import CardByExecutivePage from "../../molecules/CardByExecutivePage";

export default function CardsByExecutivePage(props) {
  const { startDate, finishDate, executive, periodDate, refetchData } = props;
  const [prospects, setProspects] = useState({ isLoading: false, total: 0, totalbefore: 0 });
  const [oportunities, setOportunities] = useState({ isLoading: false, total: 0, totalbefore: 0 });
  const [payments, setPayments] = useState({ isLoading: false, total: 0 });
  const [customers, setCustomers] = useState({ isLoading: false, total: 0 });
  const [totalSales, setTotalSalesAmount] = useState({ isLoading: false, total: 0 });

  const apiExecutive = new RequestExecutive(startDate, finishDate, executive, periodDate);

  useEffect(() => {
    initialRequest();
    getProspect();
    getOportuntiies();
    getClients();
    getTotalAmounts();
    getPayments();
  }, [startDate, periodDate, refetchData]);

  const getProspect = async () => {
    try {
      setProspects({ ...prospects, isLoading: true });
      let paramsProspects = {
        executive,
      };
      let prospectsRes = await apiExecutive.getProspectsCount(paramsProspects);
      setProspects({
        ...prospects,
        total: prospectsRes.data.count,
        totalbefore: prospectsRes.data.countcustomdate,
        isLoading: false,
      });
    } catch (error) {}
  };

  const getOportuntiies = async () => {
    try {
      setOportunities({ ...oportunities, isLoading: true });
      let oportunitiesRes = await apiExecutive.getOportunitiesCount();
      // console.log(
      //   `%c  ${JSON.stringify({ donde: "En en respuesta de contadores", ...oportunitiesRes.data }, null, 2)}`,
      //   "color: green"
      // );

      setOportunities({
        ...oportunities,
        total: oportunitiesRes.data.count,
        totalbefore: oportunitiesRes.data.countcustomdate,
        isLoading: false,
      });
    } catch (error) {}
  };

  const getClients = async () => {
    try {
      setCustomers({ ...customers, isLoading: true });
      let clientesRes = await apiExecutive.getClientsCount();
      setCustomers({
        ...customers,
        total: clientesRes.data.count,
        totalbefore: clientesRes.data.countcustomdate,
        isLoading: false,
      });
    } catch (error) {}
  };

  const getTotalAmounts = async () => {
    try {
      setTotalSalesAmount({ ...totalSales, isLoading: true });
      let AmountsRes = await apiExecutive.getTotalAmount();
      setTotalSalesAmount({
        ...totalSales,
        total: AmountsRes.data.results[0].salesAmount,
        totalbefore: AmountsRes.data.results[0].salesCustomAmount,
        isLoading: false,
      });
    } catch (error) {}
  };

  const getPayments = async () => {
    try {
      setPayments({ ...totalSales, isLoading: true });
      let AmountsRes = await apiExecutive.getCountPayments();
      setPayments({
        ...payments,
        total: AmountsRes.data.count,
        totalbefore: 0,
        isLoading: false,
      });
    } catch (error) {}
  };
  const initialRequest = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cards">
      {/* <button
        onClick={() => {
          apiExecutive
            .getCountPayments({ executive })
            .then(res => {
              console.log(res);
            })
            .catch(err => console.log(err));
        }}
      >
        Click me
      </button> */}
      <CardByExecutivePage isMoney item={{ ...dataCardExecutives[4], ...totalSales }} />
      <CardByExecutivePage item={{ ...dataCardExecutives[0], ...prospects }} />
      <CardByExecutivePage item={{ ...dataCardExecutives[1], ...oportunities }} />
      <CardByExecutivePage item={{ ...dataCardExecutives[3], ...customers }} />
      <CardByExecutivePage item={{ ...dataCardExecutives[2], ...payments }} />
    </div>
  );
}
