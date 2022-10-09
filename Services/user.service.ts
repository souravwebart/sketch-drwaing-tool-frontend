import axios from "axios";
import authHeader from "./auth-header";

const getPublicContent = () => {
  return axios.get(process.env.NEXT_PUBLIC_ENV_VARIABLE + "free-endpoint");
};

const getUserBoard = () => {
  return axios.get(process.env.NEXT_PUBLIC_ENV_VARIABLE + "auth-endpoint", {
    headers: authHeader(),
  });
};

const userService = {
  getPublicContent,
  getUserBoard,
};

export default userService;
