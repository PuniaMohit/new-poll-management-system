import { ROLELIST_REQUEST, ROLELIST_SUCCESS, ROLELIST_FAILURE } from "../../constants";

const initialState = {
  roleList: [],
  loading: false,
  error: null,
};

const roleListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLELIST_REQUEST:
      return { ...state, loading: true, roleList:[], error:null };
    case ROLELIST_SUCCESS:
      return { ...state, loading: false, roleList: action.payload, error:null };
    case ROLELIST_FAILURE:
      return { ...state, loading: false, roleList:[], error: action.payload };
    default:
      return state;
  }
};

export default roleListReducer;
