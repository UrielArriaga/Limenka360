//cree a class

import dayjs from "dayjs";
import { api } from "../../../services/api";

class CalendarServices {
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

  normalizeEvents(events) {
    return events.map(event => {
      return {
        id: event.id,
        title: event.title,
        start: new Date(event.date_from),
        end: new Date(event.date_to || event.date_from),
        // end: event.date_to ? dayjs(event.date_to).format() : dayjs().format(),

        // start: new Date(2025, 1, 7),
        // end: new Date(2025, 1, 10),
        allDay: true,
        resource: event,
      };
    });
  }

  getInitalPendings() {
    const query = {
      params: {
        limit: 500,
        count: 1,
        // include: "pendingstype,prospect,prospect.phase",
        include: "",
        where: {
          ejecutiveId: this.userId,
          isdone: false,
          date_from: {
            between: [this.startDate, this.finishDate],
          },
        },
      },
    };

    return api.get("/pendings", query);
  }
}

export default CalendarServices;
