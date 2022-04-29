import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { PkmnList } from "./components/PkmnList";

export default function App() {

  return (
    <Router>
      <div className="App">
        {/* navbar */}
        <div className="content">
          <Switch>
            <Route exact path="/" component={PkmnList} />
            <Route exact path="/index" component={PkmnList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}