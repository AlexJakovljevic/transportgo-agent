import { useState, useEffect } from "react";

import DemandEdit from "../components/demands/DemandEdit";
import Backdrop from "../components/Backdrop";
import DemandList from "../components/demands/DemandList";

const IsUserCompany = false;

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
  
  const [isLoading, setIsLoading] = useState(true);
  const [demandList, setDemandList] = useState([]);

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

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8001/api/v1/Demand")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        //BUG: Error when there's no demands
        formatDemand(data[0]);
        data.forEach((demand) => formatDemand(demand));
        setDemandList(data);
        console.log(data[0]);
      });
  }, []);

  if (isLoading) {
    console.log("Loading");
    return <div>Loading...</div>;
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
        demands={demandList}
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
