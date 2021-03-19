import React, { useContext, useState } from "react";
import { createGroup } from "../../api/post";
import { ForceReload } from "../Loading/ResourcePreLoad";

function GroupCreateForm({ showForm }) {
  const forceReload = useContext(ForceReload);

  const [groupNameInput, setGroupNameInput] = useState();
  const [groupDescriptionInput, setGroupDescriptionInput] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  const postCreateGroup = () => {
    createGroup(groupNameInput, groupDescriptionInput)
      .then((res) => {
        if (res && res.success) {
          forceReload();
          showForm(false);
        } else {
          setErrorMessage("Failed to create the group");
        }
      })
      .catch((err) => setErrorMessage("Failed to create the group"));
  };

  return (
    <div
      className="vh-100 vw-100 d-flex justify-content-center bg-blur"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <form
        className="m-auto border more-rounded p-3 shadow bg-white"
        style={{ width: "50vw" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <h1>Group Create Form</h1>
        <label>Group Name</label>
        <input
          className="form-control"
          value={groupNameInput}
          onChange={(e) => setGroupNameInput(e.target.value)}
        ></input>
        <label>Group Description</label>
        <textarea
          className="form-control"
          value={groupDescriptionInput}
          onChange={(e) => setGroupDescriptionInput(e.target.value)}
        />
        {errorMessage && <div className="alert-danger p-2 my-2 border more-rounded">{errorMessage}</div>}
        <div className="d-flex flex-row justify-content-end">
          <button
            className="btn btn-primary ms-2 mt-2"
            onClick={() => postCreateGroup()}
          >
            Create group
          </button>
          <button
            className="btn btn-primary ms-2 mt-2"
            onClick={() => showForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default GroupCreateForm;
