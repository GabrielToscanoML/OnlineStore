import React from 'react';
import Header from '../Components/Header';
import Categories from '../Components/Categories';
import ProductList from '../Components/ProductList';
import { getProductsFromCategoryAndQuery, getProductByQuery } from '../services/api';

import '../style/home.css';

export default class Home extends React.Component {
  state = {
    qtdItemsCarrinho: '',
    products: [],
    isNull: false,
  };

  componentDidMount() {
    this.attQtdCarrinho();
  }

  attQtdCarrinho = () => {
    const length = JSON.parse(localStorage.getItem('CartItems'));
    if (length !== null) {
      this.setState({
        qtdItemsCarrinho: length.length,
      });
    } else {
      this.setState({
        qtdItemsCarrinho: 0,
      });
    }
  };

  getProductsFromCategoryAPI = async (id, name) => {
    this.setState({ isNull: false });
    const response = await (getProductsFromCategoryAndQuery(id, name));
    this.setState({ products: response });
  };

  getProductByQuery = async (query) => {
    this.setState({ isNull: false });
    const response = await (getProductByQuery(query));
    if (response.length === 0) {
      this.setState({ isNull: true });
    }
    this.setState({ products: response });
  };

  render() {
    const { qtdItemsCarrinho, products, isNull } = this.state;
    return (
      <main>
        <Header qtdItemsCarrinho={ qtdItemsCarrinho } />
        <div className="home-container">
          <Categories
            getProductsFromCategoryAPI={ this.getProductsFromCategoryAPI }
          />
          <section className="right-side">
            <ProductList
              productList={ products }
              attQtdCarrinho={ this.attQtdCarrinho }
              getProductByQuery={ this.getProductByQuery }
              isNull={ isNull }
            />
          </section>
        </div>
      </main>
    );
  }
}
