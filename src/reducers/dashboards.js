import {
  GET_DASHBOARD_DATA,
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_ERROR,
  GET_LEAD_DASHBOARD_DATA,
  GET_LEAD_DASHBOARD_DATA_SUCCESS,
  GET_LEAD_DASHBOARD_DATA_ERROR,
} from "../actions/action";

/***
 * default dashboard information
 */
const dashboard = {
  client_tbl_client_id: 0,
  joborder_id: 0,
  joborder_title: "",
  creation_date: "",
  joborder_priority: "",
  joborder_state: "",
  joborder_city: "",
  client_name: "",
  bucket_tbl_bucket_id: 0,
};

const initialStateValue = {
  dshLoading: false,
  dshError: false,
  message: "",
  dashboards: [], //this is for JobOrders and getting clients...
  dashboardLeads: [], //this is for candidates...
};

export const dashboardReducer = (state = initialStateValue, action) => {
  // console.log("action from dashboards REducer...", action);
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return { ...state, dshLoading: true, dshError: false };
    case GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        dashboards: action.dashboard,
        dshLoading: false,
        dshError: false,
      };

    case GET_DASHBOARD_DATA_ERROR:
      return { ...state, dshError: true };

    case GET_LEAD_DASHBOARD_DATA:
      return { ...state, dshLoading: true, dshError: false };
    case GET_LEAD_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        dashboardLeads: action.dashboardLead,
        dshLoading: false,
        dshError: false,
      };

    case GET_LEAD_DASHBOARD_DATA_ERROR:
      return { ...state, dshError: true };

    default:
      return state;
  }
};
