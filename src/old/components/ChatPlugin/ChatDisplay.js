import React, { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../../App";
import { postMessage } from "../../request/requestFunction";

function ChatDisplay({ contact = {}, getChatContainBothUsers }) {
  const userToken = useContext(UserTokenContext);
  const [messageInput, setMessageInput] = useState("");
  const [messageRecord, setMessageRecord] = useState();

  const msgBoxStyle = (contactUserId, checkId) => {
    if (contactUserId === checkId) {
      return "align-items-start";
    }
    return "align-items-end";
  };

  const scrollToLastMessage = () => {
    let ele = document.getElementById("chat_record_box");
    ele.scrollTop = ele.scrollHeight;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setMessageRecord([
      ...messageRecord,
      {
        message: messageInput,
      },
    ]);
    postMessage({
      userToken,
      receiver: contact.contactUser._id,
      type: "text",
      message: messageInput,
    });
    setMessageInput("");
  };

  useEffect(() => {
    setMessageRecord(contact.messages);
  }, [contact]);

  useEffect(() => {
    scrollToLastMessage();
  }, [messageRecord]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <h3 className="border-bottom p-3" style={{ height: "60px" }}>
        {contact.contactUser?.username}
      </h3>
      <div
        id="chat_record_box"
        className="p-3 border-bottom overflow-auto"
        style={{ height: "80%" }}
      >
        {messageRecord?.map((message) => (
          <div
            key={message._id}
            className={`d-flex flex-column mb-1 ${msgBoxStyle(
              message.senderId,
              contact.contactUser._id
            )}`}
          >
            <div
              className={`border rounded-pill px-3 py-1 shadow-sm
                ${
                  message.senderId === contact.contactUser._id
                    ? "bg-light"
                    : "bg-primary text-light"
                }
              `}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>
      <form className="d-flex p-3" onSubmit={(e) => sendMessage(e)}>
        <input
          className="form-control rounded-pill"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></input>
        <button className="btn rounded-pill btn-primary ms-2" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatDisplay;
