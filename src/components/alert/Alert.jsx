import React from 'react';
import '../../styles/Alert.css';

export const Alert = ({ type, message, onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
};

export default Alert;
