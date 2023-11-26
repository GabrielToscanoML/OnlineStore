import React from 'react';
import Header from '../Components/Header';
import '../style/shoppingCard.css';

import trashIcon from '../assets/trash-icon.svg';

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
    const newArray = pList.filter((item) => item.value !== target.getAttribute('value'));
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

  // pq isso funciona assim e do outro jeito nao
  increaseItem = (id) => {
    const { pList } = this.state;
    const idUnico = pList.filter((item) => item.id === id);
    const idDiferente = pList.filter((item) => item.id !== id);
    // const findProduct = pList.find((item) => item.id === id);
    // const result = [...pList, findProduct];
    const result = [...idUnico, ...idDiferente, idUnico[0]];
    localStorage.setItem('CartItems', JSON.stringify(result));
    this.setState(({
      pList: result,
    }));
  };

  decreaseItem = (id) => {
    const { pList } = this.state;
    // retiro o primeiro elemento que tiver o mesmo ID
    const products = pList.filter((item) => item.id === id).slice(1);
    // crio um array sem os elementos desse ID
    const newList = pList.filter((item) => item.id !== id);
    // faço a junção dos dois arrays, agora sem um elemento
    const result = [...newList, ...products];
    localStorage.setItem('CartItems', JSON.stringify(result));
    this.setState({
      pList: result,
    });
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
        <main className="main-container">
          <section>
            {
              ((pList.length === 0)
                && (<h1>Seu carrinho está vazio!</h1>)
              )
            }
          </section>
          <section className="items-container">
            {
              finalList.map((element) => (
                <div
                  className="item-card"
                  key={ element.id }
                >
                  <img src={ element.thumbnail } alt="Imagem do produto" />
                  <div className="title-qtd">
                    <h4>{ element.title }</h4>
                    <p className="qtd">
                      Qtd:
                      {' '}
                      {this.quantityCheck(element)}
                    </p>
                  </div>
                  <section className="buttons">
                    <button
                      className="increase-decrease"
                      type="button"
                      onClick={ () => this.decreaseItem(element.id) }
                    >
                      -
                    </button>
                    <button
                      className="remove-item"
                      type="button"
                      onClick={ this.removeItem }
                      id={ element.id }
                    >
                      <img
                        src={ trashIcon }
                        value={ element.id }
                        alt="Icone para remover o item"
                      />
                    </button>
                    <button
                      className="increase-decrease"
                      type="button"
                      onClick={ () => this.increaseItem(element.id) }
                    >
                      +
                    </button>
                  </section>
                </div>
              ))
            }
          </section>
        </main>
      </div>
    );
  }
}
