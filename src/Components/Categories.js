import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import AddToShoppingCart from './AddToShoppingCart';

export default class categories extends React.Component {
  state = {
    categoriesList: [],
    products: [],
  };

  componentDidMount() {
    this.requestCategoriesAPI();
  }

  handleClick = async (id, name) => {
    const response = await (getProductsFromCategoryAndQuery(id, name));
    this.setState({ products: response });
  };

  requestCategoriesAPI = async () => {
    const response = await getCategories();
    this.setState({ categoriesList: response });
  };

  render() {
    const { categoriesList, products } = this.state;
    return (
      <div>
        {/* lista de categorias */}
        <ul>
          {
            categoriesList.map((element, index) => {
              if (index >= 0) {
                return (
                  <div key={ element.name }>
                    <li>
                      <button
                        type="button"
                        data-testid="category"
                        onClick={ () => this.handleClick(element.id, element.name) }
                      >
                        {element.name}
                      </button>
                    </li>
                  </div>
                );
              }
              return null;
            })
          }
        </ul>
        {/* lista de produtos */}
        <ul>
          {
            products.map((element, index) => {
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
      </div>
    );
  }
}

categories.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  attQtdCarrinho: PropTypes.func.isRequired,
};
