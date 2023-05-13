import {
    UPDATE_POLL_TITLE_REQUEST,
    UPDATE_POLL_TITLE_SUCCESS,
    UPDATE_POLL_TITLE_FAILURE,
  } from "../../constants";
  
  import api from "../../...utils/apiToken"
  
   const updatePollTitle = (updatedTitle, id) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_POLL_TITLE_REQUEST });
      const { data } = await api.put(`/poll/${id}`, updatedTitle);
      console.log(data)
      dispatch({
        type: UPDATE_POLL_TITLE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error)
      dispatch({
        type: UPDATE_POLL_TITLE_FAILURE,
        payload: error.response.data,
      });
    }
  };
  
  export default updatePollTitle;;