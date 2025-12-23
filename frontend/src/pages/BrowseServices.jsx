import React, { useState, useEffect } from 'react';
import api from '../utils/api';

import '../styles/BrowseServices.css'; 
import ServiceList from '../components/ServiceList';
import FilterSidebar from '../components/FilterSidebar';
import LoadingState from '../components/LoadingState'; 
import ErrorState from '../components/ErrorState';       
import EmptyState from '../components/EmptyState';  

const BrowseServices = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    //initialize filters state
    const [filters, setFilters] = useState({ city: '', category: ''});

    //Function to fetch data from the API
    const fetchServices = async (currentFilters) => {    
        setIsLoading(true);
        setError(null);
        try{
            const response = await api.get('/services', {
                params: currentFilters
            });
            setServices(response.data.data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to fetch services. Is the backend running?');
        } finally {
            setIsLoading(false);
        }
    };

    //Handler passed to FilterSidebar to update filters and trigger a re-fetch
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // useEffect hook to fetch data on component mount AND when filters change
    useEffect(() => {
        fetchServices(filters);
    }, [filters]); // Dependency array: runs again when 'filters' state object changes

    const renderContent = () => {
        if (isLoading) {
            return <LoadingState />;
        }
        if (error) {
            return (
                 <ErrorState 
                    message={error} onRetry={() => fetchServices(filters)} 
                />
            );
        }
        if (services.length === 0) {
            // Check current filters to provide more specific empty messaging
            const filterApplied = filters.city || filters.category;
            const message = filterApplied 
                ? "No services found matching the selected filters." 
                : "No services available right now.";

            return (
                <EmptyState 
                    message={message}
                    actionText={filterApplied ? 'Clear Filters' : 'Refresh'}
                    onAction={() =>
                        filterApplied
                        ? setFilters({ city: '', category: ''})
                        : fetchServices(filters)
                    } 
                />
            );
        }
        // Default success state: show the list
        return <ServiceList services={services} />;
    };

    return (
        <div className="browse-services-page">
            <div className="page-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Find Local Services Near You</h1>
                    <p className="hero-subtitle">Discover trusted professionals for home repair, cleaning, beauty & more</p>
                </div>
            </div>
            
            <div className="browse-services-container">
                <FilterSidebar onFilterChange={handleFilterChange} />
                <main className="services-main-content">
                    <div className="page-header">
                        <h1 className="page-title">Available Services</h1>
                        <div className="stats-indicator">
                            <span className="services-count">{services.length} services found</span>
                        </div>
                    </div>
                    <div className="content-area">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BrowseServices;
