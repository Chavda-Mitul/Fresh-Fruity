import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Protected({ children }) {
  const isSignedIn = useSelector((state) => state.sigin.value);
  if (!isSignedIn) {
    console.log("->", isSignedIn);
    return <Navigate to="/registration" replace />;
  }
  return <>{children}</>;
}
export const SellerPermition = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  if (user) {
    console.log("user ", user);
    var isSeller = user.displayName == "seller" ? true : false;
    console.log(isSeller);
  }
  if (isSeller) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Protected;
