import { Component } from 'react';
import axios from 'axios';

import { SearchBar } from './searcheBar/searchBar';
import { Modal } from './modal/modal';
import { Loader } from './loader/loader';
import { ButtonPage } from './button/button';
import { ImageGallery } from './imageGallery/imageGallery';
import './styles.css';
import { handleRespons } from 'functions/getRequest';

export class App extends Component {
  state = {
    photos: [],
    error: '',
    loading: false,
    largeImageUrl: '',
    modalActive: false,
    searchFilter: '',
    pages: 1,
    hideButton: true,
  };

  getRequest = prevState => {
    this.setState({ loading: true, hideButton: true });
    const firstPartUrl = `https://pixabay.com/api/?q=${this.state.searchFilter}&page=${this.state.pages}`;
    const secondPartUrl =
      '&key=34670018-4febe9e6c0cb9fd604326a600&image_type=photo&orientation=horizontal&per_page=12';
    const url = firstPartUrl + secondPartUrl;
    axios
      .get(url)
      .then(res => {
        const newState = handleRespons(prevState, res.data.hits, this.state);
        this.setState({
          ...newState,
        });
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  closeModal = () => {
    this.setState({ modalActive: false, largeImageUrl: '' });
  };

  setForModal = largeImageURL => {
    let stringForUrl = largeImageURL.split(' ');
    const stringForSearch = stringForUrl.join('+');
    this.setState({ largeImageUrl: stringForSearch, modalActive: true });
  };

  setPage = page => {
    this.setState({ pages: page });
  };

  changeSearchFilter = searchFilter => {
    this.setState({
      searchFilter: searchFilter,
      loading: true,
      hideButton: true,
      photos: [],
      pages: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.pages !== this.state.pages ||
      prevState.searchFilter !== this.state.searchFilter
    ) {
      this.getRequest(prevState);
    }
  }

  render() {
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SearchBar changeSearchFilter={this.changeSearchFilter} />
        <ImageGallery state={this.state} setForModal={this.setForModal} />
        <Loader state={this.state} />
        <Modal
          largeImageURL={this.state.largeImageUrl}
          closeModal={this.closeModal}
          modalActive={this.state.modalActive}
        />
        <ButtonPage
          setPage={this.setPage}
          currentPage={this.state.pages}
          hideButton={this.state.hideButton}
        />
      </div>
    );
  }
}
