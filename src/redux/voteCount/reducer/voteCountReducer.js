import {
    VOTE_COUNT_REQUEST,
    VOTE_COUNT_SUCCESS,
    VOTE_COUNT_FAILURE,
    EMPTY_VOTE_COUNT_SUCCESS_STATUS
} from "../../constants";

const initialState = {
    data: "",
    loading: false,
    error: null,
};

const voteCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case VOTE_COUNT_REQUEST:
            return { ...state, loading: true, data: "" };
        case VOTE_COUNT_SUCCESS:
            return { ...state, loading: false, data: action.payload.data };
        case VOTE_COUNT_FAILURE:
            return { ...state, loading: false, };
        case EMPTY_VOTE_COUNT_SUCCESS_STATUS:
            return { data: "" }
        default:
            return state;
    }
};

export default voteCountReducer;