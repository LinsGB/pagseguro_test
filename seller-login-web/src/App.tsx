import React from "react";
import { QueryParamsDemo } from "./page/listener";
import { Register } from "./page/register";
import { GenerateSenderHash } from "./page/generateSenderHash";
import { GenerateCardToken } from "./page/getCardToken";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function QueryParamsExample() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Register} />
        <Route path="/listener" component={QueryParamsDemo} />
        <Route path="/hash" component={GenerateSenderHash} />
        <Route path="/card-token" component={GenerateCardToken} />
      </Switch>
    </Router>
  );
}
