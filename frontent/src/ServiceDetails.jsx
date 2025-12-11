import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ServiceDetails = () => {
      // read the id parameter form the url
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            setIsLoading(true);
            try {
                // Call the specific backend endpoint for one service
                const response = await axios.get(`/api/v1/services/${id}`);
                setService(response.data);
            } catch (err) {
                setError('Failed to fetch service details. Service might not exist.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceDetails();
    }, [id]);   // Dependency array: re-run effect if the ID in the URL changes

    if (isLoading) {
        return <div>Loading service details...</div>;
    }

    if (error) {
        return <div>Service not found.</div>;
    }

    return (
        <div>
            <h1>{service.title}</h1>
            <p><strong>Description:</strong> {service.description}</p>
            <p><strong>City:</strong> {service.city}</p>
            <p><strong>Starting Price:</strong> ${service.startingPrice}</p>

            <button onClick={() => alert('Contant provider functionality coming soon!')}>Content Provider</button>

            <div style={{ marginTop: '20px' }}>
                <Link to="/browse">Go back to browse</Link>
            </div>
        </div>
    );
};

export default ServiceDetails;