import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Backdrop from "../components/Backdrop";
import Button from "../components/Icons/Buttons";
import Loader from "../components/Loader";
import VehicleCreate from "../components/vehicles/VehicleCreate";
import VehicleList from "../components/vehicles/VehicleList";
import { checkStatus } from "../helpers";

function EmptyVehiclePage(props) {
  return (
    <section>
      <div className="container py-44">
        <div className="flex justify-center items-center">
          <h2 className="h2-title">You have no vehicles at the moment</h2>
        </div>
        <div className="flex justify-center items-center">
          <Button onClick={props.onOpen} text="Make a new vehicle"></Button>
        </div>
      </div>
    </section>
  );
}

function VehiclePage() {
  let { user } = useAuth0();
  const vehicleEndpoint = "http://localhost:8005/api/v1/Vehicle";
  const [openNewVehicle, setOpenNewVehicle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  function openCreateVehicle() {
    setOpenNewVehicle(true);
  }
  function closeCreateVehicle() {
    setOpenNewVehicle(false);
    setRefreshPage(!refreshPage);
  }

  function onDeleteVehicle(vehicleId) {
    setIsLoading(true);
    fetch(vehicleEndpoint + `/${vehicleId}`, { method: "DELETE" }).then(
      (response) => {
        checkStatus(response);
        setIsLoading(false);
        alert("Your vehicle is deleted");
        setRefreshPage(!refreshPage);
      }
    );
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(vehicleEndpoint + "/GetVehiclesByCompanyID/" + user.email)
      .then((response) => {
        checkStatus(response);
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setVehicleData(data);
      });
  }, [user, refreshPage]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="min-h-screen">
      {vehicleData.length == 0 && (
        <EmptyVehiclePage onOpen={openCreateVehicle}></EmptyVehiclePage>
      )}
      {vehicleData.length > 0 && (
        <div>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-12 mx-auto">
              <VehicleList
                onDelete={onDeleteVehicle}
                vehicles={vehicleData}
              ></VehicleList>
            </div>
          </section>
          <section>
            <div className="flex">
              <div className="mx-auto">
                <Button
                  text="Add a new vehicle"
                  onClick={openCreateVehicle}
                ></Button>
              </div>
            </div>
          </section>
        </div>
      )}

      <div>
        {openNewVehicle && (
          <VehicleCreate onClose={closeCreateVehicle}></VehicleCreate>
        )}
        {openNewVehicle && <Backdrop></Backdrop>}
      </div>
    </div>
  );
}

export default VehiclePage;
