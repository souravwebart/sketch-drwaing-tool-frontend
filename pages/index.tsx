import type { NextPage } from "next";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import Bg from "../public/images/home.png";

const Home: NextPage = () => {
  const router = useRouter();
  const demoHandle = (e: any) => {
    e.preventDefault();
    router.push("/Demo");
  };

  const toolHandle = (e: any) => {
    e.preventDefault();
    router.push("/UserSketch");
  };
  return (
    <>
      <div className="container">
        <div
          className="Home"
          style={{ margin: "auto", textAlign: "center", marginTop: "10%" }}
        >
          <Image
            src={Bg}
            alt="Picture of the author"
            height="200px"
            width="200px"
          ></Image>
          <h1 style={{ fontSize: "30px", fontWeight: 700 }}>
            Welcome to Lovely Sketch Tool
          </h1>
          <h3 style={{ fontSize: "24px", fontWeight: 500 }}>
            Fast Drawing Tools for Every one
          </h3>
          {!localStorage.getItem("user") && (
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={demoHandle}
            >
              Start Drawing using Demo Tools
            </button>
          )}

          {localStorage.getItem("user") && (
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={toolHandle}
            >
              Go To Your Drawing Tool
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
