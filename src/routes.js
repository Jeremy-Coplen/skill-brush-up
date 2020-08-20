import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import Home from "./Views/Home/Home"
import About from "./Views/About/About"

export default <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route render={() => <Redirect to={{pathname: "/"}} />} />
</Switch>