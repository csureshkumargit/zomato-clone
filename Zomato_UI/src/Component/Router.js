import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Filter from "./Filter";
import Details from "./Details";
import Header from "./Header";

class Router extends React.Component {
    render() {
        return (

            <BrowserRouter>
                <Header />
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/filter' component={Filter} />
                <Route exact path='/details' component={Details} />
            </BrowserRouter>
        )
    }
}

export default Router;