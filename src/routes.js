import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import Home from "./Views/Home/Home"
import About from "./Views/About/About"
import AdminLogin from "./Views/AdminLogin/AdminLogin"
import AdminMain from "./Views/AdminMain/AdminMain"
import EditSingleProduct from "./Views/EditSingleProduct/EditSingleProduct"

export default <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/a/login" component={AdminLogin} />
    <Route path="/a/main" component={AdminMain} />
    <Route path="/a/edit/product/:productid" component={EditSingleProduct} />
    <Route render={() => <Redirect to={{pathname: "/"}} />} />
</Switch>