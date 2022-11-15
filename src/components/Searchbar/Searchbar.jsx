import { PropTypes } from 'prop-types';
import css from './Searchbar.module.css';
import SearchbarForm from 'components/SearchbarForm/SearchbarForm';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <SearchbarForm onSubmit={onSubmit} />
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
