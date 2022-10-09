export default function authHeader() {
  const item = localStorage.getItem("user") || "{}";
  const user = JSON.parse(item);

  console.log("authHeader", user);

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
