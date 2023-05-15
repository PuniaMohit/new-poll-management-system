import {
  UPDATE_POLL_TITLE_REQUEST,
  UPDATE_POLL_TITLE_SUCCESS,
  UPDATE_POLL_TITLE_FAILURE,
  STORE_UPDATE_POLL_TITLE_DETAILS,
  EMPTY_UPDATE_POLL_TITLE_DETAILS_SUCCESS_STATUS
} from "../../constants";

import api from "../../../utils/apiToken"

const updatePollTitle = (updatedTitle, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POLL_TITLE_REQUEST });
    const data = await api.put(`/poll/${id}`, updatedTitle);
    dispatch({
      type: UPDATE_POLL_TITLE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_POLL_TITLE_FAILURE,
      payload: error.response.data,
    });
  }
};

export default updatePollTitle;

export const storeUpdatePollTitleDetails = (pollTitleId) => (dispatch) => {
  dispatch({ type: STORE_UPDATE_POLL_TITLE_DETAILS, payload: pollTitleId })
}

export const emptyUpdatePollTitleDetailsSuccessStatus = () => (dispatch) => {
  dispatch({ type: EMPTY_UPDATE_POLL_TITLE_DETAILS_SUCCESS_STATUS })
}