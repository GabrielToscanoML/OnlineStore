import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductByQuery } from '../services/api';

export default class categories extends React.Component {
  state = {
    categoriesList: [],
    products: [],
  };

  componentDidMount() {
    this.requestAPI();
  }

  handleClick = async (name) => {
    const response = await getProductByQuery(name);
    this.setState({ products: response });
  };

  requestAPI = async () => {
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
                  <div>
                    <li
                      key={ element.name }
                    >
                      <button
                        type="button"
                        data-testid="category"
                        onClick={ () => this.handleClick(element.name) }
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
              if (index >= 0) {
                return (
                  <div>
                    <li
                      key={ element.id }
                      data-testid="product"
                    >
                      <Link
                        to={ `/ProductInfo/${element.id}` }
                        data-testid="product-detail-link"
                      >
                        Detalhes do produto
                      </Link>
                      <p>{ element.title }</p>
                      <p>{ element.id }</p>
                      <img src={ element.thumbnail } alt={ element.title } />
                      <p>{ element.price }</p>
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
