import React from "react";
import { beDate } from "../../utilities/betterDate";
import UserTile from "../Common/UserTile";
import MemberBox from "./MemberBox";
import TaskBox from "./TaskBox";

function GroupDetail({ groupInfo, groupMemberList }) {
  return (
    <div className="text-grey p-3">
      <div className="border-bottom pb-3">
        <h1 className="text-dark">{groupInfo?.groupName}</h1>
        <div>Created at: {beDate(groupInfo?.createdAt)}</div>
      </div>

      <div className="row mt-3" style={{ height: "25vh" }}>
        <div className="col-md">
          <div className="d-flex flex-row">
            <h5>Announcements</h5>
            <div className="ms-auto text-muted">
              <i className="bi bi-three-dots-vertical"></i>
            </div>
          </div>
          <div>
            <em>There is no announcement so far.</em>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex flex-row">
            <h5>Members ({groupMemberList.length})</h5>
            <MemberBox memberList={groupMemberList} />
          </div>

          <div
            className="w-100"
            style={{ height: "21vh", overflowY: "auto", overflowX: "hidden" }}
          >
            <table className="blue-trans-bg more-rounded w-100">
              <tbody>
                {groupMemberList.map((member) => (
                  <tr key={member._id} className="blue-text fw-bold">
                    <td className="p-2">
                      <div
                        style={{
                          width: "18vw",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <UserTile userInfo={member}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="d-flex flex-row mb-2">
          <h5>Tasks ({groupInfo?.groupTasks.length})</h5>
          <TaskBox groupTasks={groupInfo?.groupTasks} />
        </div>

        <table className="w-100">
          <thead className="border-bottom shadow-sm blue-trans-bg">
            <tr style={{ display: "block" }}>
              <td className="p-2 blue-text fw-bold" style={{ width: "20vw" }}>Deadline</td>
              <td className="p-2 blue-text fw-bold" style={{ width: "40vw" }}>Title</td>
              <td className="p-2 blue-text fw-bold" style={{ width: "20vw" }}>Created By</td>
            </tr>
          </thead>
          <tbody
            className="blue-trans-bg"
            style={{
              display: "block",
              overflow: "auto",
              width: "100%",
              height: "30vh",
            }}
          >
            {groupInfo?.groupTasks.map((task) => (
              <tr key={task._id} className="border-bottom">
                <td className="blue-text p-2" style={{ width: "20vw" }}>{beDate(task.deadline)}</td>
                <td className="blue-text ps-3 p-2" style={{ width: "40vw" }}>
                  {task.title}
                </td>
                <td
                  className="blue-text ps-1 p-2"
                  style={{ width: "20vw", overflow: "hidden" }}
                >
                  <UserTile userInfo={task.createdBy}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroupDetail;
