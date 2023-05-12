import { combineReducers } from "redux";
import loginReducer from "./login/reducer/loginReducer";
import signUpReducer from "./signup/reducer/signUpReducer";
import roleList from "./rolelist/reducer/roleListReducer";
import pollListReducer from "./pollList/reducer/pollListReducer";

const reducers = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  roleList: roleList,
  pollList: pollListReducer,
});

export default reducers;
