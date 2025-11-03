import React from 'react';
import { useNavigate } from 'react-router-dom';

// A reusable component for each feature list item
function FeatureItem({ children }) {
  return (
    <li className="feature-list-item">
      <span className="material-symbols-outlined">check_circle</span>
      <span>{children}</span>
    </li>
  );
}

function LearnMorePage() {
  const navigate = useNavigate();

  return (
    // Main container to center the card vertically
    <main className="container d-flex flex-grow-1 align-items-center py-5">
      <div style={{ width: '100%', maxWidth: '70rem', margin: '0 auto' }}>
        
        {/* The single, large "glass" card for the whole page */}
        <div className="hero-card p-5">
          <div className="d-flex flex-column align-items-center">

            {/* --- 1. HEADER --- */}
            <div className="text-center">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '48px' }}>
                workspace_premium
              </span>
              <h2 className="hero-h1 fs-2 mt-2 mb-3">Find a Plan That's Right for You</h2>
              <p className="hero-p mx-auto" style={{ maxWidth: '45rem' }}>
                Start for free to see your basic footprint, or upgrade to Pro to unlock
                powerful privacy controls and detailed reports.
              </p>
            </div>

            <div className="hero-divider w-100 my-5" />

            {/* --- 2. PRICING GRID --- */}
            <div className="row g-4 w-100">

              {/* TIER 1: PERSONAL (Free) */}
              <div className="col-lg-4 d-flex">
                <div className="pricing-card d-flex flex-column p-4 w-100">
                  <h3 className="hero-feature-heading fs-4">Personal</h3>
                  <p className="display-5 fw-bold my-3">$0</p>
                  <p className="hero-feature-text">For individuals who want to see their basic digital footprint.</p>
                  <ul className="list-unstyled my-4">
                    <FeatureItem>Scan 3 Social Profiles</FeatureItem>
                    <FeatureItem>Basic Footprint Report</FeatureItem>
                    <FeatureItem>Monthly Email Summary</FeatureItem>
                  </ul>
                  {/* mt-auto pushes the button to the bottom */}
                  <button 
                    className="btn-custom-secondary w-100 mt-auto"
                    onClick={() => navigate('/login')}
                  >
                    Get Started
                  </button>
                </div>
              </div>

              {/* TIER 2: PRO (Highlighted) */}
              <div className="col-lg-4 d-flex">
                <div className="pricing-card pricing-card-highlight d-flex flex-column p-4 w-100">
                  <h3 className="hero-feature-heading fs-4">Pro</h3>
                  <p className="display-5 fw-bold my-3">$9<span className="fs-5 hero-feature-text">/mo</span></p>
                  <p className="hero-feature-text">For users who want full control and detailed insights.</p>
                  <ul className="list-unstyled my-4">
                    <FeatureItem>Scan Unlimited Profiles</FeatureItem>
                    <FeatureItem>Detailed Insight Reports</FeatureItem>
                    <FeatureItem>Real-time Privacy Alerts</FeatureItem>
                    <FeatureItem>Data Removal Assistance</FeatureItem>
                    <FeatureItem>Priority Support</FeatureItem>
                  </ul>
                  <button 
                    className="btn-custom-primary w-100 mt-auto"
                    onClick={() => navigate('/login')}
                  >
                    Upgrade to Pro
                  </button>
                </div>
              </div>

              {/* TIER 3: ENTERPRISE (Custom) */}
              <div className="col-lg-4 d-flex">
                <div className="pricing-card d-flex flex-column p-4 w-100">
                  <h3 className="hero-feature-heading fs-4">Enterprise</h3>
                  <p className="display-5 fw-bold my-3">Custom</p>
                  <p className="hero-feature-text">For businesses and organizations with advanced needs.</p>
                  <ul className="list-unstyled my-4">
                    <FeatureItem>All Pro Features</FeatureItem>
                    <FeatureItem>Team Management</FeatureItem>
                    <FeatureItem>Custom Security Audits</FeatureItem>
                    <FeatureItem>Dedicated Account Manager</FeatureItem>
                  </ul>
                  <button 
                    className="btn-custom-outline w-100 mt-auto"
                    onClick={() => navigate('/login')} // Should go to a 'contact' page
                  >
                    Contact Sales
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LearnMorePage;