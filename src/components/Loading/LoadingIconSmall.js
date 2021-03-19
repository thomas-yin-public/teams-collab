import React, { useEffect } from "react";

function LoadingIconSmall() {
  useEffect(() => {
    let circles = document.getElementById("loading-ani-sm").children;

    for (let i = 0; i < circles.length; i++) {
      let circle = circles[i];
      circle.style.animationName = "gradient-color-sm";
      circle.style.animationDuration = "1s";
      circle.style.animationDelay = (1 / circles.length) * i + "s";
      circle.style.animationIterationCount = "infinite";
    }
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center h-100">
        <div id="loading-ani-sm" className="loading-container-sm">
          <div className="loading-circle-sm"></div>
          <div className="loading-circle-sm"></div>
          <div className="loading-circle-sm"></div>
        </div>
    </div>
  );
}

export default LoadingIconSmall;
