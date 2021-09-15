 
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
  
  function Offer(props) {
    // console.log(props.demand);
    return (
      <li>
        <div className="container items-center px-5 py-4 mx-auto w-3/4">
          <div className="flex flex-wrap justify-center mb-10 divide-y-2 lg:divide-y-0 lg:divide-x-3">
            {/* <div className="w-full lg:w-1/3">
              <div className="lg:p-4 lg:pl-2 bg-white">
                <h1 className="justify-center mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-black lg:text-2xl title-font">
                  {props.offer.title}
                </h1>
                </div>
            </div> */}
            <div className="w-full lg:w-2/3">
              <div className="flex flex-wrap h-full rounded-xl lg:p-8 bg-gray-200">
                {props.shouldDisplaylink && (
                  <OfferDetail
                    type="Demand"
                    value={"Link ka demandu"}//props.offer.demand}
                  />
                )}
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
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </li>
    );
  }
  
  export default Offer;