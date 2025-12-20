import React from 'react';

const statusStyles = {
  pending: { background: '#fff3cd', color: '#856404' },
  accepted: { background: '#d4edda', color: '#155724' },
  rejected: { background: '#f8d7da', color: '#721c24' },
  completed: { background: '#d1ecf1', color: '#0c5460' },
};

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || {};

  return (
    <span
      style={{
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'capitalize',
        ...style,
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
