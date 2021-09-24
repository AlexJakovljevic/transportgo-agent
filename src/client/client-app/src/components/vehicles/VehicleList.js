import Vehicle from "./Vehicle";

function VehicleList(props) {
  return (
    <section>
      <ul>
        {props.vehicles.map((vehicle) => {
          console.log(vehicle);
          let onDeleteVehicle = () => {
            props.onDelete(vehicle.id);
          };
          return (
            <Vehicle
              key={vehicle.id}
              type={vehicle.typeID}
              brand={vehicle.brand}
              model={vehicle.model}
              productionYear={vehicle.productionYear}
              capacity={vehicle.capacity}
              maxWeight={vehicle.maxWeight}
              onDelete={onDeleteVehicle}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default VehicleList;
