import React from 'react';
import PropTypes from 'prop-types';
import '../style/form.css';

export default class Form extends React.Component {
  state = {
    isFormValid: true,
    selectedOption: '',
    userEmail: '',
    userComment: '',
    avaliationList: [],
  };

  componentDidMount() {
    this.getLocalStorageData();
  }

  handleTextAreaOnChange = (event) => {
    const { value } = event.target;
    this.setState({ userComment: value });
  };

  validateEmail = () => {
    const { userEmail } = this.state;
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let result;
    if (userEmail.match(mailformat)) {
      result = true;
    } else {
      result = false;
    }
    return result;
  };

  handleEmailInput = (event) => {
    const { value } = event.target;
    this.setState({ userEmail: value });
  };

  validateInputRadio = () => {
    const { selectedOption } = this.state;
    if (selectedOption !== '') {
      return true;
    }
  };

  onValueChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  clearInputs = () => {
    this.setState({
      selectedOption: '',
      userEmail: '',
      userComment: '',
      isFormValid: true,
    });
  };

  saveAvaliationList = () => {
    const { id } = this.props;
    const { userComment, selectedOption, userEmail, avaliationList } = this.state;
    if (this.validateInputRadio()
     && this.validateEmail()) {
      const newAvaliation = {
        email: userEmail,
        text: userComment,
        rating: selectedOption };
      const obj = [...avaliationList, newAvaliation];
      this.setState(() => ({
        avaliationList: obj,
      }));
      localStorage.setItem(id, JSON.stringify(obj));
      this.clearInputs();
    } else {
      this.setState({ isFormValid: false });
    }
  };

  getLocalStorageData = () => {
    const { id } = this.props;
    const data = JSON.parse(localStorage.getItem(id) || '[]'); // condição de OU, pois quando abre a pagina pela primeira vez, o padrão é "[]"
    this.setState({
      avaliationList: data,
    });
  };

  render() {
    const { isFormValid, userComment,
      selectedOption, userEmail, avaliationList } = this.state;

    return (
      <div>
        <form className="form-container">
          <input
            className="email-form"
            data-testid="product-detail-email"
            type="email"
            placeholder="Digite seu email"
            onChange={ this.handleEmailInput }
            value={ userEmail }
          />
          {
            userEmail.length > 0 && !(this.validateEmail())
            && <span className="email-validation">Formato de Email inválido!</span>
          }
          <div className="radio-container">
            <p>Avalie o produto:</p>
            <section className="radio-inputs">
              <input
                type="radio"
                value="1"
                data-testid="1-rating"
                onChange={ this.onValueChange }
                checked={ selectedOption === '1' }
              />
              1
              <input
                type="radio"
                value="2"
                data-testid="2-rating"
                onChange={ this.onValueChange }
                checked={ selectedOption === '2' }
              />
              2
              <input
                type="radio"
                value="3"
                data-testid="3-rating"
                onChange={ this.onValueChange }
                checked={ selectedOption === '3' }
              />
              3
              <input
                type="radio"
                value="4"
                data-testid="4-rating"
                onChange={ this.onValueChange }
                checked={ selectedOption === '4' }
              />
              4
              <input
                type="radio"
                value="5"
                data-testid="5-rating"
                onChange={ this.onValueChange }
                checked={ selectedOption === '5' }
              />
              5
            </section>
          </div>
          <textarea
            id="textarea"
            name=""
            cols="50"
            rows="10"
            value={ userComment }
            maxLength="500"
            placeholder="Deixe um comentário!"
            data-testid="product-detail-evaluation"
            onChange={ this.handleTextAreaOnChange }
          />
          <button
            className="avaliation-button"
            data-testid="submit-review-btn"
            type="button"
            onClick={ this.saveAvaliationList }
          >
            Avaliar
          </button>
          { !isFormValid
            && <p className="valid">Preencha todos os campos de forma válida!</p> }
          {
            avaliationList.map((element) => (
              <div key={ element.id }>
                <p data-testid="review-card-email">{ element.email }</p>
                <p data-testid="review-card-rating">{ element.rating }</p>
                <p data-testid="review-card-evaluation">{ element.text }</p>
              </div>))
          }
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
};
