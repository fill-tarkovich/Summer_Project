import React from "react";
import classes from "./loading.scss";

const Loading = () => {
  return (
    <div className="loaderContainer">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;