import React, { useState } from 'react';

// This component receives a handler function (onFilterChange) from its parent
const FilterSidebar = ({ onFilterChange }) => {
    const [city, setCity] = useState('');
    const [category, setCategory] = useState('');

    const handleCityChange = (e) => {
        const newCity = e.target.value;
        setCity(newCity);
        // Call the parent handler immediately on change
        onFilterChange({ city: newCity, category });
    };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        onFilterChange({ city, category: newCategory });
    };

    return (
        <div style={{ padding: '15px', borderRight: '1px solid #ccc', width: '200px' }}>
            <h2>Filters</h2>
            <div>
                <label>City:</label>
                <input text="text" value={city} onChange={handleCityChange} placeholder="Enter City" />
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Category:</label>
                <input type="text" value={category} onChange={handleCategoryChange} placeholder="Enter Category" />
            </div>
        </div>
    );
};

export default FilterSidebar;