import React from 'react';

const LoadingState = () => {
  return (
    <div
      style={{
        padding: '1.75rem 1.25rem',
        textAlign: 'center',
        borderRadius: '16px',
        background: 'rgba(239,246,255,0.95)',
        color: '#1d4ed8',
        fontSize: '0.95rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          border: '3px solid rgba(59,130,246,0.25)',
          borderTopColor: '#3b82f6',
          animation: 'spin 0.9s linear infinite',
        }}
      />
      <div style={{ fontWeight: 600 }}>Loading data, please wait...</div>

      {/* inline keyframes via style tag */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingState;
