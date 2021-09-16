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
    demandResponse["offerIds"] = demandResponse.offerIds;
    return demandResponse;
}

function formatOffer(offerResponse) {
    offerResponse["vehicle"] = offerResponse.vehicle;
    offerResponse["numOfVehicles"] = offerResponse.numOfVehicles;
    offerResponse["price"] = offerResponse.price;
    offerResponse["note"] = offerResponse.note;
    offerResponse["companyID"] = offerResponse.companyID;
    offerResponse["demandID"] = offerResponse.demandID;
    return offerResponse;
}

function isCompany(user) {
  return user["http://user/type"] === "company";
}

function OfferPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [demandItem, setDemandItem] = useState([]);
  const [offerItem, setOfferItem] = useState(null);
  const [offerList, setOfferList] = useState([]);
  // const [selectedOfferId, setSelectedOfferId] = useState(0);

  let { user } = useAuth0();

  let isUsrCompany = isCompany(user);

  const location = useLocation();
  const demandId = location.state.demandId
  console.log("OP: " + demandId)

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
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tmp)
        };

        let apiLink = 'http://localhost:8008/api/v1/Offer';
        //Saljemo PUT zahtev za promenjen offer
        fetch(apiLink, offerBody)
          .then((response) => {
            if(!response.ok) console.error("Greska prilikom izmene offer-a");
            else console.log("Sve OK: " + response.status);
          })
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
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tmp)
          };
  
          let apiLink = 'http://localhost:8001/api/v1/Demand';
  
          fetch(apiLink, demandBody)
            .then((response) => {
              if(!response.ok) console.error("Greska prilikom izmene demand-a");
              else console.log("Sve OK: " + response.status);
            })

          return localOfferIDs;
          // console.log("Offers: " + localOfferIDs);
          // console.log("Ejected: " + ejected);
        })
        //Saljemo zahtev da se obrisu svi Offer-i koji nisu prihvaceni za trenutni Demand
        .then((data) => {
          data.forEach((localOfferID) => deleteOffer(localOfferID));
        })
      })
  }
  //TODO: Ne radi fja, ne brise offer-e
  function deleteOffer(offerID) {
    fetch("http://localhost:8008/api/v1/Offer/" + offerID, { method: 'DELETE' })
      .then((response) => {
        if(!response.ok) console.error("Greska prilikom izmene offer-a");
        else console.log("Sve OK: " + response.status); 
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
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tmp)
        };

        let apiLink = 'http://localhost:8008/api/v1/Offer';

        fetch(apiLink, offerBody)
          .then((response) => {
            if(!response.ok) console.error("Greska prilikom izmene offer-a");
            else console.log("Sve OK: " + response.status);
          })
      })
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