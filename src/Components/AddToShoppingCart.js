import React from 'react';
import PropTypes from 'prop-types';

export default class AddToShoppingCart extends React.Component {
  onTrigger = (title, thumbnail, price, id) => {
    const { handleAddToCart } = this.props;
    handleAddToCart(title, thumbnail, price, id);
  };

  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <button
        type="button"
        data-testid="product-add-to-cart"
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
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
