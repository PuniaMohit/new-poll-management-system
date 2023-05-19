import {
  VOTE_COUNT_REQUEST,
  VOTE_COUNT_SUCCESS,
  VOTE_COUNT_FAILURE,
  EMPTY_VOTE_COUNT_SUCCESS_STATUS,
} from "../../constants";
import api from "../../../utils/apiToken";

const voteCount = (userData) => async (dispatch) => {
  try {
    dispatch({ type: VOTE_COUNT_REQUEST });
    const data = await api.post("/vote/count", userData);
    data.status === 200 && dispatch({ type: VOTE_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VOTE_COUNT_FAILURE,
      payload: error.response.data,
    });
  }
};

export const emptyVoteCountSuccessStatus = () => (dispatch) => {
  dispatch({ type: EMPTY_VOTE_COUNT_SUCCESS_STATUS });
};

export default voteCount;
