import { Component } from 'react';
import { fetchImage } from '../../shared/services/API';
import Modal from '../../shared/components/Modal/Modal';
import Button from '../../shared/components/Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import css from './ImageFinder.module.css';
export default class ImageFinder extends Component {
  state = {
    search: '',
    page: 1,
    items: [],
    totalItems: 0,
    error: null,
    showModal: false,
    pictureDetails: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    const { search, page } = this.state;
    try {
      this.setState({ loading: true });
      const data = await fetchImage(search, page);

      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
        totalItems: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  onSearchSubmit = search => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModal = ({ largeImageURL, tags }) => {
    this.setState({
      pictureDetails: {
        largeImageURL,
        tags,
      },
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      pictureDetails: null,
    });
  };

  render() {
    const { items, loading, showModal, pictureDetails, error, totalItems } =
      this.state;
    return (
      <div className={css.ImageFinder}>
        <Searchbar onSubmit={this.onSearchSubmit} />
        {loading && <Loader />}
        {error && <p className={css.errorMessage}>{error}</p>}
        <ImageGallery>
          <ImageGalleryItem items={items} showPicture={this.showModal} />
        </ImageGallery>
        {showModal && (
          <Modal onClose={this.closeModal} picture={pictureDetails} />
        )}
        {Boolean(items.length) && items.length !== totalItems && (
          <Button loadMore={this.loadMore} />
        )}
      </div>
    );
  }
}
