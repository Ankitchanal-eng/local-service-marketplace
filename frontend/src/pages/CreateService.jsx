import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createService } from '../services/bookingService';
import '../styles/CreateService.css'; 

const CreateService = () => {
 const navigate = useNavigate();

 const user = JSON.parse(localStorage.getItem('user'));
 const isLoggedIn = !!user;
 const role = user?.role;

 const [formData, setFormData] = useState({
   title: '',
   description: '',
   category: '',
   city: '',
   startingPrice: '',
 });

 const [message, setMessage] = useState(null);
 const [isSubmitting, setIsSubmitting] = useState(false);

 // 🔐 Guard: only providers allowed
 useEffect(() => {
   if (!isLoggedIn) {
     navigate('/login');
   } else if (role !== 'provider') {
     navigate('/');
   }
 }, [isLoggedIn, role, navigate]);

 const validateForm = () => {
   if (!formData.title.trim()) return 'Title is required';
   if (formData.title.length < 5) return 'Title must be at least 5 characters';

   if (!formData.description.trim()) return 'Description is required';
   if (formData.description.length < 15)
     return 'Description must be at least 15 characters';

   if (!formData.category.trim()) return 'Category is required';
   if (!formData.city.trim()) return 'City is required';

   if (!formData.startingPrice || Number(formData.startingPrice) <= 0)
     return 'Starting price must be greater than 0';

   return null;
 };

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData((prev) => ({ ...prev, [name]: value }));
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setMessage(null);

   const error = validateForm();
   if (error) {
     setMessage({ type: 'error', text: error });
     return;
   }

   try {
     setIsSubmitting(true);
     await createService(formData);

     setMessage({ type: 'success', text: 'Service created successfully!' });

     setFormData({
       title: '',
       description: '',
       category: '',
       city: '',
       startingPrice: '',
     });
   } catch (err) {
     setMessage({
       type: 'error',
       text: err.response?.data?.message || 'Failed to create service',
     });
   } finally {
     setIsSubmitting(false);
   }
 };

 return (
   <div className="create-service-page">
     <div className="page-hero">
       <div className="hero-content">
         <div className="hero-icon">✨</div>
         <h1 className="hero-title">Create New Service</h1>
         <p className="hero-subtitle">Add your service and reach local customers instantly</p>
       </div>
     </div>

     <div className="create-service-container">
       <div className="form-card">
         {message && (
           <div className={`message-alert ${message.type}`}>
             <span className={`alert-icon ${message.type === 'success' ? 'success' : 'error'}`}>
               {message.type === 'success' ? '✅' : '❌'}
             </span>
             {message.text}
           </div>
         )}

         <form onSubmit={handleSubmit} className="service-form">
           <div className="form-group">
             <label className="form-label">Service Title</label>
             <input
               type="text"
               name="title"
               value={formData.title}
               onChange={handleChange}
               className="form-input"
               placeholder="e.g. Professional House Cleaning"
             />
           </div>

           <div className="form-group">
             <label className="form-label">Description</label>
             <textarea
               name="description"
               value={formData.description}
               onChange={handleChange}
               className="form-textarea"
               rows="4"
               placeholder="Describe your service, what you offer, experience..."
             />
           </div>

           <div className="form-row">
             <div className="form-group">
               <label className="form-label">Category</label>
               <input
                 type="text"
                 name="category"
                 value={formData.category}
                 onChange={handleChange}
                 className="form-input"
                 placeholder="e.g. Cleaning, Plumbing, Beauty"
               />
             </div>

             <div className="form-group">
               <label className="form-label">City</label>
               <input
                 type="text"
                 name="city"
                 value={formData.city}
                 onChange={handleChange}
                 className="form-input"
                 placeholder="e.g. Mumbai, Delhi, Bangalore"
               />
             </div>
           </div>

           <div className="form-group">
             <label className="form-label">Starting Price (₹)</label>
             <input
               type="number"
               name="startingPrice"
               value={formData.startingPrice}
               onChange={handleChange}
               className="form-input"
               placeholder="e.g. 500"
               min="1"
             />
           </div>

           <button type="submit" disabled={isSubmitting} className="submit-btn">
             {isSubmitting ? (
               <>
                 <span className="spinner"></span>
                 Creating Service...
               </>
             ) : (
               'Create Service'
             )}
           </button>
         </form>
       </div>
     </div>
   </div>
 );
};

export default CreateService;
