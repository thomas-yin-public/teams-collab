const requestURL = "http://localhost:8080";
//const requestURL = "https://thomas-personal-web-back-test.herokuapp.com"

const requestUserLogin = async (email, password) => {
  if (!email || !password) return;

  return await fetch(`${requestURL}/api/user/login`, {
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

const requestUserGroups = async (userToken) => {
  if (!userToken) return;

  return await fetch(`${requestURL}/api/user/groups`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

const requestGroup = async (userToken, groupId) => {
  if (!userToken || !groupId) return;
  return await fetch(`${requestURL}/api/group/${groupId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

const requestGroupMemebrs = async (userToken, groupId) => {
  if (!userToken || !groupId) return;
  return await fetch(`${requestURL}/api/group/${groupId}/members`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

const postGroupMember = async (userToken, groupId, memberId) => {
  if (!userToken || !groupId || !memberId) return;
  return await fetch(`${requestURL}/api/group/member`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      groupId,
      memberId,
    }).toString(),
  }).then((res) => res.json());
};

const postGroupTask = async (userToken, groupId, taskInfo) => {
  if (!userToken || !groupId || !taskInfo) return;

  return await fetch(`${requestURL}/api/group/task`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ ...taskInfo, groupId }).toString(),
  }).then((res) => res.json());
};

const requestUserNotification = async (userToken) => {
  if (!userToken) return;
  return await fetch(`${requestURL}/api/user/notification`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

const requestUserContact = async (userToken) => {
  if (!userToken) return;
  return await fetch(`${requestURL}/api/chat`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + userToken,
    },
  }).then((res) => res.json());
};

const postMessage = async ({ userToken, receiver, type, message }) => {
  if (!userToken || !receiver || !type || !message) return;

  return await fetch(`${requestURL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + userToken,
    },
    body: new URLSearchParams({
      receiver,
      type,
      message,
    }).toString(),
  }).then((res) => res.json());
};

const requestMarkChatAsRead = async (userToken, chatId, contactUserId) => {
  if (!userToken || !contactUserId) return;
  return await fetch(`${requestURL}/api/chat/read`, {
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
}

const requestChatContaineBothUser = async (userToken, contactUserId) => {
  if (!userToken || !contactUserId) return;
  return await fetch(`${requestURL}/api/chat/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + userToken,
    },
    body: new URLSearchParams({
      contactUserId,
    }).toString(),
  }).then((res) => res.json());
};

const requsetUserEmailSuggestion = async (search) => {
  if (!search) return;
  return await fetch(`${requestURL}/api/user/?search=${search}`, {
    method: "GET",
  }).then((res) => res.json());
};

module.exports = {
  requestUserLogin,
  requestUserGroups,
  requestGroup,
  requestGroupMemebrs,
  postGroupMember,
  requestUserNotification,
  requestUserContact,
  postMessage,
  requestMarkChatAsRead,
  requestChatContaineBothUser,
  requsetUserEmailSuggestion,
  postGroupTask,
};
