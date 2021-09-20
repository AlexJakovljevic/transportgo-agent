export function getExpirationDate() {
  let today = new Date();
  let year = today.getFullYear().toString();
  let month = today.getMonth() + 1;
  let monthString = (month > 9 ? month : "0" + month).toString();
  let day = today.getDate() + 5;
  let dayString = (day > 9 ? day : "0" + day).toString();

  let hour = today.getHours();
  let hourString = (hour > 9 ? hour : "0" + hour).toString();

  let minutes = today.getMinutes();
  let minutesString = (minutes > 9 ? minutes : "0" + minutes).toString();

  let seconds = today.getSeconds();
  let secondsString = (seconds > 9 ? seconds : "0" + seconds).toString();

  let miliseconds = today.getMilliseconds();
  let milisecondsString = (
    miliseconds > 99
      ? miliseconds
      : miliseconds > 9
      ? "0" + miliseconds
      : "00" + miliseconds
  ).toString();

  let stringDate =
    year +
    "-" +
    monthString +
    "-" +
    dayString +
    "T" +
    hourString +
    ":" +
    minutesString +
    ":" +
    secondsString +
    "." +
    milisecondsString +
    "Z";
  return stringDate;
}

export function isCompany(user) {
  // console.log(user["http://user/type"]);
  return user["http://user/type"] === "company";
}