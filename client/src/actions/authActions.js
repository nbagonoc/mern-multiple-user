import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/auth/register", userData)
    .then(res => {
      // redirect user to login page
      history.push("/login");
      // clear errors
      dispatch({
        type: CLEAR_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login user
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      // save to localStorage
      const { token } = res.data;
      // set token to localStorage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      //   set current user
      dispatch(setCurrentUser(decoded));
      // redirect user
      history.push("/dashboard");
      // clear errors
      dispatch({
        type: CLEAR_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set token of logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log user out
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Clear the current user
  dispatch({
    type: CLEAR_CURRENT_USER,
    payload: {}
  });
};
