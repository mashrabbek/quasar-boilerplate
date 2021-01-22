const DataService = {
  async loadAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("loading all..");
      }, 2000);
      resolve();
    });
  }
};

module.exports = DataService;
