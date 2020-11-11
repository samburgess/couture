
import React from 'react'
import ImageWheel from './ImageWheel'
import "../styles/styles.css"
//takes 



class ScrollItem extends React.Component{


    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="ScrollItem">
                <h3> {this.props.title}</h3>
                <h4> $ {this.props.price} </h4>
                <ImageWheel images={this.props.images}/>
            </div>
    )}

}

export default ScrollItem