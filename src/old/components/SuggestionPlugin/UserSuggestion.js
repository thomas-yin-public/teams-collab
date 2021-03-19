import React, { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../../App";
import { requsetUserEmailSuggestion, addGroupMember } from "../../request/requestFunction";

function UserSuggestion({ filterList = [], addGroupMember }) {
  const [suggestionInput, setSuggestionInput] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);

  useEffect(() => {
    requsetUserEmailSuggestion(suggestionInput).then((res) => {
      let resultList = res?.filter((item) => {
        let contain = false;
        for (let list of filterList)
          if (list._id.toString() === item._id.toString()) contain = true;
        if (!contain) return item;
      });
      setSuggestionList(resultList);
    });
  }, [suggestionInput]);

  return (
    <div>
      <input
        className="form-control rounded-pill"
        placeholder="Type the User Email"
        onChange={(e) => setSuggestionInput(e.target.value)}
      ></input>
      <div>
        {suggestionList?.map((user) => (
          <div>
            {user.username} {user.email}
            <button onClick={() => addGroupMember(user._id)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSuggestion;
