// components/ScreenSizeWarning.jsx
import React, { useEffect, useState } from "react";

const ScreenSizeWarning = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLargeScreen) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          fontSize: "1.5rem",
          backgroundColor: "#f8f8f8",
          color: "#cc0000",
        }}
      >
        Please use a larger device (laptop or PC) to access this application.
      </div>
    );
  }

  return null;
};

export default ScreenSizeWarning;
