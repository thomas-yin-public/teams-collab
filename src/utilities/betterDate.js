const kMonth_list = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const beDate = (date_text) => {
  let date = new Date(date_text);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();

  return `${y}-${m.toString().padStart(2, "0")}-${d
    .toString()
    .padStart(2, "0")} ${h
    .toString()
    .padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
};

export const betterTime = (time_text) => {
  let date = new Date(time_text);
  let h = date.getHours();
  let min = date.getMinutes();

  return `${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
};

export const betterTimeDate = (time_text) => {
  let date = new Date(time_text);
  let h = date.getUTCHours();
  let min = date.getUTCMinutes();
  let m = date.getMonth();
  let d = date.getDate();

  return `${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")} ${kMonth_list[m]} ${d}`;
};
