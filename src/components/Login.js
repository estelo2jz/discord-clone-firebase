import React from 'react';
import { auth, provider } from '../firebase';
import { Button } from '@material-ui/core'
import "../styles/Login.scss";

function Login() {
  const signIn = () => {
    // do clever google
    auth.signInWithPopup(provider)
    .catch((error) => alert(error.message));
  }
  return (
    <div className="login">
      <div className="login__logo">
        <img src="https://logos-download.com/wp-content/uploads/2021/01/Discord_Logo_full.png" alt="discord" />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login
