import React, { useContext, useState } from "react";
import { postMessage } from "../../api/post";
import { UserIdContext } from "../../App";
import { betterTime } from "../../utilities/betterDate";
import { ChatContext, WebSocketContext } from "../Loading/ResourcePreLoad";

function ChatDisplay({ contactUserChatData, className }) {
  const userId = useContext(UserIdContext);
  const ws = useContext(WebSocketContext);
  const { getUserContactList } = useContext(ChatContext);

  const [messageInput, setMessageInput] = useState("");
  const [tmpMessageHolder, setTmpMessageHolder] = useState([]);

  const messageStyle = {
    left: { box: "justify-content-start", bg: "bg-light" },
    right: { box: "justify-content-end", bg: "darkblue-bg text-white" },
  };

  const sendMessage = async () => {
    let message = messageInput;
    let receiverId = contactUserChatData.contactUser._id;
    setMessageInput("");
    setTmpMessageHolder([...tmpMessageHolder, messageInput]);
    ws.send(
      JSON.stringify({
        userId,
        receiverId,
        action: "NEW_CHAT_MESSAGE",
        message: messageInput,
        chatId: contactUserChatData._id,
      })
    );

    postMessage({
      message,
      type: "text",
      receiver: receiverId,
    }).then(async (res) => {
      if (res.success) {
        await getUserContactList();
        setTmpMessageHolder([...tmpMessageHolder].splice(0, 1));
      } else {
      }
    });
  };

  return (
    <div className={`${className} overflow-hidden m-0 p-0 shadow-left`}>
      <h3
        className="border-bottom h-50px m-0 px-3"
        style={{ lineHeight: "50px" }}
      >
        {contactUserChatData.contactUser.username}
      </h3>
      <div
        className="overflow-auto px-3 py-2 d-flex flex-column-reverse"
        style={{ height: "82%" }}
      >
        {tmpMessageHolder.map((msg, index) => {
          return (
            <div key={index}>
              <div className={`d-flex ${messageStyle.right.box}`}>
                <span
                  className={`more-rounded mt-1 px-3 p-1 border ${messageStyle.right.bg}`}
                  style={{ maxWidth: "55%" }}
                >
                  {msg}
                </span>
              </div>
            </div>
          );
        })}
        {contactUserChatData.messages?.map((msg) => {
          return (
            <div key={msg._id}>
              <div
                className={`d-flex ${
                  userId === msg.senderId
                    ? messageStyle.right.box
                    : messageStyle.left.box
                }`}
              >
                <span
                  className={`more-rounded mt-1 px-3 p-1 border ${
                    userId === msg.senderId
                      ? messageStyle.right.bg
                      : messageStyle.left.bg
                  }`}
                  style={{ maxWidth: "55%" }}
                >
                  {msg.message}
                </span>
                <sub className="align-self-center mx-1 text-muted">
                  {betterTime(msg.sendAt)}
                </sub>
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="d-flex flex-row py-2 border-top px-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="form-control more-rounded"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></input>
        <button
          className="btn btn-primary more-rounded ms-1"
          type="submit"
          onClick={() => sendMessage()}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatDisplay;
