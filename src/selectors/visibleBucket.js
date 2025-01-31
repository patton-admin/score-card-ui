export const bucketFilter = (state) => {
  let users = state.user.users;
  let id = users.filter((user) => user.userId === state.login.user_id);
  let x = id[0];
  if (id.length > 0) {
    return id[0].usrid;
  }
};

export const visibleBuckets = (state) => {
  let bkts = state.bucket.buckets;
  let users = state.user.users;
  let user = state.login.user_id;
  let role = state.login.role;
  if (role !== "Sadmin") {
    let id = users.filter((user) => user.userId === state.login.user_id);
    let x = id[0].usrid;
    let rst = [];
    if (x > 0 && bkts.length > 0) {
      bkts.filter((acc, bkt) => {
        let bucket = bkts[bkt];
        if (bucket["assignedUsers"] !== undefined) {
          let y;
          if (typeof bucket["assignedUsers"] === "string") {
            y = bucket.assignedUsers.split(",").map((e) => parseInt(e));
          } else if (Array.isArray(bucket["assignedUsers"])) {
            y = bucket.assignedUsers.join(",");
          }

          if (y.includes(x)) {
            rst.push(bucket);
          } else {
          }
        }
        return rst;
      }, []);
    }
    return rst;
  } else {
    return state.bucket.buckets;
  }
};

export const visibleCandidates = (state) => {
  let bkts = state.bucket.buckets;
  let candidates = state.candidate.candidates;
  let { role, dbId } = state.login;
  if (role !== "Sadmin") {
    let x = dbId.toString();
    let rst = [];
    if (x > 0 && bkts.length > 0) {
      bkts.filter((acc, bkt) => {
        let bucket = bkts[bkt];
        if (bucket["assignedUsers"] !== undefined) {
          let y;
          if (typeof bucket["assignedUsers"] === "string") {
            y = bucket.assignedUsers.split(",").map((e) => e);
          } else if (Array.isArray(bucket["assignedUsers"])) {
            y = bucket.assignedUsers.join(",");
          } else if (bucket["assignedUsers"] === null) {
            y = [x];
          }

          if (y.includes(x)) {
            rst.push(bucket.id);
          } else {
          }
        }

        return rst;
      }, []);
    }
    console.log(
      "processed canidate...",
      candidates.filter(
        (candidate) => rst.join().includes(candidate.bucket["id"]) === true
      )
    );
    return candidates.filter(
      (candidate) => rst.join().includes(candidate.bucket["id"]) === true
    );
  } else {
    return candidates;
  }
};

/***
 * to feed My Lead Component
 * to get only his bucket Data...
 */
export const myLeadData = (state) => {
  let candidates = state.candidate.candidates;
  let userId = state.login.dbId;
  let userRole = state.login.role;
  let x = "";

  if (userRole !== "Sadmin") {
    x = candidates.filter((e) => {
      if (e.bucket["bktOwnerId"] == userId) {
        return e;
      }
    });
    // console.log("my lead Data..", x);
    return x;
  } else if (userRole === "Sadmin") {
    x = candidates.filter((e) => {
      if (e.bucket["bktOwnerId"] == userId) {
        e.bucketId = e.bucket["id"];
        return e;
      }
    });
    return x;
  }
};

export const userLists = (state) => {
  let users = state.user.users;
  return users.filter((user) => user);
};

/*
 * if it is not admin, data will be filtered and
 * render the lead data based on which bucket he have access
 *
 */
export const getLeadData = (state) => {
  let candidates = state.candidate.candidates;
  let buckets = state.bucket.buckets;
  let { role, dbId } = state.login;
  // let candidate = [];

  // if (role === "Sadmin") {
  //   if (candidates.length > 0) {
  //     // console.log("lenght of candiates...", candidates.length);
  //     candidates.map((e) => {
  //       if (e.bucket !== undefined || e.bucket !== null) {
  //         let x = e;
  //         x.bucketId = e.bucket["id"];
  //         candidate.push(x);
  //       }
  //     });
  //   }
  // } else if (role !== "Sadmin" && role === `BDM`) {
  //   //iterate bucket get list of bucket he have access to
  //   let bucketAccessList = [];
  //   buckets.filter((e) => {
  //     if (e.assignedUsers.includes(dbId)) {
  //       bucketAccessList.push(e.id);
  //     }
  //   });
  //   let bucketAccessListString = bucketAccessList.join();
  //   return candidates.filter((e) => {
  //     let bucketId = e.bucket["id"];
  //     if (bucketAccessListString.includes(bucketId)) {
  //       return candidate.push(e);
  //     }
  //   });
  // }
  return candidates;
};

//bucket screen data load
/***
 * @Bucket screen
 * for data load
 * If assigned User is null, then it will convert that into empty array. Else Ignore it
 *
 */
export const bucketInitialData = (state) => {
  let buckets = state.bucket.buckets;
  let x = buckets.map((e) => {
    if (e.assignedUsers === null) {
      e.assignedUsers = [];
    }
    return e;
  });
  // console.log("value returned from visible Buckets...", x);
  return x;
};

/****
 * user's BucketId calculation...
 *
 * ****/
export const getUserBucketId = (state) => {
  let buckets = state.bucket.buckets;
  let { dbId, role } = state.login;
  let bkt = {};
  if (role !== "Sadmin") {
    buckets.filter((e) => {
      if (e.bktOwnerId.includes(dbId)) {
        bkt.id = e.id;
        bkt.bucketName = e.bucketName;
        return bkt;
      }
    });
    // console.log("bucketValue...", bkt);

    if (bkt.id === undefined) {
      bkt.bucketName = "NA";
    }
    return bkt;
  } else {
    buckets.filter((e) => {
      if (e.bktOwnerId) {
        bkt.id = e.id;
        bkt.bucketName = e.bucketName;
        return bkt;
      }
    });
    return bkt;
  }
};

/**
 * For showing the available drop down values for the Leads...
 * If the user is not part of a particular bucket, it will filter that one here...
 * @param {*} buckets
 */
export const availableBuckets = (state) => {
  let buckets = state.bucket.buckets;
  let id = state.login.dbId.toString();
  let isAdmin = state.login.role;
  let bucketsList = [];
  if (isAdmin !== "Sadmin") {
    //filtering only that users bcket
    buckets.filter((e) => {
      let x = e.assignedUsers.includes(id)
        ? bucketsList.push({ bktId: e.id, bktName: e.bucketName })
        : "";
    });
  } else {
    //do nothing
    buckets.filter((e) => {
      bucketsList.push({ bktId: e.id, bktName: e.bucketName });
    });
  }
  return bucketsList;
};

/**
 * to get the bucket user list
 *
 *  */

export const getAllBucketUserList = (state) => {
  let buckets = state.bucket.buckets;
  let bucketUserList = [];
  buckets.map((e) => {
    let bucketUser = {};
    bucketUser.owner = e.bktOwnerId;
    bucketUser.bucketId = e.id;
    bucketUser.bucketName = e.bucketName;
    bucketUserList.push(bucketUser);
  });

  // console.log("from visible Bucket...", bucketUserList);
  return bucketUserList;
};

/**
 * to get the bucket user list
 *
 *  */

export const getAllClientList = (state) => {
  let clients = state.client.clients;
  let clientList = [];
  clients.map((e) => {
    let client = {};
    client.clientId = e.clientId;
    client.clientName = e.clientName;
    client.bktOwnerId = e.bcktClients["bktOwnerId"];
    client.bucketId = e.bcktClients["id"];
    clientList.push(client);
  });

  // console.log("from visible clients...", clientList);
  return clientList;
};
