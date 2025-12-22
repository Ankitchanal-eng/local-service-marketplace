import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import '../styles/ServiceDetails.css'

import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

const ServiceDetails = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user?.role;
    const isLoggedIn = !!user;

    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
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
    }, [id]);

    // ✅ FIXED: Role check moved to render logic (no setState during render)
    if (!isLoggedIn || role !== 'customer') {
        return (
            <div className="service-details-page">
                <div className="service-hero">
                    <div className="hero-background"></div>
                    <div className="hero-content">
                        <Link to="/browse" className="back-link">
                            <span className="back-icon">←</span>
                            Back to Services
                        </Link>
                        <div className="service-header">
                            <h1 className="service-title">Access Restricted</h1>
                        </div>
                    </div>
                </div>
                <div className="service-details-container">
                    <div className="access-denied-card">
                        <div className="denied-content">
                            <h2>🔒 Only Customers Can Book</h2>
                            <p>{!isLoggedIn ? 'Please login as a customer to book services.' : 'Providers cannot book their own services.'}</p>
                            {!isLoggedIn ? (
                                <Link to="/login" className="login-btn">Login as Customer</Link>
                            ) : (
                                <Link to="/browse" className="browse-btn">Browse Services</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmitBooking = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            await api.post('/bookings', {
                serviceId: id,
                note,
            });

            setSubmitMessage({ type: 'success', text: 'Request sent successfully. Track it in your dashboard.'});
            setNote('');
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
                onAction={() => window.location.href = '/browse'}
            />
        );
    }

    return (
        <div className="service-details-page">
            {/* Rest of your JSX stays exactly the same */}
            <div className="service-hero">
                <div className="hero-background"></div>
                <div className="hero-content">
                    <Link to="/browse" className="back-link">
                        <span className="back-icon">←</span>
                        Back to Services
                    </Link>
                    <div className="service-header">
                        <h1 className="service-title">{service.title}</h1>
                        <div className="service-price">
                            <span className="price">₹{service.startingPrice}</span>
                            <span className="price-label">Starting From</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="service-details-container">
                <div className="service-main">
                    <div className="service-info-card">
                        <div className="service-icon">🛠️</div>
                        <div className="service-meta">
                            <div className="meta-item">
                                <span className="meta-label">Location</span>
                                <span className="meta-value">{service.city}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Category</span>
                                <span className="meta-value">{service.category}</span>
                            </div>
                        </div>
                    </div>

                    <div className="service-description">
                        <h2>About This Service</h2>
                        <p>{service.description}</p>
                    </div>

                    <button className="contact-btn" disabled>
                        <span className="btn-icon">💬</span>
                        Contact Provider (Coming Soon)
                    </button>
                </div>

                <div className="booking-sidebar">
                    <div className="booking-card">
                        <div className="booking-header">
                            <h3>Request This Service</h3>
                            <div className="booking-price">₹{service.startingPrice} starting</div>
                        </div>

                        {submitMessage && (
                            <div className={`message-alert ${submitMessage.type}`}>
                                <span className={`alert-icon ${submitMessage.type}`}>
                                    {submitMessage.type === 'success' ? '✅' : '❌'}
                                </span>
                                {submitMessage.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmitBooking} className="booking-form">
                            <div className="form-group">
                                <label className="form-label">Additional Notes</label>
                                <textarea
                                    rows="4"
                                    placeholder="Describe your specific requirements, timing preferences, or any special instructions..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="booking-textarea"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting || !note.trim()}
                                className="booking-button"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Sending Request...
                                    </>
                                ) : (
                                    <>
                                        <span className="btn-icon">📤</span>
                                        Send Request
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
