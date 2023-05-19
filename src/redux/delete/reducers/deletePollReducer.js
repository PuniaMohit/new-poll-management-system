import {
    DELETE_POLL_REQUEST,
    DELETE_POLL_SUCCESS,
    DELETE_POLL_FAILURE,
    EMPTY_DELETE_POLL_SUCCESS_STATUS
} from "../../constants";

const initialState = {
    data: "",
};

const deletePollReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_POLL_REQUEST:
            return { ...state, data: "" };
        case DELETE_POLL_SUCCESS:
            return { ...state, data: action.payload.data };
        case DELETE_POLL_FAILURE:
            return { ...state, data: "" };
        case EMPTY_DELETE_POLL_SUCCESS_STATUS:
            return { data: "" }
        default:
            return state;
    }
};

export default deletePollReducer;