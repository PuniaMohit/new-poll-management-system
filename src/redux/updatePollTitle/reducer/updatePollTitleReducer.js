import {
  UPDATE_POLL_TITLE_REQUEST,
  UPDATE_POLL_TITLE_SUCCESS,
  UPDATE_POLL_TITLE_FAILURE,
  STORE_UPDATE_POLL_TITLE_DETAILS,
  EMPTY_UPDATE_POLL_TITLE_DETAILS_SUCCESS_STATUS,
} from "../../constants";

const initialState = {
  updatePollTitleDetails: "",
  status: "",
  loading: false,
};

const updatePollTitleReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POLL_TITLE_REQUEST:
      return { ...state, status: "", loading: true };
    case UPDATE_POLL_TITLE_SUCCESS:
      return { ...state, status: action.payload.status, loading: false };
    case UPDATE_POLL_TITLE_FAILURE:
      return { ...state, status: action.payload.status, loading: false };
    case STORE_UPDATE_POLL_TITLE_DETAILS:
      return { ...state, updatePollTitleDetails: action.payload };
    case EMPTY_UPDATE_POLL_TITLE_DETAILS_SUCCESS_STATUS:
      return { ...state, status: "" }
    default:
      return state;
  }
};

export default updatePollTitleReducer;
