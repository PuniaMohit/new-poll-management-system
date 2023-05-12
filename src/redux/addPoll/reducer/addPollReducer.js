import {
  ADD_POLL_REQUEST,
  ADD_POLL_SUCCESS,
  ADD_POLL_FAILURE,
  REMOVE_STATUS_ADD_POLL
} from "../../constants";

const initialState = {
  pollAdded: "",
  status: "",
  loading: false,
  error: null,
};

const addPollReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POLL_REQUEST:
      return { ...state, loading: true, status: "" };
    case ADD_POLL_SUCCESS:
      return { ...state, loading: false, pollAdded: action.payload.data.poll.title, status: action.payload.status };
    case ADD_POLL_FAILURE:
      return { ...state, loading: false, error: action.payload, status: action.payload.status };
    case REMOVE_STATUS_ADD_POLL:
      return { ...state, status: "" }
    default:
      return state;
  }
};

export default addPollReducer;