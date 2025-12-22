import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    onFilterChange({ city: newCity, category });
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onFilterChange({ city, category: newCategory });
  };

  const handleClear = () => {
    setCity('');
    setCategory('');
    onFilterChange({ city: '', category: '' });
  };

  return (
    <aside
      style={{
        width: '260px',
        padding: '1.5rem',
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.9)',
        boxShadow: '0 18px 40px rgba(15,23,42,0.12)',
        border: '1px solid rgba(226,232,240,0.8)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        position: 'sticky',
        top: '1.5rem',
        alignSelf: 'flex-start',
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Filters
        </h2>
        <p
          style={{
            margin: '0.3rem 0 0',
            fontSize: '0.85rem',
            color: '#64748b',
          }}
        >
          Refine services by location and category.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#475569',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          City
        </label>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="e.g. Mumbai, Delhi"
          style={{
            padding: '0.75rem 0.9rem',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'all 0.2s ease',
            background: 'rgba(248,250,252,0.9)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#6366f1';
            e.target.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.2)';
            e.target.style.background = '#ffffff';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
            e.target.style.background = 'rgba(248,250,252,0.9)';
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#475569',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Category
        </label>
        <input
          type="text"
          value={category}
          onChange={handleCategoryChange}
          placeholder="e.g. Cleaning, Plumbing"
          style={{
            padding: '0.75rem 0.9rem',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'all 0.2s ease',
            background: 'rgba(248,250,252,0.9)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#6366f1';
            e.target.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.2)';
            e.target.style.background = '#ffffff';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
            e.target.style.background = 'rgba(248,250,252,0.9)';
          }}
        />
      </div>

      <button
        type="button"
        onClick={handleClear}
        style={{
          marginTop: '0.5rem',
          padding: '0.7rem 1rem',
          borderRadius: '999px',
          border: 'none',
          background:
            city || category
              ? 'linear-gradient(135deg,#6366f1,#4f46e5)'
              : 'rgba(148,163,184,0.25)',
          color: city || category ? '#ffffff' : '#64748b',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: city || category ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
        }}
        disabled={!city && !category}
      >
        Clear filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
