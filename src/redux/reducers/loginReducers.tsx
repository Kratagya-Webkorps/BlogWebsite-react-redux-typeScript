import { Reducer } from "@reduxjs/toolkit";
import { LOGIN_SUCCESS, LoginFormState } from "../interfaces/interfaces";
const initialstate: LoginFormState = {
  userName: "",
  email: "",
  isLoggedIn:false,
};

const loginFormReducer: Reducer<LoginFormState> = (state = initialstate, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        userName:action.payload.userName,
        email: action.payload.email,
        isLoggedIn:action.payload.isLoggedIn
      };

    default:
      return state;
  }
};

export default loginFormReducer;
