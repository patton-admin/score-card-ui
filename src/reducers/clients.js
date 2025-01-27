/****
 * candidate...
 */
import {
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  UPDATE_CLIENT,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_ERROR,
  UPDATE_CLIENT_MESSAGE,
  GET_ALL_CLIENT,
  GET_ALL_CLIENT_SUCCESS,
  GET_ALL_CLIENT_FAILURE,
  DELETE_CLIENT,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_ERROR,
} from "../actions/action";

//object...

const client = {
  clientId: "",
  clientName: "",
  contactPerson: "",
  clientEmail: "",
  vendorName: "",
  vendorEmail: "",
  vendorContactPerson: "",
  vendorContactPerson: "",
  lastUpdatedDate: "",
  createdDate: "",
};

const initialStateValue = {
  clientLoading: false,
  clientError: false,
  message: "",
  clients: [],
};

export const clientReducer = (state = initialStateValue, action) => {
  // // console.log("action from client REducer...", action);
  switch (action.type) {
    case GET_ALL_CLIENT:
      return { ...state, clientLoading: true, clientError: false };
    case GET_ALL_CLIENT_SUCCESS:
      return {
        ...state,
        clients: action.client,
        clientLoading: false,
        clientError: false,
      };
    case GET_ALL_CLIENT_FAILURE:
      return { ...state, clientLoading: false, clientError: true };

    case ADD_CLIENT:
      return { ...state, clientLoading: true, clientError: false };
    case ADD_CLIENT_SUCCESS:
      let { clientId } = action.client;
      let data = state.clients.filter((e) => e.clientId !== clientId);
      data = [...data, action.client];
      return {
        ...state,
        clients: data,
        clientLoading: false,
        clientError: false,
      };
    case ADD_CLIENT_ERROR:
      return {
        ...state,
        clientLoading: false,
        clientError: true,
        message: action.message,
      };

    case UPDATE_CLIENT:
      return { ...state, clientLoading: true, clientError: false };
    case UPDATE_CLIENT_SUCCESS:
      let clients = state.clients.filter(
        (e) => e.clientId !== action.client.clientId
      );
      return {
        ...state,
        clients: [...clients, action.client],
        clientLoading: false,
        clientError: false,
      };
    case UPDATE_CLIENT_ERROR:
      return {
        ...state,
        clientLoading: false,
        clientError: true,
        message: action.message,
      };

    case DELETE_CLIENT:
      return { ...state, clientLoading: true, clientError: false };

    case DELETE_CLIENT_SUCCESS:
      let x = state.clients.filter(
        (cli) => !action.clientId.join("").includes(cli.clientId)
      );
      return {
        ...state,
        clients: x,
        clientLoading: false,
        clientError: true,
        message: action.message,
      };

    case DELETE_CLIENT_ERROR:
      return { ...state, clientLoading: false, clientError: true };

    case UPDATE_CLIENT_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};
