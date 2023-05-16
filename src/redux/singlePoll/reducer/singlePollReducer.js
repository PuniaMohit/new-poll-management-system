import {
  SINGLE_POLL_REQUEST,
  SINGLE_POLL_SUCCESS,
  SINGLE_POLL_FAILURE,
} from "../../constants";

const initialState = "";

const singlePollReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_POLL_REQUEST:
      return (state = "");
    case SINGLE_POLL_SUCCESS:
      return (state = action.payload.data);
    case SINGLE_POLL_FAILURE:
      return (state = "");
    default:
      return state;
  }
};

export default singlePollReducer;
