import { useState, useEffect } from "react";
import DemandCreate from "../components/demands/DemandCreate";
import Backdrop from "../components/Backdrop";
import DemandList from "../components/demands/DemandList";
import { useAuth0 } from "@auth0/auth0-react";
import { isCompany, formatDemand, formatOffer } from "../helpers";
import Loader from "../components/Loader";
import OfferList from "../components/offers/OfferList";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/Icons/Buttons";
import CustomerInfo from "../components/CustomerInfo";

function Profile(props) {
  let { user } = useAuth0();

  const [isDemandCreateSel, setDemandCreateSel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [demandList, setDemandList] = useState([]);
  const [offerList, setOfferList] = useState([]);
  const [isCustomerInfoSelected, setCustomerInfoSelected] = useState(false);
  const [selectedOfferItem, setSelectedOfferItem] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [updateBoardOnDelete, setUpdateBoard] = useState(false);
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

  // function formatCustomerInfo(customerResponse) {

  // }

  function onDeleteOffer(offerId) {
    setIsLoading(true);
    fetch("http://localhost:8008/api/v1/Offer/" + offerId, {
      method: "DELETE",
    }).then((response) => {
      setIsLoading(false);
      setUpdateBoard(!updateBoardOnDelete);
      alert("Your offer is deleted")
      return response.json();
    });
  }

  function onDeleteDemand(demandId) {
    setIsLoading(true);
    fetch("http://localhost:8001/api/v1/Demand/" + demandId, {
      method: "DELETE",
    }).then((response) => {
      setIsLoading(false);
      setUpdateBoard(!updateBoardOnDelete);
      alert("Your demand is deleted")
      return response.json();
    });
  }

  function onCustomerInfo(offerItem) {
    setSelectedOfferItem(offerItem);
  }

  function closeCustomerInfo() {
    setSelectedOfferItem(null);
    setCustomerInfoSelected(false);
  }

  useEffect(() => {
    if (selectedOfferItem != null) {
      fetch("http://localhost:8001/api/v1/Demand/" + selectedOfferItem.demandID)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          fetch("http://localhost:8002/api/v1/Customer/" + data.customerID)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              setCustomerInfo(data.contact);
            })
            .then(() => {
              setCustomerInfoSelected(true);
            });
        });
    }
  }, [selectedOfferItem]);

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
  }, [isDemandCreateSel, updateBoardOnDelete, user]);

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
  }, [updateBoardOnDelete]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="min-h-screen">
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

              {
                /**
                 * If the company has offers
                 */
                offerList.length !== 0 && (
                  <div>
                    <OfferList
                      isForDemand={false}
                      offers={offerList}
                      onDelete={onDeleteOffer}
                      onCustomerInfo={onCustomerInfo}
                    ></OfferList>
                    <div>
                      {isCustomerInfoSelected && (
                        <CustomerInfo
                          customerInfo={customerInfo}
                          onClose={closeCustomerInfo}
                        />
                      )}
                      {isCustomerInfoSelected && <Backdrop />}
                    </div>
                  </div>
                )
              }

              {
                /**
                 * If the company has NO offers
                 */
                offerList.length === 0 && (
                  <div>
                    <div className="container py-44">
                      <div className="flex justify-center items-center">
                        <h2 className="h2-title">
                          You have no offers at the moment
                        </h2>
                      </div>
                      <div className="flex justify-center items-center">
                        <Link to="/demands">
                          <Button text="Make an offer"></Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}

      {/**
       * If the user is a customer
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

          {
            /**
             * If a customer has no demands
             */
            demandList.length === 0 && (
              <div className="container py-44">
                <div className="flex justify-center items-center">
                  <h2 className="h2-title">
                    You have no demands at the moment
                  </h2>
                </div>
                <div className="flex justify-center items-center">
                  <Button
                    text="Make a new demand "
                    onClick={openCreateDemand}
                  />
                </div>
              </div>
            )
          }

          {
            /**
             * If a customer has demands
             */
            demandList !== 0 && (
              <DemandList
                buttonText="See all offers"
                onOpen={openDemandWithOffers}
                demands={demandList}
                shouldShowButton={true}
                shouldShowDeleteButton={true}
                onDelete={onDeleteDemand}
              ></DemandList>
            )
          }
        </div>
      )}
    </div>
  );
}

export default Profile;
