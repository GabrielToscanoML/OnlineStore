import React from 'react';
import PropTypes from 'prop-types';
import '../style/AddToShoppingCart.css';

export default class AddToShoppingCart extends React.Component {
  onTrigger = (title, thumbnail, price, id) => {
    const { handleAddToCart, attQtdCarrinho } = this.props;
    handleAddToCart(title, thumbnail, price, id);
    attQtdCarrinho();
  };

  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <button
        type="button"
        className="add-product-button"
        onClick={ () => this.onTrigger(
          title,
          thumbnail,
          price,
          id,
        ) }
      >
        Adicionar Ao Carrinho
      </button>
    );
  }
}

AddToShoppingCart.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  attQtdCarrinho: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
