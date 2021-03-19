import React from "react";

function GroupCard({ group }) {
  return (
    <div className="blue-grad-bg more-rounded shadow-sm my-3 mr-3 text-white">
      <div
        className="d-flex justify-content-center flex-column 
    p-5"
      >
        <i className="bi bi-back m-auto" style={{ fontSize: 50 }}></i>
        <h4 className="font-weight-bold m-auto">{group.groupName}</h4>
      </div>
    </div>
  );
}

export default GroupCard;
