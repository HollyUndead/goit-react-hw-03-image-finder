import { Component } from "react"
import PropTypes from 'prop-types'

import { ImageGalleryItem } from "components/imageGalleryItem/imageGalleryItem"

export class ImageGallery extends Component{

    render(){
        return(
                <ul className="ImageGallery">
                    {this.props.state.photos.map((el)=>{
                        return (<ImageGalleryItem key={el.id} photo={el} setForModal={this.props.setForModal}/>)
                    })}
                </ul>
        )
    }
}

ImageGallery.propTypes = {
    state: PropTypes.object
}