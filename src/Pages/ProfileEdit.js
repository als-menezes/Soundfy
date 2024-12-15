import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class ProfileEdit extends Component {
  state = {
    isLoading: false,
    disabled: true,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
      isLoading: false,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationFields);
  };

  validationFields = () => {
    const { email, name, image, description } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const validateEmail = emailRegex.test(email);
    const validateName = name.length !== 0;
    const validateImage = image.length !== 0;
    const validateDescription = description.length !== 0;
    this.setState({
      disabled: !(validateEmail && validateName && validateImage && validateDescription),
    });
  };

  handleClick = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    await updateUser({ name, email, image, description });
    history.push('/profile');
  };

  render() {
    const { name, email, image, description, isLoading, disabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading /> : (
          <>
            <input
              data-testid="edit-input-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
            <input
              data-testid="edit-input-email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <textarea
              data-testid="edit-input-description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
            <input
              data-testid="edit-input-image"
              type="text"
              name="image"
              value={ image }
              onChange={ this.handleChange }
            />
            <button
              data-testid="edit-button-save"
              onClick={ this.handleClick }
              disabled={ disabled }
              type="button"
            >
              Editar perfil
            </button>
          </>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default ProfileEdit;
