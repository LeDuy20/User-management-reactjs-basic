import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginUserRedux } from "../../redux/actions/userActions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassWord] = useState(false);
  
  
  const isLoading = useSelector(state => state.user.isLoading);
  const user = useSelector(state => state.user.user);


  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required!!");
      return;
    }
    dispatch(handleLoginUserRedux(email, password ))
  };
  const handlePressEnter = (e) => {
    if(e && e.key === 'Enter') {
       handleLogin();
    }
  }

  useEffect(() => {
    if(user && user.auth === true) {
      navigate("/user");
    }
  }, [user])
  return (  
    <div className="login col-12 col-sm-4">
      <h2 className="login-heading">Log in</h2>
      <div className="text">
        <p className="text-email">Email or Username(eve.holt@reqres.in)</p>
        {/* <p className="text-phone">Log in with phone</p> */}
      </div>
      <input
        type="text"
        placeholder="Email or Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="password mb-5">
        <input
          type={isShowPassword === true ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown = {(e) => handlePressEnter(e)}
        />
        <i
          className={
            isShowPassword === true
              ? "fa-solid fa-eye"
              : "fa-solid fa-eye-slash"
          }
          onClick={() => setIsShowPassWord(!isShowPassword)}
        ></i>
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
      >
        {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
        Log in
      </button>
      <div className="go-back mt-5">
        <Link to="/">
          <i className="fa-solid fa-chevron-left"></i>Go Back
        </Link>
      </div>
    </div>
  );
};

export default Login;
