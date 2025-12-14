import React from 'react';

const EmptyState = ({ message }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px', color: '#6c757d' }}>
      🔎 {message || 'No results found.'}
    </div>
  );
};

export default EmptyState;
