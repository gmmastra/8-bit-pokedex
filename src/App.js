import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { PkmnList } from "./components/PkmnList";

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* navbar */}
        <div className="content">
          <Switch>
            <Route exact path="/8-bit-pokedex/" component={PkmnList} />
            <Route exact path="/8-bit-pokedex/index" component={PkmnList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}