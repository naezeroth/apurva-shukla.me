import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const imgWithClick = { cursor: 'pointer' };

function Photo(props) {
  const {
    index,
    onClick,
    photo,
    margin,
    direction,
    top,
    left,
    key,
  } = props;

  const imgStyle = {
    margin, display: 'block', width: photo.width,
  };

  if (direction === 'column') {
    imgStyle.position = 'absolute';
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = (event) => {
    onClick(event, { photo, index });
  };

  return (
    <div
        key={key}
        style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
        onClick={onClick ? handleClick : null}
        onKeyDown={handleClick}
    >
      <GatsbyImage image={{ ...getImage(photo) }} />
    </div>
  );
}

export default Photo;
