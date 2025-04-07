import dayjs from "dayjs";
import { api } from "./api";

class RequestExecutive {
  constructor(startDate, finishDate, showAll, executive, periodDate) {
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.executive = executive;
    this.periodDate = periodDate;
    this.showAll = showAll;
  }

  setstartDate(newDate) {
    this.startDate = newDate;
  }
  setexecutive(executive) {
    this.executive = executive;
  }

  setfinishDate(executive) {
    this.finishDate = executive;
  }

  printValues = () => {
    console.log(`%c  ${this.periodDate}`, "color: gray");
    console.log(`%c  ${this.startDate}`, "color: green");
    console.log(`%c  ${this.finishDate}`, "color: green");
  };

  getExecutive = id_executive => {
    return api.get(`ejecutives/${id_executive}`);
  };

  getTotalAmount = async () => {
    let query = {
      id: this.executive.id,
      oportunity: {
        soldat: {
          $gte: this.startDate,
          $lte: this.finishDate,
        },
      },
    };

    let dayInit = dayjs(this.startDate).subtract(1, "month").format();
    let dayFinish = dayjs(dayInit).endOf("month").format("");
    let queryBefore = {
      id: this.executive.id,

      oportunity: {
        soldat: {
          $gte: dayInit,
          $lte: dayFinish,
        },
      },
    };

    if (this.showAll) {
      delete query.ejecutive;
      delete queryBefore.ejecutive;
    }

    if (this.periodDate === "alltime") {
      delete query.oportunity.soldat;
      delete queryBefore.oportunity.soldat;
    }

    let params = {
      where: JSON.stringify(query),
      wherecustom: JSON.stringify(queryBefore),
    };
    return api.get("dashboard/ejecutivessappapp", { params: params });
  };

  getProspectsCount = async () => {
    // console.log(this.periodDate);
    // console.log(`%c  ${this.periodDate}`, "color: gray");
    // console.log(`%c  ${dayjs(this.startDate).format("MMMM D, YYYY")}`, "color: green");
    // console.log(`%c  ${dayjs(this.finishDate).format("MMMM D, YYYY")}`, "color: green");
    let query = {
      isclient: false,
      isoportunity: false,
    };
    let queryBefore = {
      isclient: false,
      isoportunity: false,
    };
    query.createdAt = {
      $gte: this.startDate,
      $lte: this.finishDate,
    };

    queryBefore.createdAt = {
      $gte: dayjs(this.startDate).subtract(1, "month").format(),
      $lte: dayjs(this.finishDate).subtract(1, "month").format(),
    };

    query.ejecutive = {
      id: this.executive.id,
    };
    queryBefore.ejecutive = {
      id: this.executive.id,
    };

    if (this.showAll) {
      delete query.ejecutive;
      delete queryBefore.ejecutive;
    }

    if (this.periodDate === "alltime") {
      delete query.createdAt;
      delete queryBefore.createdAt;
    }

    let params = {
      limit: 0,
      count: 1,
      where: JSON.stringify(query),
      wherecustom: JSON.stringify(queryBefore),
      countcustomdate: 1,
    };

    return api.get("prospects", { params });
  };

  getOportunitiesCount = () => {
    // let query = {
    //   isoportunity: true,

    //   ejecutiveId: this.executive.id,
    // };
    // let queryBefore = {
    //   isoportunity: true,

    //   ejecutiveId: this.executive.id,
    // };
    // query.createdAt = {
    //   $gte: this.startDate,
    //   $lte: this.finishDate,
    // };

    // let dayInit = dayjs(this.startDate).subtract(1, "month").format();
    // let dayFinish = dayjs(dayInit).endOf("month").format("");
    // queryBefore.createdAt = {
    //   $gte: dayInit,
    //   $lte: dayFinish,
    // };

    // if (this.periodDate === "alltime") {
    //   delete query.createdAt;
    //   delete queryBefore.createdAt;
    // }

    // let params = {
    //   where: JSON.stringify(query),
    //   wherecustom: JSON.stringify(queryBefore),
    //   countcustomdate: 1,
    //   limit: 0,
    //   count: 1,
    // };
    // return api.get("prospects", { params });

    let query = {};
    // query.isoportunity = true;

    query.createdAt = {
      $gte: this.startDate,
      $lte: this.finishDate,
    };
    query.prospect = {
      ejecutiveId: this.executive.id,
    };

    let queryBefore = {};

    let dayInit = dayjs(this.startDate).subtract(1, "month").format();
    let dayFinish = dayjs(dayInit).endOf("month").format("");

    queryBefore.createdAt = {
      $gte: dayInit,
      $lte: dayFinish,
    };

    if (this.showAll) {
      delete query.prospect.ejecutiveId;
      delete queryBefore.ejecutive;
    }

    let params = {
      where: JSON.stringify(query),
      wherecustom: JSON.stringify(queryBefore),
      limit: 0,
      count: 1,
      countcustomdate: 1,
    };
    // query.ejecutiveId = {
    //   groupId: groupId,
    // };
    return api.get("oportunities", { params });
  };

