import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

export default class ProductList extends React.Component {
  state = {
    productList: [],
  };

  componentDidMount() {
    this.requestAPI();
  }

  requestAPI = async () => {
    const { name } = this.props;
    const response = await getProductByQuery(name);
    this.setState({ productList: response });
  };

  render() {
    const { productList } = this.state;
    return (
      <div>
        <Header />
        {
          productList.map((element, index) => {
            if (index >= 0) {
              return (
                <li
                  key={ element.id }
                  data-testid="product"
                >
                  <p>{element.name}</p>
                </li>
              );
            }
            return null;
          })
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  name: PropTypes.string.isRequired,
};
