import React, { useState } from "react";

function ToolBox({ unqiueId, itemList, customDisplay }) {
  const [boxPosition, setBoxPosition] = useState([0, 0]);
  const [displayBox, setDisplayBox] = useState(false);

  return (
    <React.Fragment>
      <div className="ms-auto text-muted">
        <div
          onClick={(e) => {
            setDisplayBox(true);
            setBoxPosition([e.target.offsetLeft, e.target.offsetTop]);
          }}
        >
          {customDisplay || <i className="bi bi-three-dots-vertical"></i>}
        </div>
      </div>

      {displayBox && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          }}
          onClick={(e) =>
            e.target.parentNode.id !== "taskBox" && setDisplayBox(false)
          }
        >
          <ul
            id={unqiueId}
            className="list-group bg-white shadow-sm"
            style={{
              minWidth: "150px",
              position: "absolute",
              top: boxPosition[1],
              right: `calc( 100vw - ${boxPosition[0]}px )`,
            }}
          >
            {itemList.map((item) => (
              <li
                key={item.name}
                className="list-group-item pt-cursor"
                onClick={item.action}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
}

export default ToolBox;
