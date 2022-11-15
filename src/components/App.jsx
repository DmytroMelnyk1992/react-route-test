import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import SearchAPI from './SearchAPI/SearchAPI';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import ImageErrorView from './ImageErrorView/ImageErrorView';

export class App extends Component {
  state = {
    images: [],
    id: null,
    searchQuery: '',
    page: 1,
    isLoading: false,
    loadMore: false,
    showModal: false,
    isEmpty: false,
    error: null,
    per_page: 12,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getPhotos(searchQuery, page);
    }
  }

  getPhotos = async (query, page) => {
    if (!query) return;
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await SearchAPI(query, page);
      console.log(hits, totalHits);
      if (hits.length === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      loadMore: false,
      images: [],
      isEmpty: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = e => {
    this.setState({
      showModal: true,
      id: e.currentTarget.dataset.id,
    });
  };

  closeModal = e => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const {
      searchQuery,
      page,
      loadMore,
      showModal,
      images,
      id,
      isLoading,
      isEmpty,
    } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer position="top-right" autoClose={5000} />

        {isLoading && <Loader />}
        {isEmpty && (
          <ImageErrorView
            message={`There is no images to query '${this.state.searchQuery}'`}
          />
        )}
        {searchQuery ? (
          <ImageGallery openModal={this.openModal} images={images} />
        ) : (
          <p className={css.search}>Start searching everything You want</p>
        )}

        {loadMore && <Button onClick={this.loadMore} page={page} />}
        {showModal && (
          <Modal images={images} id={Number(id)} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
