import axios from "axios";
import { REGISTER_USER } from "./types";

// register user
export const registerUser = userData => dispatch => {
  axios.post("/api/auth/register", userData).then(res =>
    dispatch({
      type: REGISTER_USER,
      payload: res.data
    })
  );
};
