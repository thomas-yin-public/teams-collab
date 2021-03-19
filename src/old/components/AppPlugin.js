import React, { createContext, useState } from "react";
import NavBar from "./NavBar/NavBar";
import { Switch, Route } from "react-router-dom";
import HomePlugin from "./HomePlugin/HomePlugin";
import ChatPlugin from "./ChatPlugin/ChatPlugin";
import GroupPlugin from "./GroupPlugin/GroupPlugin";

export const SelectedChatUserContext = createContext("")

function AppPlugin() {
  const [gSelectedChatUser, setGSelectedChatUser] = useState("")

  return (
    <SelectedChatUserContext.Provider value={{gSelectedChatUser, setGSelectedChatUser}}>
      <div className="container-fluid p-0 m-0">
      <div className="left-sidebar bg-white shadow-sm border vh-100">
        <NavBar />
      </div>
      <div className="main-app bg-light">
        <Switch>
          <Route path="/home">
            <HomePlugin />
          </Route>
          <Route path="/chats">
            <ChatPlugin />
          </Route>
          <Route path="/groups">
            <GroupPlugin />
          </Route>
          <Route path="/tasks"></Route>
        </Switch>
      </div>
    </div>
    </SelectedChatUserContext.Provider>
  );
}

export default AppPlugin;
