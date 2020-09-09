import React from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { IconLink } from "./link"
import { Back } from "./social-icons"
import Photo from "./photo"
import { rhythm } from "../utils/typography"
import styled from "styled-components"


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
      <br/>
      <IconLink onClick={() => this.changeOpenGallery(0)}><Back/></IconLink>
      <br/>
      <br/>
      <Gallery photos={this.props.photos[this.state.openGallery].map(({ fluid }) => fluid)}
        renderImage={Photo}
        onClick={this.openLightbox} /> 
      <ModalGateway>
        {this.state.viewerIsOpen ? (
          <Modal onClose={this.closeLightbox}>
            <Carousel
              currentIndex={this.state.currentImage}
              views={this.props.photos[this.state.openGallery].map((x) => ({
                ...x.fluid,
                caption: JSON.stringify(x.data)
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      </div>) : (
        <div style={{display: 'flex', 'flex-flow': 'row wrap'}}>
          <Item>
            <Button style= {{background: '#2aa198'}} onClick={() => this.changeOpenGallery('natural')}>natural</Button>
          </Item>
          <Item>
            <Button style= {{background: '#b58900'}} onClick={() => this.changeOpenGallery('built')}>built</Button>
          </Item>
          <Item>
            <Button style= {{background: '#d33682'}} onClick={() => this.changeOpenGallery('people')}>people</Button>
          </Item>
        </div>
      )}
    </div>
    )
  }
}
export default CustomGallery

const Item = styled.div`
  padding: 30px 0 0 50px;
`
const Button = styled.button`
  height: ${rhythm(5)}; 
  width: ${rhythm(8)};
  border-radius: 20px;
`