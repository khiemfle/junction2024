import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import ThankYouPage from './ThankYouPage';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);

    // Get IDs from URL
    const urlParams = new URLSearchParams(window.location.search);
    const batchStateId = urlParams.get('batch_state_id');
    const packageId = urlParams.get('package_id');

    // Check if required IDs are missing
    if (!batchStateId && !packageId) {
      setError('Either batch_state_id or package_id is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint = packageId 
        ? 'package'
        : 'batch';
      
      const requestBody = packageId
        ? {
            feedback_template_id: selectedImage.json.id,
            package_id: packageId,
          }
        : {
            feedback_template_id: selectedImage.json.id,
            batch_state_id: batchStateId,
          };

      const response = await fetch(
        `https://n8n.khiemfle.com/webhook/4df2fb7c-a141-46ab-935f-eb874ba4ce95/feedback/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      // Close modal after successful submission
      setShowModal(false);
      setIsSubmitted(true);
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

  if (isSubmitted) {
    return <ThankYouPage selectedImage={selectedImage} />;
  }

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
          selectedImage={selectedImage}
        />
      )}
    </div>
  );
};

export default ImageGallery; 