import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceList = ({ services = [] }) => {
  const hasServices = services.length > 0;

  return (
    <section
      style={{
        flex: 1,
        padding: '1rem 1.5rem',
        borderRadius: '20px',
        background: 'transparent',
        minHeight: '100%',
      }}
    >
      {hasServices ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderRadius: '16px',
            border: '1px dashed rgba(148,163,184,0.7)',
            background: 'rgba(248,250,252,0.9)',
            color: '#6b7280',
            fontSize: '0.95rem',
          }}
        >
          No services found matching your criteria. Try adjusting filters or city.
        </div>
      )}
    </section>
  );
};

export default ServiceList;
