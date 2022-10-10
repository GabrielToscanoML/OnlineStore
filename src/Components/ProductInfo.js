import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Categories from './Categories';
import { getProductById } from '../services/api';

export default class ProductInfo extends React.Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.requestAPI();
  }

  requestAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({ product: response });
  };

  render() {
    const { product } = this.state;
    const { title, thumbnail, price } = product;
    return (
      <div>
        <Header />
        <Categories />
        <p
          data-testid="product-detail-name"
        >
          { title }
        </p>
        <img
          src={ thumbnail }
          alt={ title }
          data-testid="product-detail-image"
        />
        <p
          data-testid="product-detail-price"
        >
          { price }
        </p>
        <p> descrição do produto </p>
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
