/***
 * type: Action(Dashboard)
 * Operations : getDashboard
 */

import {
  GET_DASHBOARD_DATA,
  GET_DASHBOARD_DATA_SUCCESS,
  GET_DASHBOARD_DATA_ERROR,
  GET_LEAD_DASHBOARD_DATA,
  GET_LEAD_DASHBOARD_DATA_SUCCESS,
  GET_LEAD_DASHBOARD_DATA_ERROR,
} from "./action";

//getAllUser...
export const getDashboardData = (payload = {}) => ({
  type: GET_DASHBOARD_DATA,
  dashboard: payload,
});
export const getDashboardDataSuccess = (payload = {}) => ({
  type: GET_DASHBOARD_DATA_SUCCESS,
  dashboard: payload,
});
export const getDashboardDataError = (payload = {}) => ({
  type: GET_DASHBOARD_DATA_ERROR,
  message: payload,
});

export const getLeadDashboardData = (payload = {}) => ({
  type: GET_LEAD_DASHBOARD_DATA,
  dashboardLead: payload,
});
export const getLeadDashboardDataSuccess = (payload = {}) => ({
  type: GET_LEAD_DASHBOARD_DATA_SUCCESS,
  dashboardLead: payload,
});
export const getLeadDashboardDataError = (payload = {}) => ({
  type: GET_LEAD_DASHBOARD_DATA_ERROR,
  message: payload,
});
