import { useEffect, useState } from "react";
import DemandList from "../components/demands/DemandList";
import OfferModal from "../components/OfferModal";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader";

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

function isCompany(user) {
  return user["http://user/type"] === "company";
}

function DemandPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDemandSel, setDemandSel] = useState(false);
  const [isDemandWithOffersSelected, setDemandWithOffersSelected] = useState(false);
  const [selectedDemId, setSelectedDemId] = useState(0);
  const [demandList, setDemandList] = useState([]);

  let { user } = useAuth0();

  let isUsrCompany = isCompany(user);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8001/api/v1/Demand")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        data.forEach((demand) => formatDemand(demand));
        setDemandList(data);
      });
  }, []);

  function openDemand(demandId) {
    setDemandSel(true);
    setSelectedDemId(demandId);
  }

  function closeDemand() {
    setDemandSel(false);
    setSelectedDemId(0);
  }

  function openDemandWithOffers(demandId) {
    setDemandWithOffersSelected(true);
    setSelectedDemId(demandId);
  }

  function closeDemandWithOffers() {
    setDemandWithOffersSelected(false);
    setSelectedDemId(0);
  }

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <DemandList
        buttonText="Make an offer"
        onOpen={openDemand}
        demands={demandList}
        shouldShowButton={isUsrCompany}
      ></DemandList>
      {isDemandSel && (
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
      )}
      {/* {isDemandSel && <Backdrop />} */}
    </div>
  );
}

export default DemandPage;
