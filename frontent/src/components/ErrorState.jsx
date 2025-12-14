import React from 'react';

const ErrorState = ({ message }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px', color: '#dc3545', border: '1px solid #dc3545', borderRadius: '5px' }}>
      ⚠️ Error: {message || 'An unexpected error occurred.'}
    </div>
  );
};

export default ErrorState;
