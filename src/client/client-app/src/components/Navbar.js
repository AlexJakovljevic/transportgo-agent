import { Link } from "react-router-dom";
import TruckLogo from "./Icons/TruckLogo";

function Navbar() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
           
          <Link to="/"><TruckLogo></TruckLogo></Link>
          <span className="ml-3 text-xl">TransportGo</span>
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="mr-5 hover:text-gray-900">
            Home
          </Link>
          <Link to="/demands" className="mr-5 hover:text-gray-900">
            Demands
          </Link>
          <Link to="/new-demand" className="mr-5 hover:text-gray-900">
            Contact
          </Link>
        </nav>
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Login
        </button>
      </div>
    </header>
  );
}

export default Navbar;
