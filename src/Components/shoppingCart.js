import React from 'react';
import Header from './Header';

export default class shoppingCart extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}
