import { api } from "./api";

class LimiBotService {
  async askLimiBotGramatista(promp, template) {
    return api.post("/playground/limibot/gramatista", {
      message: `${promp} : ${template}`,
    });
  }
}

export default new LimiBotService();
