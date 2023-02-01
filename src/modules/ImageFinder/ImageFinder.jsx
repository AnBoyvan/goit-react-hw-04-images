import { useState, useEffect } from 'react';
import { fetchImage } from '../../shared/services/API';
import Modal from '../../shared/components/Modal/Modal';
import Button from '../../shared/components/Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import css from './ImageFinder.module.css';

const ImageFinder = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pictureDetails, setPictureDetails] = useState(0);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (search.trim() === '') {
      setLoading(false);
      return;
    }
    setError(null);

    fetchImage(search, page)
      .then(({ hits, totalHits }) => {
        setItems(prevItems => [...prevItems, ...hits]);
        setTotalItems(totalHits);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [search, page]);

  const onSearchSubmit = search => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModalWindow = ({ largeImageURL, tags }) => {
    setPictureDetails({
      largeImageURL,
      tags,
    });
    setShowModal(true);
  };

  const closeModalWindow = () => {
    setPictureDetails(null);
    setShowModal(false);
  };

  return (
    <div className={css.ImageFinder}>
      <Searchbar onSubmit={onSearchSubmit} setError={setError} />
      {loading && <Loader />}
      {error && <p className={css.errorMessage}>{error}</p>}
      <ImageGallery>
        <ImageGalleryItem items={items} showPicture={showModalWindow} />
      </ImageGallery>
      {showModal && (
        <Modal onClose={closeModalWindow} picture={pictureDetails} />
      )}
      {Boolean(items.length) && items.length !== totalItems && (
        <Button loadMore={loadMore} />
      )}
    </div>
  );
};

export default ImageFinder;
