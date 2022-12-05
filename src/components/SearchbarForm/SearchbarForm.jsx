import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './SearchbarForm.module.css';
// import PropTypes from 'prop-types';

export default function SearchbarForm({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleValueChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const reset = () => setSearchQuery('');

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warn('Tap a search query');
      return;
    }
    onSubmit(searchQuery);
    reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
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
        value={searchQuery}
        onChange={handleValueChange}
      />
    </form>
  );
}

// SearchbarForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
