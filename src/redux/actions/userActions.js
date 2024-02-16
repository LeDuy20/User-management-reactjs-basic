import { loginApi } from "../../services/UserService";
import { toast } from "react-toastify";

export const FETCH_LOGIN_USER = "FETCH_LOGIN_USER";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_ERROR = "FETCH_LOGIN_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";

export const handleLoginUserRedux = (email, password) => {
  return async (dispatch, setState) => {
    dispatch({ type: FETCH_LOGIN_USER });
    let res = await loginApi(email.trim(), password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("email", email.trim());
      dispatch({
        type: FETCH_LOGIN_SUCCESS,
        data: {
          email: email.trim(),
          token: res.token,
        },
      });
      toast.success("Login success !!");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
      dispatch({ type: FETCH_LOGIN_ERROR });
    }
  };
};
export const handleUserLogoutRedux = () => {
  return (dispatch, setState) => {
    dispatch({ type: USER_LOGOUT})
  }
}