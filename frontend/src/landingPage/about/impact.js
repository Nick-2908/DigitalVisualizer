import React from 'react';

function Impact() {
  return (
    // The hero-card wrapper is removed.
    <div className="d-flex flex-column align-items-center text-center w-100">
      
      <h2 className="hero-h1 fs-2">How We Make an Impact</h2>
      <p className="hero-p mx-auto mt-3" style={{ maxWidth: '48rem' }}>
        We don't just show you data; we provide actionable insights. Our platform is built 
        on three core principles to help you regain control.
      </p>

      {/* We add margin-top (mt-4) here to give the grid
        proper spacing from the text above.
      */}
      <div className="row g-4 text-start w-100 mt-4">
        <div className="col-md-4 d-flex align-items-start gap-3">
          <span className="material-symbols-outlined text-primary mt-1">visibility</span>
          <div className="d-flex flex-column gap-1">
            <h3 className="hero-feature-heading">Promote Transparency</h3>
            <p className="hero-feature-text">We cut through the noise to show you exactly what's public.</p>
          </div>
        </div>
        
        <div className="col-md-4 d-flex align-items-start gap-3">
          <span className="material-symbols-outlined text-primary mt-1">admin_panel_settings</span>
          <div className="d-flex flex-column gap-1">
            <h3 className="hero-feature-heading">Enable Control</h3>
            <p className="hero-feature-text">Our tools guide you on how to manage or remove public data.</p>
          </div>
        </div>
        
        <div className="col-md-4 d-flex align-items-start gap-3">
          <span className="material-symbols-outlined text-primary mt-1">school</span>
          <div className="d-flex flex-column gap-1">
            <h3 className="hero-feature-heading">Encourage Literacy</h3>
            <p className="hero-feature-text">Learn how to build a safer, more intentional online presence.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Impact;