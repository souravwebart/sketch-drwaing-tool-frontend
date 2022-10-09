import Image from "next/image";
import React from "react";
import SignUp from "../Component/SignUp";
import Bg from "../public/images/bgsignup.png";

function Register() {
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
          <SignUp />
        </div>
      </div>
    </div>
  );
}

export default Register;
