import React, { useState, useEffect, createContext } from "react";
import GroupDetail from "../Groups/GroupDetail";

import { useParams } from "react-router-dom";
import { requestGroupDetail, requestGroupMemebrs } from "../../api/request";
import LoadingIcon from "./LoadingIcon";

export const GroupUpdateContext = createContext();

function GroupLoading({ children }) {
  let { groupId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [groupInfo, setGroupInfo] = useState();
  const [groupMemberList, setGroupMemberList] = useState([]);

  const getGroupDetail = async () => {
    return requestGroupDetail(groupId).then((res) => {
      setGroupInfo(res);
    });
  };

  const getGroupMemberList = async () => {
    return requestGroupMemebrs(groupId).then((res) => {
      setGroupMemberList(res);
    });
  };

  const loadingResource = async () => {
    await getGroupDetail();
    await getGroupMemberList();
    setIsLoading(false);
  };

  useEffect(() => {
    loadingResource();
  }, [groupId]);

  return (
    <div>
      {isLoading ? (
        <div
          className="d-flex flex-column justify-content-center vh-100 overflow-hidden"
          style={{
            height: "100%"
          }}
        >
          <LoadingIcon />
        </div>
      ) : (
        <GroupUpdateContext.Provider
          value={{ getGroupDetail, getGroupMemberList }}
        >
          <GroupDetail
            groupInfo={groupInfo}
            groupMemberList={groupMemberList}
          />
        </GroupUpdateContext.Provider>
      )}
    </div>
  );
}

export default GroupLoading;
