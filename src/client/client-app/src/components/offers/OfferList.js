import Offer from "./Offer";
import OfferForDemand from "./OfferForDemand";

function OfferList(props) {
    return (
        <section>
            <ul>
                {props.offers.map((offerItem) => {
                    if (props.shouldDisplaylink) {
                        return <Offer key={offerItem.id} offer={offerItem} shouldDisplaylink={props.shouldDisplaylink != undefined ? props.shouldDisplaylink : true}></Offer>
                    }
                    else {
                        const onAcceptOffer = () => {
                            props.onAccept(offerItem.id);
                        };
                        const onDeclineOffer = () => {
                            props.onDecline(offerItem.id);
                        };
                        return <OfferForDemand key={offerItem.id} offer={offerItem} onAccept={onAcceptOffer} onDecline={onDeclineOffer}></OfferForDemand>
                    }
                })}
            </ul>
        </section>
    )
}

export default OfferList;