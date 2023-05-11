import {
  POLL_LIST_REQUEST,
  POLL_LIST_SUCCESS,
  POLL_LIST_FAILURE,
} from "../../constants";
import api from "../../../utils/apiToken"


const pollList = () => async (dispatch) => {
  try {
    dispatch({ type: POLL_LIST_REQUEST });
    const { data } = await api.get("/poll/list/1?limit=4");
    dispatch({
      type: POLL_LIST_SUCCESS,
      payload: data.rows,
    });
  } catch (error) {
    dispatch({
      type: POLL_LIST_FAILURE,
      payload: error.response.data,
    });
  }
};

export default pollList;
