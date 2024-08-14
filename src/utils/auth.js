const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrg.jumpingcrab.com"
    : "http://localhost:3001";
import { handleServerResponse } from "../utils/api";

const signup = (name, avatar, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

const signin = (email, password) => {
  // A POST request is sent to /auth/local.
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // The parameters are wrapped in an object, converted to a JSON
    // string, and sent in the body of the request.
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

export const auth = {
  signup,
  signin,
};
