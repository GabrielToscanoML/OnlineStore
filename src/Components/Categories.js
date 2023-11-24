import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import '../style/categories.css';

export default class categories extends React.Component {
  state = {
    categoriesList: [],
  };

  componentDidMount() {
    this.requestCategoriesAPI();
  }

  requestCategoriesAPI = async () => {
    const response = await getCategories();
    this.setState({ categoriesList: response });
  };

  render() {
    const { categoriesList } = this.state;
    const { getProductsFromCategoryAPI } = this.props;
    return (
      <ul>
        {
          categoriesList.map((element, index) => {
            if (index >= 0) {
              return (
                <li
                  key={ element.name }
                  className="category"
                >
                  <button
                    type="button"
                    data-testid="category"
                    onClick={ () => getProductsFromCategoryAPI(element.id, element.name) }
                  >
                    {element.name}
                  </button>
                </li>
              );
            }
            return null;
          })
        }
      </ul>
    );
  }
}

categories.propTypes = {
  getProductsFromCategoryAPI: PropTypes.func.isRequired,
};
