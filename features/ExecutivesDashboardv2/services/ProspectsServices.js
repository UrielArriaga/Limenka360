//cree a class

import { api } from "../../../services/api";

class ProspectsServices {
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

    async getProspectsTotal() {
        let query = {
            isclient: false,
            isoportunity: false,
            ejecutiveId: this.userId,
            createdAt: {
                $gte: this.startDate,
                $lte: this.finishDate,
            },
        };

        let params = {
            limit: 0,
            count: 1,
            where: JSON.stringify(query),
        };

        return await api.get("prospects", { params });
    }


    async getNewProspects() {
        let query = {
            isclient: false,
            isoportunity: false,
            ejecutiveId: this.userId,

        };

        let params = {
            limit: 0,
            count: 1,
            where: JSON.stringify(query),
            order: "-createdAt"
        };

        return await api.get("prospects", { params });
    }

    async getBestOportunities() {
        let query = {
            isclient: false,
            isoportunity: true,
            ejecutiveId: this.userId,

        };

        let params = {
            limit: 0,
            count: 1,
            where: JSON.stringify(query),
        };

        return await api.get("oportunities", { params });

    }


}

export default ProspectsServices;
