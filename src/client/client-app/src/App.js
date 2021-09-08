import "./App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import DemandPage from "./pages/DemandPage";
import HomePage from "./pages/HomePage";
import NewDemand from "./pages/NewDemand";
import Layout from "./components/Layout";
import Profile from "./pages/MyProfilePage";
import Contact from "./pages/ContactPage";
import Auth0ProviderWithHistory from "./auth0Provider.js"
import Login from "./components/Login";

function App() {
  return (
    <Auth0ProviderWithHistory>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/demands">
            <DemandPage />
          </Route>
          <Route path="/new-demand">
            <NewDemand />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Layout>
    </Auth0ProviderWithHistory>
  );
}

export default App;
