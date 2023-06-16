import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./SignIn";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "./features/auth/siginSlicer";
export default function Register({ signin }) {
  const isSignedIn = useSelector((state) => state.sigin.value);
  return <>{isSignedIn ? <SignIn /> : <Login />}</>;
}
