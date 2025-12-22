import React from 'react';

const statusStyles = {
  pending: {
    background: 'rgba(250, 204, 21, 0.12)',
    color: '#854d0e',
    border: '1px solid rgba(250, 204, 21, 0.45)',
  },
  accepted: {
    background: 'rgba(34, 197, 94, 0.12)',
    color: '#166534',
    border: '1px solid rgba(34, 197, 94, 0.4)',
  },
  rejected: {
    background: 'rgba(248, 113, 113, 0.12)',
    color: '#b91c1c',
    border: '1px solid rgba(248, 113, 113, 0.4)',
  },
  completed: {
    background: 'rgba(56, 189, 248, 0.12)',
    color: '#0369a1',
    border: '1px solid rgba(56, 189, 248, 0.4)',
  },
};

const StatusBadge = ({ status }) => {
  const normalized = status?.toLowerCase() || '';
  const style = statusStyles[normalized] || {
    background: 'rgba(148, 163, 184, 0.12)',
    color: '#475569',
    border: '1px solid rgba(148, 163, 184, 0.4)',
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.2rem 0.7rem',
        borderRadius: '999px',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {normalized || 'unknown'}
    </span>
  );
};

export default StatusBadge;
