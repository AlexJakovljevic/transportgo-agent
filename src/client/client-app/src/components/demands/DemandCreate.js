import ExitModalIcon from "../Icons/ExitIconModal";
import Button from "../Icons/Buttons";
import { useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getExpirationDate, vehicleTypes, cargoTypes } from "../../helpers";

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

function DemandFieldSelect(props) {
  return (
      <div className="justify-center items-center mx-auto my-1 w-1/2">
        <label htmlFor={"vehicletype"} className="block text-sm font-medium text-gray-700" id="label">
          {props.labelText}
          <select id="vehicletype" 
              className="block w-full text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" 
              name="animals"
              value={props.forValue ?? ""}
              onChange={props.function}
              required
              >
            <option value="" id="">
                Select an option
            </option>
            {
              Object.entries(props.options).map(([key, value]) => (
                <option value={key} key={key}> {value} </option>
              ))
            }
        </select>
      </label>
    </div>
  )
}

function DemandCreate(props) {
  let { user } = useAuth0();

  const titleInput = useRef();
  const fromInput = useRef();
  const toInput = useRef();
  const [vehicleInput, setVehicleInput] = useState(null);
  const [cargoInput, setCargoInput] = useState(null);

  function formHandler(event) {
    event.preventDefault();
    const apiLink = "http://localhost:8001/api/v1/Demand";
    const enteredTitle = titleInput.current.value;
    const enteredFrom = fromInput.current.value;
    const enteredTo = toInput.current.value;
    // const enteredVehicle = vehicleInput.current.value;
    // const enteredCargo = cargoInput.current.value;
    const stringDate = getExpirationDate();

    console.log(cargoInput);
    console.log(vehicleInput);

    const demandBodyForRequest = {
      id: enteredTitle,
      expirationDate: stringDate.toString(),
      cargoId: cargoInput,
      vehicleId: vehicleInput,
      numOfOffers: 0,
      loadingAddress: {
        country: enteredFrom,
        state: "",
        city: "",
        zip: 0,
        streetLine1: "",
        streetLine2: "",
      },
      unloadingAddress: {
        country: enteredTo,
        state: "",
        city: "",
        zip: 1,
        streetLine1: "",
        streetLine2: "",
      },
      offerIds: [],
      customerID: user !== undefined ? user.email : "",
    };

    const demandBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(demandBodyForRequest),
    };

    fetch(apiLink, demandBody)
      .then((response) => {
        if (!response.ok) {
          console.error("Error while proccessing new demand");
        } else {
          console.log("Successful demand creation" + response.status);
        }
      })
      .then(() => {
        props.onClose();
        alert("New demand is created");
      });
  }

  function handleVehicleChange(e) {
    console.log(e.target.value);
    setVehicleInput(e.target.value);
  }

  function handleCargoChange(e) {
    console.log(e.target.value);
    setCargoInput(e.target.value);
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
              New demand{" "}
            </h1>
            <form onSubmit={formHandler}>
              <DemandField
                innerRef={titleInput}
                id="title"
                init={"Title"}
                type="text"
              ></DemandField>
              <DemandField
                innerRef={fromInput}
                id="from"
                init={"From"}
                type="text"
              ></DemandField>
              <DemandField
                innerRef={toInput}
                id="to"
                init={"To"}
                type="text"
              ></DemandField>
              
              <DemandFieldSelect
                options={vehicleTypes}
                labelText={"Vehicle type"}
                function={handleVehicleChange}
                forValue={vehicleInput}
              > </DemandFieldSelect>             
              <DemandFieldSelect
                options={cargoTypes}
                labelText={"Cargo type"}
                function={handleCargoChange}
                forValue={cargoInput}
              > </DemandFieldSelect>

              <div className="inline-flex flex-wrap items-center justify-center p-8 space-x-4">
                <Button
                  type="button"
                  onClick={props.onClose}
                  text="Cancel"
                ></Button>
                <Button text="Submit demand"></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemandCreate;
