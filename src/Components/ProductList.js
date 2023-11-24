import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddToShoppingCart from './AddToShoppingCart';

import searchIcon from '../assets/search_icon.svg';
import '../style/productList.css';

export default class ProductList extends React.Component {
  state = {
    inputName: '',
  };

  handleInput = (event) => {
    const { value } = event.target;
    this.setState({ inputName: value });
  };

  handleKeyPress = (event) => {
    const { inputName } = this.state;
    const { getProductByQuery } = this.props;
    if (event.key === 'Enter') {
      getProductByQuery(inputName);
      this.setState({ inputName: '' });
    }
  };

  render() {
    const { inputName } = this.state;
    const { isNull, getProductByQuery, productList } = this.props;
    return (
      <main className="productList-container">
        <section className="search-input-field">
          <h2>Digite algum termo de pesquisa ou escolha uma categoria.</h2>
          <div className="inputs">
            <input
              type="search"
              placeholder="Pesquisar o produto"
              data-testid="query-input"
              className="search-input"
              value={ inputName }
              onChange={ this.handleInput }
              onKeyDown={ this.handleKeyPress }
            />
            <button
              data-testid="query-button"
              type="button"
              className="search-button"
              onClick={ () => getProductByQuery(inputName) }
            >
              <img src={ searchIcon } alt="Search Icon" />
            </button>
            { isNull && <p>Nenhum produto foi encontrado</p> }
          </div>
        </section>
        <section>
          <ul>
            {
              productList?.map((element, index) => {
                const { handleAddToCart, attQtdCarrinho } = this.props;
                const frete = element.shipping.free_shipping;
                if (index >= 0) {
                  return (
                    <div key={ element.id }>
                      <li
                        data-testid="product"
                      >
                        <Link
                          to={ `/ProductInfo/${element.id}` }
                          data-testid="product-detail-link"
                          frete={ frete }
                        >
                          Detalhes do produto
                        </Link>
                        <p>{ element.title }</p>
                        <p>{ element.id }</p>
                        <img src={ element.thumbnail } alt={ element.title } />
                        <p>{ element.price }</p>
                        {frete && <p data-testid="free-shipping">Frete Grátis</p>}
                        <AddToShoppingCart
                          title={ element.title }
                          thumbnail={ element.thumbnail }
                          price={ element.price }
                          id={ element.id }
                          attQtdCarrinho={ attQtdCarrinho }
                          handleAddToCart={ () => handleAddToCart(
                            element.title,
                            element.thumbnail,
                            element.price,
                            element.id,
                          ) }
                        />
                      </li>
                    </div>
                  );
                }
                return null;
              })
            }
          </ul>
        </section>
      </main>
    );
  }
}

ProductList.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  attQtdCarrinho: PropTypes.func.isRequired,
  getProductByQuery: PropTypes.func.isRequired,
  isNull: PropTypes.bool.isRequired,
  productList: PropTypes.any.isRequired, // vou refatorar isso ainda
};
