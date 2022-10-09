import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SignIn from "../Component/SignIn";
import SignUp from "../Component/SignUp";
import Bg from "../public/images/bgsignup.png";

function Login() {
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  return (
    <div className="container">
      <div style={{ display: "flex" }} className="loginbox">
        <div className="bodyImage">
          <Image
            src={Bg}
            alt="Picture of the author"
            height="600px"
            width="400px"
          ></Image>
        </div>
        <div
          style={{ margin: "10% auto", width: "50%" }}
          className="contentBody"
        >
          <SignIn />
        </div>
      </div>
    </div>
  );
}

export default Login;
