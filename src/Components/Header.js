import React from 'react';
import { Link } from 'react-router-dom';
import { getProductByQuery } from '../services/api';

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
    return (
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
        <Link
          to="/shoppingCart"
          data-testid="shopping-cart-button"
        >
          <button type="button">Carrinho</button>
        </Link>

        { isNull && <p>Nenhum produto foi encontrado</p> }

        <div>
          <ul>
            {
              productList.map((product, index) => {
                if (index >= 0) {
                  return (
                    <div>
                      <p data-testid="product">{ product.title }</p>
                      {/* <p>{ product.price }</p> */}
                    </div>
                  );
                }
                return null;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
