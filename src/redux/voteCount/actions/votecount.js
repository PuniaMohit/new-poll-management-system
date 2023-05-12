import {
  VOTE_COUNT_REQUEST,
  VOTE_COUNT_SUCCESS,
  VOTE_COUNT_FAILURE,
} from "../../constants";
import api from "../../../utils/apiToken"

const voteCount = (userData) => async (dispatch) => {
  try {
    dispatch({ type: VOTE_COUNT_REQUEST });
    const data = await api.post("/vote/count", userData);
    console.log(data) //console just to show that api is working
    dispatch({
      type: VOTE_COUNT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: VOTE_COUNT_FAILURE,
      payload: error.response.data,
    });
  }
};

export default voteCount;