import { serverURL } from "../api/backendURL";
import { getUserToken } from "./common";

export const postGroupTask = async ({
  groupId,
  title,
  deadline,
  description,
}) => {
  const userToken = getUserToken();
  if (!userToken || !groupId || !title || !deadline || !description) return;

  return await fetch(`${serverURL}/api/group/task`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      title,
      deadline,
      description,
      groupId,
    }).toString(),
  }).then((res) => res.json());
};

export const postGroupMember = async ({ groupId, memberId }) => {
  const userToken = getUserToken();
  if (!userToken || !groupId || !memberId) return;

  return await fetch(`${serverURL}/api/group/${groupId}/member/${memberId}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

export const postMessage = async ({ receiver, type, message }) => {
  const userToken = getUserToken();
  if (!userToken || !receiver || !type || !message) return;

  return await fetch(`${serverURL}/api/chat`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ receiver, type, message }).toString(),
  }).then((res) => res.json());
};

export const queryChatDataContainBothUsers = async (contactUserId) => {
  const userToken = getUserToken();
  if (!userToken || !contactUserId) return;

  return await fetch(`${serverURL}/api/chat/users`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ contactUserId }).toString(),
  }).then((res) => res.json());
};

export const createGroup = async (groupName, groupDescription = "") => {
  const userToken = getUserToken();
  if (!userToken || !groupName) return;

  return await fetch(`${serverURL}/api/group`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ groupName, groupDescription }).toString(),
  }).then((res) => res.json());
};

export const postMarkChatAsRead = async (chatId, contactUserId) => {
  const userToken = getUserToken();
  if (!userToken || !contactUserId) return;

  return await fetch(`${serverURL}/api/chat/read`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + userToken,
    },
    body: new URLSearchParams({
      chatId,
      contactUserId,
    }).toString(),
  }).then((res) => res.json());
};
