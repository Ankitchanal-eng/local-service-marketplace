import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children, role }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    try {
      // 🚫 DO NOT MODIFY localStorage HERE
      const raw = localStorage.getItem('user');
      const stored = raw ? JSON.parse(raw) : null;

      // After our Login fix, stored is:
      // { id, email, username, role, token }
      const user = stored || null;

      console.log('🔍 FULL USER DATA (RequireAuth):', user);

      if (!user || !user.role) {
        console.log('❌ No valid user');
        navigate('/login', { replace: true });
        return;
      }

      if (role && user.role !== role) {
        console.log('❌ Role mismatch:', user.role, '!=', role);
        navigate('/unauthorized', { replace: true });
        return;
      }

      console.log('✅ ACCESS GRANTED:', user.role);
      setIsAuthorized(true);
    } catch (error) {
      console.log('❌ Parse error in RequireAuth');
      navigate('/login', { replace: true });
    } finally {
      setLoading(false);
    }
  }, [navigate, role]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : null;
};

export default RequireAuth;
