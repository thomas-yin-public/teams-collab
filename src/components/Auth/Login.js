import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { requestUserLogin } from "../../api/request";

function Login({ setUserToken, setUserId }) {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/groups" } };

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const fetchLogin = (e) => {
    e.preventDefault();
    requestUserLogin(emailInput, passwordInput)
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId", res.userId);
          setUserToken(res.token);
          setUserId(res.userId);
          history.replace(from);
        } else setLoginErrorMessage(res.err);
      })
      .catch((err) => {
        setLoginErrorMessage("Invalid email or password");
      });
  };

  return (
    <div className="d-flex justify-content-center vh-100">
      <div className="align-self-center row" style={{ width: "70vw" }}>
        <form
          className="p-3 border more-rounded col-md d-flex flex-column justify-content-center shadow"
          onSubmit={(e) => fetchLogin(e)}
        > 
          <h4 className="text-center">User Login</h4>
          <label className="form-label">Email</label>
          <input
            className="form-control more-rounded"
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control more-rounded"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button className="btn btn-primary more-rounded w-100 my-2">
            Login
          </button>
          {loginErrorMessage && (
            <div className="alert alert-danger text-center text-danger">
              {loginErrorMessage}
            </div>
          )}
        </form>
        <div className="col-md alert-warning border more-rounded p-3 mx-3">
          Some user accounts for demo purpose:
          <div className="border more-rounded p-3 mt-2 bg-white">
            <div className="border-bottom">Jack</div>
            <div>email: jack@test.com</div>
            <div>password: testjack</div>
          </div>
          <div className="border more-rounded p-3 mt-2 bg-white">
            <div className="border-bottom">James</div>
            <div>email: james@test.com</div>
            <div>password: testjames</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
