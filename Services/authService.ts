import axios from "axios";

const register = (email: string, password: string, penColor: string) => {
  return axios.post(process.env.NEXT_PUBLIC_ENV_VARIABLE + "register", {
    email,
    password,
    penColor,
  });
};

const login = (email: String, password: String) => {
  return axios
    .post(process.env.NEXT_PUBLIC_ENV_VARIABLE + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log("hello", response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
