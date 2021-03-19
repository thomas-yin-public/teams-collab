import React, { useState } from "react";

import { Link, useLocation, useRouteMatch } from "react-router-dom";
import Logout from "../Auth/Logout";

const pages = [
  {
    name: "Groups",
    icon: <i className="bi bi-collection"></i>,
    link: "/groups",
  },
  {
    name: "Chats",
    icon: <i className="bi bi-chat-right-text"></i>,
    link: "/chats",
  },
  {
    name: "Memo",
    icon: <i className="bi bi-journal-bookmark-fill"></i>,
    link: "/memo",
  },
];

function NavigationBar({ className = "", style = "" }) {
  const [selectedPageLink, setSelectedPageLink] = useState("");
  let location = useLocation();
  return (
    <div
      className={`${className} vh-100 d-flex flex-column justify-content-center  border-end px-2`}
      style={{ ...style }}
    >
      {pages.map((page) => (
        <Link
          to={page.link}
          key={page.link}
          onClick={() => setSelectedPageLink(page.link)}
          className={`fs-5 d-flex flex-column justify-content-center my-1 p-1 ${
            page.link === "/" + location.pathname.split("/")[1]
              ? "selected-tag"
              : "text-muted"
          }`}
        >
          <div className="m-auto text-center fs-4">
            <div>{page.icon}</div>
            <div className="fs-6">{page.name}</div>
          </div>
        </Link>
      ))}
      <div className="pt-cursor text-center fs-4 mt-auto mb-3" onClick={() => Logout()}>
        <div><i className="bi bi-box-arrow-right"></i></div>
        <div className="fs-6">Logout</div>
      </div>
    </div>
  );
}

export default NavigationBar;
