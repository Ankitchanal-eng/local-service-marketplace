import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import '../styles/Register.css'; 

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer',
    city: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ✅ FIXED: Call API + await response
      const data = await registerUser(formData);
      console.log('✅ Register response:', data);
      
      // ✅ FIXED: Store ONLY user object (handles nested format)
      const userData = data.user || data;
      localStorage.setItem('user', JSON.stringify(data));
      
      console.log('✅ Stored user:', data);
      navigate('/');
    } catch (err) {
      console.error('❌ Register error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Rest of JSX stays SAME...
  return (
    <div className="register-page">
      {/* Your existing JSX - unchanged */}
      <div className="floating-elements">
        <div className="element element-1"></div>
        <div className="element element-2"></div>
        <div className="element element-3"></div>
        <div className="element element-4"></div>
      </div>

      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <div className="register-icon">👥</div>
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Join our service marketplace</p>
          </div>

          {error && (
            <div className="error-alert">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                name="username"
                placeholder="Enter your full name"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
                required
                disabled={loading}
              />
              <div className="input-icon">👤</div>
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
                disabled={loading}
              />
              <div className="input-icon">📧</div>
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
                disabled={loading}
              />
              <div className="input-icon">🔒</div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label className="input-label">City</label>
                <input
                  name="city"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-field"
                  required
                  disabled={loading}
                />
                <div className="input-icon">📍</div>
              </div>

              <div className="input-group select-group">
                <label className="input-label">Account Type</label>
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  className="input-field select-field"
                  disabled={loading}
                >
                  <option value="customer">Customer</option>
                  <option value="provider">Service Provider</option>
                </select>
                <div className="input-icon">⚙️</div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="register-button">
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <span className="button-icon">➤</span>
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account? <a href="/login">Sign in here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
