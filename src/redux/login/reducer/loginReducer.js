import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, REMOVE_USER_DATA } from "../../constants";

const initialState = {
  userLogin: "",
  loading: false,
  error: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, userLogin:'', error:null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, userLogin: action.payload, error:null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, userLogin:'', error: action.payload };
      case REMOVE_USER_DATA:
        return {...state, userLogin:""}
    default:
      return state;
  }
};

export default LoginReducer;
