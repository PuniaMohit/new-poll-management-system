import {
  POLL_LIST_REQUEST,
  POLL_LIST_SUCCESS,
  POLL_LIST_FAILURE,
  EMPTY_POLL_LIST,
  POLL_LIST_SECOND_CALL,
} from "../../constants";

const initialState = {
  status: "",
  pollList: "",
  pollListForChecking: [],
  loading: false,
  error: null,
};

const pollListReducer = (state = initialState, action) => {
  switch (action.type) {
    case POLL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POLL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pollList: [...state.pollList, ...action.payload],
        pollListForChecking: action.payload,
        error: null,
      };
    case POLL_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EMPTY_POLL_LIST:
      return {
        ...state,
        pollList: "",
        pollListForChecking: [],
      };
    case POLL_LIST_SECOND_CALL:
      return {
        ...state,
        pollListForChecking: action.payload,
      };
    default:
      return state;
  }
};

export default pollListReducer;
