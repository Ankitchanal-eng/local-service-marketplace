import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceList from './ServiceList';
import FilterSidebar from './FilterSidebar';

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
            const response = await axios.get('/api/v1/services', {
                params: currentFilters
            });
            console.log('API Response Data:', response.data);
            setServices(response.data.data);
        } catch (err) {
            setError('Failed to fetch services. Is the backend running?');
            console.error(err);
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
            return <ErrorState message={error} />;
        }
        if (services.length === 0) {
            // Check current filters to provide more specific empty messaging
            const filterApplied = filters.city || filters.category;
            const message = filterApplied 
                ? "No services found matching the selected filters." 
                : "No services available right now.";
            return <EmptyState message={message} />;
        }
        // Default success state: show the list
        return <ServiceList services={services} />;
    };

    return (
        <div style={{ display: 'flex' }}>
            <FilterSidebar onFilterChange={handleFilterChange} />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                <h1>Available Services</h1>
                {renderContent()}
            </div>
        </div>
    );
};

export default BrowseServices;