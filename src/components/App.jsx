/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
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

export default function App() {
  const [images, setImages] = useState([]);
  const [id, setId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);
  const perPage = 12;

  useEffect(() => {
    getPhotos(searchQuery, page);
  }, [searchQuery, page]);

  const getPhotos = async (query, page) => {
    if (!query) return;
    setIsLoading(true);
    try {
      const { hits, totalHits } = await SearchAPI(query, page);
      console.log(hits, totalHits);
      if (hits.length === 0) {
        setIsEmpty(true);
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / perPage));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setLoadMore(false);
    setImages([]);
    setIsEmpty(false);
  };

  const openModal = e => {
    setShowModal(true);
    setId(e.currentTarget.dataset.id);
  };

  const closeModal = e => {
    setShowModal(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer position="top-right" autoClose={5000} />

      {isLoading && <Loader />}
      {isEmpty && (
        <ImageErrorView
          message={`There is no images to query '${searchQuery}'`}
        />
      )}
      {searchQuery ? (
        <ImageGallery openModal={openModal} images={images} />
      ) : (
        <p className={css.search}>Start searching everything You want</p>
      )}

      {loadMore && (
        <Button onClick={() => setPage(page => page + 1)} page={page} />
      )}
      {showModal && (
        <Modal images={images} id={Number(id)} onClose={closeModal} />
      )}
    </div>
  );
}
