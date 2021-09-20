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
  return (
    <li>
      <div className="container items-center px-5 py-4 mx-auto w-1/2">
        <div className="flex flex-wrap justify-center mb-10 divide-y-2 lg:divide-y-0 lg:divide-x-3">
          <div className="flex flex-wrap h-full rounded-xl lg:p-8 bg-gray-200">
            {props.shouldDisplaylink && (
              <OfferDetail
                type="Demand"
                value={"Link ka demandu"} //props.offer.demand}
              />
            )}
            <OfferDetail
              type="Vehicle : number"
              value={props.offer.vehicle + " : " + props.offer.numOfVehicles}
            />
            <OfferDetail type="Price" value={props.offer.price} />
            <OfferDetail type="Note" value={props.offer.note} />
          </div>
          <div></div>
        </div>
      </div>
    </li>
  );
}

export default Offer;
