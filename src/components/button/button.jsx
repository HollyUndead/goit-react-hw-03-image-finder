import PropTypes from 'prop-types';
import { Component } from 'react';

export class ButtonPage extends Component {
  handleClick = () => {
    this.props.setPage(this.props.currentPage + 1);
  };
  render() {
    let buttonClassWarp = 'buttonWrap is-hidden';
    if (this.props.hideButton === false) {
      buttonClassWarp = 'buttonWrap';
    }
    return (
      <div className={buttonClassWarp}>
        <button type="button" className="Button" onClick={this.handleClick}>
          Load more
        </button>
      </div>
    );
  }
}

ButtonPage.propTypes = {
  currentPage: PropTypes.number,
  setPage: PropTypes.func,
  hideButton: PropTypes.bool,
};
