import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";

export function useSignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const auth = getAuth();

  const signin = () => {
    setIsSignedIn(true);
    console.log("sign in");
  };

  const signout = () => {
    setIsSignedIn(false);
    signOut(auth)
      .then(() => {
        console.log("sigin out successfull");
        localStorage.removeItem("user");
      })
      .catch((error) => {
        // An error happened.
      });
    console.log("sign out");
    return;
  };

  return { isSignedIn, setIsSignedIn, signin, signout };
}
