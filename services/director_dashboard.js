import { api } from "./api";

class RequestDirectorDashboard {
  constructor(startDate, finishDate) {
    this.startDate = startDate;
    this.finishDate = finishDate;
  }

  getCountProspectByCompany = (startDate, finishDate, ejecutiveSelected, queryParam) => {
    let query = { ...queryParam };
    query.createdAt = {
      $gte: this.startDate,
      $lte: this.finishDate,
    };
    let params = {
      // countcustomdate: 1,
      // limit: 0,
      // count: 1,
      // wherecustom: JSON.stringify(query),
      where: JSON.stringify(query),
    };
    console.log(params);
    return api.get("dashboard/groupsprospect", { params });
  };

  getSales = (startDate, finishDate) => {
    let query = {
      oportunity: {
        soldat: {
          $gte: startDate,
          $lte: finishDate,
        },
      },
    };
    return api.get("dashboard/companysalesamount", { params: { where: JSON.stringify(query) } });
  };

  getTotalAmountOportunities = (startDate, finishDate) => {
    let query = {
      oportunity: {
        createdAt: {
          $gte: startDate,
          $lte: finishDate,
        },
        iscloseout: false,
        discarted: false,
        ispaid: false,
      },
      prospect: {
        discarted: false,
      },
    };
    return api.get("dashboard/companiesamount", { params: { where: JSON.stringify(query) } });
  };

  getQuotesAmountBy = (startDate, finishDate) => {
    let query = {
      date: {
        $gte: startDate,
        $lte: finishDate,
      },
    };
    let querycustom = {
      date: {
        $gte: startDate,
        $lte: finishDate,
      },
      ispaid: false,
    };
    let params = {
      where: JSON.stringify(query),
      wherecustom: JSON.stringify(querycustom),
    };
    return api.get(`dashboard/totalmonthpaymentsamount`, { params });
    // return api.get(`dashboard/paidunpaidsalesamount`, { params });
  };

  getQuotesAmount = () => {
    let params = {
      // count: 1,
    };

    return api.get("dashboard/salesamount", {
      params,
    });
  };

  getProspectsByCompany = (startDate, finishDate) => {
    let query = {
      createdAt: {
        $gte: startDate,
        $lte: finishDate,
      },
    };
    let params = {
      where: JSON.stringify(query),
      count: 1,
      limit: 0,
    };
    return api.get("prospects", { params });
  };

  getGroups = (startDate, finishDate) => {
    let query = {
      oportunity: {
        soldat: {
          $gte: this.startDate,
          $lte: this.finishDate,
        },
      },
    };
    return api.get("dashboard/groupsalesamount", {
      params: { all: 1, where: JSON.stringify(query), order: "-totalAmount" },
    });
  };
}

export default RequestDirectorDashboard;
