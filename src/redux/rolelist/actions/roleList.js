import {
  ROLELIST_REQUEST,
  ROLELIST_SUCCESS,
  ROLELIST_FAILURE,
} from "../../constants";
import api from "../../../utils/api"

 const roleList = () => async (dispatch) => {
  try {
    dispatch({ type: ROLELIST_REQUEST });
    const { data } = await api.get("/role/list");
    dispatch({
      type: ROLELIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROLELIST_FAILURE,
      payload: error.response.data,
    });
  }
};

export default roleList
