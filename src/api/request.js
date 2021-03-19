import serverURL from "../api/backendURL";
import { getUserToken } from "./common";

export const requestUserLogin = async (email, password) => {
  if (!email || !password) return;

  return await fetch(`${serverURL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email,
      password,
    }).toString(),
  }).then((res) => res.json());
};

export const requestUserGroupList = async () => {
  const userToken = getUserToken();
  if (!userToken) return;

  return await fetch(`${serverURL}/api/user/groups`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

export const requestUserContactList = async () => {
  const userToken = getUserToken();
  if (!userToken) return;

  return await fetch(`${serverURL}/api/chat`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

export const requestGroupDetail = async (groupId) => {
  const userToken = getUserToken();
  if (!userToken || !groupId) return;

  return await fetch(`${serverURL}/api/group/${groupId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

export const requestGroupMemebrs = async (groupId) => {
  const userToken = getUserToken();
  if (!userToken || !groupId) return;

  return await fetch(`${serverURL}/api/group/${groupId}/members`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

export const requestAllUserBasicInfo = async () => {
  const userToken = getUserToken();
  if (!userToken) return;

  return await fetch(`${serverURL}/api/user/all`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};