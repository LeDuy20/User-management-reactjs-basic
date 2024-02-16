import { FETCH_LOGIN_USER, FETCH_LOGIN_SUCCESS,  FETCH_LOGIN_ERROR, USER_LOGOUT} from "../actions/userActions";

const INITIAL_STATE = {
  user: {
    email: "",
    auth: null,
    token: ''
  },
  isLoading: false, 
  isError: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LOGIN_USER:
      return {
        ...state,
        isLoading: true, 
        isError: false
      };

    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          email: action.data.email,
          token: action.data.token,  
          auth: true,
        },
        isLoading: false, 
        isError: false
        
      };
    case FETCH_LOGIN_ERROR:
      return {
        ...state,
        user: {
          auth: false,
        },
        isLoading: false, 
        isError: true,
        
      };
    case USER_LOGOUT :
      localStorage.removeItem("email")
      localStorage.removeItem("token")
      return {
        ...state, 
        user: {
          email: '',
          token: '',  
          auth: false,
        },
      }
    default:
      return state;
  }
};

export default userReducer;
