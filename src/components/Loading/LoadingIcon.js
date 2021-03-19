import React, { useEffect } from "react";

function LoadingIcon() {
  useEffect(() => {
    let circles = document.getElementById("loading-ani").children;

    for (let i = 0; i < circles.length; i++) {
      let circle = circles[i];
      circle.style.animationName = "gradient-color";
      circle.style.animationDuration = "1s";
      circle.style.animationDelay = (1 / circles.length) * i + "s";
      circle.style.animationIterationCount = "infinite";
    }
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center h-100 w-100">
      <div>
        <div id="loading-ani" className="loading-container">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
        <div className="m-auto text-center mt-4">
          It takes some time to load and wake the server
        </div>
      </div>
    </div>
  );
}

export default LoadingIcon;
