import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import ProductInfo from './Components/ProductInfo';
import ShoppingCart from './Components/ShoppingCart';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/shoppingCart" component={ ShoppingCart } />
            <Route
              exact
              path="/productInfo/:id"
              render={ (props) => (<ProductInfo { ...props } id="" />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
