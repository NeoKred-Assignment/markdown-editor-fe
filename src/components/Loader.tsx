import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader2.json";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div style={{ width: "130px", height: "130px" }}>
        <Lottie animationData={loaderAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
