import {
    VOTE_COUNT_REQUEST,
    VOTE_COUNT_SUCCESS,
    VOTE_COUNT_FAILURE,
    EMPTY_VOTE_COUNT_SUCCESS_STATUS
} from "../../constants";

const initialState = {
    status: "",
    loading: false,
    error: null,
};

const voteCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case VOTE_COUNT_REQUEST:
            return { ...state, loading: true, status: "" };
        case VOTE_COUNT_SUCCESS:
            return { ...state, loading: false, status: action.payload.status };
        case VOTE_COUNT_FAILURE:
            return { ...state, loading: false, error: action.payload, status: action.payload.status };
        case EMPTY_VOTE_COUNT_SUCCESS_STATUS:
            return { status: "" }
        default:
            return state;
    }
};

export default voteCountReducer;