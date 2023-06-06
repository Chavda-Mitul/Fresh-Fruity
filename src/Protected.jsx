import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ isSignedIn, children }) {
  if (!isSignedIn) {
    console.log("->", isSignedIn);
    return <Navigate to="/registration" replace />;
  }
  return <>{children}</>;
}
export const SellerPermition = ({ isSeller = false, children }) => {
  if (isSeller) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default Protected;
