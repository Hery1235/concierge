import React from "react";
import { useAppContext } from "../context/AppContext";
import { useClerk } from "@clerk/clerk-react";

const ComponentError = () => {
  const { navigate } = useAppContext();
  const { signOut } = useClerk();

  return (
    <div className="flex items-center justify-center flex-col gap-4 h-screen text-center px-4">
      <h1 className="text-xl font-semibold text-red-600">
        Access Denied – Please use the Admin Panel
      </h1>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Click To Retry
      </button>
    </div>
  );
};

export default ComponentError;
