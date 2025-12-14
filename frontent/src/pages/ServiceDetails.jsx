import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

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
                const response = await axios.get(`/api/v1/services/${id}`);
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
        const token = localStorage.getItem('userToken');
        setIsLoggedIn(!!token);

    }, [id]);   // Dependency array: re-run effect if the ID in the URL changes

    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        const userToken = localStorage.getItem('userToken');

        if (!userToken) {
            // This case should ideally be covered by disabling the form, but good for safety
            setSubmitMessage({ type: 'error', text: 'Please log in to request this service.' });
            setIsSubmitting(false);
            return;
        }

        try {
            // Send POST /api/v1/bookings with serviceId and note
            const response = await axios.post(`/api/v1/bookings`,
                { serviceId: id, note },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            // Success message as per plan
            setSubmitMessage({ type: 'success', text: 'Request sent to provider; you’ll see updates in your dashboard soon.'});
            setNote(''); // Clear the form input

        } catch (err) {
            console.error(err.response || err);
            setSubmitMessage({ type: 'error', text: err.response?.data?.message || 'An error occurred while sending your request.' });
        } finally {
            setIsSubmitting(false);
        }
    };

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

            <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc' }}>
                <h3>Request Service</h3>
                
                {submitMessage && (
                    <div style={{ color: submitMessage.type === 'success' ? 'green' : 'red', marginBottom: '10px' }}>
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
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <button type="submit" disabled={isSubmitting || !note.trim()}>
                            {isSubmitting ? 'Sending Request...' : 'Request Service'}
                        </button>
                    </form>
                ) : (
                    <p style={{ color: 'gray' }}>
                        Login to request this service. <Link to="/login">Log In Now</Link>
                    </p>
                )}
            </div>

            <div style={{ marginTop: '20px' }}>
                <Link to="/browse">Go back to browse</Link>
            </div>
        </div>
    );
};

export default ServiceDetails;