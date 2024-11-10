import React from 'react';
import './ThankYouPage.css';

const ThankYouPage = ({ selectedImage }) => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <h2>Thank You!</h2>
        <p>Your report has been successfully submitted.</p>
        
        {selectedImage && (
          <div className="submitted-image-container">
            <p>Reported Image:</p>
            <img 
              src={selectedImage.json.download_link} 
              alt={`Image ${selectedImage.json.id}`}
              className="submitted-image"
            />
            <p className="image-id">ID: {selectedImage.json.id}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYouPage; 