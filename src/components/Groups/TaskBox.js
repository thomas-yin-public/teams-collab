import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteGroupTask } from "../../api/delete";
import { postGroupTask } from "../../api/post";
import ToolBox from "../Common/ToolBox";
import { GroupUpdateContext } from "../Loading/GroupLoading";

function TaskBox({ groupTasks }) {
  const [selectedComponent, setSelectedComponent] = useState("");
  const itemList = [
    {
      name: "Add Task",
      action: () => setSelectedComponent(<AddTaskForm />),
    },
    {
      name: "Remove Task",
      action: () =>
        setSelectedComponent(<RemoveTaskForm groupTasks={groupTasks} />),
    },
  ];
  return (
    <React.Fragment>
      <ToolBox unqiueId="task_box" itemList={itemList} />
      {selectedComponent ? (
        <div className="custom-modal m-auto">
          <div
            className="d-flex flex-column bg-white border shadow-sm more-rounded"
            style={{ minWidth: "50vw" }}
          >
            <button
              className="btn m-0 p-0 d-flex flex-row-reverse fs-2 pe-2"
              onClick={() => setSelectedComponent("")}
            >
              <i className="bi bi-x"></i>
            </button>
            {selectedComponent}
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

function RemoveTaskForm({ groupTasks }) {
  let { groupId } = useParams();
  let { getGroupDetail } = useContext(GroupUpdateContext);

  const [submitResponse, setSubmitResponse] = useState("");

  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const removeTask = async () => {
    deleteGroupTask({ groupId, taskId: selectedTaskId }).then((res) => {
      if (res.success) {
        setSubmitResponse(<div className="alert alert-success">Success!</div>);
        getGroupDetail();
      } else {
        setSubmitResponse(
          <div className="alert alert-danger">
            Something wrong with the connection. Please try to submit again.
          </div>
        );
      }
    });
  };

  return (
    <React.Fragment>
      {showConfirmBox && (
        <div className="d-flex flex-column custom-modal">
          <h3>Are you sure to delete this item?</h3>
          <div className="row mt-3">
            <button
              style={{ width: "20vw" }}
              className="col-md btn btn-danger"
              onClick={() => {
                removeTask();
                setShowConfirmBox(false);
              }}
            >
              Yes
            </button>
            <button
              style={{ width: "20vw" }}
              className="col-md btn btn-primary ms-2"
              onClick={() => setShowConfirmBox(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      <div className="px-5">
        <h1>Delete Task</h1>
        {submitResponse}
        <div className="" style={{ height: "60vh", msOverflowY: "auto" }}>
          {groupTasks.map((task, index) => (
            <div key={task._id} className="row p-0 m-0 py-1">
              <div className="col-md p-0 m-0">
                #{index + 1} {task.title}
              </div>
              <button
                className="btn btn-danger col-md-2"
                onClick={() => {
                  setSelectedTaskId(task._id);
                  setShowConfirmBox(true);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

function AddTaskForm() {
  let { groupId } = useParams();
  let { getGroupDetail } = useContext(GroupUpdateContext);

  const [titleInput, setTitleInput] = useState("");
  const [deadlineInput, setDeadlineInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const [submitResponse, setSubmitResponse] = useState("");

  const submitTask = async () => {
    postGroupTask({
      groupId,
      title: titleInput,
      deadline: deadlineInput,
      description: descriptionInput,
    }).then((res) => {
      if (res.success) {
        setSubmitResponse(<div className="alert alert-success">Success!</div>);
        getGroupDetail();
      } else {
        setSubmitResponse(
          <div className="alert alert-danger">
            Something wrong with the connection. Please try to submit again.
          </div>
        );
      }
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="px-5 pb-5">
        <h1>Create A Task</h1>
        <p>Please fill in all the information in order to create a new task.</p>
        {submitResponse}
        <label className="form-label mt-2">Title</label>
        <input
          className="form-control"
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        ></input>
        <label className="form-label mt-2">Deadline</label>
        <input
          type="date"
          className="form-control"
          value={deadlineInput}
          onChange={(e) => setDeadlineInput(e.target.value)}
        ></input>
        <label className="form-label mt-2">Description</label>
        <textarea
          className="form-control"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
        ></textarea>
        <div className="d-flex flex-row-reverse mt-3">
          <button className="btn btn-primary ms-2" onClick={() => submitTask()}>
            Add Task
          </button>
          <button
            className="btn btn-outline-primary ms-2"
            type="reset"
            onClick={() => {
              setDeadlineInput("");
              setTitleInput("");
              setDescriptionInput("");
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskBox;
