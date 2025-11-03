import React from 'react';

// This sub-component is unchanged and is perfectly fine.
function DeveloperProfile({ name, role, imageUrl }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card text-center h-100" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
        <div className="card-body d-flex flex-column align-items-center p-4">
          <img 
            src={imageUrl || 'https://media.istockphoto.com/id/1396644902/photo/businesswoman-posing-and-smiling-during-a-meeting-in-an-office.jpg?s=2048x2048&w=is&k=20&c=rsnHgTIebCaUbYIaStgNkyjZQUIx_-8XxMt-C75SFmU='} 
            alt={name} 
            className="rounded-circle mb-3" 
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <h4 className="hero-feature-heading">{name}</h4>
          <p className="text-primary fw-bold mb-0">{role}</p>
        </div>
      </div>
    </div>
  );
}

// The main component just has its hero-card wrapper removed.
function Developers() {
  return (
    <div className="d-flex flex-column align-items-center text-center w-100">
      <h2 className="hero-h1 fs-2">Meet the Team</h2>
      <p className="hero-p mx-auto mt-3" style={{ maxWidth: '48rem' }}>
        This project is built by passionate developers dedicated to digital privacy.
      </p>
      
      <div className="row g-4 justify-content-center w-100 mt-4">
        <DeveloperProfile 
          name="Nikhita" 
          role="Lead Developer" 
        />
        
      </div>

    </div>
  );
}

export default Developers;