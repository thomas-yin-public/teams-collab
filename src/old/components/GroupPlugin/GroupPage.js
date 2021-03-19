import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserTokenContext } from "../../App";
import {
  requestGroup,
  requestGroupMemebrs,
  postGroupMember,
} from "../../request/requestFunction";
import UserSuggestion from "../SuggestionPlugin/UserSuggestion";
import UserCard from "../UserPlugin/UserCard";
import PageSwitch from "../UtilityPlugin/PageSwitch";
import GroupAbout from "./GroupAbout";
import GroupTaskForm from "./GroupTaskForm";

function GroupPage() {
  const { groupId } = useParams();
  const userToken = useContext(UserTokenContext);

  const [groupInfo, setGroupInfo] = useState({});
  const [groupMemberList, setGroupMemberList] = useState([]);

  const [selectedMember, setSelectedMember] = useState("")

  const getGroupInfo = () => {
    requestGroup(userToken, groupId).then((res) => setGroupInfo(res));
    requestGroupMemebrs(userToken, groupId).then((res) =>
      setGroupMemberList(res)
    );
  };

  const addGroupMember = (memberId) => {
    postGroupMember(userToken, groupId, memberId).then((res) => {
      if (res.success) getGroupInfo();
    });
  };

  useEffect(() => {
    getGroupInfo();
  }, []);

  const pages = {
    About: <GroupAbout groupInfo={groupInfo} />,
    "Add Member": (
      <UserSuggestion
        filterList={groupMemberList}
        addGroupMember={addGroupMember}
      />
    ),
    "Create Task": (
      <GroupTaskForm groupId={groupId} renderFunction={getGroupInfo} />
    ),
  };

  return (
    <div className="row h-100 w-100 m-0">
      <div className="col p-0">
          <h1 className="p-3 bg-white border-bottom">{groupInfo.groupName}</h1>
          <div className="px-3"><PageSwitch pages={pages}/></div>
      </div>
      <div className="col-3 bg-white border shadow-sm vh-100">
        Group Members
        {groupMemberList.map((member) => (
          <div key={member._id} onClick={() => setSelectedMember({...member})}>{member.username}</div>
        ))}
        <UserCard user={selectedMember}/>
      </div>
    </div>
  );
}

export default GroupPage;
