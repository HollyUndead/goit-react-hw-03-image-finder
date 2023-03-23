import { Component } from 'react';

export class ImageGalleryItem extends Component {
    sendUrl = () => {
        this.props.setForModal(this.props.photo.largeImageURL)
    }
  render() {
    const { webformatURL, id } = this.props.photo;
    return (
      <li className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt=""
          id={id}
          className="ImageGalleryItem-image"
          onClick={this.sendUrl}
        />
      </li>
    );
  }
}
