import serverURL from "../api/backendURL";
import { getUserToken } from "./common";

export const deleteGroupTask = async ({ groupId, taskId }) => {
  const userToken = getUserToken();
  if (!userToken || !groupId || !taskId) return;

  return await fetch(`${serverURL}/api/group/${groupId}/task/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

export const deleteGroupMember = async ({ groupId, memberId }) => {
  const userToken = getUserToken();
  if (!userToken || !groupId || !memberId) return;
  return await fetch(`${serverURL}/api/group/${groupId}/member/${memberId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};
