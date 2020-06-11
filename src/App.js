import React, {Component} from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import {Redirect, Route, Switch} from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Orders from "./containers/Orders/Orders";
class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/"  exact component={BurgerBuilder}></Route>
                        <Route path="/checkout" component={Checkout}></Route>
                        <Route path="/orders" component={Orders}></Route>

                        <Route component={ErrorPage}/>
                    </Switch>

                </Layout>
            </div>
        );
    }
}

export default App;
