import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import productList from './Components/productList';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ productList } />
        </Switch>
      </BrowserRouter>
    );
  }
}
