import React from 'react';
import Header from './Header';
import Categories from './Categories';

export default class shoppingCart extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Categories />
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}
