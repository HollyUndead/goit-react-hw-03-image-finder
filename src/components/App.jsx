/* eslint-disable array-callback-return */
import { Component, useRef } from 'react';
import axios from 'axios';

import { SearchBar } from './searcheBar/searchBar';
import { Modal } from './modal/modal';
import { Loader } from './loader/loader';
import { ButtonPage } from './button/button';
import { ImageGallery } from './imageGallery/imageGallery';
import './styles.css';

export class App extends Component {
  state = {
    photos: [],
    error: '',
    loading: true,
    largeImageUrl: '',
    modalActive: false,
    searchFilter: 'cat',
    pages: 1,
    hideButton: false,
  };

  getRequest = page => {
    this.setState({ loading: true, hideButton: true });
    if (page === undefined) {
      page = this.state.pages;
    } else {
      this.setState({ pages: page });
    }
    setTimeout(
      () =>
        axios
          .get(
            `https://pixabay.com/api/?q=${this.state.searchFilter}&page=${page}&key=34670018-4febe9e6c0cb9fd604326a600&image_type=photo&orientation=horizontal&per_page=12`
          )
          .then(res => {
            if(res.data.hits.length === 0){
              this.setState({ loading: false, hideButton: true });
              return
            }
            this.setState(prevState => {
              let newArr = [...prevState.photos];
              let chekArr = newArr.map(el => el.id);
              let counterOldPhotos = 0;
              res.data.hits.forEach(el => {
                if (chekArr.includes(el.id) !== true) {
                  newArr.push(el);
                } else {
                  counterOldPhotos = counterOldPhotos + 1;
                }
              });
              if (counterOldPhotos !== 0) {
                this.setState({ hideButton: true });
              } else {
                this.setState({ hideButton: false });
              }
              if(res.data.totalHits <= 12){
                this.setState({ hideButton: true });
              }
              return { photos: newArr };
            });
          })
          .catch(error => this.setState({ error: error.message }))
          .finally(() => {
            this.setState({ loading: false });
          }),
      1000
    );
  };

  closeModal = () => {
    this.setState({ modalActive: false, largeImageUrl: '' });
  };

  setForModal = largeImageURL => {
    let stringForUrl = largeImageURL.split(' ')
    const stringForSearch = stringForUrl.join('+')
    this.setState({ largeImageUrl: stringForSearch, modalActive: true });
  };

  changeSearchFilter = searchFilter => {
    this.setState({
      searchFilter: searchFilter,
      loading: true,
      hideButton: true,
      photos: [],
      pages: 1,
    });
    this.getRequest();
  };

  componentDidMount() {
    this.getRequest();
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
        <ButtonPage state={this.state} getRequest={this.getRequest} />
      </div>
    );
  }
}
