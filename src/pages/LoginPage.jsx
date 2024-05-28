import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase/config";

const LoginPage = ({ setIsAuth }) => {
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setIsAuth(true);

      localStorage.setItem("TOKEN", data.user.refreshToken);
    });
  };
  return (
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
          <img src="g-logo.png" />
          <span>Google ile Giriş yap</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
