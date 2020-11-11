
import React from 'react'
import '../styles/styles.css'

//takes props: images[], size?
class ImageWheel extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            curImage : props.images[0],
            imgIndex : 0
        }
    }

    //cycles to next image
    nextImage = () => {
        //circular array bash
        let newIndex = this.state.imgIndex < this.props.images.length-1 ? this.state.imgIndex+1 : 0
        this.setState({curImage:this.props.images[newIndex], imgIndex:newIndex})
    }

    lastImage = () => {
        let newIndex = this.state.imgIndex > 0 ? this.state.imgIndex-1 : this.props.images.length-1
        this.setState({curImage:this.props.images[newIndex], imgIndex:newIndex})
    }

    render(){
        return(
            <div className="ImageWheel">
                <button onClick={this.lastImage} className="ImageButton"> {"<"} </button>
                <div className="ImageHolder">
                    <img src={this.state.curImage} className="ImageImage"/>
                </div>
                <button onClick={this.nextImage} className="ImageButton"> {">"} </button>
            </div>
    )}


}

export default ImageWheel