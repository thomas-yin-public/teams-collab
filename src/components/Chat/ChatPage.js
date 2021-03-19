import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../Loading/ResourcePreLoad";
import ChatDisplay from "./ChatDisplay";
import { ChatIdContext, UserIdContext } from "../../App";
import { betterTime } from "../../utilities/betterDate";
import ChatTile from "./ChatTile";

function ChatPage() {
  const userId = useContext(UserIdContext);
  const { externChatId, setExternChatId } = useContext(ChatIdContext);

  const { chatData } = useContext(ChatContext);
  const [sortedChatList, setSortedChatList] = useState([]);
  const [filteredChatData, setFilteredChatData] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [selectedContactId, setSelectedContactId] = useState(
    externChatId?.contactUser._id
  );

  const filterContact = () => {
    let filteredList = sortedChatList.filter((chatId) =>
      chatData[chatId].contactUser.username.match(
        new RegExp(filterInput, "gmi")
      )
    );
    setFilteredChatData([...filteredList]);
  };

  const makeSortedChatList = () => {
    let sortedList = Object.keys(chatData);
    sortedList.sort((x, y) => {
      let xdate = new Date(chatData[x].messages[0].sendAt);
      let ydate = new Date(chatData[y].messages[0].sendAt);
      if (xdate > ydate) return -1;
      else if (xdate < ydate) return 1;
      return 0;
    });
    setSortedChatList([...sortedList]);
  };

  useEffect(() => {
    makeSortedChatList();
  }, [chatData]);

  useEffect(() => {
    filterContact();
  }, [sortedChatList, filterInput]);

  return (
    <div className="row p-0 m-0 h-100">
      <div
        className="col-md-2 p-0 m-0 h-100 border-end"
        style={{ minWidth: "195px" }}
      >
        <input
          className="form-control border-0 h-50px"
          placeholder="Search User"
          onChange={(e) => setFilterInput(e.target.value)}
        />
        <div className="border-top">
          {filteredChatData.map((contactId) => (
            <ChatTile
              key={contactId}
              contact={chatData[contactId]}
              setSelectedContactId={setSelectedContactId}
              userId={userId}
            />
          ))}
        </div>
      </div>
      {selectedContactId ? (
        <ChatDisplay
          contactUserChatData={
            chatData[selectedContactId] === undefined
              ? externChatId
              : chatData[selectedContactId]
          }
          className="col-md h-100 bg-white shadow-left"
        />
      ) : (
        <div className="col-md h-100 bg-white shadow-left" />
      )}
    </div>
  );
}

export default ChatPage;
