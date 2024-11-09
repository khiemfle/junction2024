import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from './Alert';
import Notification from './Notification';
import Navbar from './Navbar';
import QRCode from 'react-qr-code';

const ErrorReporting = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorTypes = {
    red: { 
      label: 'Underweight Product', 
      color: 'bg-red-600 hover:bg-red-700',
      priority: 'High Priority'
    },
    blue: { 
      label: 'Overweight Product', 
      color: 'bg-blue-600 hover:bg-blue-700',
      priority: 'Medium Priority'
    },
    black: { 
      label: 'Packaging Issue', 
      color: 'bg-gray-800 hover:bg-gray-900',
      priority: 'Low Priority'
    }
  };

  const simulateAPICall = (type) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          manager: "John Smith",
          ticketId: Math.floor(Math.random() * 10000)
        });
      }, 1500);
    });
  };

  const handleSubmit = async (type) => {
    setIsSubmitting(true);

    try {
      // Simulate sending to backend
      const response = await simulateAPICall(type);
      
      setShowConfirmation(true);
      setNotification({
        type: errorTypes[type].label,
        message: `Report #${response.ticketId} sent to ${response.manager}. They will be notified immediately.`,
      });
      
      setTimeout(() => setShowConfirmation(false), 3000);
    } catch (error) {
      setNotification({
        type: 'Error',
        message: 'Failed to send report. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Error Reporting System</h2>
      
      <div className="space-y-4">
        {Object.entries(errorTypes).map(([type, { label, color, priority }]) => (
          <button
            key={type}
            onClick={() => handleSubmit(type)}
            disabled={isSubmitting}
            className={`w-full p-4 text-white rounded-lg ${color} 
                       transition-colors duration-200 text-lg font-medium
                       flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <AlertCircle className="w-5 h-5" />
            {isSubmitting ? 'Sending...' : `Report ${label}`}
          </button>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
  <QRCode 
    value="https://www.example.com"
    size={128} // Makes the QR code smaller (default is 256)
  />
</div>

      {showConfirmation && (
        <Alert className="mt-4 bg-green-50 border-green-200">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-600 ml-2">
            Report submitted successfully
          </AlertDescription>
        </Alert>
      )}

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ErrorReporting;

