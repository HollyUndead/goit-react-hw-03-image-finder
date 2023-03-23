import { Component } from 'react';
import PropTypes from 'prop-types'
import './loader.css'

export class Loader extends Component {
  render() {
    let loaderClass = "loader"
    if(this.props.state.loading === false){
      loaderClass = "loader is-hidden"
    }
        return (
            <div className={loaderClass}>
            <span className="dot"></span> 
            <span className="dot"></span>
            <span className="dot"></span>
            </div>
        );
  }
}

Loader.propTypes ={
    state: PropTypes.object
}