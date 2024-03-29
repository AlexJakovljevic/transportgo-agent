import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { isCompany } from "../helpers";
import TruckLogo from "./Icons/TruckLogo";
import LoginButton from "./LoginButton";

function Navbar() {
  let { user, isLoading } = useAuth0();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <Link to="/">
            <TruckLogo></TruckLogo>
          </Link>
          <span className="ml-3 text-xl">TransportGo</span>
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">
            Home
          </Link>
          {!isLoading && user && (
            <Link to="/demands" className="mr-5 hover:text-gray-900">
              Demands
            </Link>
          )}

          {!isLoading && user && isCompany(user) && (
            <Link to="/vehicle" className="mr-5 hover:text-gray-900">
              Vehicles
            </Link>
          )}

          {!isLoading && user && (
            <Link to="/profile" className="mr-5 hover:text-gray-900">
              My profile
            </Link>
          )}

          <Link to="/contact" className="mr-5 hover:text-gray-900">
            Contact
          </Link>
        </nav>
        <LoginButton></LoginButton>
      </div>
    </header>
  );
}

export default Navbar;
