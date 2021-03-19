import React, { useState, createContext } from "react";
import Login from "./components/Auth/Login";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import GroupPage from "./components/Groups/GroupPage";
import ChatPage from "./components/Chat/ChatPage";
import TaskPage from "./components/Tasks/TaskPage";
import ResourcePreLoad from "./components/Loading/ResourcePreLoad";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import MemoPage from "./components/Memo/MemoPage";

export const UserIdContext = createContext("");
export const ChatIdContext = createContext("");

function App() {
  const [userId, setUserId] = useState("" || localStorage.getItem("userId"));
  const [userToken, setUserToken] = useState(
    "" || localStorage.getItem("token")
  );

  const [externChatId, setExternChatId] = useState(null)
  
  return (
    <UserIdContext.Provider value={userId}>
      <div className="fluid-container max-vh-100">
        <Router>
          <Switch>
            <Route path="/login">
              <Login setUserToken={setUserToken} setUserId={setUserId} />
            </Route>
            <PrivateRoute userToken={userToken}>
              <ResourcePreLoad>
                <ChatIdContext.Provider value={{externChatId, setExternChatId}}>
                <div className="row p-0 m-0 vh-100">
                  <NavigationBar
                    className="col-md-1 h-100 m-0 p-0 bg-white shadow"
                    style={{ width: "100px", zIndex: 999 }}
                  />
                  <div className="col h-100 m-0 p-0 app-bg">
                    <Route path="/groups">
                      <GroupPage />
                    </Route>
                    <Route path="/chats">
                      <ChatPage />
                    </Route>
                    <Route path="/tasks">
                      <TaskPage />
                    </Route>
                    <Route path="/memo">
                      <MemoPage />
                    </Route>
                  </div>
                </div>
                </ChatIdContext.Provider>
              </ResourcePreLoad>
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </UserIdContext.Provider>
  );
}

export default App;
