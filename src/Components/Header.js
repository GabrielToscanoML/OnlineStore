import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '../images/shoppingCart.svg';
import MLIcon from '../images/mercado-livre.svg';
import '../style/header.css';

export default class Header extends React.Component {
  render() {
    const { qtdItemsCarrinho } = this.props;
    return (
      <header className="header">
        <Link
          to="/"
        >
          <img src={ MLIcon } alt="Mercado Livre Icon" width="150px" heigth="150px" />
        </Link>
        <Link
          to="/shoppingCart"
          data-testid="shopping-cart-button"
          className="cart-link"
        >
          <button
            className="cart-button"
            type="button"
          >
            <img
              src={ ShoppingCartIcon }
              alt="Shopping Cart Icon"
              className="cart-icon"
              width="30px"
              heigth="30px"
            />
            <span data-testid="shopping-cart-size">{ qtdItemsCarrinho }</span>
          </button>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  qtdItemsCarrinho: PropTypes.number.isRequired,
};
