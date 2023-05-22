import {
    DELETE_POLL_OPTION_REQUEST,
    DELETE_POLL_OPTION_SUCCESS,
    DELETE_POLL_OPTION_FAILURE,
    EMPTY_DELETE_POLL_OPTION_DETAILS_SUCCESS_STATUS
  } from "../../constants";
  
  import api from "../../../utils/apiToken"
  
  export const deletePollOptionAction = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_POLL_OPTION_REQUEST });
      const data = await api.delete(`/option/delete/${id}`);
      data.status===200 && dispatch({type: DELETE_POLL_OPTION_SUCCESS,payload: data});
    } catch (error) {
      dispatch({
        type: DELETE_POLL_OPTION_FAILURE,
        payload: error.response.data,
      });
    }
  };

  
export const emptyDeletePollOptionDetailsSuccessStatus = () => (dispatch) => {
    dispatch({ type: EMPTY_DELETE_POLL_OPTION_DETAILS_SUCCESS_STATUS });
};
  