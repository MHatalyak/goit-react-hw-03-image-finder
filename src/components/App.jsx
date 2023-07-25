import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

const API_KEY = '30554094-a84a8756902b4f7be7a5ac4d7';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ images: [], page: 1 }, () => {
        this.fetchImages();
      });
    }
  }

  handleSearchbarSubmit = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchImages();
      }
    );
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    axios
      .get(url)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          isLoading: false,
        }));
      })
      .catch(error => {
        console.log('Error fetching images:', error);
        this.setState({ isLoading: false });
      });
  };

  handleImageClick = largeImage => {
    this.setState({ showModal: true, largeImage });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, largeImage: '' });
  };

  render() {
    const { images, isLoading, showModal, largeImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal largeImage={largeImage} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
