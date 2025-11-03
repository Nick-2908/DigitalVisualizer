// Filename: SignupPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = 'http://localhost:3002';

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/signup`, {
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
        // On successful signup, redirect to the login page
        navigate('/login');
      } else {
        setLoading(false);
        setError(data.message); // Show error from server (e.g., "User already exists")
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
          <form className="d-flex flex-column gap-4" onSubmit={handleSignupSubmit}>
            <div className="text-center mb-3">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '48px' }}>
                person_add
              </span>
              <h1 className="hero-h1 fs-2 mb-2">Create Account</h1>
              <p className="hero-feature-text">Get started by creating your account.</p>
            </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <label htmlFor="floatingEmail">Email address</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="btn-custom-primary w-100 py-2" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="ms-2">Creating Account...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
            
            <div className="text-center mt-3">
              <p className="small hero-feature-text">
                Already have an account?{' '}
                <Link to="/login" className="footer-link fw-bold">Log in here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;