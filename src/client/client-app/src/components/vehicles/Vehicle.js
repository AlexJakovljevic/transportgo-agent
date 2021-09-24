import Button from "../Icons/Buttons";
import { vehicleTypes } from "../../helpers";

function VehicleItem(props) {
  return (
    <div className="flex border-t border-gray-200 py-2">
      <span className="text-gray-500">{props.type}</span>
      <span className="ml-auto text-gray-900">{props.value}</span>
    </div>
  );
}

function Vehicle(props) {
  let capacityString =
    props.capacity.length +
      " x " +
      props.capacity.width +
      " x " +
      props.capacity.height || "unknown";
  return (
    <div className="lg:w-3/5 mx-auto flex flex-wrap">
      <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">
          Vehicle type : {vehicleTypes[props.type]}
        </h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
          {props.brand + " " + props.model}
        </h1>
        <VehicleItem type="Brand" value={props.brand}></VehicleItem>
        <VehicleItem type="Model" value={props.model}></VehicleItem>
        <VehicleItem
          type="Production year"
          value={props.productionYear}
        />
        <VehicleItem type="Capacity" value={capacityString}></VehicleItem>
        <VehicleItem type="Quantity" value={props.quantity ?? "-"}></VehicleItem>
        <div className="flex">
          <span className="title-font font-medium text-3xl text-gray-900">
            {props.maxWeight + " kg"}
          </span>
          <span className="flex mt-0 ml-auto py-2">
            <Button color="red" onClick={props.onDelete} text="Delete vehicle">Button</Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
