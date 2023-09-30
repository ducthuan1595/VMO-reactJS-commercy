export const formatTimer = (time, isHour) => {
  const date = new Date(time);

  if (isHour) {
    return `${
      date.getHours() + 1 > 10 ? date.getHours() + 1 : date.getHours() + 1 + "0"
    }:${
      date.getMinutes() > 10 ? date.getMinutes() : date.getMinutes() + "0"
    } - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  } else {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  }
};
