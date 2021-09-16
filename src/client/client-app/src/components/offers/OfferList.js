import Offer from "./Offer";
import OfferForDemand from "./OfferForDemand";
import { useAuth0 } from "@auth0/auth0-react";

function OfferList(props) {

    let { user } = useAuth0();

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
                        return <OfferForDemand key={offerItem.id} offer={offerItem} onAccept={onAcceptOffer} 
                                onDecline={onDeclineOffer} isAccepted={offerItem.isAccepted} isDeclined={offerItem.isDeclined}></OfferForDemand>
                    }
                })}
            </ul>
        </section>
    )
}

export default OfferList;