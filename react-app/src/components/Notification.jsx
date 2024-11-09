import React from 'react';
import { CheckCircle, X } from 'lucide-react';

const Notification = ({ message, type, onClose }) => {
  return (
    <div className="fixed top-4 right-4 w-80 bg-white rounded-lg shadow-lg border p-4 animate-slide-in">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{type}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification;