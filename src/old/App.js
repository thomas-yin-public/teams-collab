import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppPlugin from "./components/AppPlugin";
import LoginPlugin from "./components/LoginPlugin/LoginPlugin";

export const UserTokenContext = createContext("");
export const WebSocketContext = createContext("");

function App() {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");
  const [ws, setWs] = useState();

  useEffect(() => {
    if (!userId) return;

    /* const ws = new WebSocket("wss://thomas-personal-web-back-test.herokuapp.com");

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: "register", userId: userId }));
    }; */

    setWs(ws);
  }, [userId]);

  return (
    <UserTokenContext.Provider value={userToken}>
      <WebSocketContext.Provider value={ws}>
        <Router>
          {userToken === "" ? (
            <LoginPlugin setUserToken={setUserToken} setUserId={setUserId} />
          ) : (
            <AppPlugin />
          )}
        </Router>
      </WebSocketContext.Provider>
    </UserTokenContext.Provider>
  );
}

export default App;
