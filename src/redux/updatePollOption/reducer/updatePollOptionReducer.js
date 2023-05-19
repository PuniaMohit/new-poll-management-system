import {
    UPDATE_POLL_OPTION_REQUEST,
    UPDATE_POLL_OPTION_SUCCESS,
    UPDATE_POLL_OPTION_FAILURE,
    EMPTY_UPDATE_POLL_OPTION_DETAILS_SUCCESS_STATUS,
  } from "../../constants";
  
  const initialState = {
    data: "",
    loading: false,
  };
  
  const updatePollOptionReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_POLL_OPTION_REQUEST:
        return { ...state, data: "", loading: true };
      case UPDATE_POLL_OPTION_SUCCESS:
        return { ...state, data: action.payload.data, loading: false };
      case UPDATE_POLL_OPTION_FAILURE:
        return { ...state, data: action.payload.data, loading: false };
      case EMPTY_UPDATE_POLL_OPTION_DETAILS_SUCCESS_STATUS:
        return { ...state, data: "" };
      default:
        return state;
    }
  };

  export const emptyUpdatePollOptionDetailsSuccessStatus = () => (dispatch) => {
    dispatch({ type: EMPTY_UPDATE_POLL_OPTION_DETAILS_SUCCESS_STATUS });
  };
  
  
  export default updatePollOptionReducer;