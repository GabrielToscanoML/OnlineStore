import React from 'react';
import Header from './Header';
import Categories from './Categories';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categories />
      </div>
    );
  }
}
