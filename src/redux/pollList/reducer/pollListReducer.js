import {
  POLL_LIST_REQUEST,
  POLL_LIST_SUCCESS,
  POLL_LIST_FAILURE,
} from "../../constants";

const initialState = {
  pollList: [],
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
        error: null,
      };
    case POLL_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pollListReducer;
