import "./App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import DemandPage from "./pages/DemandPage";
import HomePage from "./pages/HomePage";
import NewDemand from "./pages/NewDemand";
import Layout from "./components/Layout";
import Profile from "./pages/MyProfilePage";

function App() {
  return (
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
      </Switch>
    </Layout>
  );
}

export default App;
