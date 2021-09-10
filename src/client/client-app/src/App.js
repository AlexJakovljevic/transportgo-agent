import "./App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import DemandPage from "./pages/DemandPage";
import HomePage from "./pages/HomePage";
import NewDemand from "./pages/NewDemand";
import Layout from "./components/Layout";
import Profile from "./pages/MyProfilePage";
import Contact from "./pages/ContactPage";
import Auth0ProviderWithHistory from "./auth0Provider.js";
import ProtectedRoute from "./components/auth/protectedRoutes.js";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <ProtectedRoute path="/demands" component={DemandPage} />
          <ProtectedRoute path="/new-demand" component={NewDemand} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </Layout>
    </Auth0ProviderWithHistory>
  );
}

export default App;
