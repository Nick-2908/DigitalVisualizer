import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';



function Hero() {
  const navigate=useNavigate();
   const ClickDash = () => {
    navigate('/dashboard');
  };
  return (
    // Use Bootstrap 'container' and flex utils to center
    <main className="container d-flex flex-grow-1 align-items-center py-5">
      
      {/* You can adjust this maxWidth to control the width */}
      <div style={{ width: '100%', maxWidth: '100rem', margin: '0 auto' }}>
        
        {/* CHANGED: p-4 p-sm-5 -> p-5 (makes the box taller/bigger) */}
        <div className="hero-card p-5">
          
          {/* CHANGED: gap-4 -> gap-5 (more space between main elements) */}
          <div className="d-flex flex-column align-items-center text-center gap-5">
            
            {/* Heading */}
            {/* CHANGED: gap-3 -> gap-4 (more space between h1 and p) */}
            <div className="d-flex flex-column gap-4">
              <h1 className="hero-h1">Welcome back, Alex!</h1>
              <p className="hero-p mx-auto">
                Ready to see your digital world? Understand and visualize your online presence, manage your privacy, and gain powerful insights all in one place.
              </p>
            </div>
            
            {/* Buttons (use Bootstrap 'flex-wrap' for responsive) */}
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <button className="btn-custom-primary" onClick={ClickDash}>
                <span>Explore My Data</span>
              </button>
              <button className="btn-custom-secondary" onClick={ClickDash}>
                <span>Learn How It Works</span>
              </button>
            </div>
            
            {/* CHANGED: Added my-5 for more vertical space */}
            <div className="hero-divider "></div>
            
            {/* Features Grid (use Bootstrap 'row' and 'col-md-4') */}
            <div className="row g-4 text-start w-100">
              <div className="col-md-4 d-flex align-items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">pie_chart</span>
                <div className="d-flex flex-column gap-1">
                  <h2 className="hero-feature-heading">Visualize Data</h2>
                  <p className="hero-feature-text">See a clear, interactive map of your online activities.</p>
                </div>
              </div>
              
              <div className="col-md-4 d-flex align-items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">shield</span>
                <div className="d-flex flex-column gap-1">
                  <h2 className="hero-feature-heading">Manage Privacy</h2>
                  <p className="hero-feature-text">Identify and control your privacy settings with our tools.</p>
                </div>
              </div>
              
              <div className="col-md-4 d-flex align-items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">lightbulb</span>
                <div className="d-flex flex-column gap-1">
                  <h2 className="hero-feature-heading">Gain Insights</h2>
                  <p className="hero-feature-text">Learn how to build a safer, more intentional presence.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;