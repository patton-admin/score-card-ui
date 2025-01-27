export const getJobData = (state) => {
  let jobs = state.jobOrder.jobOrders;
  let role = state.login.role;
  if (role !== "Sadmin") {
    return jobs.filter((e) => {
      let { clientTbl } = e;
      let { bktOwnerId } = clientTbl.bcktClients;
      if (clientTbl !== undefined && bktOwnerId == state.login.dbId) {
        e.clientId = e.clientTbl["clientId"];
        e.clientName = e.clientTbl["clientName"];
        return e;
      }
    });
  } else {
    return jobs.map((e) => {
      if (e.clientTbl !== undefined) {
        e.clientId = e.clientTbl["clientId"];
        e.clientName = e.clientTbl["clientName"];
        return e;
      }
    });
  }
};

export const getAvailableClients = (state) => {
  let clients = state.client.clients;
  let { role, dbId } = state.login;
  let clientList = [];
  if (role !== "Sadmin") {
    clients.filter((e) => {
      let { bcktClients } = e;
      if (bcktClients !== undefined && bcktClients["bktOwnerId"] == dbId) {
        // e.clientId = e.clientId;
        // e.clientName = e.clientName;
        return clientList.push({
          clientId: e.clientId,
          clientName: e.clientName,
        });
      }
    });
  } else {
    clients.filter((e) => {
      let { bcktClients } = e;
      if (bcktClients !== undefined) {
        // e.clientId = e.clientId;
        // e.clientName = e.clientName;
        return clientList.push({
          clientId: e.clientId,
          clientName: e.clientName,
        });
      }
    });
  }
  console.log("clientList...", clientList);
  return clientList;
};
