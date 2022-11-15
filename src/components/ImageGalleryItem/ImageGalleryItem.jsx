import css from './ImageGalleryItem.module.css';
import { PropTypes } from 'prop-types';

const ImageGalleryItem = ({ image: { webformatURL, tags, id }, onClick }) => {
  return (
    <li onClick={onClick} data-id={id} className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.array,
  id: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
