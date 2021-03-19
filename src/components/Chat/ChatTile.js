import React, { useContext, useState } from "react";
import { postMarkChatAsRead } from "../../api/post";
import { betterTime } from "../../utilities/betterDate";
import { ForceReload } from "../Loading/ResourcePreLoad";

function ChatTile({ contact, setSelectedContactId, userId }) {
  const forceReload = useContext(ForceReload)

  const [showUnread, setShowUnread] = useState(true)
  let lastMessage = contact.messages[0];

  const markAsRead = () => {
    postMarkChatAsRead(contact._id, contact.contactUser._id).then(res => {
      if (res && res.success) {
        forceReload()
      }
    }).catch(err => err)
  }

  return (
    <div
      className="border-bottom h-50px px-3 pt-cursor row"
      onClick={() => {
        setSelectedContactId(contact.contactUser._id);
        setShowUnread(false);
        markAsRead()
      }}
    >
      <div className="col">
        <div className="row mt-2">
          <div className="col">
            <b>{contact.contactUser.username}</b>
          </div>
          {showUnread && contact.unread > 0 && (
            <div
              className="d-flex justify-content-center col-3 more-rounded bg-white fw-bold"
              style={{ width: "40px" }}
            >
              {contact.unread}
            </div>
          )}
        </div>
        <div className="row text-muted">
          <div className="col-md">
            {lastMessage.senderId === userId ? "You: " : ""}{" "}
            {lastMessage.message}
          </div>
          <div className="col-md-3 fw-light mt-1" style={{ fontSize: "12px" }}>
            {betterTime(lastMessage.sendAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatTile;
