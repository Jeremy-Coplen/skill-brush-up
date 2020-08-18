import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import Home from "./Views/Home/Home"

export default <Switch>
    <Route exact path="/" component={Home} />
    <Route render={() => <Redirect to={{pathname: "/"}} />} />
</Switch>