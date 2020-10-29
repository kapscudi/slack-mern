import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./login.css";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/fr/thumb/7/7e/Slack_logo.svg/1280px-Slack_logo.svg.png"
          alt=""
        />
        <h1>Sign in to off__top. HQ</h1>
        <p>off__top.com</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
