import {
  ADD_POLL_REQUEST,
  ADD_POLL_SUCCESS,
  ADD_POLL_FAILURE,
  REMOVE_STATUS_ADD_POLL
} from "../../constants";

const initialState = {
  data: "",
  loading: false,
};

const addPollReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POLL_REQUEST:
      return { ...state, loading: true, data: "" };
    case ADD_POLL_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    case ADD_POLL_FAILURE:
      return { ...state, loading: false, error: action.payload, data: "" };
    case REMOVE_STATUS_ADD_POLL:
      return { ...state, data: "" }
    default:
      return state;
  }
};

export default addPollReducer;