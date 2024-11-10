import React, { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      setImages(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch images');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <h1>Image Gallery</h1>
      <ImageGallery images={images} />
    </div>
  );
}

export default App; 