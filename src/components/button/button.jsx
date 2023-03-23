import PropTypes from 'prop-types'
import { Component } from "react"


export class ButtonPage extends Component{
    handleClick = (ev) => {
        this.props.getRequest(this.props.state.pages+1)
        setTimeout(()=>{ev.target.scrollIntoView()}, 1400)
    }
    render(){
    let buttonClassWarp = "buttonWrap"
    if(this.props.state.hideButton === true){
        buttonClassWarp= 'buttonWrap is-hidden'
    }       
        return(
            <div className={buttonClassWarp}>
                <button type="button" className='Button' onClick={this.handleClick}>Load more</button>
            </div>
        )
    }
}

ButtonPage.propTypes = {
    state: PropTypes.object,
    getRequest: PropTypes.func
}