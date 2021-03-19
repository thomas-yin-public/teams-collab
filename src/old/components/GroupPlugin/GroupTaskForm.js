import React, { useContext, useState } from "react";
import { UserTokenContext } from "../../App";
import { postGroupTask } from "../../request/requestFunction";

function GroupTaskForm({ groupId }) {
  const userToken = useContext(UserTokenContext);
  const [titleInput, setTitleInput] = useState("");
  const [deadlineInput, setDeadlineInput] = useState(new Date());
  const [DescriptionInput, setDescriptionInput] = useState("");

  const createGroupTask = (e) => {
    e.preventDefault();
    postGroupTask(userToken, groupId, {
      title: titleInput,
      deadline: deadlineInput,
      description: DescriptionInput,
    }).then((res) => res);
  };

  return (
    <div className="bg-white border p-3 shadow-sm">
      <form onSubmit={(e) => createGroupTask(e)}>
        <label className="form-label mt-4">Task title</label>
        <input
          className="form-control"
          placeholder="Title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        ></input>
        <label className="form-label mt-4">Deadline</label>
        <input
          className="form-control"
          type="date"
          value={deadlineInput}
          onChange={(e) => setDeadlineInput(e.target.value)}
        ></input>
        <label className="form-label mt-4">Description</label>
        <textarea
          className="form-control"
          placeholder="Description"
          value={DescriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
        ></textarea>
        <div className="my-3 ">
          <button className="btn btn-primary me-2" type="submit">
            Create task
          </button>
          <button className="btn btn-primary" type="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default GroupTaskForm;
