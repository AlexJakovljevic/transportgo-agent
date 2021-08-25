import ExitModalIcon from "../Icons/ExitIconModal";
import Button from "../Icons/Buttons";
import { useRef } from "react";

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

function DemandEdit(props) {


  const titleInput = useRef();
  const fromInput = useRef();
  const toInput = useRef();
  const vehicleInput = useRef();
  const priceInput = useRef();


  function formHandler(event) {
    event.preventDefault();
    const enteredTitle = titleInput.current.value;
    console.log(enteredTitle);
    props.onClose();
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
              Edit demand.{" "}
            </h1>
            <form onSubmit={formHandler}>
              <DemandField innerRef={titleInput} id="title" init={props.demand.title} type="text"></DemandField>
              <DemandField innerRef={fromInput} id="from" init={props.demand.from} type="text"></DemandField>
              <DemandField innerRef={toInput} id="to" init={props.demand.to} type="text"></DemandField>
              <DemandField innerRef={vehicleInput} id="vehicle" init={props.demand.vehicle} type="text"></DemandField>
              <DemandField innerRef={priceInput} id="price" init={props.demand.price} type="number"></DemandField>

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

export default DemandEdit;
