import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ items, showPicture }) => {
  const elements = items.map(({ id, tags, webformatURL, largeImageURL }) => (
    <li
      className={css.ImageGalleryItem}
      key={id}
      onClick={() => showPicture({ largeImageURL, tags })}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
      />
    </li>
  ));
  return elements;
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
  showPicture: PropTypes.func.isRequired,
};
