import {
  DELETE_POLL_REQUEST,
  DELETE_POLL_SUCCESS,
  DELETE_POLL_FAILURE,
} from "../../constants";

import api from "../../../utils/apiToken";

const deletePoll = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POLL_REQUEST });
    const data = await api.delete(`/poll/${id}`);
    data.status === 200 &&
      dispatch({ type: DELETE_POLL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_POLL_FAILURE,
      payload: error.response.data,
    });
  }
};

export default deletePoll;
