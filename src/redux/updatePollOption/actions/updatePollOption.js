import {
    UPDATE_POLL_OPTION_REQUEST,
    UPDATE_POLL_OPTION_SUCCESS,
    UPDATE_POLL_OPTION_FAILURE,
    EMPTY_UPDATE_POLL_OPTION_DETAILS_SUCCESS_STATUS,
} from "../../constants";

import api from "../../../utils/apiToken";

const updatePollOptionAction =
    (updatedOption, optionId) => async (dispatch) => {
        try {
            dispatch({ type: UPDATE_POLL_OPTION_REQUEST });
            const data = await api.put(
                `/option/edit/${optionId}`,
                updatedOption
            );
            data.status === 200 && dispatch({
                type: UPDATE_POLL_OPTION_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_POLL_OPTION_FAILURE,
                payload: error.response.data,
            });
        }
    };

export const emptyUpdatePollOptionDetailsSuccessStatus = () => (dispatch) => {
    dispatch({ type: EMPTY_UPDATE_POLL_OPTION_DETAILS_SUCCESS_STATUS });
};

export default updatePollOptionAction;