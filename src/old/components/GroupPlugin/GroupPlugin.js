import React, { useState, useEffect, useContext } from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { UserTokenContext } from "../../App";
import { requestUserGroups } from "../../request/requestFunction";
import GroupCard from "./GroupCard";
import GroupPage from "./GroupPage";

function GroupPlugin() {
  const { path, url } = useRouteMatch();

  const userToken = useContext(UserTokenContext);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const getUserGroupList = () => {
      requestUserGroups(userToken).then((res) => setGroupList(res));
    };

    getUserGroupList();
  }, []);

  return (
    <div className="w-100 vh-100">
      <Route exact path={path}>
        <div className="p-3">
          <h1>My Groups</h1>
          <div className="row">
          {groupList.map((group) => (
            <Link key={group._id} to={`${url}/${group._id}`} className="col-md-3">
              <GroupCard group={group}/>
            </Link>
          ))}
          </div>
        </div>
      </Route>
      <Route path={`${path}/:groupId`}>
        <GroupPage />
      </Route>
    </div>
  );
}

export default GroupPlugin;
