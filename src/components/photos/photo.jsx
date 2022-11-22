import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from 'gatsby-plugin-image';

const imgWithClick = { cursor: 'pointer' };

function Photo({
  index,
  onClick,
  photo,
  margin,
  direction,
  top,
  left,
  key,
}) {
  const imgStyle = { margin, display: 'block' };
  if (direction === 'column') {
    imgStyle.position = 'absolute';
    imgStyle.left = left;
    imgStyle.top = top;
  }

  const handleClick = (event) => {
    console.log('inside handleClick in photo', event, { photo, index });
    onClick(event, { photo, index });
  };

  return (
    <span style={{ width: photo.width }}>
      <div
        key={key}
        style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
        onClick={onClick ? handleClick : null}
        onKeyDown={handleClick}
      >
        <GatsbyImage image={photo} />
      </div>
    </span>
  );
}

export const photoPropType = PropTypes.shape({
  aspectRatio: PropTypes.number,
  base64: PropTypes.string,
  height: PropTypes.number.isRequired,
  sizes: PropTypes.string,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  width: PropTypes.number.isRequired,
});

Photo.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  photo: photoPropType.isRequired,
  margin: PropTypes.number,
  // eslint-disable-next-line consistent-return
  top: (props) => {
    if (props.direction === 'column' && typeof props.top !== 'number') {
      return new Error(
        'top is a required number when direction is set to `column`',
      );
    }
  },
  // eslint-disable-next-line consistent-return
  left: (props) => {
    if (props.direction === 'column' && typeof props.left !== 'number') {
      return new Error(
        'left is a required number when direction is set to `column`',
      );
    }
  },
  direction: PropTypes.string,
};

export default Photo;
