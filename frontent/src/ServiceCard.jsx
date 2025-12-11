import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '5px' }}>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <p><strong>City:</strong> {service.city}</p>
      <p><strong>Starts From:</strong> ${service.startingPrice}</p>
      {/* Clickable link to details page using the service ID */}
      <Link to={`/services/${service.id}`}>View Details</Link>
    </div>
  );
};

export default ServiceCard;
