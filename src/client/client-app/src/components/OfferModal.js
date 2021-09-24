import { useEffect, useRef, useState } from "react";
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
          {props.init}
          {/* {props.id.charAt(0).toUpperCase() + props.id.slice(1)} */}
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

function DemandFieldSelect(props) {
  return (
      <div className="justify-center items-center mx-auto my-1 w-1/2">
        <label htmlFor={"vehicletype"} className="block text-sm font-medium text-gray-700" id="label">
          {props.labelText}
          <select id="vehicletype" 
              className="block w-full text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" 
              name="Vehicle"
              value={props.forValue ?? ""}
              onChange={props.function}
              required
              >
            <option value="" id="">
                Select an option
            </option>
            {
              props.options.map((vehicle) => (
                <option value={vehicle.id} key={vehicle.id}> 
                  {vehicle.brand + " " + vehicle.model + " " + vehicle.productionYear} 
                </option>
              ))
              //nov = {vehicle.numberOfVehicles}
            }
        </select>
      </label>
    </div>
  )
}

function OfferModal(props) {

  let { user } = useAuth0();

  const priceInput = useRef();
  // const vehicleInput = useRef();
  const numOfVehiclesInput = useRef();
  const noteInput = useRef();
  const [vehicleInput, setVehicleInput] = useState(null);
  const [vehicleData, setVehicleData] = useState([]);

  function formHandler() {
    // console.log(priceInput.current.value);
    console.log(props.demand.id);
    props.onClose();

    const enteredPrice = priceInput.current.value;
    const enteredVehicle = vehicleInput;
    const enteredNoV = numOfVehiclesInput.current.value;
    const enteredNote = noteInput.current.value;
    
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

    if (Number(enteredNoV) < 5) { //vehicle.numberOfVehicles

      fetch(apiLink, offerBody)
      .then((response) => {
        if(!response.ok) console.error("Greska prilikom dodavanja offer-a");
        else {
          console.log("Sve OK: " + response.status);
          alert("Your offer is sent")
        }
      })
    }
    else {
      alert("You don't have that many vehicles");
    }
  }

  useEffect(() => {
    fetch("http://localhost:8005/api/v1/Vehicle/GetVehiclesByCompanyID/" + user.email)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let filteredData = data.filter((vehicle) => {
          return vehicle.typeID == props.demand.vehicleId; 
        });
        console.log(filteredData);
        setVehicleData(filteredData);
      });
  }, []);

  function handleVehicleChange(e) {
    console.log(e.target.value);
    setVehicleInput(e.target.value);
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
              <DemandFieldSelect
                options={vehicleData}
                labelText={"Vehicle"}
                function={handleVehicleChange}
                forValue={vehicleInput}
              > </DemandFieldSelect>
              <DemandField innerRef={numOfVehiclesInput} id="numOfVehicles" init={"Number of vehicles"} type="number"></DemandField>
              <DemandField innerRef={noteInput} id="note" init={"Note"} type="text"></DemandField>

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
