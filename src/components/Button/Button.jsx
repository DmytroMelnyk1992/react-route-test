import { PropTypes } from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => (
  <button className={css.Button} type="button" onClick={onClick}>
    Load more
  </button>
);

Button.defaultProps = {
  onClick: () => null,
  children: null,
};

Button.propType = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
