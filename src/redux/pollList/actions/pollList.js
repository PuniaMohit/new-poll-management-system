import {
  POLL_LIST_REQUEST,
  POLL_LIST_SUCCESS,
  POLL_LIST_FAILURE,
  EMPTY_POLL_LIST
} from "../../constants";
import api from "../../../utils/apiToken";

const pollList = (pageNumberLimit) => async (dispatch) => {
  try {
    dispatch({ type: POLL_LIST_REQUEST });
    const data = await api.get(
      `/poll/list/${pageNumberLimit.pageNumber}?limit=${pageNumberLimit.limit}`
    );
    dispatch({
      type: POLL_LIST_SUCCESS,
      payload: data.data.rows,
    });
  } catch (error) {
    dispatch({
      type: POLL_LIST_FAILURE,
      payload: error.response.data,
    });
  }
};

export const emptyPollList=()=>(dispatch)=>{
  console.log("hello")
  dispatch({ type: EMPTY_POLL_LIST })
}

export default pollList;

