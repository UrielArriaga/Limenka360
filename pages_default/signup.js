import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signupUser,
  userSelector,
  clearState,
  loginUser,
} from "../redux/slices/userSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const register = () => {
    let data = {
      email: "",
      password: "12345",
    };
    dispatch(signupUser(data));
  };

  const login = () => {
    let data = {
      email: "uriel",
      password: "12345",
    };
    dispatch(loginUser(data));
  };
  return (
    <div>
      <button onClick={() => register()}> Registart</button>

      <button onClick={() => login()}>Login</button>
    </div>
  );
}
