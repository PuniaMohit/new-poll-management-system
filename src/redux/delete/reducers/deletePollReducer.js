import {
    DELETE_POLL_REQUEST,
    DELETE_POLL_SUCCESS,
    DELETE_POLL_FAILURE,
    EMPTY_DELETE_POLL_SUCCESS_STATUS
} from "../../constants";

const initialState = {
    status: "",
};

const deletePollReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_POLL_REQUEST:
            return { ...state, status: "" };
        case DELETE_POLL_SUCCESS:
            return { ...state, status: action.payload.status };
        case DELETE_POLL_FAILURE:
            return { ...state, status: action.payload.status };
        case EMPTY_DELETE_POLL_SUCCESS_STATUS:
            return { status: "" }
        default:
            return state;
    }
};

export default deletePollReducer;