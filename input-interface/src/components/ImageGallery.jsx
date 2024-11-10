import React from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  return (
    <div className="image-gallery">
      {images.map((item) => (
        <div key={item.json.id} className="image-card">
          <img
            src={item.json.download_link}
            alt={`Image ${item.json.id}`}
            loading="lazy"
          />
          <p>ID: {item.json.id}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery; 