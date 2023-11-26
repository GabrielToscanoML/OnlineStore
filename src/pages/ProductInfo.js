import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { getProductById } from '../services/api';
import '../style/ProductInfo.css';
import Form from '../Components/Form';
import ProductCard from '../Components/ProductCard';

export default class ProductInfo extends React.Component {
  state = {
    product: {},
    frete: {},
    qtdItemsCarrinho: '',
  };

  componentDidMount() {
    this.requestAPI();
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

  addToCart = () => {
    const { product } = this.state;
    const newProduct = {
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      id: product.id,
      value: product.id,
    };
    if (!JSON.parse(localStorage.getItem('CartItems'))) {
      localStorage.setItem('CartItems', JSON.stringify([]));
    }
    const itemsSaved = JSON.parse(localStorage.getItem('CartItems'));
    const newCartItens = [...itemsSaved, newProduct];
    localStorage.setItem('CartItems', JSON.stringify(newCartItens));
    this.attQtdCarrinho();
  };

  requestAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getProductById(id);
    this.setState({ product: response, frete: response.shipping });
  };

  render() {
    const { qtdItemsCarrinho, product, frete } = this.state;
    const { title, thumbnail, price } = product;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        <Header
          qtdItemsCarrinho={ qtdItemsCarrinho }
        />
        <div className="Product-info">
          <section className="product-description">
            <ProductCard
              title={ title }
              id={ id }
              thumbnail={ thumbnail }
              price={ price }
              handleAddToCart={ this.addToCart }
              attQtdCarrinho={ this.attQtdCarrinho }
              frete={ frete }
            />
            <div>
              <h4>Descrição do produto: </h4>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum error dolore dolores dicta ut. Sequi, dolorem
                nostrum fugiat quae tempore eum odit reprehenderit veniam
                mollitia deleniti aliquam, ducimus magnam expedita!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Natus reiciendis accusamus velit tenetur, labore nihil
                nesciunt magni perferendis harum, eligendi quam facilis,
                mollitia cumque aspernatur magnam suscipit doloremque. Nobis, qui.
              </p>
            </div>
          </section>
          <section className="avaluation-section">
            <h3>Avaliações</h3>
            <Form
              id={ id }
            />
          </section>
        </div>
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
