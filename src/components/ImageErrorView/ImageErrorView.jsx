import { PropTypes } from 'prop-types';
import css from './ImageErrorView.module.css';
export default function ImageErrorView({ message }) {
  return (
    <div role="alert" className={css.error}>
      <p>{message}</p>
    </div>
  );
}

ImageErrorView.propTypes = {
  message: PropTypes.string,
};
