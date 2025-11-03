import React from 'react';

function Footer() {
  return (
    // Use Bootstrap 'container'
    <footer className="container d-flex flex-column gap-4 text-center py-5">
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-4">
        <a className="footer-link" href="#">Privacy Policy</a>
        <a className="footer-link" href="#">Terms of Service</a>
        <a className="footer-link" href="#">Contact Us</a>
      </div>
      <p className="footer-copyright m-0">
        © 2024 Digital Footprint Visualizer. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;