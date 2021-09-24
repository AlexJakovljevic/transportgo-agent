import { useEffect, useState } from "react";
import DemandList from "../components/demands/DemandList";
import searchDemandImg from "../assets/searchDemands.jpeg";
import OfferModal from "../components/OfferModal";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader";
import Backdrop from "../components/Backdrop";
import { isCompany, formatDemand } from "../helpers";

function DemandPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDemandSel, setDemandSel] = useState(false);
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

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="min-h-screen">
      {demandList.length == 0 && (
        <div className="container py-20">
          <div className="flex justify-center items-center">
            <h2 className="h2-title">
              Looks like we couldn't find any demands{" "}
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center p-20">
            <div className="px-4">
              <img
                src={searchDemandImg}
                alt="..."
                className="shadow rounded-full max-w-full h-auto align-middle border-none"
              />
            </div>
          </div>
        </div>
      )}

      {demandList.length > 0 && (
        <DemandList
          buttonText="Make an offer"
          onOpen={openDemand}
          demands={demandList}
          shouldShowButton={isUsrCompany}
        ></DemandList>
      )}

      {isDemandSel && (
        <OfferModal
          onClose={closeDemand}
          demand={demandList.find((el) => el.id === selectedDemId)}
        />
      )}
      {isDemandSel && <Backdrop />}
    </div>
  );
}

export default DemandPage;
