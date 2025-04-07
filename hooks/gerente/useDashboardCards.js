import React from "react";
import { useState } from "react";
import { api } from "../../services/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { formatNumber } from "../../utils";

class RequestDash {
  async getSummaryTotalSale(startDate, finishDate, groupId) {
    let params = {
      start_date: startDate,
      end_date: finishDate,
      group_id: groupId,
    };
    return await api.get("summary/sumsalesamount", { params });
  }

  async getSummaryTotalQuote(startDate, finishDate, groupId) {
    let params = {
      start_date: startDate,
      end_date: finishDate,
      group_id: groupId,
    };
    return await api.get("summary/sumquotesamount", { params });
  }

  // sumpaymentspaid

  async getSummaryTotalPaymentsPai(startDate, finishDate, groupId) {
    let params = {
      start_date: startDate,
      end_date: finishDate,
      group_id: groupId,
    };
    return await api.get("summary/sumpaymentspaid", { params });
  }

  //sumpaymentsnopaid

  async getSummaryTotalPaymentsNoPaid(startDate, finishDate, groupId) {
    let params = {
      start_date: startDate,
      end_date: finishDate,
      group_id: groupId,
    };
    return await api.get("summary/sumpaymentsnopaid", { params });
  }

  async getTotalOportunities(startDate, finishDate, groupId) {
    let query = {
      isclient: false,
      isoportunity: true,
    };
    query.createdAt = {
      $gte: startDate,
      $lte: finishDate,
    };

    query.ejecutive = {
      groupId: groupId,
    };

    let params = {
      limit: 0,
      count: 1,
      where: JSON.stringify(query),
    };

    return await api.get("prospects", { params });
  }

  async getTotalCustomers(startDate, finishDate, groupId) {
    let query = {
      isclient: true,
    };
    query.createdAt = {
      $gte: startDate,
      $lte: finishDate,
    };

    query.ejecutive = {
      groupId: groupId,
    };

    let params = {
      limit: 0,
      count: 1,
      where: JSON.stringify(query),
    };

    return await api.get("prospects", { params });
  }

  async getPotencialClients(startDate, finishDate, groupId) {
    let query = {
      prospect: {
        createdAt: {
          $gte: startDate,
          $lte: finishDate,
        },
      },
      certainty: {
        $gt: 50,
      },
    };

    let params = {
      limit: 0,
      count: 1,
      where: JSON.stringify(query),
    };

    return await api.get("oportunities", {
      params,
    });
  }
}

export default function useDashboardCards(startDate, finishDate) {
  const { groupId } = useSelector(userSelector);
  const [totalSaleAmount, setTotalSaleAmount] = useState({
    total: 0,
    isFetching: false,
  });
  const [totalQuotesAmount, setTotalQuotesAmount] = useState({
    total: 0,
    isFetching: false,
  });
  const [totalPaymentsPaid, setTotalPaymentsPaid] = useState({
    total: 0,
    isFetching: false,
  });
  const [totalPaymentsNoPaid, setTotalPaymentsNoPaid] = useState({
    total: 0,
    isFetching: false,
  });
  const apiDash = new RequestDash();

  useEffect(() => {
    if (!groupId) return;
    setTotalSaleAmount(prev => ({ ...prev, isFetching: true }));
    setTotalQuotesAmount(prev => ({ ...prev, isFetching: true }));
    setTotalPaymentsPaid(prev => ({ ...prev, isFetching: true }));
    setTotalPaymentsNoPaid(prev => ({ ...prev, isFetching: true }));

    apiDash
      .getSummaryTotalSale(startDate, finishDate, groupId)
      .then(res => setTotalSaleAmount(prev => ({ ...prev, total: res.data.Vendido })))
      .catch(err => console.log(err))
      .finally(() => setTotalSaleAmount(prev => ({ ...prev, isFetching: false })));

    apiDash
      .getSummaryTotalQuote(startDate, finishDate, groupId)
      .then(res => setTotalQuotesAmount(prev => ({ ...prev, total: res.data.Total })))
      .catch(err => console.log(err))
      .finally(() => setTotalQuotesAmount(prev => ({ ...prev, isFetching: false })));

    apiDash
      .getSummaryTotalPaymentsPai(startDate, finishDate, groupId)
      .then(res => setTotalPaymentsPaid(prev => ({ ...prev, total: res.data.total })))
      .catch(err => console.log(err))
      .finally(() => setTotalPaymentsPaid(prev => ({ ...prev, isFetching: false })));

    apiDash
      .getSummaryTotalPaymentsNoPaid(startDate, finishDate, groupId)
      .then(res => {
        setTotalPaymentsNoPaid(prev => ({ ...prev, total: res.data.total }));
      })
      .catch(err => console.log(err))
      .finally(() => setTotalPaymentsNoPaid(prev => ({ ...prev, isFetching: false })));
  }, [startDate, finishDate]);

  //   const [totalProspects, setTotalProspects] = useState(0);
  //   const [totalOportunities, setTotalOportunities] = useState(0);
  //   const [totalCustomer, setTotalCustomer] = useState(0);
  //   const [totoalPotencialOportunity, setTotoalPotencialOportunity] = useState(0);

  // let startDate = "2023-10-01T00:00:00-06:00";
  // let finishDate = "2023-10-31T00:00:00-06:00";

  //   useEffect(() => {
  //     console.log(startDate);
  //     console.log(finishDate);
  //   }, []);

  //   useEffect(() => {
  //     if (!groupId) return;
  //     fetchProspects();
  //   }, []);

  //   useEffect(() => {
  //     if (!groupId) return;
  //     fetchOportunities();
  //   }, []);

  //   useEffect(() => {
  //     if (!groupId) return;
  //     fetchCustomers();
  //   }, []);

  //   useEffect(() => {
  //     if (!groupId) return;
  //     fetchPotencialOportunities();
  //   }, []);

  //   async function fetchProspects() {
  //     await apiDash
  //       .getTotalProspects(startDate, finishDate, groupId)
  //       .then(res => setTotalProspects(res.data.count))
  //       .catch(err => console.log(err));
  //   }

  //   async function fetchOportunities() {
  //     await apiDash
  //       .getTotalOportunities(startDate, finishDate, groupId)
  //       .then(res => setTotalOportunities(res.data.count))
  //       .catch(err => console.log(err));
  //   }

  //   async function fetchCustomers() {
  //     await apiDash
  //       .getTotalCustomers(startDate, finishDate, groupId)
  //       .then(res => {
  //         setTotalCustomer(res.data.count);
  //         console.log(res);
  //       })
  //       .catch(err => console.log(err));
  //   }

  //   async function fetchPotencialOportunities() {
  //     await apiDash
  //       .getPotencialClients(startDate, finishDate, groupId)
  //       .then(res => {
  //         setTotoalPotencialOportunity(res.data.count);
  //         console.log(res);
  //       })
  //       .catch(err => console.log(err));
  //   }
  return {
    totalSaleAmount,
    totalQuotesAmount,
    totalPaymentsPaid,
    totalPaymentsNoPaid,
  };
}
