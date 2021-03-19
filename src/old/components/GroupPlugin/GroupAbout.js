import React from "react";

function GroupAbout({ groupInfo }) {
  return (
    <div >
      <p className="border more-rounded shadow-sm p-3 bg-white">
        {groupInfo.groupDescription || "There's no group description so far..."}
      </p>
      <div>
        <div>Group Tasks</div>
        {groupInfo.groupTasks?.map((task) => (
          <div className="alert alert-success shadow-sm more-rounded ">
            <h4>{task.title}</h4>
            <div>Deadline: {task.deadline}</div>
            <div>Description: {task.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupAbout;
