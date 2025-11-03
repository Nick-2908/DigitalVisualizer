// Filename: loginPage.js

import React, { useState } from 'react';
// 1. 'Link' is now used for the "Sign up now" button
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext'; // Make sure path is correct

function LoginPage() {
  // 2. All these states are now used in the JSX below
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const API_URL = 'http://localhost:3002';

  // 3. This handler is now used in <form onSubmit={...}>
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);   

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        login({ email: data.email, userId: data.userId }); // Save user to context
        navigate('/'); // Redirect to home page
      } else {
        setLoading(false);
        setError(data.message); 
      }
    } catch (err) {
      setLoading(false);
      setError('Could not connect to the server. Please try again.');
    }
  };

  return (
    <main className="container d-flex flex-grow-1 align-items-center py-5">
      <div style={{ width: '100%', maxWidth: '32rem', margin: '0 auto' }}>
        <div className="hero-card p-4 p-sm-5">
          {/* 4. Connect the submit handler */}
          <form className="d-flex flex-column gap-4" onSubmit={handleLoginSubmit}>
            <div className="text-center mb-3">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '48px' }}>
                lock_open
              </span>
              <h1 className="hero-h1 fs-2 mb-2">Welcome Back</h1>
              <p className="hero-feature-text">Please log in to access your dashboard.</p>
            </div>

            {/* 5. Connect the 'error' state */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                value={email} // 6. Connect 'email' state
                onChange={(e) => setEmail(e.target.value)} // 7. Connect 'setEmail'
                required
                disabled={loading} // 8. Connect 'loading' state
              />
              <label htmlFor="floatingEmail">Email address</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password} // 9. Connect 'password' state
                onChange={(e) => setPassword(e.target.value)} // 10. Connect 'setPassword'
                required
                disabled={loading} // 11. Connect 'loading' state
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="text-end" style={{ marginTop: '-0.5rem' }}>
              <a href="#" className="footer-link small">Forgot Password?</a>
            </div>

            {/* 12. Connect 'loading' state for button text/status */}
            <button className="btn-custom-primary w-100 py-2" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="ms-2">Logging in...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
            
            <div className="text-center mt-3">
              <p className="small hero-feature-text">
                Don't have an account?{' '}
                {/* 13. Use the 'Link' component */}
                <Link to="/signup" className="footer-link fw-bold">Sign up now</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;