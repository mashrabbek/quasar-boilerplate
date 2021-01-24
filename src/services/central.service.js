import DataService from "@/services/data.service";

const CentralService = {
  async refreshPage() {
    try {
      await DataService.loadAll();
    } catch (error) {}
  }
};

export default CentralService;
