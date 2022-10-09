import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../Store";

function MyApp({ Component, pageProps }: AppProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Provider store={store}>
        <div
          style={{ display: "flex", minHeight: "100vh" }}
          className="container-fluid"
        >
          <div
            className="sidebar"
            style={{ backgroundColor: "#000", marginBottom: "3rem" }}
          >
            <Sidebar setShow={setShow} show={show} />
          </div>
          <div
            className="component-main"
            style={{
              width: show ? "calc(100% - 160px)" : "100%",
              marginLeft: show ? "auto" : "0px",
            }}
          >
            <Header />
            <Component {...pageProps} />
          </div>
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
