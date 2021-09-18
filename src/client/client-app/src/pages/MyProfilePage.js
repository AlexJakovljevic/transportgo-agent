import { useState, useEffect } from "react";
import DemandCreate from "../components/demands/DemandCreate";
import Backdrop from "../components/Backdrop";
import DemandList from "../components/demands/DemandList";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader";
import OfferList from "../components/offers/OfferList";
import OfferForDemandList from "../components/offers/OfferForDemandList";
import { useHistory } from "react-router-dom";
import Button from "../components/Icons/Buttons";

function isCompany(user) {
  // console.log(user["http://user/type"]);
  return user["http://user/type"] === "company";
}

function Profile(props) {
  let { user } = useAuth0();

  const [isDemandCreateSel, setDemandCreateSel] = useState(false);
  const [isDemandWithOffersSelected, setDemandWithOffersSelected] = useState(false);
  const [selectedDemId, setSelectedDemId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [demandList, setDemandList] = useState([]);
  const [offerList, setOfferList] = useState([]);
  let isUsrCompany = isCompany(user);

  function openCreateDemand() {
    setDemandCreateSel(true);
  }

  function closeCreateDemand() {
    setDemandCreateSel(false);
  }

  const history = useHistory();

  function openDemandWithOffers(demandId) {
    history.push({
      pathname: "/offers",
      state: { demandId: demandId },
    });
  }

  function closeDemandWithOffers() {
    setDemandWithOffersSelected(false);
    setSelectedDemId(0);
  }

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
    demandResponse["numOfOffers"] =
      demandResponse.offerIds != null ? demandResponse.offerIds.length : 0;
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

  //Demands list
  useEffect(() => {
    if (!isUsrCompany) {
      setIsLoading(true);
      fetch(
        "http://localhost:8001/api/v1/Demand/GetDemandsByCompanyID/" +
          user.email
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIsLoading(false);
          data.forEach((demand) => formatDemand(demand));
          setDemandList(data);
        });
    }
  }, [isDemandCreateSel]);

  //Offers list
  useEffect(() => {
    if (isUsrCompany) {
      setIsLoading(true);
      console.log(user.email);
      fetch(
        "http://localhost:8008/api/v1/Offer/GetOffersByCompanyID/" + user.email
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIsLoading(false);
          data.forEach((offer) => formatOffer(offer));
          setOfferList(data);
        });
    }
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="min-h-full">
      {/**
       * If the user is a company
       */}
      {isUsrCompany && (
        <div>
          <div className="bg-white dark:bg-gray-800">
            <div className="container items-center w-full mx-auto px-5 py-8 sm:px-6 z-20">
              <h2 className="h2-title">
                <span className="block">My offers</span>
              </h2>
            </div>
          </div>
          <OfferList isForDemand={false} offers={offerList}></OfferList>
        </div>
      )}

      {/**
       * If the user is a regular user
       */}
      {!isUsrCompany && (
        <div>
          <div className="bg-white dark:bg-gray-800">
            <div className="container items-center w-full mx-auto px-5 py-8 sm:px-6 z-20">
              <div className="flex justify-between">
                <h2 className="h2-title">
                  <span className="block">My demands</span>
                </h2>
                <div className="flex justify-end">
                  <Button text="New Demand" onClick={openCreateDemand} />
                </div>
              </div>
              <div>
                {isDemandCreateSel && (
                  <DemandCreate onClose={closeCreateDemand} />
                )}
                {isDemandCreateSel && <Backdrop />}
              </div>
            </div>
          </div>

          {demandList.length === 0 && (
            <div className="container py-44">
              <div className="flex justify-center items-center">
                <h2 className="h2-title">You have no demands at the moment</h2>
              </div>
              <div className="flex justify-center items-center">
                <Button text="Make a new demand " onClick={openCreateDemand} />
              </div>
            </div>
          )}

          {demandList !== 0 && (
            <DemandList
              buttonText="See all offers"
              onOpen={openDemandWithOffers}
              demands={demandList}
              shouldShowButton={true}
            ></DemandList>
          )}

          {isDemandWithOffersSelected && (
            <OfferForDemandList
              onClose={closeDemandWithOffers}
              offers={demandList}
            />
          )}
          {isDemandWithOffersSelected && <Backdrop />}
        </div>
      )}
    </div>
  );
}

export default Profile;
