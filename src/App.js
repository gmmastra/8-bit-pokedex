import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
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
            <Route exact path="/" component={Home} />
            <Route exact path="/index" component={PkmnList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}