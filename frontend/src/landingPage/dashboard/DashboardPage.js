import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Adjust path as needed
import { Navigate, Link, useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// --- General Analysis View (No changes) ---
const GeneralAnalysisView = ({ onStart }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-10 col-xl-8">
        <div className="hero-card p-4 p-sm-5">
          
          {/* Section 1: What is a Digital Footprint? */}
          <div className="text-center mb-4">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '64px' }}>
              document_scanner
            </span>
            <h2 className="hero-h1 fs-3 my-3">What is a Digital Footprint?</h2>
            <p className="hero-feature-text mb-4">
              Your digital footprint is the trail of data you leave behind while using the internet. It includes everything from your social media posts and browsing history to public records and data collected by marketers.
            </p>
          </div>

          {/* Section 2: General Stats (The "Analysis") */}
          <div className="mb-5">
            <h4 className="text-center mb-3">The Average User's Footprint</h4>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="text-center p-3 border rounded">
                  <h3 className="fw-bold text-primary mb-0">13+</h3>
                  <p className="mb-0 text-muted small">Social Accounts</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-3 border rounded">
                  <h3 className="fw-bold text-primary mb-0">80+</h3>
                  <p className="mb-0 text-muted small">Online Subscriptions</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center p-3 border rounded">
                  <h3 className="fw-bold text-primary mb-0">5+</h3>
                  <p className="mb-0 text-muted small">Data Breaches</p>
                </div>
              </div>
            </div>
            <p className="text-center text-muted small mt-3">
              This data is often invisible, spread across hundreds of databases.
            </p>
          </div>

          {/* Section 3: The Call-to-Action (The Button) */}
          <div className="text-center bg-light p-4 rounded">
            <h3 className="hero-h1 fs-4 mb-3">Ready to See Yours?</h3>
            <p className="hero-feature-text mb-4">
              Connect your accounts to run a secure, personalized scan. We'll find your public posts, accounts, and any exposure in data breaches.
            </p>
            {/* This button now triggers the onStart function */}
            <button className="btn btn-custom-primary btn-lg" onClick={onStart}>
              Start Your Personalized Analysis
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// --- Personalized View (No changes) ---
const PersonalizedView = ({ data }) => {
  // Destructure the data object
  const { stats, breakdown, activity } = data;

  return (
    <>
      {/* --- Stat Cards --- */}
      <div className="row g-4 mb-4">
        {stats.map((card) => (
          <div key={card.title} className="col-md-6 col-lg-3">
            <div className="hero-card h-100 p-4 d-flex align-items-center">
              <div className="me-3">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '36px' }}>
                  {card.icon}
                </span>
              </div>
              <div>
                <h4 className="fs-2 fw-bold mb-0">{card.value}</h4>
                <p className="mb-0 text-muted">{card.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Chart & Activity Feed --- */}
      <div className="row g-4">
        {/* Chart Column */}
        <div className="col-lg-7">
          <div className="hero-card p-4 h-100">
            <h5 className="mb-3">Footprint Breakdown</h5>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={breakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '0.5rem',
                      border: '1px solid #eee',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Activity Feed Column */}
        <div className="col-lg-5">
          <div className="hero-card p-4 h-100">
            <h5 className="mb-3">Recent Alerts</h5>
            <ul className="list-group list-group-flush">
              {activity.map((activity) => (
                <li key={activity.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                  <span>{activity.text}</span>
                  <small className="text-muted text-nowrap ms-3">{activity.time}</small>
                </li>
              ))}
            </ul>
            <Link to="#" className="btn btn-outline-primary btn-sm mt-3">
              View all alerts
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions --- */}
      <div className="row g-4 mt-4">
        <div className="col-md-6">
          <div className="hero-card p-4">
            <h5>Manage Your Footprint</h5>
            <p className="text-muted small">Connect accounts or start a new scan.</p>
            <div className="d-flex gap-3">
              <Link to="/connect-accounts" className="btn btn-custom-primary">
                Manage Accounts
              </Link>
              <Link to="/connect-accounts" className="btn btn-outline-primary">
                Run New Scan
              </Link>
            </div>
          </div>
        </div>
        
        {/* Link to Profile Page */}
        <div className="col-md-6">
          <div className="hero-card p-4">
            <h5>Account Settings</h5>
            <p className="text-muted small">Update your personal information or password.</p>
            <div className="d-flex gap-3">
              <Link to="/profile" className="btn btn-outline-primary">
                Edit Your Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Loading View (No changes) ---
const LoadingView = () => (
  <div className="row justify-content-center">
    <div className="col-lg-10 col-xl-8">
      <div className="hero-card p-4 p-sm-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="hero-h1 fs-4 mt-4 mb-2">Loading Your Dashboard...</h3>
        <p className="hero-feature-text">Just a moment while we fetch your analysis.</p>
      </div>
    </div>
  </div>
);


// --- Main Dashboard Component (UPDATED) ---
function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate(); // <-- Add navigate hook

  // State for what to show
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // <-- Start loading true
  const [error, setError] = useState(null);
  
  // We no longer need hasAnalyzed. We just check if dashboardData exists.

  // --- UPDATED useEffect to fetch REAL data ---
  useEffect(() => {
    // Only run if we have a user
    if (user) {
      const fetchDashboardData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // **SECURITY NOTE**: Should use auth token, not email in query
          const response = await fetch(`http://localhost:3002/api/analysis-results?email=${user.email}`);
          
          if (response.status === 404) {
            // This is NOT an error. It just means they haven't run a scan.
            // We will show them the GeneralAnalysisView
            setDashboardData(null); 
          } else if (!response.ok) {
            // This is a real error
            throw new Error('Failed to fetch your analysis.');
          } else {
            // Success! We have data.
            const data = await response.json();
            setDashboardData(data);
          }
        } catch (err) {
          setError(err.message || 'Could not load your analysis. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [user]); // Re-run if user changes

  // --- This is the redirect for non-logged-in users ---
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Extract friendly name
  const friendlyName = user.email ? user.email.split('@')[0] : 'User';

  // --- UPDATED: This now navigates to the connect page ---
  const handleStartAnalysis = () => {
    navigate('/connect-accounts');
  };

  // --- UPDATED: Render logic is simpler ---
  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      );
    }
    if (dashboardData) {
      // User has run an analysis, show their data
      return <PersonalizedView data={dashboardData} />;
    }
    // User is logged in, but has no data. Show the "start" page.
    return <GeneralAnalysisView onStart={handleStartAnalysis} />;
  };

  return (
    <main className="container-xl py-5">
      <div className="mb-4">
        <h1 className="hero-h1 fs-2">Welcome back, {friendlyName}!</h1>
        {/* Subtitle changes based on the state */}
        {!dashboardData ? (
          <p className="hero-feature-text">Let's explore what makes up a digital footprint.</p>
        ) : (
          <p className="hero-feature-text">Here's your digital footprint summary.</p>
        )}
      </div>

      {renderContent()}
    </main>
  );
}

export default DashboardPage;
