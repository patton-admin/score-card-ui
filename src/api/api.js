/***
Api call for the CHRMS...
***/

import axios from "axios";
import { store } from "./../index";

// const api =
//   process.env.REACT_APP_API_URL ||
//   "http://pattonapp-env.eba-gumwmwmm.us-east-2.elasticbeanstalk.com/chms";
const api =
  "http://ec2-3-135-229-93.us-east-2.compute.amazonaws.com:5001/chms";
// process.env.REACT_APP_API_URL;

export const login = (options) => {
  // let api = "http://localhost:5001/chms";
  options.url = `${api}/login`;
  return axios(options);
};

export const loginUser = (data) => {
  // let api = "http://localhost:5001/chms";
  return axios
    .post(`${api}/authenticate`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

/************************************Users*************************************************/

//getting all users...

export const getAllusers = (options) => {
  // options.url = `${api}/allUsers`;
  return axios(`${api}/allUsers`);
};

//adding users to the application
export const addUserApi = (data) => {
  return axios.post(`${api}/addUser`, data).then((response) => {
    return response;
  });
};

export const deleteUserApi = (data) => {
  data = data.map((e) => parseInt(e));
  return axios
    .post(`${api}/deleteByUserId`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

/************************************Bucket*************************************************/

//getting all bucket...
export const getAllBuckets = (options) => {
  options.url = `${api}/allBuckets`;
  return axios(options);
};

export const updateBucketApi = (data) => {
  return axios.post(`${api}/updateBucket`, data).then((response) => {
    return response;
  });
};

//adding bucket to the application...
export const addBucketApi = (data) => {
  return axios.post(`${api}/addBucket`, data).then((response) => {
    return response;
  });
};

//deleting the jobOrder...
export const deleteBucketApi = (data) => {
  data = data.map((e) => parseInt(e));
  return axios
    .post(`${api}/deleteByBucketId`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

/************************************Job orders*************************************************/

//getting joborder to the application...

export const getAllJobOrders = (options) => {
  options.url = `${api}/allJobOrders`;
  return axios(options);
};

//adding joborders to the application...
export const addJobOrderApi = (data) => {
  return axios.post(`${api}/addJobOrder`, data).then((response) => {
    return response;
  });
};

//update joborder to the application...
export const updateJobOrderApi = (data) => {
  return axios.post(`${api}/updateJobOrder`, data).then((response) => {
    return response;
  });
};

//deleting the jobOrder...
export const deleteJobApi = (data) => {
  data = data.map((e) => parseInt(e));
  return axios
    .post(`${api}/deleteByJobId`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

/************************************Candidates*************************************************/

//getting candidates to the application...
export const getAllCandidates = (options) => {
  options.url = `${api}/allLeads`;
  return axios(options);
};

//adding candidates to the application...
export const addCandidateApi = (data) => {
  return axios
    .post(`${api}/addLead`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteCandidateApi = (data) => {
  data = data.map((e) => parseInt(e));
  return axios
    .post(`${api}/deleteByLeadId`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

//example for passing params like this...
export const deleteCandidateApiV0 = (data) => {
  return axios
    .get(`${api}/deleteByLeadId`, {
      params: {
        leadId: parseInt(data),
      },
    })
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

/************************************Clients*************************************************/

//getting client to the application...
export const getAllClients = (options) => {
  options.url = `${api}/allClients`;
  return axios(options);
};

//adding client to the application...
export const addClientApi = (data) => {
  return axios
    .post(`${api}/addClient`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

//update client to the application...
export const updateClientApi = (data) => {
  return axios
    .post(`${api}/updateClient`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteClientApi = (data) => {
  data = data.map((e) => parseInt(e));
  return axios
    .post(`${api}/deleteClients`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
/************************************Todo*************************************************/

//getting todo to the application...
export const getAllTodo = (options) => {
  options.url = `${api}/allTodo`;
  return axios(options);
};

//adding todo to the application...
export const addTodoApi = (data) => {
  return axios
    .post(`${api}/addTodo`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteTodoApi = (data) => {
  data = data.map((e) => parseInt(e));
  return axios
    .post(`${api}/deleteTodo`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
/**********************************************************************************************/

//adding client to the application...
export const getDashBoardApi = (data) => {
  return axios
    .post(`${api}/getDashBoardData`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getLeadDashBoardApi = (data) => {
  return axios
    .post(`${api}/getDashBoardLeadData`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
/**********************************************************************************************/
// to get lov's
export const getAllLov = (options) => {
  options.url = `${api}/allLov`;
  return axios(options);
};

//to add lovs's and update...
export const addLovApi = (data) => {
  return axios
    .post(`${api}/addLov`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteLovApi = (data) => {
  return axios
    .post(`${api}/deleteByLovId`, data)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**********************************************************************************************/

/****
 * @input --> token
 * intercepting all the outgoing request...
 */
export const setUpAxiosInterceptors = (token) => {
  axios.interceptors.request.use(
    (config) => {
      let isTrue = store.getState().login.loginSuccess;

      if (isTrue) {
        const token = store.getState().login.token;
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};

export const setUpAxiosInterceptorsResponse = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
      }
      return error.response;
    }
  );
};
