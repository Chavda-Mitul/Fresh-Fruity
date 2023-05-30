import { useState } from "react";

export function useSignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signin = () => {
    setIsSignedIn(true);
    console.log('sign in');
  };

  const signout = () => {
    setIsSignedIn(false);
    console.log('sign out');
  };

  return { isSignedIn ,setIsSignedIn , signin, signout };
}
