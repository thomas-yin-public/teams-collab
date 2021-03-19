import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <div className="my-4">
        <Link to="/home">
          <button className="btn">
            <i class="bi bi-house-fill"></i>
          </button>
        </Link>
      </div>
      <div className="my-4">
        <Link to="/chats">
          <button className="btn">
            <i class="bi bi-chat-left-text-fill"></i>
          </button>
        </Link>
      </div>
      <div className="my-4">
        <Link to="/groups">
          <button className="btn">
            <i class="bi bi-briefcase-fill"></i>
          </button>
        </Link>
      </div>
      <div className="my-4">
        <Link to="/tasks">
          <button className="btn">
            <i class="bi bi-list-task"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