  getClientsCount = () => {
    let query = {};
    query.createdAt = {
      $gte: this.startDate,
      $lte: this.finishDate,
    };
    query.ejecutiveId = this.executive.id;
    query.isclient = true;

    let queryBefore = {};
    let dayInit = dayjs(this.startDate).subtract(1, "month").format();
    let dayFinish = dayjs(dayInit).endOf("month").format("");
    queryBefore.createdAt = {
      $gte: dayInit,
      $lte: dayFinish,
    };

    queryBefore.ejecutiveId = this.executive.id;
    queryBefore.isclient = true;

    if (this.periodDate === "alltime") {
      delete query.createdAt;
      delete queryBefore.createdAt;
    }
    let params = {
      where: JSON.stringify(query),
      wherecustom: JSON.stringify(queryBefore),
      countcustomdate: 1,
      limit: 0,
      count: 1,
    };
    // console.log(params);
    return api.get("prospects", { params });
  };

  getCountPayments = async () => {
    let query = {};
    query.ispaid = false;
    query.createdAt = {
      $gte: this.startDate,
      $lte: this.finishDate,
    };
    query["oportunity"] = {
      prospect: {
        ejecutiveId: this.executive.id,
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
    return api.get(`salespayments`, { params });
  };

  // * Request to Resume Section
  getProspectsNoViewed = ({ executive }) => {
    let query = {
      isclient: false,
      isoportunity: false,
      discarted: false,
      viewed: false,
    };

    query.createdAt = {
      $gte: this.startDate,
      $lte: this.finishDate,
    };

    query.ejecutive = {
      id: executive.id,
    };

    if (this.periodDate === "alltime") {
      delete query.createdAt;
    }

    let params = {
      limit: 0,
      count: 1,
      where: JSON.stringify(query),
    };

    return api.get("prospects", { params });
  };

  getQuotesCount = ({ executive }) => {
    let query = {
      prospect: {
        ejecutiveId: executive.id,
      },
      createdAt: {
        $gte: this.startDate,
        $lte: this.finishDate,
      },
    };

    if (this.periodDate === "alltime") {
      delete query.createdAt;
    }
    let params = {
      count: 1,
      limit: 0,
      include: "prospect",
      where: JSON.stringify(query),
    };

    return api.get("oportunities", { params });
  };
  getNoTrackingProspectCount = ({ executive }) => {
    let query = {
      ejecutiveId: executive.id,
      isoportunity: false,
      isclient: false,
      totalTrackings: { lte: 1 },
      createdAt: {
        $gte: this.startDate,
        $lte: this.finishDate,
      },
      // isclient: false,
      // isoportunity: false,
      // discarted: false,
      // viewed: false,
    };

    if (this.periodDate === "alltime") {
      delete query.createdAt;
    }
    let params = {
      limit: 0,
      count: 1,
      where: JSON.stringify(query),
    };

    return api.get("dashboard/prospectstracking", { params });
  };

  getClientCount = ({ executive }) => {
    let query = {
      isclient: true,
      discarted: false,
    };

    query.createdAt = {
      $gte: this.startDate,
      $lte: this.finishDate,
    };

    query.ejecutive = {
      id: executive.id,
    };

    let params = {
      limit: 0,
      count: 1,
      where: JSON.stringify(query),
    };

    return api.get("prospects", { params });
  };

  // TODO Pendings to calendar

  getCurrentPendings = ({ periodSearch, executive, date }) => {
    let [dateInit, dateFinish] = this.getDayToQuery(periodSearch, date);

    let query = {
      params: {
        limit: 100,
        count: 1,
        include: "pendingstype,prospect,prospect.phase",
        where: {
          ejecutiveId: executive.id,
          isdone: false,
        },
      },
    };

    if (periodSearch == "month") {
      query.params.where.date_from = { between: [dateInit, dateFinish] };
    }
    if (periodSearch == "week") {
      query.params.where.date_from = { between: [dateInit, dateFinish] };
    }
    if (periodSearch == "day") {
      query.params.where.date_from = { between: [dateInit, dateFinish] };
    }

    return api.get("pendings", query);
  };

  // * Helpers
  normalizeEvents = pendigns => {
    let events = [];
    for (let i = 0; i < pendigns.length; i++) {
      let event = {};
      const element = pendigns[i];
      event.id = element.id;
      event.title = element.subject;
      event.start = new Date(element.date_from);
      event.event = element;
      if (element.date_to) {
        event.end = new Date(element.date_to);
      } else {
        event.end = new Date(element.date_from);
      }
      events.push(event);
    }
    return events;
  };

  getDayToQuery = (periodSearch, date) => {
    console.log(date);
    let dateInit = dayjs();
    let dateFinish = dayjs();

    switch (periodSearch) {
      case "month":
        dateInit = dayjs(date).startOf("month").toISOString();
        dateFinish = dayjs(date).endOf("month").toISOString();
        break;
      case "week":
        dateInit = dayjs(date).startOf("week").toISOString();
        dateFinish = dayjs(date).endOf("week").toISOString();
        break;

      case "day":
        dateInit = dayjs(date).startOf("day").toISOString();
        dateFinish = dayjs(date).endOf("day").toISOString();
      default:
        break;
    }

    return [dateInit, dateFinish];
  };

  getProspects = pagination => {
    const { page, limit } = pagination;
    let query = {
      ejecutiveId: this.executive.id,
      isoportunity: false,
      isclient: false,
      createdAt: {
        $gte: this.startDate,
        $lte: this.finishDate,
      },
    };

    if (this.periodDate === "alltime") {
      delete query.createdAt;
    }
    let params = {
      include: "category",
      join: "cat",
      where: JSON.stringify(query),
      count: 1,
      order: "-createdAt",
      limit: limit,
      skip: page,
    };

    return api.get("prospects", {
      params,
    });
  };

  getOportunities = pagination => {
    const { page, limit } = pagination;
    // console.log(`%c  ${this.periodDate}`, "color: gray");
    // console.log(`%c  ${dayjs(this.startDate).format("MMMM D, YYYY")}`, "color: green");
    // console.log(`%c  ${dayjs(this.finishDate).format("MMMM D, YYYY")}`, "color: green");

    let query = {
      createdAt: {
        $gte: this.startDate,
        $lte: this.finishDate,
      },
      prospect: {
        ejecutiveId: this.executive.id,
      },
    };
    if (this.showAll) {
      delete query.prospect;
    }

    if (this.periodDate === "alltime") {
      delete query.createdAt;
    }
    let params = {
      showproducts: 1,
      include: "prospect,prospect.ejecutive",
      where: JSON.stringify(query),
      count: 1,
      order: "-createdAt",
      limit: limit,
      skip: page,
    };
    // console.log(`%c  ${JSON.stringify(params, null, 2)}`, "color: green");

    return api.get("oportunities", {
      params,
    });
  };

  getClients = pagination => {
    const { page, limit } = pagination;

    let query = {
      ejecutiveId: this.executive?.id,
      isclient: true,
      clientat: {
        $gte: this.startDate,
        $lte: this.finishDate,
      },
    };
    if (this.showAll) {
      delete query.ejecutiveId;
    }

    if (this.periodDate === "alltime") {
      delete query.clientat;
    }

    let params = {
      include: "category",
      join: "cat",
      where: JSON.stringify(query),
      count: 1,
      limit: limit,
      skip: page,
    };

    return api.get("prospects", {
      params,
    });
  };
}

export default RequestExecutive;
