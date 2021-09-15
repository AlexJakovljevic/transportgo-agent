import { useEffect, useState } from "react";
import Backdrop from "../components/Backdrop";
import DemandList from "../components/demands/DemandList";
import OfferModal from "../components/OfferModal";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader";
import OfferList from "../components/offers/OfferList";
import React from "react";
import { useLocation } from "react-router";
import Demand from "../components/demands/Demand";

function getExpDate(expDate) {
  const oneDayInMs = 1000 * 60 * 60 * 24;
  let expDateInMs = Date.parse(expDate);
  let currentMs = Date.now();
  let differenceMs = expDateInMs - currentMs;
  return Math.round(differenceMs / oneDayInMs);
}

function formatDemand(demandResponse) {
    demandResponse["from"] = demandResponse.loadingAddress.country;
    demandResponse["to"] = demandResponse.unloadingAddress.country;
    demandResponse["numOfOffers"] = demandResponse.offerIds.length;
    demandResponse["expDate"] = getExpDate(demandResponse.expirationDate);
    demandResponse["vehicle"] = demandResponse.vehicleId;
    demandResponse["title"] = demandResponse.name;
    return demandResponse;
}

function formatOffer(offerResponse) {
    offerResponse["vehicle"] = offerResponse.vehicle;
    offerResponse["numOfVehicles"] = offerResponse.numOfVehicles;
    offerResponse["price"] = offerResponse.price;
    offerResponse["note"] = offerResponse.note;
    return offerResponse;
}

function isCompany(user) {
  return user["http://user/type"] === "company";
}

function OfferPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDemandWithOffersSelected, setDemandWithOffersSelected] = useState(false);
  const [demandItem, setDemandItem] = useState([]);
  const [offerList, setOfferList] = useState([]);

  let { user } = useAuth0();

  let isUsrCompany = isCompany(user);

  const location = useLocation();
  const demandId = location.state.demandId
  console.log("OP: " + demandId)

  function onAcceptOffer(offerId) {
    console.log("To A:" + offerId)
  }

  function onDeclineOffer(offerId) {
    console.log("To D:" + offerId)    
  }

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8001/api/v1/Demand/" + demandId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        [data].forEach((demand) => formatDemand(demand));
        setDemandItem(data);
      });
  }, []);

//Offers list
  useEffect(() => {
    setIsLoading(true);
    console.log(user.email);
    fetch("http://localhost:8008/api/v1/Offer/GetOffersByDemandID/" + demandId)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        setIsLoading(false);
        data.forEach((offer) => formatOffer(offer));
        setOfferList(data);
    });
  }, []);


  if (isLoading) {
    return <Loader></Loader>;
  }

  console.log("di:" + demandItem);

  return (
    <div>
        <div>
            Demand:
            <DemandList
                buttonText="See all offers"
                onOpen={null}
                demands={[demandItem]}
                shouldShowButton={false}
          ></DemandList>
        </div>
        <div>
            Offers:
            <OfferList
                offers={offerList}
                shouldDisplaylink = {false}
                onAccept = {onAcceptOffer}
                onDecline = {onDeclineOffer}
            ></OfferList>
        </div>
      {/* {isDemandSel && (
        <OfferModal
          onClose={closeDemand}
          demand={demandList.find((el) => el.id === selectedDemId)}
        />
      )}
      {isDemandWithOffersSelected && (
        <OfferModal
          onClose={closeDemandWithOffers}
          demand={demandList.find((el) => el.id === selectedDemId)}
        />
      )} */}
      {/* {isDemandSel && <Backdrop />} */}
    </div>
  );
}

export default OfferPage;
