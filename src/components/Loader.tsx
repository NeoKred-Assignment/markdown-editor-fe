import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader2.json"; // You'll need to add this file

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div style={{ width: "100px", height: "100px" }}>
        <Lottie animationData={loaderAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
