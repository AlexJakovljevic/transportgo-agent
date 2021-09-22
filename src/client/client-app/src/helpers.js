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

export function getExpDate(expDate) {
  const oneDayInMs = 1000 * 60 * 60 * 24;
  let expDateInMs = Date.parse(expDate);
  let currentMs = Date.now();
  let differenceMs = expDateInMs - currentMs;
  return Math.round(differenceMs / oneDayInMs);
}

export function formatOffer(offerResponse) {
  // offerResponse["vehicle"] = offerResponse.vehicle;
  // offerResponse["numOfVehicles"] = offerResponse.numOfVehicles;
  // offerResponse["price"] = offerResponse.price;
  // offerResponse["note"] = offerResponse.note;
  // offerResponse["companyID"] = offerResponse.companyID;
  // offerResponse["demandID"] = offerResponse.demandID;
  offerResponse["demand"] = offerResponse.demandID;
  return offerResponse;
}

export function formatDemand(demandResponse) {
  demandResponse["from"] = demandResponse.loadingAddress.country;
  demandResponse["to"] = demandResponse.unloadingAddress.country;
  demandResponse["numOfOffers"] =
    demandResponse.offerIds != null ? demandResponse.offerIds.length : 0;
  demandResponse["expDate"] = getExpDate(demandResponse.expirationDate);
  demandResponse["vehicle"] = vehicleTypes[demandResponse.vehicleId] ?? "Unspecified";
  demandResponse["cargo"] = cargoTypes[demandResponse.cargoId] ?? "Unspecified";
  demandResponse["title"] = demandResponse.name;
  // demandResponse["offerIds"] = demandResponse.offerIds;
  // console.log("U demandu: " + vehicleTypes["refrigeratedtruck"]);
  return demandResponse;
}

export const vehicleTypes = {
  "agriculturaltruck": "Agricultural Truck",
  "carcarrier": "Car Carrier",
  "cateringtruck": "Catering Truck Truck",
  "deliveryvan": "Delivery Van",
  "boxtruck": "Box Truck",
  "refrigeratedtruck": "Refrigerated Truck",
  "tanktruck": "Tank Truck",
  "trucktractor": "Truck Tractor"
}


export const cargoTypes = {
  "glass": "Glass",
  "onpalettes": "On Palettes",
  "frozen": "Frozen",
  "fragile": "Fragile"
}
