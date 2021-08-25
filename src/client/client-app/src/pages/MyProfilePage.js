import { useState } from "react";

import DemandEdit from "../components/demands/DemandEdit";
import Backdrop from "../components/Backdrop";
import DemandList from "../components/demands/DemandList";

const Mydemands = [
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

function Profile(props) {
  const [isDemandEditSel, setDemandEditSel] = useState(false);
  const [selectedDemId, setSelectedDemId] = useState(0);

  function openEditDemand(demandId) {
    setDemandEditSel(true);
    setSelectedDemId(demandId);
  }

  function closeEditDemand() {
    setDemandEditSel(false);
    setSelectedDemId(0);
  }

  return (
    <div className="min-h-full">
      <div className="bg-white dark:bg-gray-800">
        <div className="container items-center w-full mx-auto px-5 py-8 sm:px-6 z-20">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">My offers</span>
          </h2>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 ">
        <div className="container items-center w-full mx-auto px-5 py-8 sm:px-6 z-20">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">My demands</span>
          </h2>
        </div>
      </div>
      <DemandList
        buttonText="Edit"
        onOpen={openEditDemand}
        demands={Mydemands}
      ></DemandList>
      {isDemandEditSel && (
        <DemandEdit
          onClose={closeEditDemand}
          demand={Mydemands.find((el) => el.id === selectedDemId)}
        />
      )}
      {isDemandEditSel && <Backdrop />}
    </div>
  );
}

export default Profile;
