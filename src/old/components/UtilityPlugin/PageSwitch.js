import React, { useState } from "react";

function PageSwitch({ pages = {} }) {
  const [currentPage, setCurrentPage] = useState("About");

  return (
    <div>
      <div className="d-flex flex-row">
        {Object.keys(pages).map((tabName) => (
          <div className="btn p-0 me-4 my-3 text-primary" onClick={() => setCurrentPage(tabName)}>
            {tabName}
          </div>
        ))}
      </div>
      {pages[currentPage]}
    </div>
  );
}

export default PageSwitch;
