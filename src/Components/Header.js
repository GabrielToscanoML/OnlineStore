import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductByQuery } from '../services/api';
import ShoppingCartIcon from '../images/shoppingCart.svg';
import MLIcon from '../images/mercado-livre.svg';
import '../style/header.css';

export default class Header extends React.Component {
  state = {
    inputName: '',
    productList: [],
    isNull: true,
  };

  handleInput = (event) => {
    const { value } = event.target;
    this.setState({ inputName: value });
  };

  requestAPI = async () => {
    const { inputName } = this.state;
    const response = await getProductByQuery(inputName);
    if (response.length === 0) {
      this.setState({ isNull: false });
    }
    this.setState({ productList: response });
  };

  render() {
    const { inputName, productList, isNull } = this.state;
    const { qtdItemsCarrinho } = this.props;
    return (
      <div>
        <header className="header">
          <img src={ MLIcon } alt="Mercado Livre Icon" width="150px" heigth="150px" />
          <Link
            to="/shoppingCart"
            data-testid="shopping-cart-button"
            className="cart-button"
          >
            <button type="button">
              <img
                src={ ShoppingCartIcon }
                alt="Shopping Cart Icon"
                className="cart-icon"
                width="30px"
                heigth="30px"
              />
            </button>
            <span data-testid="shopping-cart-size">{ qtdItemsCarrinho }</span>
          </Link>
        </header>
        <div>
          <input
            placeholder="Pesquisar"
            data-testid="query-input"
            value={ inputName }
            onChange={ this.handleInput }
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.requestAPI }
          >
            Pesquisar
          </button>

          { isNull && <p>Nenhum produto foi encontrado</p> }

          <div>
            <ul>
              {
                productList.map((product, index) => {
                  if (index >= 0) {
                    return (
                      <div>
                        <p data-testid="product">{ product.title }</p>
                      </div>
                    );
                  }
                  return null;
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  qtdItemsCarrinho: PropTypes.string.isRequired,
};
