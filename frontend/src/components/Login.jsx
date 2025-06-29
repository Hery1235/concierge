import React, { useEffect } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { openSignIn } = useClerk();

  const { isSignedIn } = useUser();
  const { navigate } = useAppContext();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/"); // Redirect to home if signed in
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        onClick={openSignIn}
        className="flex p-6 border-gray-300 border rounded-lg text-lg 
      text-bold cursor-pointer backdrop-blur-xl font-playfair"
      >
        Concierge's Login
      </div>
    </div>
  );
};

export default Login;
