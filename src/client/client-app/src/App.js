import "./App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import DemandPage from "./pages/DemandPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import Profile from "./pages/MyProfilePage";
import Contact from "./pages/ContactPage";
import OfferPage from "./pages/OfferPage";
import Auth0ProviderWithHistory from "./auth0Provider.js";
import ProtectedRoute from "./components/auth/protectedRoutes.js";
import VehiclePage from "./pages/VehiclePage";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <ProtectedRoute path="/demands" component={DemandPage} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/offers" component={OfferPage} />
          <ProtectedRoute path="/vehicle" component={VehiclePage} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </Layout>
    </Auth0ProviderWithHistory>
  );
}

export default App;
