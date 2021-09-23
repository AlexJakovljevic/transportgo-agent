import ExitModalIcon from "../Icons/ExitIconModal";
import { checkStatus, createBody, vehicleTypes } from "../../helpers";
import Button from "../Icons/Buttons";
import { useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function VehicleField(props) {
  return (
    <div className="w-1/4 my-1 mx-2">
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
            className="focus:ring-green-500 border border-gray-300 py-2 px-4 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm rounded-md"
            placeholder={props.init}
          />
        </div>
      </div>
    </div>
  );
}

function VehicleFieldSelect(props) {
  return (
    <div className="w-1/4 my-1 mx-2">
      <label
        htmlFor={"vehicletype"}
        className="block text-sm font-medium text-gray-700"
        id="label"
      >
        {props.labelText}
        <div className="mt-1 relative rounded-md shadow-sm">
          <select
            id="vehicletype"
            className="block w-full text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            name="Vehicle type"
            value={props.forValue ?? ""}
            onChange={props.function}
            required
          >
            <option value="" id="">
              Select an option
            </option>
            {Object.entries(props.options).map(([key, value]) => (
              <option value={key} key={key}>
                {" "}
                {value}{" "}
              </option>
            ))}
          </select>
        </div>
      </label>
    </div>
  );
}

function VehicleCreate(props) {
  let { user } = useAuth0();

  const model = useRef();
  const brand = useRef();
  const productionYear = useRef();
  const capacityLength = useRef();
  const capacityWidth = useRef();
  const capacityHeight = useRef();
  const maxWeight = useRef();
  const [vehicleInput, setVehicleInput] = useState(null);

  function handleVehicleChange(e) {
    setVehicleInput(e.target.value);
  }

  function handleVehicleCreate(e) {
    e.preventDefault();

    const vehicleData = {
      id: user.email + "_" + vehicleInput + "_" + model.current.value,
      brand: brand.current.value,
      model: model.current.value,
      productionYear: parseInt(productionYear.current.value),
      type: 0,
      //   type: vehicleInput ,
      capacity: {
        length: parseFloat(capacityLength.current.value),
        width: parseFloat(capacityWidth.current.value),
        height: parseFloat(capacityHeight.current.value),
      },
      maxWeight: parseFloat(maxWeight.current.value),
      companyID: user.email,
    };

    const vehicleEndpoint = "http://localhost:8005/api/v1/Vehicle";
    const body = createBody("POST", vehicleData);

    fetch(vehicleEndpoint, body)
      .then((response) => {
        checkStatus(response);
        alert("New vehicle succesfully created");
        props.onClose();
      })
      .catch((error) => {
        console.error(error);
      });
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
              New vehicle{" "}
            </h1>
            <form onSubmit={handleVehicleCreate}>
              <div className="flex justify-center">
                <VehicleField
                  innerRef={brand}
                  id="brand"
                  init={"Brand:"}
                  type="text"
                ></VehicleField>
                <VehicleField
                  innerRef={model}
                  id="model"
                  init={"Model"}
                  type="text"
                ></VehicleField>
                <VehicleField
                  innerRef={productionYear}
                  id="Production year"
                  init={"Production year"}
                  type="number"
                ></VehicleField>
              </div>
              <div className="flex justify-center">
                <VehicleField
                  innerRef={capacityLength}
                  id="Capacity lenght"
                  init={"length"}
                  type="number"
                ></VehicleField>
                <VehicleField
                  innerRef={capacityHeight}
                  id="Capacity height"
                  init={"height"}
                  type="number"
                ></VehicleField>
                <VehicleField
                  innerRef={capacityWidth}
                  id="Capacity width"
                  init={"width"}
                  type="number"
                ></VehicleField>
              </div>
              <div className="flex justify-center">
                <VehicleFieldSelect
                  options={vehicleTypes}
                  labelText={"Vehicle type"}
                  function={handleVehicleChange}
                  forValue={vehicleInput}
                >
                  {" "}
                </VehicleFieldSelect>
                <VehicleField
                  innerRef={maxWeight}
                  id="Maximum weight"
                  init={"weight"}
                  type="number"
                ></VehicleField>
              </div>
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

export default VehicleCreate;
