import React, { useContext, useEffect, useState } from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import GroupLoading from "../Loading/GroupLoading";
import { GroupContext } from "../Loading/ResourcePreLoad";
import GroupCreateForm from "./GroupCreateForm";

function GroupPage() {
  const groupList = useContext(GroupContext);

  let { url, path } = useRouteMatch();

  const [filteredGroupList, setFilteredGroupList] = useState(groupList);
  const [filterGroupInput, setFilterGroupInput] = useState("");

  const [showGroupCreateForm, setShowGroupCreateForm] = useState(false);

  const filterGroupList = () => {
    let newList = [];
    for (let group of groupList) {
      if (group.groupName.match(new RegExp(filterGroupInput, "gmi")))
        newList.push(group);
    }

    setFilteredGroupList(newList);
  };

  useEffect(() => {
    filterGroupList();
  }, [filterGroupInput, groupList]);

  return (
    <React.Fragment>
      {showGroupCreateForm && (
        <GroupCreateForm showForm={setShowGroupCreateForm} />
      )}
      <div className="row m-0 p-0 h-100">
        <div
          className="col-md-2 p-0 m-0 h-100 shadow-sm border-end d-flex flex-column"
          style={{ minWidth: "195px" }}
        >
          <input
            className="form-control border-0 h-50px"
            onChange={(e) => setFilterGroupInput(e.target.value)}
            placeholder="Search Group"
          />
          <div className="fw-bold d-flex flex-column overflowY">
            <div className="my-2 p-3">Quick Links</div>
            {groupList.map((group) => (
              <Link
                key={group._id}
                to={`${url}/${group._id}`}
                className="px-3 py-1 border-bottom w-100 text-center bg-white"
              >
                {group.groupName}
              </Link>
            ))}
          </div>
          <button
            className="mt-auto btn btn-primary rounded-0 w-100"
            onClick={() => setShowGroupCreateForm(true)}
          >
            Create Group
          </button>
        </div>
        <div className="col-md pt-3 bg-white px-5 shadow-left">
          <Route exact path={path}>
            <h1>Groups</h1>
            <div className="d-flex flex-wrap">
              {filteredGroupList.map((group) => (
                <Link
                  key={group._id}
                  to={`${url}/${group._id}`}
                  className="text-white me-3 mb-3 more-rounded"
                >
                  <div
                    className="btn d-flex flex-column blue-trans-bg blue-text fw-bold "
                    style={{ width: "170px" }}
                  >
                    {" "}
                    <i className="bi bi-folder-fill fs-1"></i>
                    {group.groupName}
                  </div>
                </Link>
              ))}
            </div>
          </Route>
          <Route path={`${path}/:groupId`}>
            <GroupLoading />
          </Route>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GroupPage;
