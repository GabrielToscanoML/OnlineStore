import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <Link
          to="/shoppingCart"
          data-testid="shopping-cart-button"
        >
          <button type="button">Carrinho</button>
        </Link>
      </div>
    );
  }
}
