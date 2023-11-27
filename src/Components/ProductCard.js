import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddToShoppingCart from './AddToShoppingCart';
import '../style/ProductCard.css';

export default class ProductCard extends React.Component {
  handleAddToCart = (title, thumbnail, price, id) => {
    const newProduct = {
      title,
      thumbnail,
      price,
      id,
      value: id,
    };
    if (!JSON.parse(localStorage.getItem('CartItems'))) {
      localStorage.setItem('CartItems', JSON.stringify([]));
    }
    const itemsSaved = JSON.parse(localStorage.getItem('CartItems'));
    const newCartItens = [...itemsSaved, newProduct];
    localStorage.setItem('CartItems', JSON.stringify(newCartItens));
  };

  render() {
    const { title, id, thumbnail, price,
      attQtdCarrinho, frete } = this.props;
    return (
      <li className="product-card">
        <Link
          to={ `/ProductInfo/${id}` }
          frete={ frete }
          className="product-link"
        >
          <img src={ thumbnail } alt={ title } width="150" height="150" />
          <p className="product-title">{ title }</p>
        </Link>
        <section className="bottom-section">
          <h2>
            R$
            {' '}
            { Number.parseFloat(price).toFixed(2) }
          </h2>
          <AddToShoppingCart
            title={ title }
            thumbnail={ thumbnail }
            price={ price }
            id={ id }
            attQtdCarrinho={ attQtdCarrinho }
            handleAddToCart={ () => this.handleAddToCart(
              title,
              thumbnail,
              price,
              id,
            ) }
          />
          {frete && <h3 className="frete-gratis">Frete Grátis</h3>}
        </section>
      </li>
    );
  }
}

ProductCard.propTypes = {
  attQtdCarrinho: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  frete: PropTypes.bool.isRequired,
};
