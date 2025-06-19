import React from "react";
import LogoImage from "../assets/SmallLogo.png";
import { useAppContext } from "../context/AppContext";

import {
  useClerk,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { sitesDummyData } from "../assets/assets";

const Navbar = () => {
  const { user, loggedInUserName } = useAppContext();
  const { signOut } = useClerk();

  return (
    <div
      className="px-6 pt-2 p-4  flex justify-between items-center text-lg 
    backdrop-blur-xl border-b border-gray-300"
    >
      <img className="h-20" src={LogoImage} alt="logo" />
      {/* <div className="flex gap-2 text-xs  p-2 rounded-lg">
        {sitesDummyData.map((site, index) => (
          <button
            className="p-2 rounded-lg border border-gray-300 hover:text-sm transition-all duration-500"
            key={index}
          >
            {site.name}
          </button>
        ))}
      </div> */}
      {user && (
        <div className="flex gap-4 items-center">
          <UserButton />
          <h1>{loggedInUserName}</h1>
        </div>
      )}
    </div>
  );
};

export default Navbar;
