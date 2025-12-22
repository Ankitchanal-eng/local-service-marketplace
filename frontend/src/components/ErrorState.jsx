const ErrorState = ({ message }) => {
  return (
    <div
      style={{
        padding: '1.5rem 1.25rem',
        textAlign: 'center',
        borderRadius: '16px',
        border: '1px solid rgba(248,113,113,0.6)',
        background: 'rgba(254,242,242,0.95)',
        color: '#b91c1c',
        fontSize: '0.95rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ fontSize: '1.6rem' }}>⚠️</div>
      <div style={{ fontWeight: 700 }}>Error</div>
      <div>
        {message || 'An unexpected error occurred. Please try again.'}
      </div>
    </div>
  );
};

export default ErrorState;
