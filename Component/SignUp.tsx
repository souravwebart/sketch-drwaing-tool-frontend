import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [penColor, setPenColor] = useState("");
  const [register, setRegister] = useState(false);

  const handleEmail = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log("email", e.target.value);
    setEmail(e.target.value);
  };
  const handlePassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log("password", e.target.value);
    setPassword(e.target.value);
  };

  const selectClick = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log("penColor", e.target.value);

    setPenColor(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: process.env.NEXT_PUBLIC_ENV_VARIABLE + "register",
      data: {
        email,
        password,
        penColor,
      },
    };
    console.log("url", `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/register`);
    axios(configuration)
      .then((result) => {
        setRegister(true);
        console.log(result);
        alert(result.data.message);
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
  };

  const router = useRouter();

  const loginHandle = (e: any) => {
    e.preventDefault();
    router.push("/Login");
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/UserSketch");
    }
  }, []);

  return (
    <>
      {register ? (
        <h3
          className="text-success"
          style={{ fontSize: "25px", fontWeight: 600 }}
        >
          You Are Registered Successfully
        </h3>
      ) : (
        <h3
          className="text-danger"
          style={{ fontSize: "25px", fontWeight: 600 }}
        >
          Regiter to Enjoy our Sketch-tool
        </h3>
      )}
      <form>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleEmail}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handlePassword}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={selectClick}
          >
            <option selected>Choose Pen Color</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
          </select>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              Action
            </a>
          </div>
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right" style={{ marginTop: "10px" }}>
          Already registered{" "}
          <a onClick={loginHandle} style={{ color: "blue", cursor: "pointer" }}>
            <b>sign in?</b>
          </a>
        </p>
      </form>
    </>
  );
}

export default SignUp;
