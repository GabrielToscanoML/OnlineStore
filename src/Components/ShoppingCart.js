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

  getLocalStorageData = () => {
    const data = JSON.parse(localStorage.getItem('CartItems') || '[]'); // condição de OU, pois quando abre a pagina pela primeira vez, o padrão é "[]"
    console.log('data', data);
    this.setState({
      pList: data,
    });
  };

  filterProducts = () => {
    const { pList } = this.state;

    const result = pList.filter((item, index) => pList.indexOf(item) === index);

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
              <div>
                <p data-testid="shopping-cart-product-name">{ element.title }</p>
              </div>
              <div data-testid="shopping-cart-product-quantity">
                { this.quantityCheck(element) }
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}
