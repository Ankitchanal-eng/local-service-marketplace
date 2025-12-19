import React, { useState } from 'react';
import { createService } from '../services/bookingService';

const CreateService = () => {

  const [formData, setFormData] = useState({
    title: '',  
    description: '',
    category: '',
    city: '',
  });
  
  console.log(formData);

  const validateForm = () => {
  if (!formData.title.trim()) return 'Title is required';
  if (formData.title.length < 5) return 'Title must be at least 5 characters';

  if (!formData.description.trim()) return 'Description is required';
  if (formData.description.length < 15)
    return 'Description must be at least 15 characters';

  if (!formData.category.trim()) return 'Category is required';
  if (!formData.city.trim()) return 'City is required';

  return null;
};

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const error = validateForm();
  if (error) {
    alert(error);
    return;
  }

  try {
    await createService(formData);
    console.log('service created successfully');

    setFormData({
      title: '',
      description: '',
      category: '',
      city: '',
    });
  } catch (err) {
    console.error(err.response?.data?.message || 'Failed to create service');
  }
};
  return (
    <div>
      <h1>Create New Service</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br />
          <input type="text"
          name="title"
          value={formData.title}
          onChange={handleChange} 
          />
        </div>

        <div>
          <label>Description</label><br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Category</label><br />
          <input type="text" 
           name="category"
           value={formData.category}
           onChange={handleChange}
          />
        </div>

        <div>
          <label>City</label><br />
          <input type="text" 
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create Service</button>
      </form>
    </div>
  );
};

export default CreateService;
