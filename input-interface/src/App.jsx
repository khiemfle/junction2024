import React, { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get batch_state_id from URL parameters or use default
    const urlParams = new URLSearchParams(window.location.search);
    const batchStateId = urlParams.get('batch_state_id') || 'cacb4d3c';

    // Fetch images using the batch_state_id
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://n8n.khiemfle.com/webhook/4df2fb7c-a141-46ab-935f-eb874ba4ce95/available-feedbacks/batch-state?batch_state_id=${batchStateId}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        
        const data = await response.json();
        
        // Check if the response contains an error
        if (data.length === 1 && data[0].json.error === 'not_found') {
          throw new Error('No images found for this batch state ID');
        }
        
        setImages(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchImages();
  }, []); // Run once when component mounts

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return (
    <div className="error-container">
      <h1>Error</h1>
      <p>{error}</p>
      <p>Please check your batch state ID and try again.</p>
    </div>
  );

  return (
    <div className="App">
      <h1>Ongelmaraportti</h1>
      <ImageGallery images={images} />
    </div>
  );
}

export default App; 