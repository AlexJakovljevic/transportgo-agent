import OfferForDemand from "./OfferForDemand";

function OfferList(props) {
  return (
    <section>
      <ul>
        {props.offers.map((offerItem) => {
          const onAcceptOffer = () => {
            props.onAccept(offerItem.id);
          };
          const onDeclineOffer = () => {
            props.onDecline(offerItem.id);
          };
          const onDeleteOffer = () => {
            props.onDelete(offerItem.id);
          };
          const onCustomerInfo = () => {
            props.onCustomerInfo(offerItem);
          };
          return (
            <OfferForDemand
              key={offerItem.id}
              offer={offerItem}
              onAccept={onAcceptOffer}
              onDecline={onDeclineOffer}
              onDelete={onDeleteOffer}
              onCustomerInfo={onCustomerInfo}
              isAccepted={offerItem.isAccepted}
              isDeclined={offerItem.isDeclined}
            ></OfferForDemand>
          );
        })}
      </ul>
    </section>
  );
}

export default OfferList;
