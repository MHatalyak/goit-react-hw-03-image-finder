import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ src, alt, onImageClick }) => (
  <li className="ImageGalleryItem">
    <img
      src={src}
      alt={alt}
      className="ImageGalleryItem-image"
      onClick={onImageClick}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
