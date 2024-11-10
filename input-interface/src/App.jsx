import React, { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery';
import './App.css';

function App() {
  const sampleData = [
    {
      "json": {
        "id": "85dad019",
        "download_link": "https://n8n.khiemfle.com/webhook/4df2fb7c-a141-46ab-935f-eb874ba4ce95/images?file_name=junction2024/app/images/predefined-feedback_Images/85dad019.image.185100.jpg"
      },
      "pairedItem": {
        "item": 0
      }
    },
    {
      "json": {
        "id": "a26e4517",
        "download_link": "https://n8n.khiemfle.com/webhook/4df2fb7c-a141-46ab-935f-eb874ba4ce95/images?file_name=junction2024/app/images/predefined-feedback_Images/a26e4517.image.185128.jpg"
      },
      "pairedItem": {
        "item": 1
      }
    }
  ];

  return (
    <div className="App">
      <h1>Ongelmaraportti</h1>
      <ImageGallery images={sampleData} />
    </div>
  );
}

export default App; 