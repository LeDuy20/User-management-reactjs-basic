import React, { useEffect, useState, useContext } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../services/UserService";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassWord] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(()=> {
  //   let token = localStorage.getItem("token")
  //   if(token) {
  //     navigate("/");
  //   }
  // }, [])
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required!!");
      return;
    }
    setLoading(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      loginContext(email, res.token);
      navigate("/user");
      toast.success("Login success !!");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoading(false);
  };
  const handlePressEnter = (e) => {
    if(e && e.key === 'Enter') {
       handleLogin();
    }
  }
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
        {loading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
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
