import OfferForDemand from "./OfferForDemand";

function OfferForDemandList(props) {
    return (
        <section>
            <ul>
                {props.offers.map((offerItem) => {
                    return <OfferForDemand key={offerItem.id} offer={offerItem} ></OfferForDemand>
                })}
            </ul>
        </section>
    )
}

export default OfferForDemandList;