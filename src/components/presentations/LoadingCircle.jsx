import "../../styles/loading.css"
import React from "react";

const LoadingCircle = () => {
  return (
    <div className="loading-container">
      <div className="loading"></div>
      <div id="loading-text">loading</div>
    </div>
  );
};

export default LoadingCircle;
