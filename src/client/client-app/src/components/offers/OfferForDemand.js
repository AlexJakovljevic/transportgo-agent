import Button from "../Icons/Buttons";
import { useAuth0 } from "@auth0/auth0-react";

  function OfferDetail(props) {
    return (
      <div className="mx-5">
        <p className="text-l my-2">{props.type}</p>
        <div>
          {" "}
          <p className="text-l my-2">{props.value}</p>
        </div>
      </div>
    );
  }

  function isCompany(user) {
    return user["http://user/type"] === "company";
  }
  
  function OfferForDemand(props) {

    let { user } = useAuth0();

    return (
      <li>
        <div className="container items-center px-5 py-4 mx-auto w-3/4">
          <div className="flex flex-wrap justify-center mb-10 divide-y-2 lg:divide-y-0 lg:divide-x-3">
            <div className="w-full lg:w-2/3">
              <div className="flex flex-wrap h-full rounded-xl lg:p-8 bg-gray-200" 
                   style={{background: props.isAccepted ? 'green' : props.isDeclined ? 'red' : ''}}>
                <OfferDetail
                  type="Vehicle : number"
                  value={props.offer.vehicle + " : " + props.offer.numOfVehicles}
                />
                <OfferDetail 
                    type="Price" 
                    value={props.offer.price} 
                />
                <OfferDetail
                  type="Note"
                  value={props.offer.note}
                />
                {!isCompany(user) && (
                  <div className="flex items-end w-full justify-center lg:justify-end">
                    <Button text={"Accept"} onClick={props.onAccept}></Button>
                  </div>
                )}
                {!isCompany(user) && (
                  <div className="flex items-end w-full justify-center lg:justify-end">
                    <Button text={"Decline"} onClick={props.onDecline} color={"red"}></Button>
                  </div>
                )}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </li>
    );
  }
  
  export default OfferForDemand;