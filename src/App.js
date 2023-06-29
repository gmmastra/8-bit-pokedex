import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Frame } from "./components/Frame";
import { PkmnList } from "./components/PkmnList";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Frame />
        <div className="content">
          <Switch>
            <Route exact path="/8-bit-pokedex/" component={PkmnList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}