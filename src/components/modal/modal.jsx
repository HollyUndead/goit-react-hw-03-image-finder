import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.closeModal, false);
  }
  handleClick = ev => {
    if (ev.target.className === 'Overlay') {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, modalActive } = this.props;
    let modalClass = 'Overlay is-hidden';
    if (modalActive === true) {
      modalClass = 'Overlay';
    }
    return (
      <div className={modalClass} onClick={this.handleClick}>
        <div className="Modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
