import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getProductById } from '../services/api';
import './ProductInfo.css';
import Form from './Form';

export default class ProductInfo extends React.Component {
  state = {
    product: {},
    frete: {},
    qtdItemsCarrinho: '',
  };

  componentDidMount() {
    this.requestAPI();
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

  addToCart = () => {
    const { product } = this.state;
    const newProduct = {
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      id: product.id,
      value: product.id,
    };
    if (!JSON.parse(localStorage.getItem('CartItems'))) {
      localStorage.setItem('CartItems', JSON.stringify([]));
    }
    const itemsSaved = JSON.parse(localStorage.getItem('CartItems'));
    const newCartItens = [...itemsSaved, newProduct];
    localStorage.setItem('CartItems', JSON.stringify(newCartItens));
    this.attQtdCarrinho();
  };

  requestAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({ product: response, frete: response.shipping });
  };

  render() {
    const { qtdItemsCarrinho, product, frete } = this.state;
    const { title, thumbnail, price } = product;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        <Header
          qtdItemsCarrinho={ qtdItemsCarrinho }
        />
        <div className="ProductInfo">
          <main className="main-content">
            <p
              data-testid="product-detail-name"
            >
              { title }
            </p>
            <img
              src={ thumbnail }
              alt={ title }
              data-testid="product-detail-image"
              width="200px"
            />
            <p
              data-testid="product-detail-price"
            >
              { price }
            </p>
            {(frete.free_shipping)
            && <p data-testid="free-shipping">Frete Gr??tis</p>}
            <p> descri????o do produto </p>
          </main>

          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addToCart }
          >
            Adicionar Ao Carrinho
          </button>

          <h3>Avalia????es</h3>
          <Form
            id={ id }
          />
        </div>
      </div>
    );
  }
}

ProductInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
