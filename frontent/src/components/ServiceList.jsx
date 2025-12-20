import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceList = ({ services =[] }) => {
    return (
        <div>
            {services.length > 0 ? (
                services.map(service => (
                    <ServiceCard key={service._id} service={service} />
                ))
            ) : (
                <p>No services found matching your criteria.</p>
            )}
        </div>
    );
};

export default ServiceList;