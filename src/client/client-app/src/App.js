import "./App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import DemandPage from "./pages/DemandPage";
import HomePage from "./pages/HomePage";
import NewDemand from "./pages/NewDemand";
import Layout from "./components/Layout";

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
      </Switch>
    </Layout>
  );
}

export default App;
