import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);

    // Get batch_state_id from URL or use default
    const urlParams = new URLSearchParams(window.location.search);
    const batchStateId = urlParams.get('batch_state_id') || 'cacb4d3c';

    try {
      const response = await fetch(
        'https://n8n.khiemfle.com/webhook/4df2fb7c-a141-46ab-935f-eb874ba4ce95/feedback/batch',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            feedback_template_id: selectedImage.json.id,
            batch_state_id: batchStateId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      // Close modal after successful submission
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedImage(null);
    setError(null);
  };

  return (
    <div className="image-gallery">
      {images.map((item) => (
        <div 
          key={item.json.id} 
          className="image-card"
          onClick={() => handleImageClick(item)}
        >
          <img
            src={item.json.download_link}
            alt={`Image ${item.json.id}`}
            loading="lazy"
          />
          <p>ID: {item.json.id}</p>
        </div>
      ))}

      {showModal && (
        <ConfirmationModal
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          error={error}
          imageId={selectedImage?.json.id}
        />
      )}
    </div>
  );
};

export default ImageGallery; 