import { useRef } from "react";
import Button from "./Icons/Buttons";
import ExitModalIcon from "./Icons/ExitIconModal";

function OfferModal(props) {
  const newPrice = useRef();

  function onSubmitPrice() {
    console.log(newPrice.current.value);
    console.log(props.demand.id);
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
            <h2 className="mb-8 text-xs font-semibold tracking-widest text-black uppercase title-font">
              Submit your offer{" "}
            </h2>
            <h1 className="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:w-1/2 sm:text-4xl title-font">
              {" "}
              {props.demand.title}.{" "}
            </h1>
            <div className="justify-center items-center w-1/2 mx-auto">
              <div>
                <label
                  htmlFor="oldprice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    disabled
                    value={props.demand.price}
                    type="text"
                    name="oldprice"
                    id="oldprice"
                    className="focus:ring-indigo-500 border border-gray-300 py-2 px-4 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            <div className="justify-center items-center w-1/2 mx-auto my-10">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current price
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    ref={newPrice}
                    name="price"
                    id="price"
                    className="focus:ring-indigo-500 border border-gray-300 py-2 px-4 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <div className="inline-flex flex-wrap items-center justify-center p-8 space-x-4">
              <Button onClick={props.onClose} text="Cancel"></Button>
              <Button onClick={onSubmitPrice} text="Submit offer"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
