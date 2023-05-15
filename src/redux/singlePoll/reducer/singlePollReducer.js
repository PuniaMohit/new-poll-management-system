import {
  SINGLE_POLL_REQUEST,
  SINGLE_POLL_SUCCESS,
  SINGLE_POLL_FAILURE,
} from "../../constants";

const initialState = {
  singlePollDetails: "",
};

const singlePollReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_POLL_REQUEST:
      return { ...state, loading: true, singlePollDetails: "" };
    case SINGLE_POLL_SUCCESS:
      return {
        ...state,
        loading: false,
        singlePollDetails: action.payload.data,
      };
    case SINGLE_POLL_FAILURE:
      return { ...state, singlePollDetails: "" };
    default:
      return state;
  }
};

export default singlePollReducer;
