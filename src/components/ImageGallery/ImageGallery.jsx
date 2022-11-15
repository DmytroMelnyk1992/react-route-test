import { PropTypes } from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => (
  <ul className={css.ImageGallery}>
    {images &&
      images.map(image => {
        return (
          <ImageGalleryItem onClick={openModal} key={image.id} image={image} />
        );
      })}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array,
};

export default ImageGallery;
