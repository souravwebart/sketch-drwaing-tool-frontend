import React from "react";
import Sketch from "../Component/Sketch";
import { GetServerSideProps } from "next";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import nookies from "nookies";

function UserSketch() {
  return <Sketch />;
}

// export async function getServerSideProps(ctx: any) {
//   // const cookies = nookies.get(ctx)
//   const { token } = parseCookies(ctx);
//   if (!token) {
//     const { res } = ctx;
//     res.writeHead(302, { Location: "/Login" });
//     res.end();
//   }
//   return {
//     props: {},
//   };
// }

export default UserSketch;
