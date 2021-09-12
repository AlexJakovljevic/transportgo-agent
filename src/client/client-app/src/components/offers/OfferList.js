import Offer from "./Offer";

function OfferList(props) {
    return (
        <section>
            <ul>
                {props.offers.map((offerItem) => {
                    return <Offer key={offerItem.id} offer={offerItem} ></Offer>
                })}
            </ul>
        </section>
    )
}

export default OfferList;