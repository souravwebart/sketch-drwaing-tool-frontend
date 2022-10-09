import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../Slices/Auth";
import { clearMessage } from "../Slices/Messages";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [finallogin, setFinalLogin] = useState(false);

  const [loading, setLoading] = useState(false);

  const { isLoggedIn, user: currentUser } = useSelector(
    (state: any) => state.auth
  );
  const { message } = useSelector((state: any) => state.message);

  console.log("message", message);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const router = useRouter();
  const cookies = new Cookies();

  const handleEmail = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log("password", e.target.value);
    setPassword(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login({ email, password }))
      .then((result: { data: { token: any } }) => {
        console.log("result", result);
        console.log("isLoggedIn", isLoggedIn);
        setFinalLogin(true);
        if (localStorage.getItem("user")) {
          return router.push("/UserSketch");
        }
      })
      .catch((error: Error) => {
        error = new Error();
        setLoading(false);
      });

    if (localStorage.getItem("user")) {
      return router.push("/UserSketch");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/UserSketch");
    }
  }, []);

  return (
    <>
      <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            className="form-control"
            onChange={handleEmail}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            placeholder="Enter password"
            onChange={handlePassword}
          />
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </div>
      </form>
      {finallogin && (
        <p
          className="text-primary"
          style={{ fontSize: "16px", fontWeight: 600, marginTop: "15px" }}
        >
          {message && message}
        </p>
      )}
    </>
  );
}

export default SignIn;
