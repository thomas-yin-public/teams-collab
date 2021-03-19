import React, { createContext, useContext, useEffect, useState } from "react";
import backendURL from "../../api/backendURL";
import {
  requestUserContactList,
  requestUserGroupList,
} from "../../api/request";
import { UserIdContext } from "../../App";
import LoadingIcon from "./LoadingIcon";

export const GroupContext = createContext("");
export const ChatContext = createContext("");
export const TaskContext = createContext("");

export const ForceReload = createContext("");

export const WebSocketContext = createContext();

function ResourcePreLoad({ children }) {
  const userId = useContext(UserIdContext);

  const [isLoading, setIsLoading] = useState(true);

  const [groupData, setGroupData] = useState();
  const [chatData, setChatData] = useState();
  const [taskData, setTaskData] = useState();

  const ws = new WebSocket("ws://localhost:8000");
  ws.onopen = () => {
    ws.send(JSON.stringify({ userId, action: "REGISTER" }));
  };

  ws.onmessage = (data) => {
    let json_data = JSON.parse(data.data);
    console.log(json_data);
    unsafeMessageUpdate(json_data);
  };

  const unsafeMessageUpdate = ({ chatId, userId: senderId, message }) => {
    if (chatData[chatId]) {
      console.log(123);
      let newDataList = chatData;
      newDataList[chatId].messages = [
        { _id: new Date().getTime(), senderId, message },
        ...newDataList[chatId].messages,
      ];
      setChatData({ ...newDataList });
    } else {
      getUserContactList();
    }
  };

  const getUserGroupList = async () => {
    return requestUserGroupList().then((res) => setGroupData(res));
  };

  const getUserContactList = async () => {
    return requestUserContactList().then((res) => {
      let hashedContactData = {};
      for (let contact of res) {
        contact.messages = contact.messages.reverse();
        // hashedContactData[contact._id] = contact;
        hashedContactData[contact.contactUser._id] = contact;
      }
      setChatData({ ...hashedContactData });
    });
  };

  const getData = async () => {
    await getUserContactList();
    await getUserGroupList();
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ForceReload.Provider value={getData}>
      <WebSocketContext.Provider value={ws}>
        <GroupContext.Provider value={groupData}>
          <ChatContext.Provider value={{ chatData, getUserContactList }}>
            <TaskContext.Provider value={taskData}>
              {isLoading ? (
                <div
                  style={{
                    position: "absolute",
                    height: "100vh",
                    width: "100vw",
                  }}
                >
                  <LoadingIcon />
                </div>
              ) : (
                children
              )}
            </TaskContext.Provider>
          </ChatContext.Provider>
        </GroupContext.Provider>
      </WebSocketContext.Provider>
    </ForceReload.Provider>
  );
}

export default ResourcePreLoad;
