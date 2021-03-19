export const beDate = (date_text) => {
  let date = new Date(date_text);
  let y = date.getUTCFullYear();
  let m = date.getUTCMonth() + 1;
  let d = date.getUTCDate();
  let h = date.getUTCHours();
  let min = date.getUTCMinutes();

  return `${y}-${m.toString().padStart(2, "0")}-${d
    .toString()
    .padStart(2, "0")} ${h
    .toString()
    .padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
};

export const betterTime = (time_text) => {
  let date = new Date(time_text);
  let h = date.getUTCHours();
  let min = date.getUTCMinutes();

  return `${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
};
