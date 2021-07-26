import Demand from "../components/Demand";

const demands = [
    {
        "from": "New York",
        "to": "Los Angeles",
        "price": "100$",
        "vehicle": "Truck",
        "numOfOffers": 5,
        "expirationDate": "2 days"
    },
    {
        "from": "New York",
        "to": "Los Angeles",
        "price": "130$",
        "vehicle": "What",
        "numOfOffers": 5,
        "expirationDate": "2 days"
    },
    {
        "from": "New York",
        "to": "Los Angeles",
        "price": "1090$",
        "vehicle": "Car",
        "numOfOffers": 5,
        "expirationDate": "2 days"
    }
]


function DemandPage() {

    return <div>
        
        <Demand demand={demands[0]}></Demand>
        <Demand demand={demands[1]}></Demand>
        <Demand demand={demands[2]}></Demand>
        <Demand demand={demands[0]}></Demand>
    </div>

}

export default DemandPage;