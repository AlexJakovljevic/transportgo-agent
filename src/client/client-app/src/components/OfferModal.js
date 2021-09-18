import { useRef } from "react";
import Button from "./Icons/Buttons";
import ExitModalIcon from "./Icons/ExitIconModal";
import { useAuth0 } from "@auth0/auth0-react";

function DemandField(props) {
  return (
    <div className="justify-center items-center w-1/2 mx-auto my-1">
      <div>
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {props.id.charAt(0).toUpperCase() + props.id.slice(1)}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            required
            type={props.type}
            ref={props.innerRef}
            name={props.id}
            id={props.id}
            className="focus:ring-indigo-500 border border-gray-300 py-2 px-4 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md"
            placeholder={props.init}
          />
        </div>
      </div>
    </div>
  );
}

function OfferModal(props) {

  let { user } = useAuth0();

  const priceInput = useRef();
  const vehicleInput = useRef();
  const numOfVehiclesInput = useRef();
  const noteInput = useRef();

  function formHandler() {
    // console.log(priceInput.current.value);
    console.log(props.demand.id);
    props.onClose();

    const enteredPrice = priceInput.current.value;
    const enteredVehicle = vehicleInput.current.value;
    const enteredNoV = numOfVehiclesInput.current.value;
    const enteredNote = noteInput.current.value;

    console.log(enteredPrice)
    console.log(enteredVehicle)
    console.log(enteredNoV)
    console.log(enteredNote)
    
    const offerBodyForRequest = {
      id: (user !== undefined ? user.email : "") + "_" + props.demand.id + "_" + enteredVehicle + "_" + enteredNoV + "_" + enteredPrice,
      numOfVehicles: Number(enteredNoV),
      vehicle: enteredVehicle,
      price: Number(enteredPrice),
      note: enteredNote,
      companyID: user !== undefined ? user.email : "",
      demandID: props.demand.id,
      isAccepted: false,
      isDeclined: false
    }

    const offerBody = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offerBodyForRequest)
    };

    let apiLink = 'http://localhost:8008/api/v1/Offer';

    fetch(apiLink, offerBody)
    .then((response) => {
      if(!response.ok) console.error("Greska prilikom dodavanja demand-a");
      else console.log("Sve OK: " + response.status);
    })
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full z-20">
      <div>
        <div
          className="bg-white w-full px-5 mx-auto my-20 border rounded-lg shadow-xl lg:px-0 text-blueGray-500 lg:w-1/2"
          aria-hidden="false"
          aria-describedby="modalDescription"
          role="dialog"
        >
          <div className="flex items-center justify-end px-6 py-4 ">
            <ExitModalIcon onClose={props.onClose}></ExitModalIcon>
          </div>
          <div className="flex flex-col w-full mb-8 text-center">
            <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:w-1/2 sm:text-4xl title-font">
              {" "}
              New offer{" "}
            </h1>
            <form onSubmit={formHandler}>
              <DemandField innerRef={priceInput} id="price" init={"Price"} type="number"></DemandField>
              <DemandField innerRef={vehicleInput} id="vehicle" init={"Vehicle"} type="text"></DemandField>
              <DemandField innerRef={numOfVehiclesInput} id="numOfVehicles" init={"Number of vehicles"} type="number"></DemandField>
              <DemandField innerRef={noteInput} id="note" init={"Vehicle type"} type="text"></DemandField>

              <div className="inline-flex flex-wrap items-center justify-center p-8 space-x-4">
              <Button type="button" onClick={props.onClose} text="Cancel"></Button>
              <Button text="Submit offer"></Button>
            </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
