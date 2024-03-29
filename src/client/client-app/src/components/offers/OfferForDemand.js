import Button from "../Icons/Buttons";
import { useAuth0 } from "@auth0/auth0-react";
import TruckIcon from "../Icons/TruckIcon";
import { isCompany } from "../../helpers";
import { useEffect, useState } from "react";

function OfferDetail(props) {
  return (
    <div className="mx-5">
      <TruckIcon></TruckIcon>
      <p className="text-l my-2">{props.type}</p>
      <div>
        {" "}
        <p className="text-l my-2">{props.value}</p>
      </div>
    </div>
  );
}

function OfferForDemand(props) {
  let { user } = useAuth0();
  const [vehicle, setVehicle] = useState(null);

  let isUserCompany = isCompany(user);

  useEffect(() => {
    fetch("http://localhost:8005/api/v1/Vehicle/" + props.offer.vehicle)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVehicle(data);
      })
  }, []);

  return (
    <li>
      <div className="container items-center px-5 py-4 mx-auto w-full">
        <div className="flex flex-wrap justify-center mb-10 divide-y-2 lg:divide-y-0 lg:divide-x-4">
          <div className="w-full lg:w-3/4">
            <div
              className="flex flex-wrap h-full rounded-xl justify-between lg:p-8 bg-gray-200"
              style={{
                background: props.isAccepted
                  ? "#A7F3D0"
                  : props.isDeclined
                  ? "#FEE2E2"
                  : "bg-gray-200",
              }}
            >
              <OfferDetail type="For demand:" value={props.offer.demand} />
              <OfferDetail
                type="Vehicle : NoV"
                value={(vehicle ? vehicle.brand + " " + vehicle.model + " " + vehicle.productionYear : "") + " : " + props.offer.numOfVehicles}
              />
              <OfferDetail type="Price" value={props.offer.price} />
              <OfferDetail type="Note" value={props.offer.note} />
              {/* {isUserCompany && ( */}
              <div>
                <OfferDetail
                  type="Status"
                  value={
                    props.isAccepted
                      ? "Accepted"
                      : props.isDeclined
                      ? "Declined"
                      : "Pending"
                  }
                />
              </div>
              {/* )} */}
              {!isUserCompany && !(props.isAccepted || props.isDeclined) && (
                <div className="flex items-center justify-center lg:justify-end">
                  <div className="w-full">
                    <Button text={"Accept"} onClick={props.onAccept}></Button>
                    <Button
                      text={"Decline"}
                      onClick={props.onDecline}
                      color={"red"}
                    ></Button>
                  </div>
                </div>
              )}
              {isUserCompany && !props.isAccepted && (
                <div className="flex items-end w-full justify-center lg:justify-end">
                  <Button
                    text={"Delete"}
                    onClick={props.onDelete}
                    color={"red"}
                  ></Button>
                </div>
              )}
              {isUserCompany && props.isAccepted && (
                <div className="flex items-end w-full justify-center lg:justify-end">
                  <Button
                    text={"Customer info"}
                    onClick={props.onCustomerInfo}
                  ></Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OfferForDemand;
