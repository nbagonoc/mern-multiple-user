import axios from "axios";
import { REGISTER_USER } from "./types";

// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/auth/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: REGISTER_USER,
        payload: err.data
      })
    );
};
