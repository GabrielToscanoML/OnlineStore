import React from 'react';
import { getCategories } from '../services/api';

export default class categories extends React.Component {
  state = {
    categoriesList: [],
  };

  componentDidMount() {
    this.requestAPI();
  }

  requestAPI = async () => {
    const response = await getCategories();
    this.setState({ categoriesList: response });
  };

  render() {
    const { categoriesList } = this.state;
    return (
      <div>
        <ul>
          {
            categoriesList.map((element, index) => {
              if (index >= 0) {
                return (
                  <li
                    key={ element.id }
                    data-testid="category"
                  >
                    { element.name }
                  </li>
                );
              }
              return null;
            })
          }
        </ul>

      </div>
    );
  }
}
