import React from "react"
import Gallery from "react-photo-gallery"
import Carousel, { Modal, ModalGateway } from "react-images"
import { IconLink } from "./link"
import { Back } from "./social-icons"
import Photo from "./photo"
import { rhythm } from "../utils/typography"
import styled from "styled-components"

class CustomGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openGallery: 0, //natural, people, built
      currentImage: 0,
      viewerIsOpen: false,
    }
    this.openLightbox = this.openLightbox.bind(this)
    this.closeLightbox = this.closeLightbox.bind(this)
    this.changeOpenGallery = this.changeOpenGallery.bind(this)
  }

  openLightbox = (event, { photo, index }) => {
    this.setState({
      currentImage: index,
      viewerIsOpen: true,
    })
  }

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      viewerIsOpen: false,
    })
  }

  changeOpenGallery = name => {
    this.setState({
      openGallery: name,
    })
  }

  render() {
    
    const naturalPhoto="url('"+this.props.photos['natural'][0]['fluid']['srcSet'].split(' ')[0]+"')";
    const builtPhoto="url('"+this.props.photos['built'][0]['fluid']['srcSet'].split(' ')[0]+"')";
    const peoplePhoto="url('"+this.props.photos['people'][0]['fluid']['srcSet'].split(' ')[0]+"')";

    console.log(naturalPhoto);
    return (
      <div>
        {this.state.openGallery ? (
          <div>
            <br />
            <IconLink onClick={() => this.changeOpenGallery(0)}>
              <Back />
            </IconLink>
            <br />
            <br />
            <Gallery
              photos={this.props.photos[this.state.openGallery].map(
                ({ fluid }) => fluid
              )}
              renderImage={Photo}
              onClick={this.openLightbox}
            />
            <ModalGateway>
              {this.state.viewerIsOpen ? (
                <Modal onClose={this.closeLightbox}>
                  <Carousel
                    currentIndex={this.state.currentImage}
                    views={this.props.photos[this.state.openGallery].map(x => ({
                      ...x.fluid,
                      caption: JSON.stringify(x.data),
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        ) : (
            <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: 'space-evenly' }}>
              <Item >
                <div style={{backgroundImage: naturalPhoto, backgroundSize: "cover", borderRadius: "20px", backgroundPosition: "bottom"}}>
                  <PhotoButton
                    style={{background: "rgba(255, 255, 255, 0.2)" ,backdropFilter: "blur(2px)"}}
                    onClick={() => this.changeOpenGallery("natural")}
                  >
                    Natural
                    </PhotoButton>
                </div>
              </Item>                     
              <Item>
                <div style={{backgroundImage: builtPhoto, backgroundSize: "cover", borderRadius: "20px", backgroundPosition: "bottom"}}>
                  <PhotoButton
                    style={{background: "rgba(255, 255, 255, 0.2)" ,backdropFilter: "blur(2px)"}}
                    onClick={() => this.changeOpenGallery("built")}
                  >
                    Built
                  </PhotoButton>
                </div>
              </Item>
              <Item >
                <div style={{backgroundImage: peoplePhoto, backgroundSize: "cover", borderRadius: "20px", backgroundPosition: "bottom"}}>
                  <PhotoButton
                    style={{background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(2px)"}}
                    onClick={() => this.changeOpenGallery("people")}
                  >
                    People
                  </PhotoButton>
                </div>
              </Item>
            </div>
          )}
      </div>
    )
  }
}
export default CustomGallery

const Item = styled.div`
  padding: 30px 0 0 0;
`
const Button = styled.button`
  height: ${rhythm(5)};
  width: ${rhythm(8)};
  border-radius: 20px;
`
const PhotoButton = styled.button`
  font-weight: 400;
  font-size: xx-large;
  height: ${rhythm(5)};
  width: ${rhythm(8)};
  border-radius: 20px;
`