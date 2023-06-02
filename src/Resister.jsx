import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./SignIn";
import Login from "./Login";

export default function Register({ isSignedIn, signin }) {
  return (
    <>
      {isSignedIn ? (
        <SignIn isSignedIn={isSignedIn} signin={signin} />
      ) : (
        <Login isSignedIn={isSignedIn} signin={signin} />
      )}
    </>
  );
}
