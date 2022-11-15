import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './SearchbarForm.module.css';
import PropTypes from 'prop-types';

class SearchbarForm extends Component {
  state = {
    searchQuery: '',
  };

  handleValueChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.warn('Tap a search query');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.label}></span>
        </button>

        <input
          name="searchQuery"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.searchQuery}
          onChange={this.handleValueChange}
        />
      </form>
    );
  }
}
SearchbarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchbarForm;
