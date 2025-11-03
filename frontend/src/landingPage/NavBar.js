// Filename: NavBar.js

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

// Style for the profile circle (no changes needed)
const profileIconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'var(--c-primary)', 
  color: 'white',
  fontSize: '20px',
  cursor: 'pointer',
  border: 'none',
  padding: 0 // Ensure no extra padding
};


function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container-xl">
      <header className="d-flex align-items-center justify-content-between py-4 px-0 px-sm-2">

        {/* Logo Link */}
        <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '30px' }}>hub</span>
          <h2 className="fs-5 m-0 fw-bold" style={{ color: 'var(--c-heading-light)' }}>EyeSee</h2>
        </Link>

        {/* Main Links */}
        <div className="d-none d-md-flex align-items-center gap-4">
          <Link to="/" className="nav-link-custom">Home</Link>
          {user && (
            <Link to="/dashboard" className="nav-link-custom">Dashboard</Link>
          )}
          <Link to="/learn-more" className="nav-link-custom">Pricing</Link>
          <Link to="/about" className="nav-link-custom">About</Link>
        </div>

        {/* Conditional Login/Profile Section */}
        <div className="d-flex align-items-center gap-3">
          {user ? (
            // --- USER IS LOGGED IN ---
            <div className="dropdown">
              {/* 1. Added "profile-toggle-custom" className */}
              <button
                style={profileIconStyle}
                className="dropdown-toggle profile-toggle-custom" 
                type="button"
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <span className="material-symbols-outlined">person</span>
              </button>

              {/* Dropdown Menu */}
              <ul className="dropdown-menu dropdown-menu-end shadow-sm mt-2">

                <li>
                  <h6 className="dropdown-header">Signed in as</h6>
                  <span className="dropdown-item-text fst-italic">{user.email}</span>
                </li>
                <li><hr className="dropdown-divider" /></li>
                
                {/* 2. Added "Your Profile" Link */}
                <li>
                  <Link to="/profile" className="dropdown-item">
                    <span className="material-symbols-outlined me-2" style={{fontSize: '1.2rem'}}>
                      account_circle
                    </span>
                    Your Profile
                  </Link>
                </li>
                
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <span className="material-symbols-outlined me-2" style={{fontSize: '1.2rem'}}>
                      logout
                    </span>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
            
          ) : (
            // --- USER IS LOGGED OUT ---
            <button className="btn-custom-primary" onClick={handleLoginClick}>
              Sign In
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default NavBar;