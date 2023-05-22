import {
    DELETE_POLL_OPTION_REQUEST,
    DELETE_POLL_OPTION_SUCCESS,
    DELETE_POLL_OPTION_FAILURE,
    EMPTY_DELETE_POLL_OPTION_DETAILS_SUCCESS_STATUS,
  } from "../../constants";
  
  const initialState = {
    data: "",
    loading: false,
  };
  
  const deletePollOptionReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_POLL_OPTION_REQUEST:
        return { ...state, data: "", loading: true };
      case DELETE_POLL_OPTION_SUCCESS:
        return { ...state, data: action.payload.data, loading: false };
      case DELETE_POLL_OPTION_FAILURE:
        return { ...state, data: action.payload.data, loading: false };
      case EMPTY_DELETE_POLL_OPTION_DETAILS_SUCCESS_STATUS:
        return { ...state, data: "" };
      default:
        return state;
    }
  };

  export const emptyDeletePollOptionDetailsSuccessStatus = () => (dispatch) => {
    dispatch({ type: EMPTY_DELETE_POLL_OPTION_DETAILS_SUCCESS_STATUS });
  };
  
  
  export default deletePollOptionReducer;