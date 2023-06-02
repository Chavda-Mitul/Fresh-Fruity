import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export function useSignIn() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const auth = getAuth();

  const signin = () => {
    setIsSignedIn(true);
    console.log("sign in");
    return;
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        setIsSignedIn(false);
        console.log("sigin out successfull");
        localStorage.removeItem("user");
        console.log(isSignedIn);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("sign out");
    console.log(isSignedIn);
    return;
  };

  return { isSignedIn, setIsSignedIn, signin, signout };
}
