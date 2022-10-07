import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import shoppingCart from './Components/shoppingCart';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/shoppingCart" component={ shoppingCart } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
