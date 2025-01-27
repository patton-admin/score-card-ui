import {
  GET_ALL_JOB,
  GET_ALL_JOB_SUCCESS,
  GET_ALL_JOB_FAILURE,
  ADD_JOB,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAILURE,
  UPDATE_JOB,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAILURE,
  UPDATE_JOB_MESSAGE,
  DELETE_JOB,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAILURE,
} from "./../actions/action";

const initialStateValue = {
  jobLoading: false,
  jobError: false,
  jobOrders: [],
};

export const jobOrderReducer = (state = initialStateValue, action) => {
  // // console.log("Job order reducers...", action);
  switch (action.type) {
    case GET_ALL_JOB:
      return { ...state, jobLoading: true, jobError: false };
    case GET_ALL_JOB_SUCCESS:
      return {
        ...state,
        jobOrders: action.jobOrder,
        jobLoading: false,
        jobError: false,
      };
    case GET_ALL_JOB_FAILURE:
      return { ...state, jobLoading: false, jobError: true };

    case ADD_JOB:
      return { ...state, jobLoading: true, jobError: false };
    case ADD_JOB_SUCCESS:
      let { id } = action.jobOrder;
      let data = state.jobOrders.filter((e) => e.id !== id);
      data = [...data, action.jobOrder];
      return {
        ...state,
        jobOrders: data,
        jobLoading: false,
        jobError: false,
      };
    case ADD_JOB_FAILURE:
      return { ...state, jobLoading: false, jobError: true };

    case UPDATE_JOB:
      return { ...state, jobLoading: true, jobError: false };
    case UPDATE_JOB_SUCCESS:
      let jobs = state.jobOrders.filter((e) => e.id !== action.jobOrder.id);
      return {
        ...state,
        jobOrders: [...jobs, action.jobOrder],
        jobLoading: false,
        jobError: false,
      };
    case UPDATE_JOB_FAILURE:
      return { ...state, jobLoading: false, jobError: true };

    case DELETE_JOB:
      return { ...state, jobLoading: true, jobError: false };

    case DELETE_JOB_SUCCESS:
      let x = state.jobOrders.filter(
        (cli) => !action.jobId.join("").includes(cli.id)
      );
      return {
        ...state,
        jobOrders: x,
        jobLoading: false,
        jobError: true,
        message: action.message,
      };

    case DELETE_JOB_FAILURE:
      return { ...state, jobLoading: false, jobError: true };

    case UPDATE_JOB_MESSAGE:
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};
