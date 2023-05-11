import { combineReducers } from "redux";
import loginReducer from "./login/reducer/loginReducer"


const reducers = combineReducers({
  login:loginReducer,
});

export default reducers;
