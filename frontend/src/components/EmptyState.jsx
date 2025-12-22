const EmptyState = ({ message }) => {
  return (
    <div
      style={{
        padding: '2rem 1.5rem',
        textAlign: 'center',
        borderRadius: '18px',
        border: '1px dashed rgba(148,163,184,0.7)',
        background: 'rgba(248,250,252,0.95)',
        color: '#6b7280',
        fontSize: '0.95rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ fontSize: '1.5rem' }}>🔎</div>
      <div style={{ fontWeight: 600 }}>
        {message || 'No results found.'}
      </div>
      <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
        Try adjusting your filters or search terms.
      </div>
    </div>
  );
};

export default EmptyState;
