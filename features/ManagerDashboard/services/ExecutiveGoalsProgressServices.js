//cree a class

import { api } from "../../../services/api";

class ExecutiveGoalsProgressServices {
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

  validateIncludes(type) {
    let includes;
    if (type === "Grupal" || type === "Individual" || type === "Empresarial") {
      includes = "goal";
    } else {
      includes = "goal";
    }
    return includes;
  }

  validateJoins(type) {
    let joins;
    if (type === "Grupal" || type === "Individual" || type === "Empresarial") {
      joins = "1,2,3,goal,goal.goaltype,goal.goalname";
    } else {
      joins = "1,2,3,goal,goal.goaltype.goalname";
    }
    return joins;
  }

  async getGoals() {
    console.log(this.startDate);
    console.log(this.finishDate);

    let query = {
      initialperiodate: {
        $gte: this.startDate,
        $lte: this.finishDate,
      },
      ejecutiveId: this.userId,
      or: [
        {
          // groupId: this.userId,
          ejecutiveId: this.userId,
        },
      ],
    };

    let params = {
      include: this.validateIncludes({}),
      join: this.validateJoins({}),
      where: JSON.stringify(query),
      limit: 20,
      count: "0",
      order: "-createdAt",
      skip: 1,
    };

    return await api.get("ejecutivesgoals", { params });
  }
}

export default ExecutiveGoalsProgressServices;
