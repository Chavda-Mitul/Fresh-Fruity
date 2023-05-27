import React from 'react';
import { Navigate } from 'react-router-dom';

function Protected({ isSignedIn, children }) {
  if (!isSignedIn) {
    console.log('->',isSignedIn);
    return <Navigate to="/registration" replace />;
  }
  return <>{children}</>;
}

export default Protected;
