import React from 'react';
import Header from './Header';
// import Categories from './Categories';

export default class ShoppingCart extends React.Component {
  state = {
    pList: [],
    productListFinal: [],
  };

  componentDidMount() {
    this.getLocalStorageData();
  }

  componentDidUpdate() {
    // console.log('a');
  }

  getLocalStorageData = () => {
    const data = JSON.parse(localStorage.getItem('CartItems') || '[]'); // condição de OU, pois quando abre a pagina pela primeira vez, o padrão é "[]"
    // console.log('data', data);
    this.setState({
      pList: data,
    });
  };

  removeItem = ({ target }) => {
    const { pList } = this.state;
    const newArray = pList.filter((item) => item.id !== target.value);
    localStorage.setItem('CartItems', JSON.stringify(newArray));
    this.setState({
      pList: newArray,
    });
  };

  filterProducts = ({ target }) => {
    const { pList } = this.state;
    const result = pList.filter((item) => item.title !== target.value);
    this.setState({
      productListFinal: result,
    });
    console.log('chamou a funcao');
  };

  quantityCheck = (productTarget) => {
    const { pList } = this.state;
    return (
      pList.filter((elemento) => elemento.id
       === productTarget.id).length
    );
  };

  render() {
    const { pList, productListFinal } = this.state;
    return (
      <div>
        <Header />
        {/* <Categories /> */}
        { this.filterProducts }
        { console.log('lista final', productListFinal) }
        {/* { console.log(productListFromShoppingCart) } */}
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
          pList.map((element) => (
            <div key={ element.id }>
              <button
                data-testid="remove-product"
                type="button"
                onClick={ this.removeItem }
                value={ element.id }
                id={ element.id }
              >
                Remover item
              </button>
              <div>
                <p data-testid="shopping-cart-product-name">{ element.title }</p>
              </div>
              <div data-testid="shopping-cart-product-quantity">
                { this.quantityCheck(element) }
              </div>
              {/* <button>Adicionar Item</button> */}
            </div>
          ))
        }
      </div>
    );
  }
}
