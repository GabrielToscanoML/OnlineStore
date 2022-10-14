import React from 'react';
import Header from './Header';
import Categories from './Categories';

export default class Home extends React.Component {
  state = {
    qtdItemsCarrinho: '',
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
    const { qtdItemsCarrinho } = this.state;
    return (
      <div>
        <Header
          qtdItemsCarrinho={ qtdItemsCarrinho }
        />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories
          handleAddToCart={ this.handleAddToCart }
          attQtdCarrinho={ this.attQtdCarrinho }
        />
      </div>
    );
  }
}
