import React, { useEffect, useState, useContext } from "react";
import { UserTokenContext, WebSocketContext } from "../../App";
import {
  requestUserContact,
  requestChatContaineBothUser,
  requestMarkChatAsRead,
} from "../../request/requestFunction";
import { SelectedChatUserContext } from "../AppPlugin";
import ChatDisplay from "./ChatDisplay";

function ChatPlugin() {
  const { gSelectedChatUser } = useContext(SelectedChatUserContext);

  const userToken = useContext(UserTokenContext);
  const ws = useContext(WebSocketContext);
  const [userContact, setUserContact] = useState({});
  const [selectedContactUserId, setSelectedContactUserId] = useState(
    gSelectedChatUser._id
  );

  const getChatContainBothUsers = (contactUserId) => {
    requestChatContaineBothUser(userToken, contactUserId).then((res) => {
      let newContactList = userContact;
      newContactList[contactUserId] = res;
      setUserContact({ ...newContactList });
    });
  };

  const markChatAsRead = () => {
    requestMarkChatAsRead(
      userToken,
      userContact[selectedContactUserId]._id,
      selectedContactUserId
    ).then((res) => {
      if (res.success) getChatContainBothUsers(selectedContactUserId);
    });
  };

  useEffect(() => {
    const getUserContact = () => {
      requestUserContact(userToken).then((res) => {
        let newContactList = {};
        for (let contact of res)
          newContactList[contact.contactUser._id] = contact;
        setUserContact({...userContact, ...newContactList});
      });
    };
    getUserContact();
  }, []);

  useEffect(() => {
    if (selectedContactUserId && userContact[selectedContactUserId])
      markChatAsRead(selectedContactUserId);
    else if (selectedContactUserId && !userContact[selectedContactUserId]) {
      let newContactList = userContact;
      newContactList[selectedContactUserId] = {contactUser: gSelectedChatUser, messages: []};
      setUserContact({ ...newContactList });
    }
  }, [selectedContactUserId]);

  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (data) => {
      let json_data = JSON.parse(data.data);
      getChatContainBothUsers(json_data.senderId);
    };
  }, [ws]);

  return (
    <div className="vh-100 w-100 p-3">
      <div className="row bg-white border shadow-sm h-100 w-100 ms-1 more-rounded">
        <div className="col-3 bg-light">
          {Object.values(userContact).map((contact) => {
            if (contact.messages.length === 0) return;

            const contactUser = contact.contactUser;
            const lastMsg = contact.messages[contact.messages.length - 1];
            return (
              <div
                key={contactUser._id}
                className="row px-3 py-2 border-bottom bg-white"
                onClick={() => setSelectedContactUserId(contactUser._id)}
              >
                <div className="col-3">
                  <div
                    className="bg-light border more-rounded-pill"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div className="col">
                  <div className="fw-bold">{contactUser.username}</div>{" "}
                  <div className="row" style={{ color: "grey" }}>
                    <div className="col-10">
                      {contactUser._id === lastMsg.senderId ? "" : "You: "}{" "}
                      {lastMsg.message}
                    </div>
                    <div className="col badge bg-primary more-rounded-pill float-right">
                      {contact.unread || ""}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col border-start p-0 h-100">
          <ChatDisplay
            contact={userContact[selectedContactUserId]}
            getChatContainBothUsers={getChatContainBothUsers}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPlugin;
