import React from 'react';
import Header from './Header';
import Categories from './Categories';

export default class Home extends React.Component {
  handleAddToCart = (title, thumbnail, price, id) => {
    const newProduct = {
      title,
      thumbnail,
      price,
      id,
    };
    if (!JSON.parse(localStorage.getItem('CartItems'))) {
      localStorage.setItem('CartItems', JSON.stringify([]));
    }
    const itemsSaved = JSON.parse(localStorage.getItem('CartItems'));
    const newCartItens = [...itemsSaved, newProduct];
    localStorage.setItem('CartItems', JSON.stringify(newCartItens));
  };

  render() {
    return (
      <div>
        <Header />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories
          handleAddToCart={ this.handleAddToCart }
        />
      </div>
    );
  }
}
