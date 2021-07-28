import Demand from "./Demand";

function DemandList(props) {

    return (
        <section>
            <ul>
                {props.demands.map((demandItem) => {
                    const onOpenDemand = () => {
                        props.onOpen(demandItem.id);
                    };
                    return <Demand key={demandItem.id} demand={demandItem} onOpen={onOpenDemand} onClose={props.onClose}></Demand>
                })}
            </ul>

        </section>
    )
}

export default DemandList;