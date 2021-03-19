import React, { useCallback, useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { ChatIdContext, UserIdContext } from "../../App";

function UserTile({ userInfo }) {
  const userId = useContext(UserIdContext);
  const { externChatId, setExternChatId } = useContext(ChatIdContext);
  const [showCard, setShowCard] = useState(false);

  const iconTileRef = useRef(null);
  const popupRef = useRef(null);

  const history = useHistory();

  return (
    <React.Fragment>
      <div
        className="row p-1 w-100 hover-bg pt-cursor"
        ref={iconTileRef}
        onClick={(e) => {
          setShowCard(true);
        }}
      >
        <div
          className="d-flex justify-content-center ms-3 col-1 fw-bold bg-white border"
          style={{ borderRadius: "100vh" }}
        >
          {userInfo.username[0].toUpperCase()}
        </div>
        <div className="col">{userInfo.username}</div>
      </div>
      {showCard && (
        <div
          ref={popupRef}
          onClick={(e) => {
            if (e.target === popupRef.current) setShowCard(false);
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100vw",
            height: "100vh",
          }}
        >
          <div
            className="bg-white more-rounded shadow border p-2"
            style={{
              minWidth: "200px",
              height: "150px",
              position: "absolute",
              left:
                iconTileRef.current.getBoundingClientRect().x - 200 < 0
                  ? iconTileRef.current.getBoundingClientRect().x +
                    iconTileRef.current.getBoundingClientRect().width
                  : iconTileRef.current.getBoundingClientRect().x - 200,
              top:
                iconTileRef.current.getBoundingClientRect().y + 150 >=
                window.innerHeight
                  ? iconTileRef.current.getBoundingClientRect().y - 110
                  : iconTileRef.current.getBoundingClientRect().y,
            }}
          >
            <h5>{userInfo.username}</h5>
            <span>Email: {userInfo.email}</span>
            {userInfo._id !== userId && (
              <React.Fragment>
                <hr></hr>
                <div>
                  <button
                    className="btn-primary btn more-rounded w-100"
                    onClick={() => {
                      setExternChatId({
                        contactUser: userInfo,
                        messages: [],
                      });
                      history.push("/chats");
                    }}
                  >
                    Chat
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default UserTile;
