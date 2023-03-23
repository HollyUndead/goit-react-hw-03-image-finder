import { Component } from 'react';
import { PropTypes } from 'prop-types';
const imgForButton = require('../../img/png-transparent-magnifying-glass-computer-icons-investigation-glass-image-file-formats-magnifier.png')

export class SearchBar extends Component {
  searchPhotos = (ev) =>{
    ev.preventDefault()
    this.props.changeSearchFilter(ev.target.searchFilter.value)
  }
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.searchPhotos}>
          <button type="submit" className="SearchForm-button">
            <img src={imgForButton} alt="" />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name='searchFilter'
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  changeSearchFilter: PropTypes.func
}