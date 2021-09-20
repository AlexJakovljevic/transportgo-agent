import Button from "../Icons/Buttons";
import LocationIcon from "../Icons/LocationIcon";
import TruckIcon from "../Icons/TruckIcon";
import { isCompany } from "../../helpers";
import { useAuth0 } from "@auth0/auth0-react";

function DemandLocation(props) {
  return (
    <div className="flex items-center justify-center lg:justify-start w-full py-4">
      <LocationIcon></LocationIcon>
      {props.to ? "To" : "From"}:{" "}
      <h3 className="font-semibold px-2">{props.location}</h3>
    </div>
  );
}

function DemandDetail(props) {
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

function Demand(props) {
  //console.log(props.demand);

  let { user } = useAuth0();

  let isUsrCompany = isCompany(user);

  return (
    <li>
      <div className="container items-center px-5 py-4 mx-auto w-3/4">
        <div className="flex flex-wrap justify-center mb-10 divide-y-2 lg:divide-y-0 lg:divide-x-3">
          <div className="w-full lg:w-1/3">
            <div className="lg:p-4 lg:pl-2 bg-white">
              <h1 className="justify-center mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-black lg:text-2xl title-font">
                {props.demand.title || props.demand.id}
              </h1>
              <DemandLocation from location={props.demand.from} />
              <DemandLocation to location={props.demand.to} />
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <div className="flex flex-wrap h-full rounded-xl lg:p-8 bg-gray-200">
              <DemandDetail
                type="Type of vehicle"
                value={props.demand.vehicle}
              />
              {/* <DemandDetail type="Current price" value={props.demand.price} /> */}
              <DemandDetail
                type="Num of offers"
                value={props.demand.numOfOffers}
              />
              <DemandDetail
                type="Expiring in"
                value={
                  props.demand.expDate > 0
                    ? props.demand.expDate + " days"
                    : "Expired"
                }
              />
              <div className="flex items-end w-full justify-center lg:justify-end">
                {props.shouldShowButton &&
                  (props.demand.expDate > 0 || !isUsrCompany) && (
                    <Button
                      text={props.buttonText}
                      onClick={props.onOpen}
                    ></Button>
                  )}
                {props.shouldShowDeleteButton && (
                  <Button
                    text={"Delete"}
                    onClick={props.onDelete}
                    color={"red"}
                  ></Button>
                )}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Demand;
