import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteGroupMember } from "../../api/delete";
import { postGroupMember } from "../../api/post";
import { requestAllUserBasicInfo } from "../../api/request";
import ToolBox from "../Common/ToolBox";
import { GroupUpdateContext } from "../Loading/GroupLoading";

function MemberBox({ memberList }) {
  const [selectedComponent, setSelectedComponent] = useState("");

  const itemList = [
    {
      name: "Add Member",
      action: () =>
        setSelectedComponent(<AddUserForm memberList={memberList} />),
    },
    {
      name: "Remove Member",
      action: () =>
        setSelectedComponent(<RemoveMemberForm memberList={memberList} />),
    },
  ];
  return (
    <React.Fragment>
      <ToolBox unqiueId="meber-box" itemList={itemList} />
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

function RemoveMemberForm({ memberList: _memberList }) {
  let { groupId } = useParams();
  let { getGroupMemberList } = useContext(GroupUpdateContext);
  const [memberList, setMemberList] = useState(_memberList);

  const [submitResponse, setSubmitResponse] = useState("");

  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");

  const removeMember = async () => {
    deleteGroupMember({ groupId, memberId: selectedMemberId }).then((res) => {
      if (res.success) {
        setSubmitResponse(<div className="alert alert-success">Success!</div>);
        getGroupMemberList();
      } else {
        setSubmitResponse(
          <div className="alert alert-danger">
            Something wrong with the connection. Please try to submit again.
          </div>
        );
      }
    });
  };

  useEffect(() => {
    console.log(_memberList);
    setMemberList(_memberList);
  }, [_memberList]);

  return (
    <React.Fragment>
      {showConfirmBox && (
        <div className="d-flex flex-column custom-modal">
          <h3>Are you sure to delete this user?</h3>
          <div className="row mt-3">
            <button
              style={{ width: "20vw" }}
              className="col-md btn btn-danger"
              onClick={() => {
                removeMember();
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
        <h1>Delete User</h1>
        {submitResponse}
        <div className="" style={{ height: "60vh", msOverflowY: "auto" }}>
          {memberList.map((member, index) => (
            <div key={member._id} className="row p-0 m-0 py-1">
              <div className="col-md p-0 m-0">
                #{index + 1} {member.username}
              </div>
              <button
                className="btn btn-danger col-md-2"
                onClick={() => {
                  setSelectedMemberId(member._id);
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

function AddUserForm({ memberList }) {
  let { groupId } = useParams();
  let { getGroupMemberList } = useContext(GroupUpdateContext);
  const [userSuggestList, setUserSuggestList] = useState([]);

  const [submitResponse, setSubmitResponse] = useState("");
  const [userSuggestFilterList, setUserSuggestFilterList] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  const addMember = async (e, memberId) => {
    e.target.innerText = "Processing";
    postGroupMember({ groupId, memberId }).then((res) => {
      if (res.success) {
        getGroupMemberList();
        e.target.innerText = "✔";
        e.target.className = e.target.className.replace(
          "btn-primary",
          "btn-success"
        );
        e.target.disabled = true;
      } else {
        e.target.innerText = "Add";
      }
    });
  };

  const getUserSuggestion = async () => {
    requestAllUserBasicInfo().then((res) => {
      let userHash = {};
      for (let user of memberList) {
        userHash[user._id] = 1;
      }
      let list = res.filter((user) => !userHash[user._id]);
      setUserSuggestList(list);
    });
  };

  useEffect(() => {
    if (memberList) getUserSuggestion();
  }, [memberList]);

  useEffect(() => {
    setUserSuggestFilterList(userSuggestList);
  }, [userSuggestList]);

  useEffect(() => {
    let newList = userSuggestList?.filter((user) =>
      user.email.match(new RegExp(`${filterInput}`, "gmi"))
    );
    setUserSuggestFilterList(newList);
  }, [filterInput]);

  return (
    <div className="p-5" style={{ width: "50vw", height: "80vh" }}>
      <h1>Add Member</h1>
      <input
        className="form-control"
        value={filterInput}
        placeholder="Type the user's email to search..."
        onChange={(e) => setFilterInput(e.target.value)}
      ></input>
      <div className="">
        <div className="row p-1">
          <div className="col-md">Username</div>
          <div className="col-md">Email address</div>
          <div className="col-md-2"></div>
        </div>
        <div
          className="m-0 p-0"
          style={{ height: "50vh", overflowX: "hidden", overflowY: "auto" }}
        >
          {userSuggestFilterList.map((user) => (
            <div
              key={user._id}
              className="row mt-1 border more-rounded"
            >
              <div className="col-md">{user.username}</div>
              <div className="col-md">{user.email}</div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  onClick={(e) => addMember(e, user._id)}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="row">
        <div className="col-md">Username</div>
        <div className="col-md">Email address</div>
        <div className="col-md-2"></div>
      </div> */}
      {/* <div className="m-0 p-0" style={{ height: "50vh", overflowY: "auto" }}>
        {userSuggestFilterList.map((user) => (
          <div key={user._id} className="row m-0 p-0 mt-4 border more-rounded" style={{height: ""}}>
            <div className="col-md p-0 m-0">{user.username}</div>
            <div className="col-md p-0 m-0">{user.email}</div>
            <div className="col-md-2 p-0 m-0">
              <button
                className="btn btn-primary"
                onClick={(e) => addMember(e, user._id)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default MemberBox;
