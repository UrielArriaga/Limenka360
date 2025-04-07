import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useExecutives } from "../../redux/slices/ejecutivosSlice";
import { api } from "../../services/api";
import { userSelector } from "../../redux/slices/userSlice";

class apiSummary {
  getTotalProspects = async (start, end, group_id) => {
    let params = {
      where: JSON.stringify({
        created_at: {
          $gte: start,
          $lte: end,
        },
        ejecutive: {
          group_id: group_id,
        },
      }),
      include: "ejecutive",
      limit: 0,
      count: 1,
    };

    return await api.get("/prospects", { params });
  };

  getTotalOportunities = async (start, end, group_id) => {
    let params = {
      where: JSON.stringify({
        isoportunity: true,
        created_at: {
          $gte: start,
          $lte: end,
        },
        ejecutive: {
          group_id: group_id,
        },
      }),
      include: "ejecutive",
      limit: 0,
      count: 1,
    };

    return await api.get("/prospects", { params });
  };
}

export default function useSummaryGroup() {
  const { groupId } = useSelector(userSelector);
  const [totalProspects, setTotalProspects] = useState({
    total: 0,
    isFetching: false,
  });
  const [totalOportunities, setTotalOportunities] = useState({
    total: 0,
    isFetching: false,
  });
  const [totalPotencialClient, setTotalPotencialClient] = useState({
    total: 0,
    isFetching: false,
  });

  const [totalClients, setTotalClients] = useState({
    total: 0,
    isFetching: false,
  });

  // const { executives } = useSelector(useExecutives);

  let apiSum = new apiSummary();

  useEffect(() => {
    if (!groupId) return;

    // getExecutivesAmount();
  }, [groupId]);

  const fetchTotalProspects = async () => {
    try {
      let resp = await apiSum.getTotalProspects();
    } catch (error) {}
  };

  // const getExecutivesAmount = async () => {
  //   try {
  //     let params = {
  //       start_date: "2023-10-01T00:00:00-06:00",
  //       end_date: "2023-10-31T00:00:00-06:00",
  //       group_id: groupId,
  //     };

  //     let resExecutives = await api.get("/summary/summaryexecutive", { params });
  //     setExecutives(resExecutives.data.results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return {
    totalProspects,
    totalOportunities,
    executives,
  };
}
