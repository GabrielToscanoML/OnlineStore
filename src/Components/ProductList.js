import React from 'react';
import PropTypes, { shape } from 'prop-types';
import ProductCard from './ProductCard';

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
          </div>
          { isNull && <p>Nenhum produto foi encontrado!</p> }
        </section>
        <section className="products-section">
          {
            productList?.map((element, index) => {
              const { attQtdCarrinho } = this.props;
              const frete = element.shipping.free_shipping;
              if (index >= 0) {
                return (
                  <div
                    key={ element.id }
                  >
                    <ProductCard
                      title={ element.title }
                      id={ element.id }
                      thumbnail={ element.thumbnail }
                      price={ element.price }
                      attQtdCarrinho={ attQtdCarrinho }
                      frete={ frete }
                    />
                  </div>
                );
              }
              return null;
            })
          }
        </section>
      </main>
    );
  }
}

ProductList.propTypes = {
  attQtdCarrinho: PropTypes.func.isRequired,
  getProductByQuery: PropTypes.func.isRequired,
  isNull: PropTypes.bool.isRequired,
  productList: PropTypes.arrayOf(shape({
    title: PropTypes.string,
    id: PropTypes.number,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    handleAddToCart: PropTypes.func,
    attQtdCarrinho: PropTypes.func,
    frete: PropTypes.string,
  })).isRequired,
};
