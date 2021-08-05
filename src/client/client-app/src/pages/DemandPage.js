import { useState } from "react";
import Backdrop from "../components/Backdrop";
import DemandList from "../components/demands/DemandList";
import OfferModal from "../components/OfferModal";

const demands = [
  {
    id: 10,
    title: "Transport fruit from America",
    from: "New York",
    to: "Stolholm",
    price: "100$",
    vehicle: "Truck",
    numOfOffers: 5,
    expirationDate: "2 days",
  },
  {
    id: 11,
    title: "Transport meat from Spain",
    from: "Ibiza",
    to: "Los Angeles",
    price: "130$",
    vehicle: "What",
    numOfOffers: 5,
    expirationDate: "2 days",
  },
  {
    id: 21,
    title: "Transport car from Germany",
    from: "Berlin",
    to: "Space",
    price: "1090$",
    vehicle: "Car",
    numOfOffers: 5,
    expirationDate: "2 days",
  },
];

function DemandPage() {
  const [isDemandSel, setDemandSel] = useState(false);
  const [selectedDemId, setSelectedDemId] = useState(0);

  function openDemand(demandId) {
      setDemandSel(true);
      setSelectedDemId(demandId);
  }

  function closeDemand() {
      setDemandSel(false);
      setSelectedDemId(0);
  }
  
  return (
    <div>
      <DemandList onOpen={openDemand} onClose={closeDemand} demands={demands}></DemandList>
      {isDemandSel && <OfferModal onClose={closeDemand} demand={demands.find(el => el.id === selectedDemId)}/>}
      {isDemandSel && <Backdrop  />}
    </div>
  );
}

export default DemandPage;