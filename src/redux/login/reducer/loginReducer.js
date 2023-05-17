import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REMOVE_USER_DATA,
  USER_DETAILS_LOCAL_STORAGE,
} from "../../constants";

const initialState = {
  user: "",
  loading: false,
  error: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, user: "", error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, user: "", error: action.payload };
    case REMOVE_USER_DATA:
      return { ...state, user: "" };
    case USER_DETAILS_LOCAL_STORAGE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default LoginReducer;
