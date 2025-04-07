import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { api } from "../../services/api";
import { tipos } from "../../BD/databd";

let initialStateTotals = {
  leadsprevious: 0,
  leadsmonth: 0,
  totalleads: 0,
  quoted: 0,
  quotedpreviousprospects: 0,
  quoteprospectsmonth: 0,
  totalquoted: 0,
  sold: 0,
};
const getStatusColor = percentaje => {
  if (percentaje < 10) {
    return "rgba(248, 105, 107,0.6)";
  } else if (percentaje < 25) {
    return "rgba(253, 199, 125,0.6)";
  } else if (percentaje < 70) {
    return "rgba(255, 235, 132,0.6)";
  } else {
    return "rgba(116, 195, 124,0.6)";
  }
};
export default function useSummaryExecutive(startDate, finishDate) {
  const { groupId } = useSelector(userSelector);
  const [totalProspects, setTotalProspects] = useState(0);
  const [totalOportunities, setTotalOportunities] = useState(0);
  const [executiveSelected, setExecutiveSelected] = useState(undefined);
  const [executiveInfo, setFxecutiveInfo] = useState(initialStateTotals);
  const [executives, setExecutives] = useState([]);
  const [isFetchingFunnel, setIsFetchingFunnel] = useState(false);
  const [lastOportunities, setLastOportunities] = useState({
    results: [],
    isFetching: false,
  });
  const [funnelData, setFunnelData] = useState({
    prospects: 0,
    oportunities: 0,
    customers: 0,
    prospectswithouttracking: 0,
    potencialOportunities: 0,
    salesamount: 0,
    salesquotesamount: 0,
    percentajequote: 0,
  });

  useEffect(() => {
    if (!groupId) return;
    getExecutivesAmount();
  }, [groupId, startDate, finishDate]);

  useEffect(() => {
    if (!executiveSelected) return;
    fetchSummaryInfoExecutive();
    fetchProspects();
    fetchProspectsAsOportunties();

    fetchLastOportunities();
  }, [executiveSelected]);

  // * Requests Section
  const fetchSummaryInfoExecutive = async () => {
    try {
      let params = {
        start_date: startDate,
        end_date: finishDate,
        executive_id: executiveSelected.id,
      };

      let respExecutive = await api.get("/summary/summaryexecutiveinfo", { params });

      let { leadsprevious, leadsmonth, quoted, quotedpreviousprospects, quoteprospectsmonth, sold } =
        respExecutive.data;

      setFxecutiveInfo({
        totalleads: Number(leadsprevious) + Number(leadsmonth),
        totalquoted: quoted + quotedpreviousprospects + quoteprospectsmonth,
        leadsprevious,
        leadsmonth,
        quoted,
        quotedpreviousprospects,
        quoteprospectsmonth,
        sold,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLastOportunities = async () => {
    try {
      let queryGoals = {
        iscloseout: false,
        // updatedAt: {
        //   $gte: startDateGlobal,
        //   $lte: finishDateGlobal,
        // },
      };
      if (groupId) {
        queryGoals.prospect = {
          // ejecutive: {
          //   groupId: groupId,
          // },
          ejecutiveId: executiveSelected.id,
        };
      }

      let params = {
        count: 1,
        include: "prospect,prospect,prospect.clienttype",
        order: "-createdAt",
        limit: 5,
        where: JSON.stringify(queryGoals),
      };
      let res = await api.get("oportunities", {
        params: params,
      });

      setLastOportunities({
        results: res.data.results,
        isFetching: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSumSalesExecutive = async () => {
    try {
      let params = {
        start_date: startDate,
        end_date: finishDate,
        executive_id: executiveSelected.id,
      };

      let respExecutive = await api.get("/summary/sumsalesamount", { params });

      let { leadsprevious, leadsmonth, quoted, quotedpreviousprospects, quoteprospectsmonth, sold } =
        respExecutive.data;

      setFxecutiveInfo({
        totalleads: Number(leadsprevious) + Number(leadsmonth),
        totalquoted: quoted + quotedpreviousprospects + quoteprospectsmonth,
        leadsprevious,
        leadsmonth,
        quoted,
        quotedpreviousprospects,
        quoteprospectsmonth,
        sold,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const // Function to get the executives amount
    getExecutivesAmount = async () => {
      try {
        // Params to get the executives amount
        let params = {
          start_date: startDate,
          end_date: finishDate,
          group_id: groupId,
        };
        let resExecutives = await api.get("/summary/summaryexecutive", { params });
        let executiveAndValues = resExecutives.data?.results?.map(executive => {
          let proportunidades = (executive.Oportunidades / executive.Leads) * 100;
          let prclients = (executive.Ventas / executive.Oportunidades) * 100;

          // Set defaults for proportunidades and prclients.
          proportunidades = isNaN(proportunidades) ? 0 : proportunidades;
          prclients = isNaN(prclients) ? 0 : prclients;

          // Return the executive with the proportunidades and prclients properties.
          return {
            ...executive,
            proportunidades: proportunidades,
            prclients: prclients,
            proportunidadesColor: getStatusColor(isNaN(proportunidades) ? 0 : proportunidades),
            prclientsColor: getStatusColor(isNaN(prclients) ? 0 : prclients),
          };
        });
        if (executiveAndValues.length > 0) {
          setExecutiveSelected(executiveAndValues[0]);
        }
        setExecutives(executiveAndValues);
      } catch (error) {
        console.log(error);
      }
    };

  const fetchProspects = async () => {
    try {
      setIsFetchingFunnel(true);

      let query = {};
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      query.ejecutiveId = executiveSelected.id;

      let paramsProspects = {
        limit: 0,
        count: 1,
        where: JSON.stringify({ ...query, isoportunity: false, isclient: false }),
      };

      let paramsOportunties = {
        limit: 0,
        count: 1,
        where: JSON.stringify({ ...query, isoportunity: true, isclient: false }),
      };
      let paramsCustomers = {
        limit: 0,
        count: 1,
        where: JSON.stringify({ ...query, isclient: true }),
      };

      let paramsNoTracking = {
        limit: 3,
        count: 1,
        where: JSON.stringify({
          ...query,
          isoportunity: false,
          isclient: false,

          totalTrackings: {
            $eq: 1,
          },
        }),
      };

      let totalProspects = await api.get("prospects", { params: paramsProspects });

      let totalOportutnies = await api.get("prospects", { params: paramsOportunties });

      let totalCustomer = await api.get("prospects", { params: paramsCustomers });

      let totalProspectsWithoutTracking = await api.get("prospects", { params: paramsNoTracking });

      // let totalPotencialOportunity = await api.get("oportunities", { params: paramsPotencialOportunities });

      let params = {
        start_date: startDate,
        end_date: finishDate,
        executive_id: executiveSelected.id,
      };
      let respQuotesAmount = await api.get("/summary/sumquotesamount", { params });

      let respExecutive = await api.get("/summary/sumsalesamount", { params });

      let paramsPotencialOportunities = {
        limit: 0,
        count: 1,
        where: JSON.stringify({
          prospect: {
            ...query,
          },
          certainty: {
            $gt: 50,
          },
        }),
      };

      let percentaje = (respQuotesAmount.data.Total / respExecutive.data.Total) * 100;

      setFunnelData({
        ...funnelData,
        prospects: totalProspects.data.count,
        oportunities: totalOportutnies.data.count,
        customers: totalCustomer.data.count,
        prospectswithouttracking: totalProspectsWithoutTracking.data.count,
        // potencialOportunities: totalPotencialOportunity.data.count,
        salesamount: respExecutive.data.Total,
        salesquotesamount: respQuotesAmount.data.Total,
        percentajequote: percentaje >= 100 ? 100 : percentaje,
      });
      setIsFetchingFunnel(false);
    } catch (error) {
      console.log(error);
      setIsFetchingFunnel(false);
    }
  };

  const fetchProspectsAsOportunties = async () => {
    // try {
    //   let query = {};
    //   // start_date: "2023-10-01T00:00:00-06:00",
    //   // end_date: "2023-10-31T00:00:00-06:00",
    //   query.isoportunity = true;
    //   query.createdAt = {
    //     $gte: "2023-10-01T00:00:00-06:00",
    //     $lte: "2023-10-31T00:00:00-06:00",
    //   };
    //   query.ejecutiveId = executiveSelected.id;
    //   let params = {
    //     limit: 0,
    //     count: 1,
    //     where: JSON.stringify(query),
    //   };
    //   // console.log(params);
    //   let totalProspects = await api.get("prospects", { params });
    //   setFunnelData({
    //     ...funnelData,
    //     oportunities: totalProspects.data.count,
    //   });
    //   // console.log("prospects", totalProspects.data);
    //   console.log(totalProspects);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // * Handlers Section
  const handleSelectExecutive = executive => {
    setExecutiveSelected(executive);
  };

  return {
    totalProspects,
    totalOportunities,
    executives,
    handleSelectExecutive,
    executiveSelected,
    executiveInfo,
    funnelData,
    isFetchingFunnel,
    lastOportunities,
  };
}
