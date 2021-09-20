import Demand from "./Demand";

function DemandList(props) {
    /**
     * Needed props:
     * onOpen (for each demand)
     * onClose,
     * buttonText
     */
    return (
        <section>
            <ul>
                {props.demands.map((demandItem) => {
                    const onOpenDemand = () => {
                        props.onOpen(demandItem.id);
                    };
                    const onDeleteDemand = () => {
                        props.onDelete(demandItem.id);
                    };
                    return  <Demand key={demandItem.id} 
                                    demand={demandItem} 
                                    buttonText={props.buttonText} 
                                    onOpen={onOpenDemand} 
                                    onClose={props.onClose} 
                                    onDelete={onDeleteDemand}  
                                    shouldShowButton={props.shouldShowButton}
                                    shouldShowDeleteButton={props.shouldShowDeleteButton}>
                            </Demand>
                })}
            </ul>

        </section>
    )
}

export default DemandList;