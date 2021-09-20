import { useEffect, useState } from "react";
import DemandList from "../components/demands/DemandList";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader";
import OfferList from "../components/offers/OfferList";
import React from "react";
import { formatOffer, formatDemand } from "../helpers";
import { useLocation } from "react-router";

function OfferPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [demandItem, setDemandItem] = useState([]);
  const [offerChange, setOfferChange] = useState(false);
  const [offerList, setOfferList] = useState([]);
  // const [selectedOfferId, setSelectedOfferId] = useState(0);

  let { user } = useAuth0();

  const location = useLocation();
  const demandId = location.state.demandId;
  console.log("OP: " + demandId);

  function onAcceptOffer(offerId) {
    //Dohvatamo offer koji je prihvacen
    fetch("http://localhost:8008/api/v1/Offer/" + offerId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        let tmp = formatOffer(data);
        //Postavljamo polje isAccepted na true
        tmp.isAccepted = true;

        const offerBody = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tmp),
        };

        let apiLink = "http://localhost:8008/api/v1/Offer";
        //Saljemo PUT zahtev za promenjen offer
        fetch(apiLink, offerBody).then((response) => {
          if (!response.ok) console.error("Greska prilikom izmene offer-a");
          else console.log("Sve OK: " + response.status);
        });
        //Dohvatamo demand na koji se prihvaceni offer odnosi
        fetch("http://localhost:8001/api/v1/Demand/" + tmp.demandID)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setIsLoading(false);
            let tmp = formatDemand(data);
            //Izdvajamo id-eve svih offer-a iz ovog demanda
            var localOfferIDs = tmp.offerIds;
            let indexOfCurrentOffer = localOfferIDs.indexOf(offerId);
            //Iz niza id-eva brisemo id trenutnog offera
            localOfferIDs.splice(indexOfCurrentOffer, 1);

            tmp.offerIds = [offerId];
            //Pravimo PUT zahtev za demand, postavljamo niz offerId-eva na samo jedan element
            //ID offer-a koji je upravo prihvacen
            const demandBody = {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(tmp),
            };

            let apiLink = "http://localhost:8001/api/v1/Demand";

            fetch(apiLink, demandBody).then((response) => {
              if (!response.ok) {
                console.error("Greska prilikom izmene demand-a");
              } else {
                setOfferChange(!offerChange);
                console.log("Sve OK: " + response.status);
              }
            });

            return localOfferIDs;
          })
          //Saljemo zahtev da se obrisu svi Offer-i koji nisu prihvaceni za trenutni Demand
          .then((data) => {
            data.forEach((localOfferID) => changeOfferDemandID(localOfferID));
          });
      });
  }

  function changeOfferDemandID(offerID) {
    fetch("http://localhost:8008/api/v1/Offer/" + offerID)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        let tmp = formatOffer(data);
        //Postavljamo polje demandID na null
        tmp.demandID = null;

        const offerBody = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tmp),
        };

        let apiLink = "http://localhost:8008/api/v1/Offer";
        //Saljemo PUT zahtev za promenjen offer
        fetch(apiLink, offerBody).then((response) => {
          if (!response.ok) console.error("Greska prilikom izmene offer-a");
          else console.log("Sve OK: " + response.status);
        });
      });
  }

  function onDeclineOffer(offerId) {
    //TODO: refresh page after this
    fetch("http://localhost:8008/api/v1/Offer/" + offerId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        let tmp = formatOffer(data);
        tmp.isDeclined = true;

        const offerBody = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tmp),
        };

        let apiLink = "http://localhost:8008/api/v1/Offer";

        fetch(apiLink, offerBody)
          .then((response) => {
            if (!response.ok) {
              console.error("Greska prilikom izmene offer-a");
            } else {
              setOfferChange(!offerChange);
              console.log("Sve OK: " + response.status);
            }
          })
          .then(() => {
            // update offer
          });
      });
  }

  // Get current demand
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

  // Get offers for current demand
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
  }, [offerChange]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  console.log("di:" + demandItem);

  return (
    <div className="min-h-screen">
      <div>
        <h2 className="h2-title px-10">Demand</h2>
        <DemandList
          buttonText="See all offers"
          onOpen={null}
          demands={[demandItem]}
          shouldShowButton={false}
        ></DemandList>
      </div>
      <div>
        <h2 className="h2-title px-10">Offers</h2>
        <OfferList
          offers={offerList}
          shouldDisplaylink={false}
          onAccept={onAcceptOffer}
          onDecline={onDeclineOffer}
        ></OfferList>
      </div>
    </div>
  );
}

export default OfferPage;
