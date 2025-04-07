import { api } from "./api";

class RequestCommon {
  getClientTypes = () => {
    return api.get("clienttypes?all=1&order=name");
  };

  getPashes = () => {
    return api.get("phases?limit=100&order=name");
  };

  getClientsCompanies = q => {
    let query = q;
    return api.get(`clientscompanies?where=${JSON.stringify(query)}&all=1&order=companyname`);
  };

  getOrigins = () => {
    return api.get(`origins?all=1&order=name`);
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
    return api.get(`brands?all=1&order=name`);
  };
  getCategories = () => {
    return api.get(`categories?all=1&order=name`);
  };
  getProviders = () => {
    return api.get(`providers?all=1&order=name`);
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

  getTypeSales = () => {
    return api.get(`typesales?limit=1000&order=name`);
  };

  getEjecutivesByGroup = groupId => {
    return api.get(`ejecutives?where{"groupId":"${groupId}"&all=1`);
  };
  getCfdi = () => {
    return api.get(`cfdi?limit=1000&order=name`);
  };
  getpaymentmethods = () => {
    return api.get(`paymentmethods?limit=1000&order=name`);
  };
  getpaymentways = () => {
    return api.get(`paymentways?limit=1000&order=name`);
  };
  getReasonsOrders = () => {
    return api.get(`orderreasons?order=reason`);
  };
  getStatusOrders = () => {
    return api.get(`orderstatus?order=name&all=1`);
  };
  getUsersGroup = () => {
    return api.get(`ejecutives?limit=100&order=name&include=group`);
  };
  getpaymentAccount = () => {
    return api.get(`paymentsacounts?limit=1000&order=name`);
  };
  gettaxregimens = () => {
    return api.get(`taxregimes?limit=1000&order=name`);
  };
  getChannels = () => {
    return api.get(`channels?limit=1000&order=name`);
  };
  getwarehouses = () => {
    return api.get(`warehouses?limit=100&order=name`);
  };
}

export default RequestCommon;
