import { useState, useEffect } from "react";
import DemandEdit from "../components/demands/DemandEdit";
import Backdrop from "../components/Backdrop";
import DemandList from "../components/demands/DemandList";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader";

function isCompany(user) {
  console.log(user["http://user/type"]);
  return user["http://user/type"] === "company";
}

function Profile(props) {
  let { user } = useAuth0();

  const [isDemandEditSel, setDemandEditSel] = useState(false);
  const [selectedDemId, setSelectedDemId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [demandList, setDemandList] = useState([]);
  let isUsrCompany = isCompany(user);

  function openEditDemand(demandId) {
    setDemandEditSel(true);
    setSelectedDemId(demandId);
  }

  function closeEditDemand() {
    setDemandEditSel(false);
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
        data.forEach((demand) => formatDemand(demand));
        setDemandList(data);
      });
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="min-h-full">
      {isUsrCompany && (
        <div className="bg-white dark:bg-gray-800">
          <div className="container items-center w-full mx-auto px-5 py-8 sm:px-6 z-20">
            <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
              <span className="block">My offers</span>
            </h2>
          </div>
        </div>
      )}
      {!isUsrCompany && (
        <div>
          <div className="bg-white dark:bg-gray-800">
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
              demand={demandList.find((el) => el.id === selectedDemId)}
            />
          )}
          {isDemandEditSel && <Backdrop />}
        </div>
      )}

      {isDemandEditSel && <Backdrop />}
    </div>
  );
}

export default Profile;
