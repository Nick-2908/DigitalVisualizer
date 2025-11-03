import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Adjust path
import { useNavigate, Navigate } from 'react-router-dom';

function ConnectAccounts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // --- NEW: State for the Twitter handle ---
  const [twitterHandle, setTwitterHandle] = useState('');
  
  // State for this page
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Function to call our new backend endpoint
  const handleScanBreaches = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3002/api/analyze/breaches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // --- UPDATED: Send the twitterHandle in the body ---
        body: JSON.stringify({ 
          email: user.email,
          twitterHandle: twitterHandle 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to run scan.');
      }

      // If successful, the data is saved!
      // Now, send the user to the dashboard to see the results.
      setIsLoading(false);
      navigate('/dashboard');

    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <main className="container-xl py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-7">
          <div className="text-center">
            <h1 className="hero-h1 fs-2">Connect Your Accounts</h1>
            <p className="hero-feature-text">
              Start by scanning your email for public data breaches and connecting
              your public social handles.
            </p>
          </div>

          <div className="hero-card p-4 p-sm-5 mt-4">
            
            {/* --- Error Alert --- */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            {/* --- Step 1: Email (Read-only) --- */}
            <div className="mb-3">
              <label htmlFor="emailScan" className="form-label fw-bold">Email to Scan</label>
              <input 
                type="email" 
                className="form-control" 
                id="emailScan" 
                value={user.email} 
                disabled 
              />
              <div className="form-text">
                We'll scan this email against our mock database of public breaches.
              </div>
            </div>

            <hr className="my-4" />

            {/* --- Step 2: Social Media (Now functional) --- */}
            <div className="mb-3">
              <label htmlFor="twitterHandle" className="form-label fw-bold">Twitter / X Handle (Optional)</label>
              <div className="input-group">
                <span className="input-group-text" id="twitter-addon">@</span>
                <input 
                  type="text" 
                  className="form-control" 
                  id="twitterHandle"
                  placeholder="YourUsername"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                />
              </div>
              <div className="form-text">
                Provide a public handle to scan for mock public posts.
              </div>
            </div>
            
            <hr className="my-4" />

            {/* --- Submit Button --- */}
            <div className="text-center">
              <button 
                className="btn btn-custom-primary btn-lg" 
                onClick={handleScanBreaches}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="ms-2">Scanning...</span>
                  </>
                ) : (
                  'Run Full Analysis'
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ConnectAccounts;

