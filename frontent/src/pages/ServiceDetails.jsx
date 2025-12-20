import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

const ServiceDetails = () => {
      // read the id parameter form the url
    const { id } = useParams();

    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // state for the new booking form
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Call the specific backend endpoint for one service
                const response = await api.get(`/services/${id}`);
                setService(response.data.data);
            } catch (err) {
                setError('Failed to fetch service details. Service might not exist.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceDetails();

        // Check login status on load
        const token = localStorage.getItem('user');
        setIsLoggedIn(!!token);

    }, [id]);   // Dependency array: re-run effect if the ID in the URL changes

    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            await api.post('/bookings', {
                serviceId: id,
                note,
            });

            // Success message as per plan
            setSubmitMessage({ type: 'success', text: 'Request sent successfully. Track it in your dashboard.'});
            setNote(''); // Clear the form input

        } catch (err) {
            console.log('BOOKING ERROR FULL:', err);
            console.log('BOOKING ERROR RESPONSE:', err.response);

            setSubmitMessage({ type: 'error', text: err.response?.data?.message || 'Failed to send request.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <LoadingState />;
    }

     if (error) {
        // Use the ErrorState component and add the required link back to browse
        return (
            <ErrorState
                message={error}
                onRetry={() => window.location.href = `/services/${id}`}
            />
        );
    }

    if (!service) {
        return (
            <EmptyState 
                message="This service is no longer available."
                actionText="Browse Services"
                onAction={() => (window.location.href = '/browse')}
            />
        );
    }

    return (
        <div className="page-container">
            <h1>{service.title}</h1>

            <p><strong>Description:</strong> {service.description}</p>
            <p><strong>City:</strong> {service.city}</p>
            <p><strong>Starting Price:</strong> ${service.startingPrice}</p>

            <button disabled>
                Contact provider (comming soon)
            </button>

            <div className="card">
                <h3>Request Service</h3>

                {submitMessage && (
                    <div className={`alert ${submitMessage.type}`}>
                        {submitMessage.text}
                    </div>
                )}

                {isLoggedIn ? (
                    <form onSubmit={handleSubmitBooking}>
                        <textarea
                            rows="4"
                            placeholder="Describe your issue / request..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            disabled={isSubmitting}
                        />
                        <button disabled={isSubmitting || !note.trim()}>
                            {isSubmitting ? 'Sending Request...' : 'Request Service'}
                        </button>
                    </form>
                ) : (
                    <p className="muted-text">
                        Please log in to request this service.
                    </p>
                )}
            </div>

            <Link to="/browse">Go back to browse</Link>
        </div>
    );
};

export default ServiceDetails;