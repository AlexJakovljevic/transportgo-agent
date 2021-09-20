import { useEffect, useState } from "react";
import DemandList from "../components/demands/DemandList";
import OfferModal from "../components/OfferModal";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader";
import Backdrop from "../components/Backdrop";
import { isCompany, formatDemand } from "../helpers";

function DemandPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDemandSel, setDemandSel] = useState(false);
  const [isDemandWithOffersSelected, setDemandWithOffersSelected] = useState(false);
  const [selectedDemId, setSelectedDemId] = useState(0);
  const [demandList, setDemandList] = useState([]);

  let { user } = useAuth0();

  let isUsrCompany = isCompany(user);

  // Get all demands
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

  function closeDemandWithOffers() {
    setDemandWithOffersSelected(false);
    setSelectedDemId(0);
  }

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="min-h-screen">
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
      {isDemandSel && <Backdrop />}
      {isDemandWithOffersSelected && (
        <OfferModal
          onClose={closeDemandWithOffers}
          demand={demandList.find((el) => el.id === selectedDemId)}
        />
      )}
    </div>
  );
}

export default DemandPage;
