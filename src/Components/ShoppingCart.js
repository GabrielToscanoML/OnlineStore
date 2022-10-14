import React from 'react';
import Header from './Header';

export default class ShoppingCart extends React.Component {
  state = {
    pList: [],
  };

  componentDidMount() {
    this.getLocalStorageData();
  }

  getLocalStorageData = () => {
    const data = JSON.parse(localStorage.getItem('CartItems') || '[]'); // condição de OU, pois quando abre a pagina pela primeira vez, o padrão é "[]"
    this.setState({
      pList: data,
    });
    this.filterProducts();
  };

  removeItem = ({ target }) => {
    const { pList } = this.state;
    const newArray = pList.filter((item) => item.id !== target.value);
    localStorage.setItem('CartItems', JSON.stringify(newArray));
    this.setState({
      pList: newArray,
    });
  };

  filterProducts = () => {
    const { pList } = this.state;
    const itemsUnicos = new Map();
    pList.forEach((item) => {
      if (!itemsUnicos.has(item.id)) {
        itemsUnicos.set(item.id, item);
      }
    });
    return [...itemsUnicos.values()];
  };

  increaseItem = () => {
    console.log('increase');
  };

  decreaseItem = () => {
    console.log('decrease');
  };

  quantityCheck = (productTarget) => {
    const { pList } = this.state;
    return (
      pList.filter((elemento) => elemento.id
       === productTarget.id).length
    );
  };

  render() {
    const { pList } = this.state;
    const finalList = this.filterProducts();
    return (
      <div>
        <Header />
        {
          ((pList.length === 0)
            && (
              <p
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </p>
            )
          )
        }
        {
          finalList.map((element) => (
            <div key={ element.id }>
              <div>
                <p data-testid="shopping-cart-product-name">{ element.title }</p>
              </div>
              <div data-testid="shopping-cart-product-quantity">
                { this.quantityCheck(element) }
              </div>
              <button
                data-testid="remove-product"
                type="button"
                onClick={ this.removeItem }
                value={ element.id }
                id={ element.id }
              >
                Remover item
              </button>
              <button
                type="button"
                data-testid="product-increase-quantity"
                value={ element.id }
                onClick={ this.increaseItem }
              >
                +
              </button>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ this.decreaseItem }
              >
                -
              </button>
            </div>
          ))
        }
      </div>
    );
  }
}
