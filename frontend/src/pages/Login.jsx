import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      // Call backend
      const res = await loginUser(formData);
      // Expected: { message, token, user: { id, email, username, role } }
      console.log('✅ Login FULL response:', res);

      const cleanUser = {
        id: res.user.id,
        email: res.user.email,
        username: res.user.username,
        role: res.user.role,
        token: res.token,
      };

      // Store CLEAN object only
      localStorage.setItem('user', JSON.stringify(cleanUser));
      console.log('✅ CLEAN USER stored:', cleanUser);

      navigate('/');
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="floating-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">🔐</div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>

          {error && (
            <div className="error-alert">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
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
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
                disabled={loading}
              />
              <div className="input-icon">🔒</div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <span className="button-icon">➤</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account? <a href="/register">Sign up here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
