/****
 * candidate...
 */
import {
  ADD_CANDIDATE,
  ADD_CANDIDATE_SUCCESS,
  ADD_CANDIDATE_FAILURE,
  VIEW_ALL_CANDIDATES,
  VIEW_ALL_CANDIDATES_SUCCESS,
  VIEW_ALL_CANDIDATES_FAILURE,
  UPDATE_CANDIDATE_MESSAGE,
  DELETE_CANDIDATE,
  DELETE_CANDIDATE_SUCCESS,
  DELETE_CANDIDATE_FAILURE,
} from "./../actions/action";

//object...

const candidate = {
  firstName: "",
  lastName: "",
  mobileNumber: "",
  email: "",
  fax: "",
  technicalGroup: "",
  address: "",
  state: "",
  city: "",
  country: "",
  zipcode: "",
  currentEmployerName: "",
  currentJobTitle: "",
  currentSalary: "",
  currentVisaType: "",
  wllgToRelocate: "",
  preferredLocation: "",
  expSalaryMin: "",
  expSalaryMax: "",
  hghQualification: "",
  skillset: "",
  additionalInformation: "",
  skypeId: "",
  industry: "",
  candidateStatus: "",
  source: "",
  candidateOwner: "",
};

const initialStateValue = {
  canLoading: false,
  canError: false,
  message: "",
  candidates: [],
};

export const candidateReducer = (state = initialStateValue, action) => {
  // console.log("action from candidate REducer...", action);
  switch (action.type) {
    case VIEW_ALL_CANDIDATES:
      return { ...state, canLoading: true, canError: false };

    case VIEW_ALL_CANDIDATES_SUCCESS:
      return {
        ...state,
        candidates: action.candidate,
        canLoading: false,
        canError: false,
      };

    case VIEW_ALL_CANDIDATES_FAILURE:
      return { ...state, canLoading: false, canError: true };

    case ADD_CANDIDATE:
      return { ...state, canLoading: true, canError: false };

    case ADD_CANDIDATE_SUCCESS:
      let { id } = action.candidate;
      let data = state.candidates.filter((e) => e.id !== id);
      data = [...data, action.candidate];
      return {
        ...state,
        candidates: data,
        canLoading: false,
        canError: false,
      };

    case ADD_CANDIDATE_FAILURE:
      return {
        ...state,
        canLoading: false,
        canError: true,
        message: action.message,
      };

    case DELETE_CANDIDATE:
      return { ...state, canLoading: true, canError: false };

    case DELETE_CANDIDATE_SUCCESS:
      let x = state.candidates.filter(
        (cli) => !action.candidateId.join("").includes(cli.id)
      );
      return {
        ...state,
        candidates: x,
        canLoading: false,
        canError: true,
        message: action.message,
      };
    case DELETE_CANDIDATE_FAILURE:
      return { ...state, canLoading: false, canError: true };

    case UPDATE_CANDIDATE_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};
