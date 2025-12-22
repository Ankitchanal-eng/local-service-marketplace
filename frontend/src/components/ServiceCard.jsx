import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <article
      style={{
        borderRadius: '18px',
        padding: '1.25rem 1.4rem',
        margin: '0.75rem 0',
        background: 'linear-gradient(135deg,#ffffff, #f8fafc)',
        border: '1px solid rgba(226,232,240,0.9)',
        boxShadow: '0 18px 40px rgba(15,23,42,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem' }}>
        <h3
          style={{
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#0f172a',
          }}
        >
          {service.title}
        </h3>
        <span
          style={{
            padding: '0.25rem 0.65rem',
            borderRadius: '999px',
            background: 'rgba(79,70,229,0.08)',
            color: '#4f46e5',
            fontSize: '0.75rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            alignSelf: 'flex-start',
          }}
        >
          {service.city}
        </span>
      </header>

      <p
        style={{
          margin: 0,
          fontSize: '0.9rem',
          color: '#4b5563',
          lineHeight: 1.5,
        }}
      >
        {service.description}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.4rem',
        }}
      >
        <div>
          <span
            style={{
              display: 'block',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#9ca3af',
              fontWeight: 600,
            }}
          >
            Starts from
          </span>
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#111827',
            }}
          >
            ₹{service.startingPrice}
          </span>
        </div>

        <Link
          to={`/services/${service._id}`}
          style={{
            padding: '0.55rem 1.1rem',
            borderRadius: '999px',
            background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: '0 10px 25px rgba(79,70,229,0.35)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 14px 35px rgba(79,70,229,0.45)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(79,70,229,0.35)';
          }}
        >
          View details
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
