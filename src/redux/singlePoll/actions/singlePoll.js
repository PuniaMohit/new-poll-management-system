import {
  SINGLE_POLL_REQUEST,
  SINGLE_POLL_SUCCESS,
  SINGLE_POLL_FAILURE,
} from "../../constants";
import api from "../../../utils/apiToken";
const singlePoll = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_POLL_REQUEST });
    const data = await api.get(`/poll/${id}`);
    dispatch({
      type: SINGLE_POLL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_POLL_FAILURE,
      payload: error.response.data,
    });
  }
};

export default singlePoll;
