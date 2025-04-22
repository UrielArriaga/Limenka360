//cree a class

import { api } from "../../../services/api";

class PendingsService {
  constructor() {
    this.startDate = new Date();
    this.finishDate = new Date();
    this.userId = "";
  }

  getStartDate() {
    return this.startDate;
  }

  setStartDate(value) {
    this.startDate = value;
  }

  getFinishDate() {
    return this.finishDate;
  }

  setFinishDate(value) {
    this.finishDate = value;
  }

  getUserId() {
    return this.userId;
  }

  setUserId(value) {
    this.userId = value;
  }

  getPendings() {
    let query = {
      params: {
        limit: 3,
        count: 1,
        include: "pendingstype",
        order: `-date_from`,
        where: {
          isdone: false,
          ejecutiveId: this.userId,
        },
      },
    };

    return api.get("pendings", query);
  }
}

export default PendingsService;
