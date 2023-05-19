import {
  UPDATE_POLL_OPTION_REQUEST,
  UPDATE_POLL_OPTION_SUCCESS,
  UPDATE_POLL_OPTION_FAILURE,
  EMPTY_UPDATE_POLL_OPTION_DETAILS_SUCCESS_STATUS,
} from "../../constants";

const initialState = {
  status: "",
  loading: false,
};

const updatePollOptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POLL_OPTION_REQUEST:
      return { ...state, status: "", loading: true };
    case UPDATE_POLL_OPTION_SUCCESS:
      return { ...state, status: action.payload.status, loading: false };
    case UPDATE_POLL_OPTION_FAILURE:
      return { ...state, status: action.payload.status, loading: false };
    case EMPTY_UPDATE_POLL_OPTION_DETAILS_SUCCESS_STATUS:
      return { ...state, status: "" };
    default:
      return state;
  }
};

export default updatePollOptionReducer;
