import {
  DELETE_POLL_REQUEST,
  DELETE_POLL_SUCCESS,
  DELETE_POLL_FAILURE,
  EMPTY_DELETE_POLL_SUCCESS_STATUS
} from "../../constants";

import api from "../../../utils/apiToken"

const deletePoll = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POLL_REQUEST });
    const data = await api.delete(`/poll/${id}`);
    dispatch({
      type: DELETE_POLL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POLL_FAILURE,
      payload: error.response.data,
    });
  }
};

export const emptyDeletePollSuccessStatus = () => (dispatch) => {
  dispatch({ type: EMPTY_DELETE_POLL_SUCCESS_STATUS })
}

export default deletePoll;
