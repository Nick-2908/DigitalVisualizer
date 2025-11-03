import React from 'react';

function Introduction() {
  return (
    // The hero-card wrapper is removed.
    // The parent <AboutPage> handles the card and padding.
    <div className="text-center w-100">
      <span className="material-symbols-outlined text-primary" style={{ fontSize: '48px' }}>
        hub
      </span>
      <h2 className="hero-h1 fs-2 mt-2 mb-3">Our Mission</h2>
      <p className="hero-p mx-auto" style={{ maxWidth: '50rem' }}>
        In today's digital world, our data is scattered across the internet. Our mission is to
        empower you by providing a clear, simple, and powerful tool to visualize your 
        online footprint. We believe that by understanding where your information is, 
        you can take meaningful steps to protect your privacy and build a safer digital identity.
      </p>
    </div>
  );
}

export default Introduction;