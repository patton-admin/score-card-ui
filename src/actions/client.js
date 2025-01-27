/***
 * type: Action(User)
 * Operations : addClient, deleteClient, updateClient
 */

import {
  GET_ALL_CLIENT,
  GET_ALL_CLIENT_SUCCESS,
  GET_ALL_CLIENT_FAILURE,
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  UPDATE_CLIENT,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_ERROR,
  UPDATE_CLIENT_MESSAGE,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
} from "./action";

export const viewClient = (payload = {}) => ({
  type: GET_ALL_CLIENT,
  client: payload,
});
export const viewClientSuccess = (payload = {}) => ({
  type: GET_ALL_CLIENT_SUCCESS,
  client: payload,
});
export const viewClientFailure = () => ({
  type: GET_ALL_CLIENT_FAILURE,
});

//Add Client...
export const addClient = (payload = {}) => ({
  type: ADD_CLIENT,
  client: payload,
});

export const addClientSuccess = (payload = {}) => ({
  type: ADD_CLIENT_SUCCESS,
  client: payload,
});

export const addClientFailure = (payload = {}) => ({
  type: ADD_CLIENT_ERROR,
  message: payload,
});

//update Client...
export const updateClient = (payload = {}) => ({
  type: UPDATE_CLIENT,
  client: payload,
});

export const updateClientSuccess = (payload = {}) => ({
  type: UPDATE_CLIENT_SUCCESS,
  client: payload,
});

export const updateClientFailure = (payload = {}) => ({
  type: UPDATE_CLIENT_ERROR,
  message: payload,
});

export const updateClientMessage = () => ({
  type: UPDATE_CLIENT_MESSAGE,
  message: "",
});

export const deleteClient = ({ clientId } = {}) => ({
  type: DELETE_CLIENT,
  clientId,
});

export const deleteClientSuccess = (payload = {}) => ({
  type: DELETE_CLIENT_SUCCESS,
  clientId: payload,
});

export const deleteClientFailure = (payload = {}) => ({
  type: DELETE_CLIENT_ERROR,
  clientId: payload,
});
