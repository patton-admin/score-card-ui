export const getClientData = (state) => {
  let clients = state.client.clients;
  let { role, dbId } = state.login;
  if (role !== "Sadmin") {
    return clients.filter((e) => {
      let { bcktClients } = e;
      if (bcktClients !== undefined && bcktClients["bktOwnerId"] == dbId) {
        e.bucketId = e.bcktClients["id"];
        e.bucketOwner = e.bcktClients["bucketOwner"];
        return e;
      }
    });
  } else {
    return clients.filter((e) => {
      if (e.bcktClients !== undefined) {
        e.bucketId = e.bcktClients["id"];
        e.bucketOwner = e.bcktClients["bucketOwner"];
        return e;
      }
    });
  }
};

export const getAvailableClientss = (clients) => {
  let clientList = [];
  clients.map((e) => {
    clientList.push({ clientId: e.clientId, clientName: e.clientName });
  });
  return clientList;
};
