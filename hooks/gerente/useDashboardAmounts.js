import React from "react";
import { useState } from "react";
import { api } from "../../services/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";

class RequestDash {
  async getTotalProspects(startDate, finishDate, groupId) {
    // setProspects({ ...prospects, isLoading: true });
    let query = {
      isclient: false,
      isoportunity: false,
      discarted: false,
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
      iscloseout: false,
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

  async getDiscardTedProspects(startDate, finishDate, groupId) {
    let query = {
      discarted: true,
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

    return api.get("prospects", { params });
  }
}

export default function useDashboardAmounts(startDate, finishDate) {
  const { groupId } = useSelector(userSelector);
  const apiDash = new RequestDash();

  const [totalProspects, setTotalProspects] = useState(0);
  const [totalOportunities, setTotalOportunities] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totoalPotencialOportunity, setTotoalPotencialOportunity] = useState(0);
  const [totalDiscartedProspect, setTotalDiscartedProspect] = useState(0);

  useEffect(() => {
    if (!groupId) return;
    fetchProspects();
  }, [startDate, finishDate]);

  useEffect(() => {
    if (!groupId) return;
    fetchOportunities();
  }, [startDate, finishDate]);

  useEffect(() => {
    if (!groupId) return;
    fetchCustomers();
  }, [startDate, finishDate]);

  useEffect(() => {
    if (!groupId) return;
    fetchPotencialOportunities();
  }, [startDate, finishDate]);

  useEffect(() => {
    if (!groupId) return;
    fetchDiscardtedProspects();
  }, [startDate, finishDate]);

  async function fetchDiscardtedProspects() {
    await apiDash
      .getDiscardTedProspects(startDate, finishDate, groupId)
      .then(res => setTotalDiscartedProspect(res.data.count))
      .catch(err => console.log(err));
  }

  async function fetchProspects() {
    await apiDash
      .getTotalProspects(startDate, finishDate, groupId)
      .then(res => setTotalProspects(res.data.count))
      .catch(err => console.log(err));
  }

  async function fetchOportunities() {
    await apiDash
      .getTotalOportunities(startDate, finishDate, groupId)
      .then(res => setTotalOportunities(res.data.count))
      .catch(err => console.log(err));
  }

  async function fetchCustomers() {
    await apiDash
      .getTotalCustomers(startDate, finishDate, groupId)
      .then(res => {
        setTotalCustomer(res.data.count);
      })
      .catch(err => console.log(err));
  }

  async function fetchPotencialOportunities() {
    await apiDash
      .getPotencialClients(startDate, finishDate, groupId)
      .then(res => {
        setTotoalPotencialOportunity(res.data.count);
      })
      .catch(err => console.log(err));
  }
  return {
    totalProspects,
    totalOportunities,
    totalCustomer,
    totoalPotencialOportunity,
    totalDiscartedProspect,
  };
}
