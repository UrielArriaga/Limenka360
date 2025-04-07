import { api } from "./api";

class RequestDashboard {
  constructor(startDate, finishDate) {
    this.startDate = startDate;
    this.finishDate = finishDate;
  }

  getExecutive = id_executive => {
    return api.get(`ejecutives/${id_executive}`);
  };

  getProspectRequestCount = (startDate, finishDate, ejecutiveSelected, queryParam) => {
    let query = { ...queryParam };
    query.createdAt = {
      $gte: startDate,
      $lte: finishDate,
    };
    query.ejecutiveId = ejecutiveSelected?.id;

    let params = {
      countcustomdate: 1,
      limit: 0,
      count: 1,
      wherecustom: JSON.stringify(query),
      where: JSON.stringify(query),
    };
    console.log(params);
    return api.get("prospects", { params });
  };

  getOportunitiesRequestCount = (startDate, finishDate, ejecutiveSelected) => {
    let query = {};
    // query.isoportunity = true;

    query.prospect = {
      ejecutiveId: ejecutiveSelected?.id,
      oportunityAt: {
        $gte: startDate,
        $lte: finishDate,
      },
    };
    let params = {
      where: JSON.stringify(query),
      limit: 0,
      count: 1,
      include: "prospect",
      join: "prospect",
    };
    // query.ejecutiveId = {
    //   groupId: groupId,
    // };
    return api.get("oportunities", { params });
    // let totalOportunities = await api.get(`prospects?where={"ejecutiveId":"${id_user}"}&limit=0&count=1`);
  };

  getCustomers = (startDate, finishDate, ejecutiveSelected, queryParam) => {
    let query = { ...queryParam };
    query.createdAt = {
      $gte: startDate,
      $lte: finishDate,
    };
    query.ejecutiveId = ejecutiveSelected?.id;
    query.isclient = true;
    let params = {
      countcustomdate: 1,
      limit: 0,
      count: 1,
      wherecustom: JSON.stringify(query),
      where: JSON.stringify(query),
    };
    console.log(params);
    return api.get("prospects", { params });
  };

  getPashes = () => {
    return api.get("phases?limit=100&order=name");
  };

  getClientsCompanies = q => {
    let query = q;
    return api.get(`clientscompanies?where=${JSON.stringify(query)}`);
  };

  getOrigins = () => {
    return api.get(`origins?limit=15&order=name`);
  };
  getSpecialties = () => {
    return api.get(`specialties?all=1&order=name`);
  };
  getReasons = () => {
    return api.get(`reasons?order=reason`);
  };
  getActions = () => {
    return api.get(`actions?limit=10&order=name`);
  };
  getTypePendings = () => {
    return api.get(`pendingstypes?limit=10&order=name`);
  };
  getBrands = () => {
    return api.get(`brands?limit=122&order=name`);
  };
  getCategories = () => {
    return api.get(`categories?all=1&order=name`);
  };
  getProviders = () => {
    return api.get(`providers?limit=122&order=name`);
  };
  getTypeProducts = () => {
    return api.get(`productstypes?limit=20&order=name`);
  };

  getGroups = () => {
    return api.get(`groups?limit=100&order=name`);
  };
  getRoles = () => {
    return api.get(`roles?limit=100&order=name`);
  };
  getUsers = () => {
    return api.get(`ejecutives?limit=100&order=name`);
  };
  getLabels = () => {
    return api.get(`labels?limit=1000&order=label`);
  };
  getClossingReasons = () => {
    return api.get(`clossingreasons?limit=1000&order=reason`);
  };

  getEjecutivesByGroup = groupId => {
    return api.get(`ejecutives?where{"groupId":"${groupId}"&all=1`);
  };
}

export default RequestDashboard;
