import React from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { IconLink } from "./link"
import { Back } from "./social-icons"
class CustomGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openGallery: 0, //natural, people, built
      currentImage: 0,
      viewerIsOpen: false
    };
    this.openLightbox = this.openLightbox.bind(this); 
    this.closeLightbox = this.closeLightbox.bind(this);
    this.changeOpenGallery = this.changeOpenGallery.bind(this);
  }
  
  openLightbox = (event, { photo, index }) => {
    this.setState({
      currentImage: index,
      viewerIsOpen: true
    })
  }

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      viewerIsOpen: false
    })
  };

  changeOpenGallery = ( name ) => {
    console.log(name);
    this.setState({
      openGallery: name
    })
  }

  render() {   
    console.log("INSIDE custom gallery ", this.props.photos); 
    return(
    <div>
      {this.state.openGallery ? (
      <div>
      <IconLink onClick={() => this.changeOpenGallery(0)}><Back/></IconLink>
      <Gallery photos={this.props.photos[this.state.openGallery].map(({ image }) => image)} onClick={this.openLightbox} /> 
      <ModalGateway>
        {this.state.viewerIsOpen ? (
          <Modal onClose={this.closeLightbox}>
            <Carousel
              currentIndex={this.state.currentImage}
              views={this.props.photos[this.state.openGallery].map((x) => ({
                ...x.image,
                caption: JSON.stringify(x.data)
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      </div>) : (
        <div>
        <button onClick={() => this.changeOpenGallery('natural')}> NATURAL </button>
        <button onClick={() => this.changeOpenGallery('built')}> BUILT </button>
        <button onClick={() => this.changeOpenGallery('people')}> PEOPLE </button>
        </div>
      )}
    </div>
    )
  }
}
export default CustomGallery
