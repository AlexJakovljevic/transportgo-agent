import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import people from "../assets/people.jpg";
import truckPicture1 from "../assets/truck1.jpg";
import truckPicture3 from "../assets/truck3.jpg";
import Loader from "../components/Loader";
import { isCompany } from "../helpers";

function HomePage() {
  let { user, isLoading } = useAuth0();

  if (isLoading) {
    <Loader></Loader>;
  }

  function formatUser(userResponse) {
    userResponse["id"] = userResponse.contact.email;
    userResponse["firstName"] = "";
    userResponse["lastName"] = "";
    return userResponse;
  }

  const customerBodyForRequest = {
    id: user != undefined ? user.email : "",
    firstName: "",
    lastName: "",
    address: {
      country: "",
      state: "",
      city: "",
      zip: "",
      streetLine1: "",
      streetLine2: "",
    },
    contact: {
      phone: "",
      fax: "",
      email: user != undefined ? user.email : "",
    },
  };

  const customerBody = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customerBodyForRequest),
  };

  const companyBodyForRequest = {
    id: user != undefined ? user.email : "",
    name: "",
    address: {
      country: "",
      state: "",
      city: "",
      zip: "",
      streetLine1: "",
      streetLine2: "",
    },
    category: 0,
    contact: {
      phone: "",
      fax: "",
      email: user != undefined ? user.email : "",
    },
    cargos: [],
  };

  const companyBody = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(companyBodyForRequest),
  };

  if (user != undefined && !isCompany(user)) {
    let apiLink = "http://localhost:8002/api/v1/Customer/" + user.email;
    console.log(apiLink);
    fetch(apiLink)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else console.log("Sve OK: " + response.status);
      })
      .catch((error) => {
        console.error("User ne postoji u bazi");
        console.error("Pravimo user-a: " + customerBody);
        fetch("http://localhost:8002/api/v1/Customer/", customerBody);
      });
  }

  if (user != undefined && isCompany(user)) {
    let apiLink = "http://localhost:8003/api/v1/Company/" + user.email;
    console.log(apiLink);
    fetch(apiLink)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else console.log("Sve OK: " + response.status);
      })
      .catch((error) => {
        console.error("User ne postoji u bazi");
        console.error("Pravimo user-a: " + companyBody);
        fetch("http://localhost:8003/api/v1/Company/", companyBody);
      });
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  const firstText =
    "We strive to connect the best with the best and create a unique platform that helps you deliver fast and make deliveries even faster with the help of our team.";

  const loremIpusm =
    "Ted volutpat tortor eget urna congue bibendum. Integer eget urna risus. Etiam ut quam magna. In dictum ante ut dapibus tincidunt. Nulla pharetra porta ante, quis gravida orci dictum eu. Proin placerat, metus imperdiet porta pulvinar, eros libero mollis nisi, nec sollicitudin eros arcu et urna.";

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 my-12 mx-auto">
        <div className="flex flex-col">
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="w-24 h-full bg-green-500"></div>
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
              TransportGo - cargo transport of the future
            </h1>
            <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
              {firstText}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={people}
              />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Make demands fast and easy
            </h2>
            <p className="text-base leading-relaxed mt-2">{loremIpusm}</p>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={truckPicture3}
              />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Get the best price
            </h2>
            <p className="text-base leading-relaxed mt-2">{loremIpusm}</p>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={truckPicture1}
              ></img>
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Offer the best deal
            </h2>
            <p className="text-base leading-relaxed mt-2">{loremIpusm}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
