import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import FetchData from 'services/Api';

const perPage = 12;

export const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value) {
      return;
    }
    setLoading(true);
    FetchData(value, page, perPage)
      .then(data => {
        setImages(prevState => [...prevState, ...data.hits]);
        setLoading(false);
        if (data.total > perPage) {
          setShowLoadMore(true);
        } else if (data.total <= images.length + perPage) {
          setShowLoadMore(false);
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      })
      .catch(onApiError);
  }, [page, value]);

  const onSearch = inputValue => {
    setValue(inputValue);
    setPage(1);
    setImages([]);
    setShowLoadMore(false);
    setLoading(true);
  };

  const showMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  const openModal = image => {
    setShowModal(true);
    setLargeImage(image);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onApiError = () => {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    setLoading(false);
    setShowLoadMore(false);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={onSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showLoadMore && <Button onShowMore={showMore} />}
      {showModal && <Modal largeImage={largeImage} closeModal={closeModal} />}
      {loading && <Loader />}
    </div>
  );
};
